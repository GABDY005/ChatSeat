import React, { useEffect, useState } from "react";
import ListenerSidebar from "./ListenerSidebar";
// import supabase from "../supabase";
import supabase from "../../supabase";
import ListenerNavbar from "./ListenerNavbar";
import AdminNavbar from "../Admin/AdminNavbar";

export default function ListenerResources() {
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
         <ListenerNavbar title="Resources" />
      )}
    
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <ListenerSidebar userName={firstName} />
        </div>

        <div className="flex-1 p-10">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-6 text-left">
              Lessons Learned in Establishing Chat Seats
            </h2>

            <p className="text-gray-700 text-lg mb-4">
              Below are some of the lessons we have learned when establishing Chat Seats:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg">
              <li>Selection of listeners – ensure they are interested in other peoples’ experiences and have well developed listening skills.</li>
              <li>Have one very experienced listener who sits with less experienced listeners.</li>
              <li>Listeners work in pairs.</li>
              <li>It is important that it is about listening and not counselling.</li>
              <li>Have banners and graphics ready when talking to venue managers.</li>
              <li>Be prepared to be flexible about location of Chat Seats and setup style.</li>
              <li>Complete any required induction activities at the venue.</li>
              <li>Observe all requirements of the venue.</li>
              <li>Hold required clearances as requested by venue managers.</li>
              <li>Check in regularly with the venue manager to see if anything needs to be adjusted.</li>
              <li>Advertise available Chat Seat times on the website for each venue.</li>
              <li>Hold biannual get-togethers for listeners.</li>
              <li>Inter-generational listeners are a plus.</li>
              <li>Provide materials to help develop listening skills.</li>
              <li>Provide name badges (e.g., "Hello my name is…").</li>
              <li>It’s a bonus if tea/coffee is available at the venue.</li>
              <li>It’s great if the venue advertises the availability of Chat Seats.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
