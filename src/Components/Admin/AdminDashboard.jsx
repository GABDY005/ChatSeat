import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../../Controller/UserController";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminDashboard() {
  const [pendingCount, setPendingCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const users = await fetchAllUsers();
        const pending = users.filter(
          (user) => user.role.toLowerCase() === "pending"
        );
        setPendingCount(pending.length);
      } catch (err) {
        console.error("Failed to fetch pending users:", err);
      }
    };

    fetchPending();
  }, []);

  return (
    <>
      
      <AdminNavbar title="Dashboard"/>
      {/* <div className="bg-[#003366] text-white h-16 flex items-center justify-center px-6 shadow-md relative">
        <h4 className="text-xl font-bold justify-center">Admin Dashboard</h4>

       
        <div className="absolute right-6">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 focus:outline-none"
          >
            Dashboards ▾
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded shadow-lg z-10">
              <a
                href="/ListenerDashboard"
                className="text-sm block px-4 py-2 hover:bg-blue-100"
              >
                👤Listener Dashboard
              </a>
              <a
                href="/CoordinatorDashboard"
                className="text-sm block px-4 py-2 hover:bg-green-100"
              >
                👩‍🏫 Coordinator Dashboard
              </a>
            </div>
          )}
        </div>
      </div> */}

<div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
<div className="sticky top-16 h-[calc(100vh-64px)]" />
        <AdminSidebar userName="Admin" />

        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">
            Welcome, Admin
          </h2>

          {pendingCount > 0 && (
            <div className="bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500 p-4 rounded mb-6">
              <p className="font-medium">
                🔔 {pendingCount} user{pendingCount > 1 ? "s" : ""} waiting for
                approval
              </p>
              <a
                href="/admin/users"
                className="underline text-blue-700 mt-2 inline-block"
              >
                Review now →
              </a>
            </div>
          )}

          <div className="bg-white p-6 rounded shadow text-gray-600">
            <p>📌 Use the dropdown in the top right to switch dashboards.</p>
          </div>
        </div>
      </div>
    </>
  );
}
