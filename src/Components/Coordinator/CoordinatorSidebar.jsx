import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function CoordinatorSidebar({ userName = "Coordinator" }) {
  const location = useLocation();
  
  //it is used to get the current path of the page and also to highlight the option on the sidebar
  const getLinkStyle = (path) =>
    location.pathname === path
      ? "bg-[#003366] text-white font-semibold"
      : "bg-white text-[#1E3A8A] hover:bg-[#d9eefe]";

  return (
    <div className="w-64 bg-[#A8E4F2] h-[calc(100vh-64px)] sticky top-16 flex flex-col px-4 py-6 overflow-y-auto">
      <div className="text-[#1E3A8A] font-bold text-xl mb-12 text-center">
        Hello, {userName}
      </div>

      <div className="flex flex-col space-y-3 mb-auto">
        <Link
          to="/CoordinatorDashboard"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/CoordinatorDashboard"
          )}`}
        >
          Dashboard
        </Link>
        <Link
          to="/CoordinatorAppointments"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/CoordinatorAppointments"
          )}`}
        >
          Appointments
        </Link>
        <Link
          to="/CoordinatorAvailability"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/CoordinatorAvailability"
          )}`}
        >
          Availability
        </Link>
        <Link
          to="/LessonCoordinator"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/LessonCoordinator"
          )}`}
        >
          Resources
        </Link>
        <Link
          to="/CoordinatorChatroom"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/CoordinatorChatroom"
          )}`}
        >
          Coordinator Chat room
        </Link>
        <Link
          to="/CoordinatorListenerChatroom"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/CoordinatorListenerChatroom"
          )}`}
        >
          Listener Chat room
        </Link>
        <Link
          to="/Logos"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/Logos"
          )}`}
        >
          Banners and Logo
        </Link>
        <Link
          to="/CoordinatorFeedback"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/CoordinatorFeedback"
          )}`}
        >
          Feedback
        </Link>
        <Link
          to="/CoordinatorHelp"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/CoordinatorHelp"
          )}`}
        >
          Help
        </Link>
      </div>

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
