import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.jpg";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.loggedInUser.success);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div>
      <nav className="sticky top-0 z-50 bg-[#003366] shadow-lg w-full">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5">
          <div
            onClick={handleLogoClick}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img
              src={logo}
              alt="ChatSeat Logo"
              className="w-12 h-12 object-cover border-2 border-white shadow-md"
            />
          </div>

          <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <h1 className="text-white font-extrabold text-xl md:text-3xl tracking-wide text-center">
              Have a Chat Seat
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/BookedListener"
              className="bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200"
            >
              Who's at the Seat?
            </Link>
            {user === null ? (
              <Link
                to="/Login"
                className="bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200"
              >
                Login
              </Link>
            ) : (
              <Link
                to={
                  user.role === "admin"
                    ? "/admindasboard"
                    : user.role === "coordinator"
                    ? "/coordinatordashboard"
                    : "/listenerdashboard"
                }
                className="bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200"
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="md:hidden">
            {isMenuOpen ? (
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-xl hover:text-gray-300"
              >
                ✕
              </button>
            ) : (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <div className="w-5 h-0.5 bg-white mb-1"></div>
                  <div className="w-5 h-0.5 bg-white mb-1"></div>
                  <div className="w-5 h-0.5 bg-white"></div>
                </div>
              </button>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#003366] border-t border-white/20">
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/BookedListener"
                className="block bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Who's at the Seat?
              </Link>
              <Link
                to="/Login"
                className="block bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
