import React, { useEffect, useState } from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import {
  fetchAllUsers,
  updateUserRole,
  deleteUserById,
} from "../../Controller/UserController";
import supabase from "../../supabase";

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [firstName, setFirstName] = useState("User");

  useEffect(() => {
    const fetchUserName = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (user && !authError) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", user.id)
          .single();

        if (profile?.first_name) {
          setFirstName(profile.first_name);
        }
      }

    };

    fetchUserName();
  }, []);

  //it will run when the page is load 
  useEffect(() => {
    getUsers();
  }, []);

  //it will fetch the users from database
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
      alert(`User approved as ${role}`);
      getUsers(); // Refresh list
    } catch (err) {
      alert("Failed to approve user");
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
      alert("User deleted successfully");
      getUsers(); // Refresh the user list
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  //it will filter the user according tot he role
  const filteredUsers = users.filter((user) => user.role === activeTab);

  return (
    <>
      <AdminNavbar title="All users"/>

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
      <div className="sticky top-16 h-[calc(100vh-64px)]" />
        <AdminSidebar userName={firstName} />

        <div className="flex-1 p-8">
          {/* <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">All Users</h2> */}

          <div className="flex space-x-4 mb-6">
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

          <table className="w-full border rounded shadow bg-white">
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
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="p-3">
                      {user.first_name} {user.last_name}
                    </td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.phone_number}</td>
                    <td className="p-3 capitalize">{user.role}</td>
                    <td className="p-3 text-center space-x-2">
                      {user.role === "pending" ? (
                        <>
                          <button
                            onClick={() => handleApprove(user.id, "listener")}
                            className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                          >
                            Approve as Listener
                          </button>
                          <button
                            onClick={() =>
                              handleApprove(user.id, "coordinator")
                            }
                            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                          >
                            Approve as Coordinator
                          </button>
                        </>
                      ) : (
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
