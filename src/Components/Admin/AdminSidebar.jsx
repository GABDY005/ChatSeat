import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import supabase from "../../supabase";

export default function AdminSidebar({ userName = "" }) {
  const location = useLocation();
  const navigate = useNavigate();

  const getLinkStyle = (path) =>
    location.pathname === path
      ? "bg-[#003366] text-white font-semibold"
      : "bg-white text-[#1E3A8A] hover:bg-[#d9eefe]";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

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
        
        {/* <Link to="/AdminCoordinatorList"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/AdminCoordinatorList"
          )}`}>
        
        Coordinator List
        
        </Link> */}
        
        <Link
          to="/AdminFeedback"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/AdminFeedback"
          )}`}
        >
          Feedback
        </Link>
        <Link
          to="/AdminHelp"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/AdminHelp"
          )}`}
        >
          Help
        </Link>
      </div>

      {/* Logout */}
      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="w-full bg-white text-[#1E3A8A] font-medium px-4 py-2 rounded-full text-center hover:bg-[#d9eefe] transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}