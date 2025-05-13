import React from "react";
import { Link } from "react-router-dom";
import { fetchAllBookings } from "../Controller/BookingController"; 
import { useEffect, useState } from "react"; 

export default function BookedListener() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const data = await fetchAllBookings();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    getBookings();
  }, []);
  // const listeners = [
  //   { id: 1, location: "Tea Tree Plaza", date: "15/04/2025", time: "10:00 AM" },
  //   {
  //     id: 2,
  //     location: "Campbelltow Library",
  //     date: "10/05/2025",
  //     time: "11:00 AM",
  //   },
  //   { id: 3, location: "Rundle Mall", date: "20/04/2025", time: "13:00 PM" },
  //   {
  //     id: 4,
  //     location: "Prospect Library",
  //     date: "25/04/2025",
  //     time: "15:00 PM",
  //   },
  //   { id: 5, location: "Tea Tree Plaza", date: "30/04/2025", time: "14:00 AM" },
  // ];
  return (
    <>
      <div className="min-h-sceen bg-white">
        <nav className="sticky top-0 z-50 flex flex-col sm:flex-row items-center justify-between bg-[#003366] sm:px-8 py-4 sm:py-5 shadow-lg w-full">
          <div>
            <Link
              to="/"
              className="text-white font-semibold text-lg hover:underline"
            >
              Home
            </Link>
          </div>

          <h1 className="text-white font-bold text-xl sm:text-2xl tracking-wide text-center">
            Who's at the Seat?
          </h1>
          <div className="w-20" />
        </nav>

        <div className="px-4 sm:px-6 py-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {bookings.length > 0 ? (
            bookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-xl shadow-md p-4 sm:p-5 border-t-4 border-blue-500 hover:shadow-xl transition-all duration-300"
              >
                <p className="text-gray-700 text-sm mb-1">
                  <em>📍{b.location}</em>
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <strong> 📆{b.date}</strong>
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <strong>🕐{b.time}</strong>
                </p>
              </div>
            ))
            ) : (
              <p className="text-gray-500 text-lg">No bookings found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
