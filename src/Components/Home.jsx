import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.jpg";

export default function Home() {

  //it is the function to reload the page when someone clicks on logo
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-[#003366] px-8 py-5 shadow-lg">
       
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

        
        <h1 className="text-white font-extrabold text-2xl sm:text-3xl tracking-wide">
          Have a Chat Seat
        </h1>

       
        <div className="flex items-center space-x-4">
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
      </nav>

   
      <div className="container mx-auto text-center mt-12 px-4">
        <p className="text-lg text-gray-700 font-medium mt-6">
          The purpose behind setting up Chat Seats is to connect members of the
          community through meaningful conversations.
        </p>
        <p className="text-base text-gray-600 font-medium mt-4">
          You may find a Chat Seat in a library or shopping centre. You will
          recognize them by a banner such as one shown.
        </p>
      </div>
    </>
  );
}
