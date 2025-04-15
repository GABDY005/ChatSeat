import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminUserList() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Darshi Patel",
      email: "darshi@example.com",
      role: "Listener"
    },
    {
      id: 2,
      name: "Tricia Vilkinas",
      email: "tricia@example.com",
      role: "Coordinator"
    },
    {
      id: 3,
      name: "Noel Fraser",
      email: "noel@example.com",
      role: "Listener"
    }
  ]);

  const handleEdit = (id) => {
    alert(`Edit user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (confirm) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  return (
    <>
      <div className="bg-[#003366] text-white h-16 flex items-center justify-center shadow-md px-6">
        <h4 className="text-xl font-bold">👤 User Management</h4>
      </div>

      <div className="flex min-h-[calc(100vh-64px)] bg-[#f0f6fa]">
        <AdminSidebar userName="Admin" />

        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">All Users</h2>

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
              {users.map(user => (
                <tr key={user.id} className="border-t">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No users found.
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
