import React from "react";
import { Link } from "react-router-dom";

export default function BookedListener() {
  const listeners = [
    { id: 1, location: "Tea Tree Plaza", date: "15/04/2025", time: "10:00 AM" },
    {
      id: 2,
      location: "Campbelltow Library",
      date: "10/05/2025",
      time: "11:00 AM",
    },
    { id: 3, location: "Rundle Mall", date: "20/04/2025", time: "13:00 PM" },
    {
      id: 4,
      location: "Prospect Library",
      date: "25/04/2025",
      time: "15:00 PM",
    },
    { id: 5, location: "Tea Tree Plaza", date: "30/04/2025", time: "14:00 AM" },
  ];
  return (
    <>
      <div className="min-h-sceen bg-[#f4f8fb]">
        <nav className="flex items-center justify-between bg-[#1E3A8A] px-6 py-4 shadow-md">
          <div>
            <Link
              to="/"
              className="text-white font-semibold text-lg hover:underline"
            >
              Home
            </Link>
          </div>

          <h1 className="text-white font-bold text-2xl tracking-wide text-center">
            Who's at the Seat?
          </h1>
          <div className="w-20" />
        </nav>

        <div className="px-6 py-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {listeners.map((listener) => (
              <div
                key={listener.id}
                className="bg-white rounded-xl shadow-md p-5 border-t-4 border-blue-500 hover:shadow-xl transition-all duration-300"
              >
                <p className="text-gray-700 text-sm mb-1">
                  <em>📍{listener.location}</em>
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <strong> 📆{listener.date}</strong>
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <strong>🕐{listener.time}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
