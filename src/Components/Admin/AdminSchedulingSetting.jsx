import React, { useEffect, useState } from "react";
import supabase from "../../supabase";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminSchedulingSetting() {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [existingTimes, setExistingTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("User");
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [selectedWeekday, setSelectedWeekday] = useState("");
  const navigate = useNavigate();

  const timeslots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
    "20:00", "21:00"
  ];

  // useEffect(() => {
  //   const fetchUserName = async () => {
  //     const {
  //       data: { user },
  //       error: authError,
  //     } = await supabase.auth.getUser();

  //     if (!user || authError) {
  //       navigate("/");
  //       return;
  //     }

  //     const { data: profile, error: profileError } = await supabase
  //       .from("profiles")
  //       .select("first_name, role")
  //       .eq("id", user.id)
  //       .single();

  //     if (profileError || !profile || profile.role !== "admin") {
  //       navigate("/");
  //       return;
  //     }

  //     setFirstName(profile.first_name);
  //   };

  //   fetchUserName();
  // }, [navigate]);

  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await supabase.from("locations").select("*");
      setLocations(data || []);
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    flatpickr("#date-picker", {
      dateFormat: "Y-m-d",
      onChange: (_, dateStr) => setSelectedDate(dateStr)
    });
  }, []);

  const loadAvailability = async () => {
    if (!selectedLocationId || !selectedDate) {
      setExistingTimes([]);
      return;
    }
    const { data } = await supabase
      .from("availability")
      .select("id, time")
      .eq("location_id", selectedLocationId)
      .eq("date", selectedDate);
    setExistingTimes(data || []);
  };

  useEffect(() => {
    loadAvailability();
  }, [selectedLocationId, selectedDate]);

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
    const end = new Date(now.getFullYear(), 5, 30); 

    const availabilityRows = [];
    while (now <= end) {
      const dateStr = now.toISOString().split("T")[0];
      timeslots.forEach((time) => {
        availabilityRows.push({
          location_id: newLocationId,
          date: dateStr,
          time,
        });
      });
      now.setDate(now.getDate() + 1);
    }

    await supabase.from("availability").insert(availabilityRows);
    toast.success("Location and availability added!");
    setNewLocation("");
    const { data } = await supabase.from("locations").select("*");
    setLocations(data || []);
  };

  const handleDeleteLocation = async (id) => {
    if (!window.confirm("Delete this location?")) return;
    await supabase.from("locations").delete().eq("id", id);
    const { data } = await supabase.from("locations").select("*");
    setLocations(data || []);
  };

  const handleBatchAvailability = async (locId, days, action) => {
    const { data } = await supabase
      .from("availability")
      .select("date")
      .eq("location_id", locId);

    if (!data || data.length === 0) return;

    const uniqueDates = [...new Set(data.map(d => d.date))];
    const maxDateStr = uniqueDates.reduce((latest, current) =>
      new Date(current) > new Date(latest) ? current : latest
    );
    const maxDate = new Date(maxDateStr);
    const targetDates = [];

    for (let i = 1; i <= days; i++) {
      const d = new Date(maxDate);
      d.setDate(d.getDate() + i);
      targetDates.push(d.toISOString().split("T")[0]);
    }

    if (action === "add") {
      const { data: existing } = await supabase
        .from("availability")
        .select("date, time")
        .eq("location_id", locId)
        .in("date", targetDates);

      const existingKeys = new Set((existing || []).map(e => `${e.date}-${e.time}`));

      const newRows = [];
      targetDates.forEach(date => {
        timeslots.forEach(time => {
          const key = `${date}-${time}`;
          if (!existingKeys.has(key)) {
            newRows.push({ location_id: locId, date, time });
          }
        });
      });

      if (newRows.length > 0) {
        await supabase.from("availability").insert(newRows);
      }

      toast.success(`Added ${newRows.length} time slots starting from ${maxDateStr}`);
    }

    if (action === "remove") {
      const deleteDates = [];
      for (let i = 0; i < days; i++) {
        const d = new Date(maxDate);
        d.setDate(d.getDate() - i);
        deleteDates.push(d.toISOString().split("T")[0]);
      }

      await supabase
        .from("availability")
        .delete()
        .in("date", deleteDates)
        .eq("location_id", locId);

      toast.success(`Removed ${days} days of availability from ${maxDateStr} backward`);
    }

    loadAvailability();
  };

  const handleWeekdayBatch = async (action) => {
    if (!selectedLocationId || selectedWeekday === "") return;

    const { data } = await supabase
      .from("availability")
      .select("date, time, id")
      .eq("location_id", selectedLocationId);

    const groupedByDate = {};
    (data || []).forEach(({ date, time, id }) => {
      const d = new Date(date);
      if (d.getDay().toString() === selectedWeekday) {
        if (!groupedByDate[date]) groupedByDate[date] = [];
        groupedByDate[date].push({ time, id });
      }
    });

    const datesWithOpenings = Object.keys(groupedByDate);

    if (action === "add") {
      const rows = [];
      datesWithOpenings.forEach(date => {
        const existingTimes = new Set(groupedByDate[date].map(e => e.time));
        selectedTimes.forEach(time => {
          if (!existingTimes.has(time)) {
            rows.push({ location_id: selectedLocationId, date, time });
          }
        });
      });
      if (rows.length > 0) {
        await supabase.from("availability").insert(rows);
      }
      toast.success(`Added ${rows.length} time slots on weekday.`);
    }

    if (action === "remove") {
      const idsToDelete = [];
      datesWithOpenings.forEach(date => {
        groupedByDate[date].forEach(({ time, id }) => {
          if (selectedTimes.includes(time)) {
            idsToDelete.push(id);
          }
        });
      });
      if (idsToDelete.length > 0) {
        await supabase.from("availability").delete().in("id", idsToDelete);
      }
      toast.success(`Removed ${idsToDelete.length} time slots on weekday.`);
    }

    loadAvailability();
  };

  const toggleTime = (time) => {
    setSelectedTimes(prev =>
      prev.includes(time)
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const handleSaveAvailability = async () => {
    if (!selectedLocationId || !selectedDate || selectedTimes.length === 0) {
      toast.warning("Please fill all fields");
      return;
    }

    setLoading(true);
    const rows = selectedTimes.map(t => ({
      location_id: selectedLocationId,
      date: selectedDate,
      time: t
    }));

    await supabase.from("availability").insert(rows);
    toast.success("Availability saved!");
    setSelectedTimes([]);
    setLoading(false);
    loadAvailability();
  };

  const handleDeleteTime = async (id) => {
    await supabase.from("availability").delete().eq("id", id);
    loadAvailability();
  };

  return (
    <>
      <AdminNavbar title="Scheduling Settings" />
    <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
      <div className="w-full sm:w-auto sticky top-16 h-[calc(100vh-64px)]">
        <AdminSidebar userName={firstName} />
      </div>

      <div className="p-4 sm:p-6 md:p-8 flex-1">
        <h2 className="text-2xl font-bold text-[#003366] mb-6">
          Admin Scheduling Settings
        </h2>
        
        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="font-semibold mb-2 text-[#1E3A8A]">Manage Locations</h3>
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
            {locations.map(loc => (
              <li key={loc.id} className="relative border p-2 rounded">
                <div className="flex justify-between items-center">
                  <span>{loc.name}</span>
                  <button
                    onClick={() => setDropdownOpenId(dropdownOpenId === loc.id ? null : loc.id)}
                    className="text-blue-600 underline"
                  >
                    Actions ▾
                  </button>
                </div>
                {dropdownOpenId === loc.id && (
                  <div className="absolute right-0 bg-white shadow-lg border rounded mt-2 w-64 z-10">
                    <button
                      onClick={() => handleDeleteLocation(loc.id)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      ❌ Delete Location
                    </button>
                    <button
                      onClick={() => handleBatchAvailability(loc.id, 7, "add")}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      ➕ Open +7 Days
                    </button>
                    <button
                      onClick={() => handleBatchAvailability(loc.id, 30, "add")}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      ➕ Open +30 Days
                    </button>
                    <button
                      onClick={() => handleBatchAvailability(loc.id, 7, "remove")}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      🚫 Close Last 7 Days
                    </button>
                    <button
                      onClick={() => handleBatchAvailability(loc.id, 30, "remove")}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      🚫 Close Last 30 Days
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3 text-[#1E3A8A]">Set Availability</h3>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block font-medium mb-1 text-[#003366]">Location</label>
              <select
                value={selectedLocationId}
                onChange={(e) => setSelectedLocationId(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">-- Select Location --</option>
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1 text-[#003366]">Weekday (for batch update)</label>
              <select
                value={selectedWeekday}
                onChange={(e) => setSelectedWeekday(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">-- Select Weekday --</option>
                <option value="0">Sunday</option>
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1 text-[#003366]">Select Time Slots</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {timeslots.map(t => (
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
            </div>

            <div className="flex flex-wrap gap-4 justify-center mt-2">
              <button
                onClick={() => handleWeekdayBatch("add")}
                disabled={!selectedWeekday || selectedTimes.length === 0 || !selectedLocationId}
                className="bg-green-700 text-white px-6 py-2 rounded"
              >
                ➕ Apply to Weekday
              </button>
              <button
                onClick={() => handleWeekdayBatch("remove")}
                disabled={!selectedWeekday || !selectedLocationId}
                className="bg-red-700 text-white px-6 py-2 rounded"
              >
                ❌ Remove from Weekday
              </button>
            </div>
          </div>

          <div className="border-t pt-4">
            <label className="block font-medium mb-1 text-[#003366]">Single Date (manual update)</label>
            <input
              id="date-picker"
              className="w-full p-2 mb-3 border rounded"
              placeholder="Select date"
              readOnly
            />

            {existingTimes.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-[#003366]">Existing Times:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {existingTimes.map(t => (
                    <div key={t.id} className="flex items-center justify-between border rounded px-2 py-1 bg-gray-50">
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

            <div className="text-center">
              <button
                onClick={handleSaveAvailability}
                className="bg-blue-700 text-white py-2 px-6 rounded"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Availability"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}