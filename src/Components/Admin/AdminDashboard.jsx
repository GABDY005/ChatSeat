import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../Controller/UserController";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminDashboard() {
  const [pendingCount, setPendingCount] = useState(0);

  // Fetch the first name from localStorage or user object
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
      <AdminNavbar title="Dashboard" />

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="w-full sm:w-auto sticky top-16 h-[calc(100vh-64px)]" />
        <AdminSidebar />

        <div className="flex-1 p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E3A8A] mb-6">
            Welcome
          </h2>

          {pendingCount > 0 && (
            <div className="bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500 p-4 rounded mb-6">
              <p className="font-medium">
                {pendingCount} user{pendingCount > 1 ? "s" : ""} waiting for
                approval
              </p>
              <a
                href="/AdminUserlist"
                className="underline text-blue-700 mt-2 inline-block"
              >
                Review now →
              </a>
            </div>
          )}

          <div className="bg-white p-6 rounded shadow text-gray-600">
            <p> Use the dropdown in the top right to switch dashboards.</p>
          </div>
        </div>
      </div>
    </>
  );
}
