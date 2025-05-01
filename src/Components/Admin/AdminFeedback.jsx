import React, { useEffect, useState } from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import supabase from "../../supabase";
import AdminNavbar from "./AdminNavbar";

export default function Feedback() {
  const [firstName, setFirstName] = useState("User");
  const [feedback, setFeedback] = useState([]);

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

  return (
    <>
      <AdminNavbar title="Feedback"/>
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]" />
        <AdminSidebar userName={firstName} />

        <div className="flex-1 px-8 py-10">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">
            📬 Feedback from Listeners & Coordinators
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedback.map((item) => (
              <div
                key={item.id}
                className={`bg-white shadow-md rounded-xl p-6 border-t-4 ${
                  item.role === "coordinator" ? "border-green-500" : "border-blue-500"
                } hover:shadow-lg hover:scale-105 transition-transform duration-300`}
              >
               
                <div className="mb-4 space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">👤 Name:</span> {item.name || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">📧 Email:</span> {item.email || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">🏷️ Role:</span> {item.role || "N/A"}
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
