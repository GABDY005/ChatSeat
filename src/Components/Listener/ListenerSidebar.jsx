import { Link, useLocation, useNavigate } from "react-router-dom";
import supabase from "../../supabase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setloggedInUserSuccess } from "../../state/loggedInUser";

export default function ListenerSidebar({ userName = "" }) {
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
      <div className="w-64 bg-[#A8E4F2] h-[calc(100vh-64px)] sticky top-16 flex flex-col px-4 py-6 overflow-y-auto">
        <div className="text-[#1E3A8A] font-bold text-xl mb-12 text-center">
          Hello, {user.first_name}!
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-3 mb-auto">
          <Link
            to="/listenerdashboard"
            className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
              "/listenerdashboard"
            )}`}
          >
            Dashboard
          </Link>
          <Link
            to="/coordinatorslistinlistener"
            className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
              "/coordinatorslistinlistener"
            )}`}
          >
            List of Coordinators
          </Link>
          <Link
            to="/listenerscheduling"
            className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
              "/listenerscheduling"
            )}`}
          >
            Scheduling
          </Link>

          <Link
            to="/listenerchatroom"
            className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
              "/listenerchatroom"
            )}`}
          >
            Let's Talk
          </Link>
          <Link
            to="/about"
            className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
              "/about"
            )}`}
          >
            About Us
          </Link>

          <Link
            to="/listenerhelp"
            className={`px-4 py-2 rounded-full text-center shadow whitespace-nowrap ${getLinkStyle(
              "/listenerhelp"
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
    </>
  );
}
