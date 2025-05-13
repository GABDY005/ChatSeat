import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import supabase from "../../supabase";
import AdminNavbar from "./AdminNavbar";

export default function Help() {
  const [firstName, setFirstName] = useState("User");
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
  }, [navigate]);

  return (
    <>
      <AdminNavbar title="Help" />

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]" />
        <AdminSidebar userName={firstName} />

        <div className="flex-1 px-10 py-12 w-full">
          <div className="max-w-[800px] mx-auto text-black">
            <h2 className="text-2xl font-bold mb-4">How to Use the Website</h2>
            <p className="mb-6">
              Follow these instructions to navigate and use the website
              effectively.
            </p>

            <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md space-y-3">
              <h4 className="font-semibold text-lg mb-1">Manage Users</h4>
              <p>This page contains three tabs to help you manage the platform’s users:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>
                  <strong>Pending:</strong> View users awaiting approval. You can approve them as either <em>listeners</em> or <em>coordinators</em>.
                </li>
                <li>
                  <strong>Listeners:</strong> View all registered listeners. You can <em>delete</em> a listener if necessary.
                </li>
                <li>
                  <strong>Coordinators:</strong> View the list of coordinators. You can <em>delete</em> any coordinator if needed.
                </li>
              </ul>

              <h4 className="font-semibold text-lg mb-1">Chatrooms</h4>
              <p>
                The Admin can join both the <strong>Listener</strong> and <strong>Coordinator</strong> chatrooms. Use this space to check in, guide users, or respond to any questions or concerns.
              </p>

              <h4 className="font-semibold text-lg mb-1">Feedback</h4>
              <p>
                This page displays all feedback submitted by <strong>listeners</strong> and <strong>coordinators</strong>. 
                You can use the sorting feature to organise feedback by <em>name</em>, <em>role</em>, or <em>submission date</em>, making it easier to review and track responses over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}