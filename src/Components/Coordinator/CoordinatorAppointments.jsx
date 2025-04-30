import React, { useState } from "react";
import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";

const dummyAppointments = [
  {
    id: 1,
    listenerName: "Darshi",
    time: "10:00 AM",
    date: "April 15, 2024",
    location: "Tea Tree Gully Library",
  },
  {
    id: 2,
    listenerName: "Mahek",
    time: "11:30 AM",
    date: "April 15, 2024",
    location: "Rundle Library",
  },
  {
    id: 3,
    listenerName: "Kesha",
    time: "2:00 PM",
    date: "April 16, 2024",
    location: "Campbelltown",
  },
];

export default function CoordinatorAppointments() {
  const [openDropdown, setOpenDropdown] = useState(null);

  //it will toggle the dropdown button when it is clicked
  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
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

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {dummyAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="relative bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500"
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
                      {/* <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        View
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                        Edit
                      </button> */}
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500">
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-[#1E3A8A] mb-1">
                  {appointment.listenerName}
                </h3>
                <p className="text-gray-700 mb-1">🕒 {appointment.time}</p>
                <p className="text-gray-700 mb-1">📅 {appointment.date}</p>
                <p className="text-gray-700">📍 {appointment.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
