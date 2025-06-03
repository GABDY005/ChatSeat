import { useEffect, useState } from "react";
import supabase from "../../supabase";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default function AdminSchedulingSetting() {
  // State variables
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [existingTimes, setExistingTimes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Predefined timeslots for availability
  // These are the timeslots available for selection
  const timeslots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  // Fetch locations from the database on component mount
  // This effect runs once when the component mounts to load existing locations
  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await supabase.from("locations").select("*");
      setLocations(data || []);
    };
    fetchLocations();
  }, []);

  // Initialise the date picker using flatpickr
  useEffect(() => {
    flatpickr("#date-picker", {
      dateFormat: "Y-m-d",
      onChange: (_, dateStr) => setSelectedDate(dateStr),
    });
  }, []);

  // Fetch existing times for the selected location and date
  useEffect(() => {
    fetchExistingTimes();
  }, [selectedLocationId, selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

  // Function to fetch existing times for the selected location and date
  const fetchExistingTimes = async () => {
    if (!selectedLocationId || !selectedDate) {
      setExistingTimes([]);
      return;
    }

    // Fetch times from the availability table based on selected location and date
    const { data } = await supabase
      .from("availability")
      .select("id, time")
      .eq("location_id", selectedLocationId)
      .eq("date", selectedDate)
      .order("time", { ascending: true });

    setExistingTimes(data || []);
  };

  // Function to add a new location and set its availability for the next 90 days
  const handleAddLocation = async () => {
    if (!newLocation) return;
    const { data: inserted, error } = await supabase
      .from("locations")
      .insert([{ name: newLocation }])
      .select()
      .single();

    if (error || !inserted) return;

    const newLocationId = inserted.id;
    const now = new Date();
    const availabilityRows = [];

    for (let i = 0; i < 90; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      timeslots.forEach((time) => {
        availabilityRows.push({
          location_id: newLocationId,
          date: dateStr,
          time,
        });
      });
    }

    await supabase.from("availability").insert(availabilityRows);
    alert("Location and 3 months availability added!");
    setNewLocation("");
    const { data } = await supabase.from("locations").select("*");
    setLocations(data || []);
  };

  // Function to delete a location and its associated availability
  const handleDeleteLocation = async (id) => {
    if (!window.confirm("Delete this location?")) return;
    await supabase.from("locations").delete().eq("id", id);
    const { data } = await supabase.from("locations").select("*");
    setLocations(data || []);
  };

  // Function to toggle the selection of a timeslot
  const toggleTime = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  // Function to save selected availability for the chosen location and date
  const handleSaveAvailability = async () => {
    if (!selectedLocationId || !selectedDate || selectedTimes.length === 0) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    // Prepare rows to insert into the availability table
    const rows = selectedTimes.map((t) => ({
      location_id: selectedLocationId,
      date: selectedDate,
      time: t,
    }));

    await supabase.from("availability").insert(rows);
    alert("Availability saved!");

    setSelectedTimes([]);
    await fetchExistingTimes();
    setLoading(false);
  };

  // Function to delete a specific time slot from the availability
  const handleDeleteTime = async (id) => {
    await supabase.from("availability").delete().eq("id", id);
    setExistingTimes((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      <AdminNavbar title="Scheduling Settings" />
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="w-full sm:w-auto sticky top-16 h-[calc(100vh-64px)]">
          <AdminSidebar />
        </div>

        <div className="p-4 sm:p-6 md:p-8 flex-1">
          <h2 className="text-2xl font-bold text-[#003366] mb-6">
            Admin Scheduling Settings
          </h2>

          <div className="bg-white p-4 rounded shadow mb-6">
            <h3 className="font-semibold mb-2 text-[#1E3A8A]">
              Manage Locations
            </h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="New location name"
              />
              <button
                onClick={handleAddLocation}
                className="bg-green-600 text-white px-4 rounded"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2">
              {locations.map((loc) => (
                <li
                  key={loc.id}
                  className="flex justify-between items-center border p-2 rounded"
                >
                  <span>{loc.name}</span>
                  <button
                    onClick={() => handleDeleteLocation(loc.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-3 text-[#1E3A8A]">
              Set Availability
            </h3>
            <select
              value={selectedLocationId}
              onChange={(e) => setSelectedLocationId(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            >
              <option value="">-- Select Location --</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>

            <input
              id="date-picker"
              className="w-full p-2 mb-3 border rounded"
              placeholder="Select date"
              readOnly
            />

            {existingTimes.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-[#003366]">
                  Existing Times:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {existingTimes.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between border rounded px-2 py-1 bg-gray-50"
                    >
                      <span>{t.time}</span>
                      <button
                        className="text-red-600 text-sm"
                        onClick={() => handleDeleteTime(t.id)}
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-4">
              {timeslots.map((t) => (
                <label key={t} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTimes.includes(t)}
                    onChange={() => toggleTime(t)}
                  />
                  {t}
                </label>
              ))}
            </div>

            <button
              onClick={handleSaveAvailability}
              className="bg-blue-700 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Availability"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
