import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar({ userName = "Admin" }) {
  const location = useLocation();

  const getLinkStyle = (path) =>
    location.pathname === path
      ? "bg-[#003366] text-white font-semibold"
      : "bg-white text-[#1E3A8A] hover:bg-[#d9eefe]";

  return (
    <div className="w-64 bg-[#A8E4F2] min-h-screen flex flex-col justify-between px-4 py-6">
      
     
      <div className="mb-6 text-[#1E3A8A] font-bold text-lg">
        Hello, {userName}
      </div>

     
      <div className="flex-1 flex flex-col space-y-3">
        <Link to="/AdminDashboard" className={`px-4 py-2 rounded-full text-center shadow ${getLinkStyle("/AdminDashboard")}`}>
          Dashboard
        </Link>
        <Link to="/AdminUserList" className={`px-4 py-2 rounded-full text-center shadow ${getLinkStyle("/AdminUserList")}`}>
          Manage Users
        </Link>
        <Link to="/AdminResources" className={`px-4 py-2 rounded-full text-center shadow ${getLinkStyle("/AdminResources")}`}>
          Resources
        </Link>
        <Link to="/AdminHelp" className={`px-4 py-2 rounded-full text-center shadow ${getLinkStyle("/AdminHelp")}`}>
          Help
        </Link>
        <Link to="/AdminFeedback" className={`px-4 py-2 rounded-full text-center shadow ${getLinkStyle("/AdminFeedback")}`}>
          Feedback
        </Link>
      </div>

      
      <div className="pt-6">
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
