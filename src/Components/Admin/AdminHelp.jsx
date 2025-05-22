import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import supabase from "../../supabase";
import AdminNavbar from "./AdminNavbar";

export default function Help() {
  const [firstName, setFirstName] = useState("User");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUserName = async () => {
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

  //     if (profileError || !profile || profile.role !== "admin") {
  //       navigate("/");
  //       return;
  //     }

  //     setFirstName(profile.first_name);
  //   };

  //   fetchUserName();
  // }, [navigate]);

  return (
    <>
      <AdminNavbar title="Help" />

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="w-full sm:w-auto sticky top-16 h-[calc(100vh-64px)]" />
        <AdminSidebar userName={firstName} />

        <div className="flex-1 px-4 sm:px-6 md:px-10 pt-10 pb-8 w-full">
        <div className="w-full max-w-5xl mx-auto text-gray-800">
          <h2 className="text-3xl font-extrabold text-center text-[#1E3A8A] mb-2">
            How to Use the Website
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Follow this quick guide to manage users, monitor feedback, and support platform communication.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Manage Users */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h4 className="text-blue-900 font-semibold text-lg mb-2">Manage Users</h4>
              <p className="mb-2">This section includes three tabs to manage users on the platform:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
                <li><strong>Pending:</strong> Approve users as <em>listeners</em> or <em>coordinators</em>.</li>
                <li><strong>Listeners:</strong> View all listeners and <em>delete</em> if necessary.</li>
                <li><strong>Coordinators:</strong> View and <em>delete</em> coordinators as needed.</li>
              </ul>
            </div>

            {/* Chatrooms */}
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h4 className="text-green-900 font-semibold text-lg mb-2">Chatrooms</h4>
              <p>
                The Admin can access both <strong>Listener</strong> and <strong>Coordinator</strong> chatrooms.
                Use these to guide users, share updates, or provide help when questions arise.
              </p>
            </div>

            {/* Feedback */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow-sm hover:shadow-md transition md:col-span-2">
              <h4 className="text-yellow-900 font-semibold text-lg mb-2">Feedback</h4>
              <p>
                View feedback from both <strong>listeners</strong> and <strong>coordinators</strong>. Use filters to sort by <em>name</em>, <em>role</em>, or <em>submission date</em>, so you can efficiently review and respond to input over time.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-xl shadow-sm hover:shadow-md transition md:col-span-2">
              <h4 className="text-purple-900 font-semibold text-lg mb-2">Scheduling Settings</h4>
              <p className="mb-2">Use this section to manage time availability for each location:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
                <li><strong>Add or delete locations</strong> that offer availability.</li>
                <li><strong>Select a date</strong> to view or edit available time slots.</li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}