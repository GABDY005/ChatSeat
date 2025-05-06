import React, { useEffect, useState } from "react";
import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";
import supabase from "../../supabase";

// const dummyAppointments = [
//   {
//     id: 1,
//     listenerName: "Darshi",
//     time: "10:00 AM",
//     date: "April 15, 2024",
//     location: "Tea Tree Gully Library",
//   },
//   {
//     id: 2,
//     listenerName: "Mahek",
//     time: "11:30 AM",
//     date: "April 15, 2024",
//     location: "Rundle Library",
//   },
//   {
//     id: 3,
//     listenerName: "Kesha",
//     time: "2:00 PM",
//     date: "April 16, 2024",
//     location: "Campbelltown",
//   },
// ];

export default function CoordinatorAppointments() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [appointments, setAppointments] = useState([]);

  //it will toggle the dropdown button when it is clicked
  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select("id, location, date, time, user_id");

      if (error) {
        console.error("Error fetching appointments:", error);
        return;
      }

      const enriched = await Promise.all(
        bookings.map(async (b) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("first_name")
            .eq("id", b.user_id)
            .single();

          return {
            id: b.id,
            listenerName: profile?.first_name || "Unknown",
            time: b.time,
            date: b.date,
            location: b.location,
          };
        })
      );
      setAppointments(enriched);
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (!error) {
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    }
  };
  return (
    <>
      <CoordinatorNavbar title="Booked Slots" />

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar userName="" />
        </div>

        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">
            Confirmed Listener Bookings
          </h2>

          <div className="grid gap-0.5 grid-cols-2 sm:grid-cols-2 md:grid-cols-5">
            {appointments.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="relative bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition w-[220px]" 
                >
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => toggleDropdown(appointment.id)}
                      className="text-gray-600 hover:text-black text-xl"
                    >
                      ⋮
                    </button>

                    {openDropdown === appointment.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
                        <button
                          onClick={() => handleDelete(appointment.id)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
    <h3 className="text-xl font-bold text-[#003366] flex items-center gap-2">
       {appointment.listenerName}
    </h3>
  </div>

  <div className="text-sm space-y-1 text-gray-700">
    <p className="flex items-center gap-2">
      <span className="font-medium">Time:</span> {appointment.time}
    </p>
    <p className="flex items-center gap-2">
       <span className="font-medium">Date:</span> {appointment.date}
    </p>
    <p className="flex items-center gap-2">
       <span className="font-medium">Location:</span> {appointment.location}
    </p>
  </div>
</div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
