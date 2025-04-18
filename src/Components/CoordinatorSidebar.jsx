import React from "react";
import { Link, useLocation } from "react-router-dom";

function CoordinatorSidebar({ userName = "Coordinator" }) {
  const location = useLocation();

  const getLinkStyle = (path) =>
    location.pathname === path
      ? "bg-[#003366] text-white font-semibold"
      : "bg-white text-[#1E3A8A] hover:bg-[#d9eefe]";

  return (
    <>
    <div className="w-64 bg-[#A8E4F2] min-h-screen flex flex-col px-4 py-4">
      
      <div className="text-[#1E3A8A] font-bold text-xl mb-12 mt-1 text-center">Hello, {userName} </div>

     
      <div className="flex flex-col space-y-3 mb-auto">
        <Link to="/CoordinatorDashboard" className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/CoordinatorDashboard')}`}>
          Dashboard
        </Link>
        <Link to="/CoordinatorAppointments" className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/CoordinatorAppointments')}`}>
          Appointments
        </Link>
        <Link to="/CoordinatorAvailability" className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/CoordinatorAvailability')}`}>
          Availability
        </Link>
        <Link to="/LessonCoordinator" className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/LessonCoordinator')}`}>
          Resources
        </Link>
        <Link to="/CoordinatorChatroom" className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/CoordinatorChatroom')}`}>
          Let's Talk
        </Link>
        <Link to="/Logos" className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/Logos')}`}>
          Banners and Logo
        </Link>
        <Link to="/CoordinatorFeedback" className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/CoordinatorFeedback')}`}>
          Feedback
        </Link>
        <Link to="/CoordinatorHelp" className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle('/CoordinatorHelp')}`}>
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

export default CoordinatorSidebar;
