import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar({ userName = "" }) {
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
          to="/AdminDashboard"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/AdminDashboard"
          )}`}
        >
          Dashboard
        </Link>
        <Link
          to="/AdminUserList"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/AdminUserList"
          )}`}
        >
          Manage Users
        </Link>
        <Link
          to="/AdminCoordinatorChatroom"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/AdminCoordinatorChatroom"
          )}`}
        >
          Coordinator Chat Room
        </Link>
        <Link
          to="/AdminListenerChatroom"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/AdminListenerChatroom"
          )}`}
        >
          Listener Chat room
        </Link>
        <Link
          to="/AdminSchedulingSetting"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/AdminSchedulingSetting"
          )}`}
        >
          Admin Scheduling Setting
        </Link>
        <Link
          to="/AdminResources"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/AdminResources"
          )}`}
        >
          Resources
        </Link>
        <Link
          to="/AdminHelp"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/AdminHelp"
          )}`}
        >
          Help
        </Link>
        <Link
          to="/AdminFeedback"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/AdminFeedback"
          )}`}
        >
          Feedback
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
