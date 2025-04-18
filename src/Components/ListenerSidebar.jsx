import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ListenerSidebar({ userName = "Guest" }) {
  const location = useLocation();

  const getLinkStyle = (path) =>
    location.pathname === path
      ? "bg-[#003366] text-white font-semibold"
      : "bg-white text-[#1E3A8A] hover:bg-[#d9eefe]";

  return (
    <div className="w-64 bg-[#A8E4F2] min-h-screen flex flex-col px-4 py-4">
      {/* Greeting */}
      <div className="text-[#1E3A8A] font-bold text-xl mb-12 mt-1 text-center">
        Hello, {userName}
      </div>

      {/* Navigation */}
      <div className="flex flex-col space-y-3 mb-auto">
        <Link
          to="/CoordinatorsListInListener"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/CoordinatorsListInListener')}`}
        >
          Coordinators
        </Link>
        <Link
          to="/ListenerScheduling"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/ListenerScheduling')}`}
        >
          Scheduling
        </Link>
        <Link
          to="/ListenerResources"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/ListenerResources')}`}
        >
          Resources
        </Link>
        <Link
          to="/ListenerChatroom"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/ListenerChatroom')}`}
        >
          Let's Talk
        </Link>
        <Link
          to="/About"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/About')}`}
        >
          About Us
        </Link>
        <Link
          to="/ListenerFeedback"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/ListenerFeedback')}`}
        >
          Feedback
        </Link>
        <Link
          to="/ListenerHelp"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/ListenerHelp')}`}
        >
          Help
        </Link>
      </div>

      {/* Logout */}
      <div className="mt-4">
        <Link
          to="/"
          className="block bg-white text-[#1E3A8A] font-medium px-4 py-2 rounded-full text-center hover:bg-[#d9eefe] transition"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}
