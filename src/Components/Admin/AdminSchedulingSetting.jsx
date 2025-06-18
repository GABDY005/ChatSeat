// AdminWeeklyScheduler.jsx
import { useEffect, useState } from "react";
import supabase from "../../supabase";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { startOfWeek, addDays, format } from "date-fns";

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
];

export default function AdminWeeklyScheduler() {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("");
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await supabase.from("locations").select("*");
      setLocations(data || []);
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    if (selectedLocationId && selectedWeek) {
      fetchAvailability();
    }
  }, [selectedLocationId, selectedWeek]);

  const fetchAvailability = async () => {
    const [year, week] = selectedWeek.split("-W");
    const firstDayOfYear = new Date(year, 0, 1);
    const weekStart = addDays(firstDayOfYear, (parseInt(week) - 1) * 7);
    const monday = startOfWeek(weekStart, { weekStartsOn: 1 });

    const start = monday;
    const end = addDays(start, 6);
    const { data } = await supabase
      .from("availability")
      .select("date, time")
      .eq("location_id", selectedLocationId)
      .gte("date", format(start, "yyyy-MM-dd"))
      .lte("date", format(end, "yyyy-MM-dd"));

    const newAvailability = {};
    for (let i = 0; i < 7; i++) {
      const dateStr = format(addDays(start, i), "yyyy-MM-dd");
      newAvailability[dateStr] = [];
    }
    (data || []).forEach(({ date, time }) => {
      if (!newAvailability[date]) newAvailability[date] = [];
      newAvailability[date].push(time);
    });
    setAvailability(newAvailability);
  };

  const toggleSlot = (date, time) => {
    setAvailability((prev) => {
      const daySlots = prev[date] || [];
      const newSlots = daySlots.includes(time)
        ? daySlots.filter((t) => t !== time)
        : [...daySlots, time];
      return { ...prev, [date]: newSlots };
    });
  };

  const toggleAllSlots = (checked) => {
    const updated = {};
    getWeekDates().forEach((day) => {
      const dateStr = format(day, "yyyy-MM-dd");
      updated[dateStr] = checked ? [...timeslots] : [];
    });
    setAvailability(updated);
  };

  const handleSave = async () => {
    const rows = [];
    Object.keys(availability).forEach((date) => {
      availability[date].forEach((time) => {
        rows.push({ location_id: selectedLocationId, date, time });
      });
    });
    await supabase
      .from("availability")
      .delete()
      .eq("location_id", selectedLocationId);
    await supabase.from("availability").insert(rows);
    alert("Availability updated for the week!");
  };

  const handleAddLocation = async () => {
    if (!newLocation.trim()) return;
    const { data: inserted, error } = await supabase
      .from("locations")
      .insert([{ name: newLocation }])
      .select()
      .single();

    if (error || !inserted) {
      alert("Error adding location.");
      return;
    }

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

  const handleDeleteLocation = async (id) => {
    if (!window.confirm("Are you sure you want to delete this location?"))
      return;
    await supabase.from("locations").delete().eq("id", id);
    await supabase.from("availability").delete().eq("location_id", id);
    const { data } = await supabase.from("locations").select("*");
    setLocations(data || []);
    if (selectedLocationId === id) setSelectedLocationId("");
  };

  const getWeekDates = () => {
    if (!selectedWeek) return [];
    const [year, week] = selectedWeek.split("-W");
    const firstDayOfYear = new Date(year, 0, 1);
    const weekStart = addDays(firstDayOfYear, (parseInt(week) - 1) * 7);
    const monday = startOfWeek(weekStart, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
  };

  return (
    <>
      <AdminNavbar title="Weekly Scheduler" />
      <div className="flex min-h-screen pt-16 bg-[#f9f9f9]">
        <div className="w-full sm:w-auto sticky top-16 h-[calc(100vh-64px)]">
          <AdminSidebar />
        </div>
        <div className="p-6 flex-1">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">
            Admin Scheduling Settings
          </h2>

          {/* Add New Location */}
          <div className="bg-white p-4 rounded shadow mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Manage Locations
            </h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="Enter location name"
              />
              <button
                onClick={handleAddLocation}
                className="bg-green-600 text-white px-4 py-2 rounded"
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
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Week Selection and Availability Grid */}
          <div className="bg-white p-4 rounded shadow mb-4">
            <select
              className="border p-2 rounded w-full mb-3"
              value={selectedLocationId}
              onChange={(e) => setSelectedLocationId(e.target.value)}
            >
              <option value="">-- Select Location --</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>

            <input
              type="week"
              className="border p-2 rounded w-full"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
            />
          </div>

          {selectedLocationId && selectedWeek && (
            <div className="bg-white p-4 rounded shadow">
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => toggleAllSlots(true)}
                  className="mr-2 bg-green-500 text-white px-3 py-1 rounded"
                >
                  Select All
                </button>
                <button
                  onClick={() => toggleAllSlots(false)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Clear All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-center">
                  <thead>
                    <tr>
                      <th className="border px-2 py-1">Day</th>
                      {timeslots.map((slot) => (
                        <th key={slot} className="border px-2 py-1">
                          {slot}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {getWeekDates().map((day) => {
                      const dateStr = format(day, "yyyy-MM-dd");
                      return (
                        <tr key={dateStr}>
                          <td className="border px-2 py-1 font-semibold">
                            {format(day, "EEE dd/MM")}
                          </td>
                          {timeslots.map((slot) => (
                            <td key={slot} className="border px-2 py-1">
                              <input
                                type="checkbox"
                                checked={
                                  availability[dateStr]?.includes(slot) || false
                                }
                                onChange={() => toggleSlot(dateStr, slot)}
                              />
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <button
                onClick={handleSave}
                className="mt-4 bg-blue-700 text-white py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
