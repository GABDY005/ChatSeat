import { useEffect, useState } from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import supabase from "../../supabase";
import { toast } from "react-toastify";

export default function AdminCoordinatorList() {
  // State variables
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
  });
  const [coordinators, setCoordinators] = useState([]);

  // Fetch user role from local storage
  useEffect(() => {
    fetchCoordinators();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle adding a new coordinator
  const handleAdd = async () => {
    const { name, email, phone, place } = formData;

    if (!name.trim() || !email.trim() || !phone.trim() || !place.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Validate format
    const { error } = await supabase
      .from("coordinators")
      .insert([{ ...formData }]);
    if (error) {
      toast.error("Error adding coordinator: " + error.message);
    } else {
      toast.success("Coordinator added successfully!");
      setFormData({ name: "", email: "", phone: "", place: "" });
      fetchCoordinators();
    }
  };

  // Fetch coordinators from the database
  const fetchCoordinators = async () => {
    const { data, error } = await supabase.from("coordinators").select("*");
    if (error) {
      console.error("Error fetching coordinators:", error.message);
    } else {
      setCoordinators(data);
    }
  };

  // Handle deleting a coordinator
  const handleDelete = async (id) => {
    const { error } = await supabase.from("coordinators").delete().eq("id", id);
    if (error) {
      toast.error("Error deleting coordinator: " + error.message);
    } else {
      fetchCoordinators();
    }
  };

  return (
    <div className="min-h-screen bg-[#e6f4f9] pt-16">
      <AdminNavbar title="Coordinator List" />
      <div className="flex">
        <div className="w-full sm:w-64 sticky top-16 h-[calc(100vh-64px)]">
          <AdminSidebar />
        </div>
        <div className="flex-1 p-4 sm:p-6 overflow-auto">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full table-auto border-collapse text-left">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-2 border w-[20%]">
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
                  <th className="p-2 border w-[25%]">
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
                  <th className="p-2 border w-[20%]">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border p-1 rounded w-full font-medium"
                    />
                  </th>
                  <th className="p-2 border w-[25%]">
                    <input
                      type="text"
                      name="place"
                      placeholder="Place"
                      value={formData.place}
                      onChange={handleChange}
                      className="border p-1 rounded w-full font-medium"
                    />
                  </th>
                  <th className="p-2 border w-[10%]">
                    <button
                      onClick={handleAdd}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Add
                    </button>
                  </th>
                </tr>
                <tr>
                  <td colSpan="5" className="h-2"></td>
                </tr>
              </thead>
              <tbody className="align-top">
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
  );
}
