import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase";
import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import FeedbackWidget from "./CoordinatorFeedback";

export default function CoordinatorHelp() {
  const [firstName, setFirstName] = useState("User");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const {
  //       data: { user },
  //       error: authError,
  //     } = await supabase.auth.getUser();

  //     if (!user || authError) {
  //       navigate("/");
  //       return;
  //     }

  //     const { data: profile, error: profileError } = await supabase
  //       .from("profiles")
  //       .select("first_name, role")
  //       .eq("id", user.id)
  //       .single();

  //     if (!profile || profileError) {
  //       navigate("/");
  //       return;
  //     }

  //     if (profile.role !== "coordinator" && profile.role !== "admin") {
  //       navigate("/");
  //       return;
  //     }

  //     setFirstName(profile.first_name);
  //     setUserRole(profile.role);
  //   };

  //   fetchUser();
  // }, [navigate]);
  useEffect(() => {
    localStorage.getItem("userRole") === "admin"
      ? setUserRole("admin")
      : setUserRole("coordinator");
  }, []);
  return (
    <>
      {userRole === "admin" ? (
        <AdminNavbar title="Coordinator Dashboard" />
      ) : (
        <CoordinatorNavbar title="Help" />
      )}

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="w-full sm:w-auto sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar userName={firstName} />
        </div>
        <div className="flex-1 px-4 sm:px-6 md:px-10 pt-10 pb-8 w-full">
          <div className="w-full max-w-6xl mx-auto text-gray-800">
            <h2 className="text-3xl font-extrabold text-center text-[#1E3A8A] mb-2">
              How to Use the Website
            </h2>
            <p className="text-center text-gray-600 mb-10">
              A quick guide to help you navigate and use the dashboard
              effectively.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <h4 className="text-blue-900 font-semibold text-lg mb-2">
                  Appointments
                </h4>
                <p>
                  This page shows all your booked sessions with listeners. If
                  necessary, you can <strong>delete</strong> any slot that’s no
                  longer available or needed.
                </p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <h4 className="text-green-900 font-semibold text-lg mb-2">
                  Availability
                </h4>
                <p>
                  View all scheduled sessions on a calendar. This helps you keep
                  track of your availability and upcoming appointments visually.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <h4 className="text-yellow-900 font-semibold text-lg mb-2">
                  Resources
                </h4>
                <p>
                  Access important materials, guides, or tools curated
                  specifically to help coordinators deliver better support.
                </p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <h4 className="text-purple-900 font-semibold text-lg mb-2">
                  Chatrooms
                </h4>
                <p>
                  Engage in discussions with either <strong>listeners</strong>{" "}
                  or other <strong>coordinators</strong>. These spaces offer a
                  safe place to share tips or get clarifications.
                </p>
              </div>

              <div className="bg-pink-50 border-l-4 border-pink-400 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <h4 className="text-pink-900 font-semibold text-lg mb-2">
                  Banner & Logo
                </h4>
                <p>
                  Download official banners and logos. These assets can be used
                  for events or any communication material.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <h4 className="text-red-900 font-semibold text-lg mb-2">
                  Feedback
                </h4>
                <p>
                  Just like listeners, coordinators can also share feedback.
                  Whether it's about a session or an idea for improvement, your
                  input is valued.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeedbackWidget />
    </>
  );
}
