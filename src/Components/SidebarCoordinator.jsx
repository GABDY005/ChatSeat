import React from "react";
import { Link, useLocation } from "react-router-dom";

function SidebarCoordinator({ userName = "Coordinator" }) {
  const location = useLocation();

  const getLinkStyle = (path) =>
    location.pathname === path
      ? "bg-[#003366] text-white font-semibold"
      : "bg-white text-[#1E3A8A] hover:bg-[#d9eefe]";

  return (
    <>
    <div className="w-64 bg-[#A8E4F2] min-h-screen flex flex-col px-4 py-4">
      {/* User Greeting */}
      <div className="text-[#1E3A8A] font-bold text-xl mb-12 mt-1 text-center">Hello, {userName} </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-3 mb-auto">
        <Link to="/CoordinatorDashboard" className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/CoordinatorDashboard')}`}>
          Dashboard
        </Link>
        <Link to="/Appointments" className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/Appointments')}`}>
          Appointments
        </Link>
        <Link to="/AvailabilityCoordinator" className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/AvailabilityCoordinator')}`}>
          Availability
        </Link>
        <Link to="/LessonCoordinator" className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/LessonCoordinator')}`}>
          Resources
        </Link>
        <Link to="/ChatroomCoordinator" className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/ChatroomCoordinator')}`}>
          Let's Talk
        </Link>
        <Link to="/Logos" className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/Logos')}`}>
          Banners and Logo
        </Link>
        <Link to="/FeedbackCoordinator" className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/FeedbackCoordinator')}`}>
          Feedback
        </Link>
        <Link to="/HelpCoordinator" className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/HelpCoordinator')}`}>
          Help
        </Link>
      </div>

      {/* Logout */}
      <div className="mt-4">
        <Link to="/" className="block bg-white text-[#1E3A8A] font-medium px-4 py-2 rounded-full text-center hover:bg-[#d9eefe] transition">
          Logout
        </Link>
      </div>
    </div>
    </>
  );
}

export default SidebarCoordinator;
