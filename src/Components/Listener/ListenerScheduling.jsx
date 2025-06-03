import { useCallback, useEffect, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import supabase from "../../supabase";
import ListenerSidebar from "./ListenerSidebar";
import ListenerNavbar from "./ListenerNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import ListenerFeedbackWidget from "./ListenerFeedback";
import { useSelector } from "react-redux";

export default function ListenerScheduling() {
  // State variables for managing locations, booking details, and calendar events
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [calendarLocation, setCalendarLocation] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [userBookings, setUserBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [editBookingId, setEditBookingId] = useState(null);
  const [editValues, setEditValues] = useState({
    date: "",
    time: "",
    location: "",
  });
  const [editAvailableTimes, setEditAvailableTimes] = useState([]);
  const user = useSelector((state) => state.loggedInUser.success);

  // Fetch locations from the database when the component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      const { data, error } = await supabase.from("locations").select("*");
      if (error) {
        console.error("Error fetching locations:", error);
        return;
      }
      setLocations(data);
    };
    fetchLocations();
  }, []);

  
// Fetch user bookings when the component mounts or user changes
  useEffect(() => {
    flatpickr("#date-picker", {
      dateFormat: "Y-m-d",
      minDate: "today",
      onChange: (_, dateStr) => setDate(dateStr),
    });
  }, [activeTab]);

  // Fetch user bookings when the component mounts or user changes
  useEffect(() => {
    if (editBookingId !== null) {
      flatpickr("#edit-date-picker", {
        dateFormat: "Y-m-d",
        defaultDate: editValues.date,
        onChange: (_, dateStr) =>
          setEditValues((prev) => ({ ...prev, date: dateStr })),
      });
    }
  }, [editBookingId]);

  // Fetch locations from the database when the component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await supabase.from("locations").select("*");
      setLocations(data || []);
    };
    fetchLocations();
  }, []);

  
