import React, { useEffect, useState } from "react";
import CoordinatorSidebar from "./CoordinatorSidebar";
import supabase from "../../supabase";
import CoordinatorNavbar from "./CoordinatorNavbar";

export default function CoordinatorHelp() {
  const [firstName, setFirstName] = useState("User");

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

  return (
    <>
      <CoordinatorNavbar title="Help" />

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
      <div className="sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar userName="Tricia" />
        </div>
        <div className="flex-1 px-10 py-12 w-full">
          <div className="max-w-[800px] mx-auto text-black">
            <h2 className="text-2xl font-bold mb-4">How to Use the Website</h2>
            <p className="mb-6">
              Follow these instructions to navigate and use the website
              effectively.
            </p>

            <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md space-y-3">
              {/* <h4 className="font-semibold text-lg">Dashboard</h4>
              <p>
                The left sidebar allows you to access different pages like
                booking, chat room, and feedback.
              </p> */}

              <h4 className="font-semibold text-lg mb-1">Appointments</h4>
              <p>
                This page shows all your booked sessions with listeners. If necessary, you can <strong>delete</strong> any slot that’s no longer available or needed.
              </p>

              <h4 className="font-semibold text-lg mb-1">Availability</h4>
              <p>
                View all scheduled sessions on a calendar. This helps you keep track of your availability and upcoming appointments visually.
              </p>

              <h4 className="font-semibold text-lg mb-1">Resources</h4>
              <p>
                Access important materials, guides, or session tools curated specifically to help coordinators deliver better support.
              </p>

              <h4 className="font-semibold text-lg mb-1">Chatrooms</h4>
              <p>
                Engage in discussions with either <strong>listeners</strong> or other <strong>coordinators</strong>. These chatrooms offer a safe space to share experiences, tips, or get clarifications.
              </p>

              <h4 className="font-semibold text-lg mb-1">Banner & Logo</h4>
              <p>
                Download official banners and logos from this page. These assets can be used for events or communication material when needed.
              </p>

              <h4 className="font-semibold text-lg mb-1">Feedback</h4>
              <p>
                Just like listeners, coordinators can also share their feedback here. Whether it's about a session or a suggestion for platform improvements, your input is appreciated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
