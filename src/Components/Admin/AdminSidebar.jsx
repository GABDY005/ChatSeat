import { Link, useLocation, useNavigate } from "react-router-dom";
import supabase from "../../supabase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setloggedInUserSuccess } from "../../state/loggedInUser";

export default function AdminSidebar({ userName = "" }) {
  // Get the current location, navigate function, and Redux dispatch
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedInUser.success);

  const getLinkStyle = (path) =>
    location.pathname === path
      ? "bg-[#003366] text-white font-semibold"
      : "bg-white text-[#1E3A8A] hover:bg-[#d9eefe]";

  // Function to handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("userRole");
    dispatch(setloggedInUserSuccess({}));
    navigate("/");
  };

  return (
    <>
      {/* Sidebar for admin navigation */}
      <div className="w-64 bg-[#A8E4F2] h-[calc(100vh-64px)] sticky top-16 flex flex-col px-4 py-6 overflow-y-auto">
        <div className="text-[#1E3A8A] font-bold text-xl mb-12 text-center">
          Hello, {user.first_name}!
        </div>

        {/* Navigation links for admin functionalities */}
        <div className="flex flex-col space-y-3 mb-auto">
          <Link
            to="/admindashboard"
            className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
              "/admindashboard"
            )}`}
          >
            Dashboard
          </Link>
          <Link
            to="/adminuserlist"
            className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
              "/adminuserlist"
            )}`}
          >
            Manage Users
          </Link>
          <Link
            to="/admincoordinatorchatroom"
            className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
              "/admincoordinatorchatroom"
            )}`}
          >
            Coordinator Chat Room
          </Link>
          <Link
            to="/adminlistenerchatroom"
            className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
              "/adminlistenerchatroom"
            )}`}
          >
            Listener Chat room
          </Link>
          <Link
            to="/adminschedulingsetting"
            className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
              "/adminschedulingsetting"
            )}`}
          >
            Admin Scheduling Setting
          </Link>

          <Link
            to="/admincoordinatorlist"
            className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
              "/admincoordinatorlist"
            )}`}
          >
            Coordinator List
          </Link>

          <Link
            to="/adminfeedback"
            className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
              "/adminfeedback"
            )}`}
          >
            Feedback
          </Link>
          <Link
            to="/adminhelp"
            className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
              "/adminhelp"
            )}`}
          >
            Help
          </Link>
        </div>

        {/* Logout button */}
        <div className="mt-4">
          <button
            onClick={handleLogout}
            className="w-full bg-white text-[#1E3A8A] font-medium px-4 py-2 rounded-full text-center hover:bg-[#d9eefe] transition"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
