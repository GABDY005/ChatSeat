import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import supabase from "../../supabase";

export default function AdminCoordinatorList() {
  const [firstName, setFirstName] = useState("User");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
  });
  const [coordinators, setCoordinators] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!user || authError) {
        navigate("/");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("first_name, role")
        .eq("id", user.id)
        .single();

      if (profileError || !profile || profile.role !== "admin") {
        navigate("/");
        return;
      }

      setFirstName(profile.first_name);
    };

    fetchUserName();
    fetchCoordinators();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async () => {
    const { error } = await supabase.from("coordinators").insert([{ ...formData }]);
    if (error) {
      alert("Error adding coordinator: " + error.message);
    } else {
      alert("Coordinator added successfully!");
      setFormData({ name: "", email: "", phone: "", place: "" });
      fetchCoordinators();
    }
  };

  const fetchCoordinators = async () => {
    const { data, error } = await supabase.from("coordinators").select("*");
    if (!error) setCoordinators(data);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("coordinators").delete().eq("id", id);
    if (!error) {
      fetchCoordinators();
    }
  };

  return (
    <div className="min-h-screen bg-[#e6f4f9] pt-16">
      <AdminNavbar title="Coordinator List" />
      <div className="flex">
        <div className="w-64 sticky top-16 h-[calc(100vh-64px)]">
          <AdminSidebar userName={firstName} />
        </div>
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="bg-white rounded shadow p-4">
            <div className="overflow-x-auto mb-6">
              <table className="w-full table-auto border-collapse text-left">
                <thead className="bg-blue-100">
                  <tr className="border-b-2">
                    <th className="p-2 border">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-1 rounded w-full font-medium"
                        required
                      />
                    </th>
                    <th className="p-2 border">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-1 rounded w-full font-medium"
                        required
                      />
                    </th>
                    <th className="p-2 border">
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border p-1 rounded w-full font-medium"
                      />
                    </th>
                    <th className="p-2 border">
                      <input
                        type="text"
                        name="place"
                        placeholder="Place"
                        value={formData.place}
                        onChange={handleChange}
                        className="border p-1 rounded w-full font-medium"
                      />
                    </th>
                    <th className="p-2 border">
                      <button
                        onClick={handleAdd}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Add
                      </button>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            <hr className="my-6 border-t border-gray-300" />

            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse text-left">
                <tbody>
                  {coordinators.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-gray-500 p-4">
                        No coordinators added yet.
                      </td>
                    </tr>
                  ) : (
                    coordinators.map((coordinator) => (
                      <tr key={coordinator.id} className="hover:bg-gray-50">
                        <td className="border p-2">{coordinator.name}</td>
                        <td className="border p-2">{coordinator.email}</td>
                        <td className="border p-2">{coordinator.phone}</td>
                        <td className="border p-2">{coordinator.place}</td>
                        <td className="border p-2">
                          <button
                            onClick={() => handleDelete(coordinator.id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}