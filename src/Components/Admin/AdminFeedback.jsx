import React, { useEffect, useState } from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import supabase from "../../supabase";
import AdminNavbar from "./AdminNavbar";

export default function Feedback() {
  const [firstName, setFirstName] = useState("User");
  const [feedback, setFeedback] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchRole, setSearchRole] = useState("");

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

  useEffect(() => {
    const fetchFeedback = async () => {
      const { data, error } = await supabase
        .from("feedback")
        .select("id, user_id, name, email, role, message, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching feedback:", error);
      } else {
        setFeedback(data);
      }
    };

    fetchFeedback();
  }, []);

  // Function to handle deleting feedback
  const handleDelete = async (id) => {
    const { error } = await supabase.from("feedback").delete().eq("id", id);

    if (error) {
      console.error("Error deleting feedback:", error);
    } else {
      setFeedback((prevFeedback) =>
        prevFeedback.filter((item) => item.id !== id)
      );
      setOpenDropdown(null);
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdown((prevId) => (prevId === id ? null : id));
  };

  const filteredFeedback = feedback.filter((item) =>
    item.name.toLowerCase().includes(searchName.toLowerCase())  
  )
  .filter((item) =>
    !searchRole ? true : item.role?.toLowerCase() === searchRole
);



  return (
    <>
      <AdminNavbar title="Feedback from Listener and Coordinators" />
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]" />
        <AdminSidebar userName={firstName} />

        <div className="flex-1 px-8 py-10">
          {/* <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">
            Feedback from Listeners & Coordinators
          </h2> */}

          <div className="mb-6 flex flex-wrap items-center gap-4">
            <input
              type="text"
              placeholder="Search by Name.."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 text-sm shadow-sm"
            />
   
          
            <select value={searchRole} onChange={(e) => setSearchRole(e.target.value)} className="px-3 py-1.5 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 text-sm shadow-sm">
              <option value="" disabled hidden>Search by Role...</option>
              <option value="coordinator">Coordinator</option>
              <option value="listener">Listener</option>

            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeedback.map((item) => (
              <div
                key={item.id}
                className={`bg-white shadow-md rounded-xl p-6 border-t-4 ${
                  item.role === "coordinator"
                    ? "border-green-500"
                    : "border-blue-500"
                } hover:shadow-lg hover:scale-105 transition-transform duration-300`}
              >
                <button
                  onClick={() => toggleDropdown(item.id)}
                  className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
                >
                  ⋮
                </button>

                {openDropdown === item.id && (
                  <div className="absolute top-10 right-2 bg-white border border-gray-300 rounded shadow-md z-10">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left"
                    >
                      Delete
                    </button>
                  </div>
                )}
                <div className="mb-4 space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">👤 Name:</span>{" "}
                    {item.name || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">📧 Email:</span>{" "}
                    {item.email || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">🏷️ Role:</span>{" "}
                    {item.role || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">🕒 Submitted:</span>{" "}
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="border-t my-3"></div>

                <p className="text-gray-800 font-medium">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
