import React, { useEffect, useState } from "react";
import ListenerSidebar from "./ListenerSidebar";
import supabase from "../../supabase";
import ListenerNavbar from "./ListenerNavbar";
import AdminNavbar from "../Admin/AdminNavbar";


export default function ListenerHelp() {
  const [firstName, setFirstName] = useState("User");
const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (user && !authError) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name, role")
          .eq("id", user.id)
          .single();

        if (profile?.first_name) {
          setFirstName(profile.first_name);
          setUserRole(profile.role);
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <>
    {userRole === "admin" ? (
        <AdminNavbar title="Listener Dashboard" />
      ) : (
        <ListenerNavbar title="Attracting Chatters" />
      )}
     
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <ListenerSidebar userName={firstName} />
        </div>

        <div className="flex-1 px-10 py-12 w-full">
          <div className="max-w-[800px] mx-auto text-black">
            

            <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md space-y-6 text-gray-800">

              <div>
                <h4 className="font-semibold text-lg">1. Open Seating</h4>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Have the seating set up so it is easily accessible to another person(s).</li>
                  <li>Place the banner to the side so the Listeners are visible.</li>
                  <li>Be positioned where there is a lot of foot traffic and highly visible.</li>
                  <li>Have tea/coffee available if possible.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg">2. As Listeners</h4>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Make eye contact with individuals passing by.</li>
                  <li>Smile at anyone who is nearby.</li>
                  <li>Be welcoming and friendly.</li>
                  <li>Say “Hi/Hello/Good morning etc.” to those nearby.</li>
                  <li>Invite them to sit down and grab a coffee or tea if available.</li>
                </ul>
              </div>

              <p>
                We hope that you find this guide sheet helpful. If you have suggestions on how it could be improved, let us know.
              </p>

              <p>
                Thank you for taking the time to support your local community through chatting with some of its members.
                We hope that you will be able to commit to further “Chat” time in the future.
              </p>

              <p className="italic text-center"><strong>Connecting Through Conversation</strong></p>
            </div>
          </div>
        </div>
      </div>
  
    </>
  );
}
