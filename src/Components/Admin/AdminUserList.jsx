import { useEffect, useState } from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import {
  fetchAllUsers,
  updateUserRole,
  deleteUserById,
} from "../../Controller/UserController";
import { toast } from "react-toastify";

export default function AdminUserList() {
  // State variables to manage users, active tab, and first name
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");

  // Fetch all users when the component mounts
  useEffect(() => {
    getUsers();
  }, []);

  //it will fetch all users from the database
  const getUsers = async () => {
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  //it will approve the user according to the role
  const handleApprove = async (userId, role) => {
    try {
      await updateUserRole(userId, role);
      toast.success(`User approved as ${role}`);
      getUsers(); // Refresh list
    } catch (err) {
      toast.error("Failed to approve user");
    }
  };

  //it will delete the user from the database
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;
    try {
      await deleteUserById(userId);
      toast.success("User deleted successfully");
      getUsers(); // Refresh the user list
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  //it will filter the user according tot he role
  const filteredUsers = users.filter((user) => user.role === activeTab);

  return (
    <>
      {/* Shows the top navigation bar with title "All users" */}
      <AdminNavbar title="All users" />

      {/* Shows the sidebar with the user's first name */}
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="w-full sm:w-auto sticky top-16 h-[calc(100vh-64px)]" />
        {/* This shows the sidebar on the left with the admin's first name */}
        <AdminSidebar />

        {/* Main content area */}
        <div className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {/* Tab buttons for filtering users by role */}
            {["pending", "listener", "coordinator"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded font-medium ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {/* Capitalise the tab name and adds "s" at the end (e.g. "Listeners") */}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}s
              </button>
            ))}
          </div>

          {/* Table to display the filtered users */}
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full border rounded shadow bg-white">
              <thead className="bg-[#e6f0ff]">
                <tr className="text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Role</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* If the filtered users are present, it will map through them and display their details in the table */}
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="p-3">
                        {user.first_name} {user.last_name}
                      </td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.phone_number}</td>
                      <td className="p-3 capitalize">{user.role}</td>

                      {/* Action buttons for approving or deleting the user */}
                      <td className="p-3 text-center space-x-2">
                        {user.role === "pending" ? (
                          <>
                            <button
                              onClick={() => handleApprove(user.id, "listener")}
                              className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                            >
                              Listener
                            </button>
                            <button
                              onClick={() =>
                                handleApprove(user.id, "coordinator")
                              }
                              className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                            >
                              Coordinator
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          // If the user is not pending, show only the delete button
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  // If no users are found for the selected role, show a message
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No users found for this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
