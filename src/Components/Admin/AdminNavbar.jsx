import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 w-full z-50 bg-[#003366] text-white h-16 flex items-center justify-center px-6 shadow-md">
      <h4 className="text-xl font-bold">Admin Dashboard</h4>

      {/* Dropdown Button */}
      <div className="absolute right-6">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 focus:outline-none"
        >
          Dashboards ▾
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded shadow-lg z-10">
            <button
              onClick={() => navigate("/ListenerDashboard")}
              className="text-sm w-full text-left px-4 py-2 hover:bg-blue-100"
            >
              👤 Listener Dashboard
            </button>
            <button
              onClick={() => navigate("/CoordinatorDashboard")}
              className="text-sm w-full text-left px-4 py-2 hover:bg-green-100"
            >
              👩‍🏫 Coordinator Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
