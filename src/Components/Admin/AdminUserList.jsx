import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import {
  fetchAllUsers,
  updateUserRole,
  deleteUserById,
  checkUserRole,
} from "../../Controller/UserController";
import supabase from "../../supabase"; 

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [username, setUsername] = useState("Admin"); 
  const navigate = useNavigate();

  useEffect(() => {
    const verifyRoleAndFetchUsers = async () => {
      try {
        const isAdmin = await checkUserRole("admin");
        if (!isAdmin) {
          alert("Access denied. Admins only.");
          navigate("/");
          return;
        }


        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          navigate("/");
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", user.id)
          .single();

        if (profileError || !profile) {
          alert("Failed to load user profile.");
          navigate("/");
          return;
        }

        setUsername(profile.first_name); 
        getUsers();
      } catch (err) {
        console.error("Error verifying role:", err);
        alert("Unable to verify user role.");
        navigate("/");
      }
    };

    verifyRoleAndFetchUsers();
  }, [navigate]);

  const getUsers = async () => {
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      alert(`User role updated to ${newRole}`);
      getUsers();
    } catch (err) {
      alert("Failed to update user role");
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    const doubleCheck = prompt("Type DELETE to confirm deletion:");
    if (doubleCheck !== "DELETE") {
      alert("Deletion cancelled");
      return;
    }

    try {
      await deleteUserById(userId);
      alert("User deleted successfully");
      getUsers();
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.role === activeTab &&
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AdminNavbar title="All Users" />
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <AdminSidebar userName={username} /> 
        </div>

        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">All Users</h2>

          {/* Tabs */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex space-x-4">
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
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}s
                </button>
              ))}
            </div>

            {/* SearchQuery */}
            <input
              type="text"
              placeholder="Search by name..."
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <table className="w-full border rounded shadow bg-white">
            <thead className="bg-[#e6f0ff]">
              <tr className="text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="p-3">
                      {user.first_name} {user.last_name}
                    </td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 capitalize">{user.role}</td>
                    <td className="p-3 text-center space-x-2">
                      {["listener", "coordinator", "pending"]
                        .filter((r) => r !== user.role)
                        .map((r) => (
                          <button
                            key={r}
                            onClick={() => handleRoleChange(user.id, r)}
                            className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                          >
                            Set as {r}
                          </button>
                        ))}
                      {user.role === "pending" && (
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
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No users found for this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}