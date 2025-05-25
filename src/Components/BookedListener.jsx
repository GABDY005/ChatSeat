import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllBookings , deletePastBookings  } from "../Controller/BookingController"; 
import { useEffect, useState } from "react"; 
import logo from "../assets/Logo.jpg";


export default function BookedListener() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
  const getBookings = async () => {
    try {
      await deletePastBookings(); 
      const data = await fetchAllBookings();

      console.log("Fetched bookings:", data);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const filteredBookings = data.filter((b) => {
        const bookingDate = new Date(b.date);
        bookingDate.setHours(0, 0, 0, 0);
        const isFuture = bookingDate >= today;
        console.log("Checking:", bookingDate, "Is future:", isFuture);
        return isFuture;
      });

      console.log("Filtered bookings:", filteredBookings);
      setBookings(filteredBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  getBookings();
}, []);
  const handleLogoClick = () => {
    navigate("/");
  };
  
  return (
    <>
      <div className="min-h-sceen bg-white">
        <nav className="sticky top-0 z-50 bg-[#003366] shadow-lg w-full">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5">
          <div
            onClick={handleLogoClick}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img
              src={logo}
              alt="ChatSeat Logo"
              className="w-12 h-12 object-cover border-2 border-white shadow-md"
            />
          </div>

          <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <h1 className="text-white font-extrabold text-xl md:text-3xl tracking-wide text-center">
              Who's at the Seat?
            </h1>
          </div>

         
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/BookedListener"
              className="bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200"
            >
              Who's at the Seat?
            </Link>
            <Link
              to="/Login"
              className="bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200"
            >
              Login
            </Link>
          </div>

         
          <div className="md:hidden">
            {isMenuOpen ? (
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-xl hover:text-gray-300"
              >
                ✕
              </button>
            ) : (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <div className="w-5 h-0.5 bg-white mb-1"></div>
                  <div className="w-5 h-0.5 bg-white mb-1"></div>
                  <div className="w-5 h-0.5 bg-white"></div>
                </div>
              </button>
            )}
          </div>
        </div>

        
        {isMenuOpen && (
          <div className="md:hidden bg-[#003366] border-t border-white/20">
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/BookedListener"
                className="block bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Who's at the Seat?
              </Link>
              <Link
                to="/Login"
                className="block bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
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
