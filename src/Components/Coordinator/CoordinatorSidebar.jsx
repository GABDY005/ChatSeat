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
      <div className="text-[#1E3A8A] font-bold text-xl mb-12 text-center">
        Hello, {user.first_name}!
      </div>
      <div className="flex flex-col space-y-3 mb-6">
        <Link
          to="/coordinatordashboard"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/coordinatordashboard"
          )}`}
        >
          Dashboard
        </Link>
        <Link
          to="/coordinatorappointments"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/coordinatorappointments"
          )}`}
        >
          Appointments
        </Link>
        <Link
          to="/coordinatoravailability"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/coordinatoravailability"
          )}`}
        >
          Availability
        </Link>
        <Link
          to="/lessoncoordinator"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/lessoncoordinator"
          )}`}
        >
          Resources
        </Link>
        <Link
          to="/coordinatorchatroom"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/coordinatorchatroom"
          )}`}
        >
          Coordinator Chat room
        </Link>
        <Link
          to="/coordinatorlistenerchatroom"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/coordinatorlistenerchatroom"
          )}`}
        >
          Listener Chat room
        </Link>

        <Link
          to="/coordinatorhelp"
          className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
            "/coordinatorhelp"
          )}`}
        >
          Help
        </Link>
      </div>

      <div className="mt-auto">
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
