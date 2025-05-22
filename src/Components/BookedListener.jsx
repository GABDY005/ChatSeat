import React from "react";
import { Link } from "react-router-dom";
import { fetchAllBookings , deletePastBookings  } from "../Controller/BookingController"; 
import { useEffect, useState } from "react"; 
import logo from "../assets/Logo.jpg";


export default function BookedListener() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
  const getBookings = async () => {
    try {
      await deletePastBookings(); 
      const data = await fetchAllBookings();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const filteredBookings = data.filter((b) => {
        const bookingDate = new Date(b.date);
        bookingDate.setHours(0, 0, 0, 0);
        return bookingDate >= today;
      });

      setBookings(filteredBookings);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  getBookings();
}, []);
  const handleLogoClick = () => {
    window.location.reload();
  };
  
  return (
    <>
      <div className="min-h-sceen bg-white">
        <nav className="sticky top-0 z-50 flex flex-col sm:flex-row items-center justify-between bg-[#003366] sm:px-8 py-4 sm:py-5 shadow-lg w-full">
        <div
          onClick={handleLogoClick}
          className="flex items-center space-x-2 cursor-pointer mb-2 sm:mb-0"
        >
          <img
            src={logo}
            alt="ChatSeat Logo"
            className="w-12 h-12 object-cover border-2 border-white shadow-md"
          />
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl tracking-wide text-center sm:text-left">
            Who's at the Seat?
          </h1>
        </div>

       
          <Link
            to="/"
            className="bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200"
          >
            Back to Home
          </Link>
       
      </nav> 
</div>

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
      
    </>
  );
}
