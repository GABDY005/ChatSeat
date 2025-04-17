import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const handleLogoClick = () => {
    window.location.reload(); 
  };

  return (
    <>
     
      <nav className="flex items-center justify-between bg-[#003366] px-8 py-5 shadow-lg">
     
        <div onClick={handleLogoClick} className="flex items-center space-x-2 cursor-pointer ">
          <img
            src=""  
            alt="ChatSeat Logo"
            className="w-12 h-12 object-cover rounded-full border-2 border-white shadow-md"
          />
          
        </div>

        <h1 className="text-white font-extrabold text-2xl sm:text-3xl tracking-wide uppercase"></h1>
       
        
          <Link
            to="/Login"
            className="bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200"
          >
            Login
          </Link>
       
      </nav>

      
      <div className="container mx-auto text-center mt-12 px-4">
        <h1 className="text-4xl font-bold text-[#003366]">Have A Chat Seat</h1>
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
