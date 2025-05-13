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

  useEffect(() => {
    const fetchUser = async () => {
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

      if (!profile || profileError) {
        navigate("/");
        return;
      }

      if (
        profile.role !== "listener" &&
        profile.role !== "coordinator" &&
        profile.role !== "admin"
      ) {
        navigate("/");
        return;
      }

      setFirstName(profile.first_name);
      setUserRole(profile.role);
    };

    fetchUser();
  }, [navigate]);

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

        <div className="flex-1 px-10 py-12 w-full">
          <div className="max-w-3xl mx-auto text-black">
            <h2 className="text-2xl font-bold mb-4">How to Use the Website</h2>
            <p className="mb-6">
              Follow these instructions to navigate and use the website
              effectively.
            </p>

            <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md space-y-3">
              <h4 className="font-semibold text-lg mb-1">List of Coordinators</h4>
              <p>
                Here, you can view all available coordinators. This helps you
                decide whom you'd like to book a session with. Each coordinator
                may have different time slots and locations.
              </p>

              <h4 className="font-semibold text-lg mb-1">Scheduling</h4>
              <p>
                The Scheduling page helps you manage your appointments. It has
                three useful tabs:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>
                  <strong>Upcoming Bookings:</strong> View all your upcoming
                  sessions. You can also <em>edit</em> or <em>delete</em> any
                  future booking here.
                </li>
                <li>
                  <strong>Book a Slot:</strong> Choose a <em>place</em>,{" "}
                  <em>date</em>, and <em>time</em> to book your session with a
                  coordinator.
                </li>
                <li>
                  <strong>View Calendar:</strong> See your booked sessions in a
                  calendar format. Make sure to <em>select the place</em> to
                  load the bookings.
                </li>
              </ul>

              <h4 className="font-semibold text-lg mb-1">Resources</h4>
              <p>
                This section contains helpful resources and information to
                support your journey. It may include guides, mental health
                articles, or session tips curated for listeners.
              </p>

              <h4 className="font-semibold text-lg mb-1">Let's Talk</h4>
              <p>
                Share your experiences, thoughts, or questions with others. This
                is a safe space to talk about meetings, ideas, or challenges —
                whether it’s with a coordinator, admin, or fellow listener.
              </p>

              <h4 className="font-semibold text-lg mb-1">About Us</h4>
              <p>
                Learn more about the admin team who manage the platform. This
                page offers background on their mission and contact information
                if needed.
              </p>

              <h2 className="text-lg font-semibold mb-1">Feedback</h2>
              <p>
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