// Fetch user bookings when the component mounts or user changes
  const fetchUserBookings = async (uid) => {
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", uid);
    if (data) setUserBookings(data);
  };

  // Fetch user bookings when the component mounts or user changes
  const loadAvailableTimes = useCallback(async () => {
    if (!location || !date) return;

    const loc = locations.find((l) => l.name === location);
    if (!loc) return;

    // Fetch all available times for the selected location and date
    const { data: allAvailable } = await supabase
      .from("availability")
      .select("*")
      .eq("location_id", loc.id)
      .eq("date", date);

    const { data: allBooked } = await supabase
      .from("bookings")
      .select("*")
      .eq("location", location)
      .eq("date", date);

    const countMap = {};
    allBooked?.forEach((b) => {
      countMap[b.time] = (countMap[b.time] || 0) + 1;
    });

    // Filter available times based on booking count (max 2 per time slot)
    const filtered = allAvailable
      ?.map((a) => a.time)
      .filter((t) => !countMap[t] || countMap[t] < 2);

    setAvailableTimes(filtered || []);
  }, [location, date, locations]);

  // Load available times when location or date changes
  useEffect(() => {
    if (location && date) loadAvailableTimes();
  }, [location, date, loadAvailableTimes]);

  // Fetch user bookings when the component mounts or user changes
  useEffect(() => {
    const fetchEditTimes = async () => {
      if (!editValues.location || !editValues.date) return;

      const loc = locations.find((l) => l.name === editValues.location);
      if (!loc) return;

      // Fetch all available times for the selected location and date
      const { data: allAvailable } = await supabase
        .from("availability")
        .select("*")
        .eq("location_id", loc.id)
        .eq("date", editValues.date);

      // Fetch all booked times for the selected location and date
      const { data: allBooked } = await supabase
        .from("bookings")
        .select("*")
        .eq("location", editValues.location)
        .eq("date", editValues.date);

      const countMap = {};
      allBooked?.forEach((b) => {
        countMap[b.time] = (countMap[b.time] || 0) + 1;
      });

      // Filter available times based on booking count (max 2 per time slot)
      const filtered = allAvailable
        ?.map((a) => a.time)
        .filter((t) => !countMap[t] || countMap[t] < 2);

      setEditAvailableTimes(filtered || []);
    };

    // Fetch user bookings when the component mounts or user changes
    fetchEditTimes();
  }, [editValues.date, editValues.location, locations]);

  // Function to book a slot
  const bookSlot = async () => {
    if (!location || !date || !time) {
      alert("Please complete all fields.");
      return;
    }

    // Check if the user has already booked a slot for this location, date, and time
    const { data: existing } = await supabase
      .from("bookings")
      .select("*")
      .eq("location", location)
      .eq("date", date)
      .eq("time", time);

    if (existing.length >= 2) return alert("Slot full");

    await supabase
      .from("bookings")
      .insert([{ location, date, time, user_id: user.id }]);

    setConfirmation(`Booked at ${location} on ${date} at ${time}.`);
    setTime("");
    fetchUserBookings(user.id);
    loadAvailableTimes();
  };

  // Function to fetch calendar events for the selected location
  const fetchCalendarEvents = async (locName) => {
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("date, time, user_id")
      .eq("location", locName);

    if (error) {
      console.error("Error fetching bookings:", error);
      return;
    }

    // Group bookings by date and time
    const grouped = {};

    for (const booking of bookings || []) {
      const key = `${booking.date}T${booking.time}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(booking.user_id);
    }

    // Enrich events with user names
    const enrichedEvents = await Promise.all(
      Object.entries(grouped).map(async ([start, userIds]) => {
        const names = await Promise.all(
          userIds.map(async (id) => {
            const { data: profile } = await supabase
              .from("profiles")
              .select("first_name")
              .eq("id", id)
              .single();
            return profile?.first_name || "Unknown";
          })
        );

        return {
          title: names.join(", "),
          start,
          allDay: false,
        };
      })
    );

    setCalendarEvents(enrichedEvents);
  };

  // Fetch calendar events when the component mounts or calendarLocation changes
  useEffect(() => {
    if (calendarLocation) fetchCalendarEvents(calendarLocation);
  }, [calendarLocation]);

  // Fetch user bookings when the component mounts or user changes
  const handleUpdateBooking = async (id) => {
    const { error } = await supabase
      .from("bookings")
      .update(editValues)
      .eq("id", id);
    if (!error) {
      fetchUserBookings(user.id);

      if (calendarLocation) {
        fetchCalendarEvents(calendarLocation);
      }
      setEditBookingId(null);
    }
  };

  // Function to handle booking cancellation
  const handleCancel = async (id) => {
    await supabase.from("bookings").delete().eq("id", id);
    fetchUserBookings(user.id);
    loadAvailableTimes();
  };

  return (
    <>
      {user.role === "admin" ? (
        <AdminNavbar title="Listener Dashboard" />
      ) : (
        <ListenerNavbar title="Book Your Slot" />
      )}

      <div className="flex flex-col lg:flex-row min-h-screen bg-[#e6f4f9] pt-16">
        <div className="sticky top-16 h-[calc(100vh-64px)] z-10">
          <ListenerSidebar />
        </div>
        <div className="flex-1 p-4 sm:p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            {["Upcoming", "Book", "Calendar"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-semibold ${
                  activeTab === tab
                    ? "bg-[#003366] text-white"
                    : "bg-white text-[#1E3A8A] hover:bg-[#d9eefe]"
                }`}
              >
                {tab === "Book"
                  ? "📍 Book a Slot"
                  : tab === "Calendar"
                  ? "🗓️ Calendar View"
                  : "📆 Upcoming Bookings"}
              </button>
            ))}
          </div>

          {activeTab === "Book" && (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
              <div className="bg-white w-full max-w-xl p-6 sm:p-8 rounded-xl shadow-lg">
                <label className="block font-semibold mb-1">
                  Select Place:
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full mb-3 p-2 rounded border"
                >
                  <option value="">-- Select Location --</option>
                  {locations.map((l) => (
                    <option key={l.id} value={l.name}>
                      {l.name.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>

                <label className="block font-semibold mb-1">Select Date:</label>
                <input
                  type="text"
                  id="date-picker"
                  className="w-full mb-3 p-2 rounded border"
                  readOnly
                />

                <label className="block font-semibold mb-1">Select Time:</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full mb-3 p-2 rounded border"
                >
                  <option value="">-- Choose Time --</option>
                  {availableTimes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                <button
                  onClick={bookSlot}
                  className="w-full bg-[#003366] text-white py-2 rounded"
                >
                  Book Slot
                </button>

                {confirmation && (
                  <div className="bg-blue-100 mt-3 p-3 rounded">
                    {confirmation}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "Calendar" && (
            <div className="bg-white p-4 sm:p-6 rounded shadow w-full overflow-auto">
              <select
                value={calendarLocation}
                onChange={(e) => setCalendarLocation(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
              >
                <option value="">-- Select Location --</option>
                {locations.map((l) => (
                  <option key={l.id} value={l.name}>
                    {l.name.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
              <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                height={500}
                events={calendarEvents}
              />
            </div>
          )}

          {activeTab === "Upcoming" && (
            <div className="bg-white p-4 sm:p-6 rounded shadow w-full">
              <h3 className="text-xl font-bold mb-3">Your Upcoming Bookings</h3>
              {userBookings.length === 0 ? (
                <p>No bookings yet.</p>
              ) : (
                <ul className="space-y-4">
                  {userBookings.map((b) => (
                    <li key={b.id} className="border p-4 rounded shadow">
                      {editBookingId === b.id ? (
                        <>
                          <input
                            type="text"
                            id="edit-date-picker"
                            value={editValues.date}
                            readOnly
                            className="w-full mb-2 p-2 border rounded bg-white"
                          />
                          <select
                            value={editValues.time}
                            onChange={(e) =>
                              setEditValues((prev) => ({
                                ...prev,
                                time: e.target.value,
                              }))
                            }
                            className="w-full mb-2 p-2 border rounded"
                          >
                            <option value="">-- Choose Time --</option>
                            {editAvailableTimes.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                          <select
                            value={editValues.location}
                            onChange={(e) =>
                              setEditValues((prev) => ({
                                ...prev,
                                location: e.target.value,
                              }))
                            }
                            className="w-full mb-2 p-2 border rounded"
                          >
                            {locations.map((l) => (
                              <option key={l.id} value={l.name}>
                                {l.name.replace(/_/g, " ")}
                              </option>
                            ))}
                          </select>
                          <div className="flex gap-2">
                            <button
                              className="bg-green-600 text-white px-3 py-1 rounded"
                              onClick={() => handleUpdateBooking(b.id)}
                            >
                              Save
                            </button>
                            <button
                              className="bg-gray-400 text-white px-3 py-1 rounded"
                              onClick={() => setEditBookingId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between items-center">
                          <span>
                            {b.date} at {b.time} in {b.location}
                          </span>
                          <div className="space-x-2">
                            <button
                              onClick={() => {
                                setEditBookingId(b.id);
                                setEditValues({
                                  date: b.date,
                                  time: b.time,
                                  location: b.location,
                                });
                              }}
                              className="text-blue-600 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleCancel(b.id)}
                              className="text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
      <ListenerFeedbackWidget />
    </>
  );
}
