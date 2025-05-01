import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.jpg";
import Banner_1 from "../assets/Banner_1.jpg";

export default function Home() {

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

      <div className="max-w-5xl mx-auto mt-12 px-6 py-8 bg-white rounded-2xl shadow-md text-gray-800 text-lg leading-relaxed">
        <h2 className="text-3xl font-bold text-[#1E3A8A] mb-6 text-center">
          Welcome to “Chat Seats”
        </h2>

        <p className="mb-4">
          In a bid to tackle social isolation, we would like to establish a series of Chat Seats across Australia. The <strong>Chat Seats</strong> initiative aims to provide a safe and inviting place for people to talk. It will allow members of the community to <strong>“Connect through Conversation.”</strong> For this initiative to be successful, we need people like yourselves to volunteer to be either Listeners and/or Coordinators.
        </p>

        <p className="mb-4">
          This website is also open to individuals who may have stopped to chat on one of our Chat Seats. If you are looking for when a particular Listener is scheduled to visit your Chat Seat, please sign in and go to the Calendar and find your venue and Listener.
        </p>

        <h3 className="text-xl mt-6 mb-2"><strong>What do we mean by being a Listener or Coordinator?</strong></h3>

        <p className="mb-4">
          Listeners are individuals who volunteer their time to sit on a Chat Seat and listen to members of the community who may join them. Some of these members of the community may also be lonely and/or isolated. We are hoping to connect them back into their community through conversation.
        </p>

        <p className="mb-4">
          So, who would be a great volunteer? Someone who enjoys listening to other people and is interested in what is happening for them. Also, someone who has a couple of hours each week where they would like to sit at one of our Chat Seat locations. Does this sound like you?
        </p>

        <p className="mb-4">
          If you would like to volunteer as a Listener, then you will need to sign in and proceed to the page for Listeners. On this page you will find some helpful information, a booking calendar and a place where you can chat with other Listeners.
        </p>

        <p className="mb-4">
          Coordinators are individuals who are also volunteers and may also choose to be Listeners. They will help to establish a site and support the Listeners. So, who would be a good Coordinator? Someone who enjoys negotiating with potential venue “managers” and has good organisational skills.
        </p>

        <p className="mb-4">
          If you would like to volunteer as a Coordinator, then you will need to sign in and proceed to the page for Coordinators. On this page you will find some helpful information, and a place where you can chat with other Coordinators.
        </p>

        <p className="text-xl mt-6 mb-2">
          <strong>Does this sound like something that you would be interested in doing?</strong>
        </p>

        <p className="mb-4">
          If you would like to volunteer as a Coordinator, then you will need to sign in and proceed to the page for Coordinators. On this page you will find information about “Lessons learned” which describes some of the lessons we and others have learned when they established Chat Seats. There are also files of the graphics that have been used previously: banner, logo, name tags.
        </p>

        <p className="text-xl mt-6 mb-2">
          <strong>How do you identify a Chat Seat?</strong> 
          
        </p>
        <p className="mb-4">
        It will have a banner like the one below, at one of our Chat Seats locations.
        </p>
      
        <div className="my-10 text-center">
          <img
            src={Banner_1}
            alt="Chat Seat Banner"
            className="mx-auto rounded-xl shadow-lg max-w-full"
          />
        </div>

        <p className="mb-2">
          We hope you have the passion and the time to be part of this initiative.
        </p>

        <p className="mb-2">Thank you for taking the time to visit our website. We welcome any suggestions.</p>

        <p className="font-semibold mt-6">Warm regards,</p>
        <p className="font-bold">Tricia and Noel</p>
      </div>
    </>
  );
}
