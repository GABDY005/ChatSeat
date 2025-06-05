import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.jpg";
import { useSelector } from "react-redux";

export default function AdminNavbar({ title = "Admin Dashboard" }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.loggedInUser.success);

  // Function to handle logo click and reload the page
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <>
      {/* Navbar component for Admin Dashboard */}
      <div className="fixed top-0 w-full z-50 bg-[#003366] text-white h-16 flex items-center justify-between px-6 shadow-md">
        <div
          onClick={handleLogoClick}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <img
            src={logo}
            alt="Chat Seat Logo"
            className="w-10 h-10 object-cover border-2 border-black shadow cursor-pointer"
          />
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h4 className="text-xl font-bold">{title}</h4>
        </div>

        {/* Navigation buttons */}
        {user.role === "admin" && (
          <div className="right-6 relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 focus:outline-none"
            >
              Dashboards ▾
            </button>

            {/* Dropdown menu for different dashboards */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded shadow-lg z-10">
                <button
                  onClick={() => {
                    navigate("/listenerdashboard");
                    setDropdownOpen(false);
                  }}
                  className="text-sm w-full text-left px-4 py-2 hover:bg-blue-100"
                >
                  Listener Portal
                </button>
                <button
                  onClick={() => {
                    navigate("/coordinatordashboard");
                    setDropdownOpen(false);
                  }}
                  className="text-sm w-full text-left px-4 py-2 hover:bg-green-100"
                >
                  Coordinator Portal
                </button>

                <button
                  onClick={() => {
                    navigate("/admindashboard");
                    setDropdownOpen(false);
                  }}
                  className="text-sm w-full text-left px-4 py-2 hover:bg-yellow-100"
                >
                  Admin Portal
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
