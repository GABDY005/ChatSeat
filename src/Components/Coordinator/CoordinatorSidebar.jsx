import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import supabase from "../../supabase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setloggedInUserSuccess } from "../../state/loggedInUser";

export default function CoordinatorSidebar({ userName = "Coordinator" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedInUser.success);
  // const loading = useSelector((state) => state.loggedInUser.loading);

  //  if (loading || !user.first_name) return null;

  const getLinkStyle = (path) =>
    location.pathname === path
      ? "bg-[#003366] text-white font-semibold"
      : "bg-white text-[#1E3A8A] hover:bg-[#d9eefe]";

     

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("userRole");
    dispatch(setloggedInUserSuccess({}));
    navigate("/");
  };

  return (
    <div className="w-64 bg-[#A8E4F2] h-[calc(100vh-64px)] sticky top-16 flex flex-col px-4 py-6 overflow-y-auto">
      {/* <div className="text-[#1E3A8A] font-bold text-xl mb-12 text-center">
        Hello, {user.first_name || "User"}!
      </div> */}

 <div className="text-[#1E3A8A] font-bold text-xl mb-12 text-center">
      Hello, {user.first_name}!
    </div>
      <div className="flex flex-col space-y-3 mb-6">
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
          to="/CoordinatorImageGallery"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/CoordinatorImageGallery"
          )}`}
        >
          Image Gallery
        </Link>
        {/* <Link to="/Logos" className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle("/Logos")}`}>
          Banners and Logo
        </Link> */}
        {/* <Link
          to="/CoordinatorFeedback"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/CoordinatorFeedback"
          )}`}
        >
          Feedback
        </Link> */}
        <Link
          to="/CoordinatorHelp"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/CoordinatorHelp"
          )}`}
        >
          Help
        </Link>
      </div>

      {/* Logout */}
      <div className="mt-20">
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
