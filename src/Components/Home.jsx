import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>

        <nav className="flex items-center justify-between bg-[#A8E4F2] px-4 py-4">
          <div className="flex justify-center">
            <div className="w-[60px] h-[60px] border-[3px] border-orange-500 rounded-full text-orange-500 font-bold text-center leading-[54px] text-[1.2rem]">
              logo
            </div>
          </div>

          <div className="flex space-x-2">
            <Link to="/AvailableListener"
              className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
            >
              Schedule
            </Link>
            <Link to="/Help"
              className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
            >
              Help
            </Link>
            <Link to="/About"
              className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
            >
              About Us
            </Link>
            <Link to="/Login"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </Link>
          </div>
        </nav>


        <div className="container mx-auto text-center mt-12 px-4">
          <h1 className="text-4xl font-bold">Have A Chat Seat</h1>
          <p className="text-lg font-semibold mt-6">
            The purpose behind setting up chat seat is to connect members of the
            community through conversation.
          </p>
          <p className="text-base font-semibold mt-4">
            You may find a chat seat in a library or shopping centre. You will
            recognise them by a banner such as one shown.
          </p>
        </div>
     
    </>
  );
}
