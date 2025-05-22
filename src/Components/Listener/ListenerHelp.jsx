import React, { useEffect, useState } from "react";
import ListenerSidebar from "./ListenerSidebar";
import supabase from "../../supabase";
import ListenerNavbar from "./ListenerNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import { useNavigate } from "react-router-dom";

export default function ListenerHelp() {
  const [firstName, setFirstName] = useState("User");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

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

  //     if (
  //       profile.role !== "listener" &&
  //       profile.role !== "coordinator" &&
  //       profile.role !== "admin"
  //     ) {
  //       navigate("/");
  //       return;
  //     }

  //     setFirstName(profile.first_name);
  //     setUserRole(profile.role);
  //   };

  //   fetchUser();
  // }, [navigate]);
  useEffect(() => {
    sessionStorage.getItem("userRole") === "admin"
      ? setUserRole("admin")
      : setUserRole("listener");
  }, []);
  return (
    <>
      {userRole === "admin" ? (
        <AdminNavbar title="Listener Dashboard" />
      ) : (
        <ListenerNavbar title="Help" />
      )}

      <div className="flex flex-col lg:flex-row min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 lg:w-64 h-[calc(100vh-64px)]">
          <ListenerSidebar userName={firstName} />
        </div>

        <div className="flex-1 px-6 sm:px-10 py-10">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10 space-y-6 ">
            <div className="text-center"></div>
            <h2 className="text-3xl font-bold text-[#1E3A8A] mb-2">
              How to Use the Website
            </h2>
            <p className="text-gray-600 text-base">
              Follow these instructions to navigate and use the website
              effectively.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6"></div>
            <div className="bg-[#f0f4ff] p-5 rounded-xl shadow-sm">
              <h4 className="font-semibold text-lg mb-2 text-[#1E3A8A]">
                List of Coordinators
              </h4>
              <p className="text-gray-700 text-sm">
                Here, you can view all available coordinators. This helps you
                decide whom you'd like to book a session with. Each coordinator
                may have different time slots and locations.
              </p>
            </div>
            <div className="bg-[#fef9c3] p-5 rounded-xl shadow-sm">
              <h4 className="font-semibold text-lg mb-2 text-[#92400e]">
                Scheduling
              </h4>
              <p className="text-gray-700 text-sm">
                The Scheduling page helps you manage your appointments. It has
                three useful tabs:
              </p>
              <ul className="list-disc ml-5 text-sm text-gray-700 mt-2 space-y-1">
                <li>
                  <strong>Upcoming Bookings:</strong> Edit or delete your future
                  sessions.
                </li>
                <li>
                  <strong>Book a Slot:</strong> Choose place, date, and time for
                  your session.
                </li>
                <li>
                  <strong>View Calendar:</strong> See all bookings in calendar
                  format after selecting a place.
                </li>
              </ul>
              </div>

              <div className="bg-[#ecfdf5] p-5 rounded-xl shadow-sm">
              <h4 className="font-semibold text-lg mb-1">Resources</h4>
              <p>
                This section contains helpful resources and information to
                support your journey. It may include guides, mental health
                articles, or session tips curated for listeners.
              </p>
            </div>
            <div className="bg-[#ecfdf5] p-5 rounded-xl shadow-sm">
              <h4 className="font-semibold text-lg mb-2 text-[#6b21a8]">
                Let's Talk
              </h4>
              <p className="text-gray-700 text-sm">
                Share your experiences, thoughts, or questions with others. This
                is a safe space to talk about meetings, ideas, or challenges —
                whether it’s with a coordinator, admin, or fellow listener.
              </p>
            </div>

            <div className="bg-[#f3e8ff] p-5 rounded-xl shadow-sm">
              <h4 className="font-semibold text-lg mb-2 text-[#9a3412]">
                About Us
              </h4>
              <p className="text-gray-700 text-sm">
                Learn more about the admin team who manage the platform. This
                page offers background on their mission and contact information
                if needed.
              </p>
            </div>
            <div className="bg-[#dbeafe] p-5 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-2 text-[#1d4ed8]">
                Feedback
              </h2>
              <p className="text-gray-700 text-sm">
                Use this page to share your feedback — whether it’s about a
                session, a coordinator, or your overall experience. Your input
                helps us improve the platform for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
