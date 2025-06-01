// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
import {
  fetchAllBookings,
  deletePastBookings,
} from "../Controller/BookingController";
import { useEffect, useState } from "react";
// import logo from "../assets/Logo.jpg";
import Navbar from "./Navbar";

export default function BookedListener() {
  const [bookings, setBookings] = useState([]);
  // const navigate = useNavigate();
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  // const handleLogoClick = () => {
  //   navigate("/");
  // };

  return (
    <>
      <div className="min-h-sceen bg-white">
        <Navbar />
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
