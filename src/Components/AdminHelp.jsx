import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import supabase from "../supabase";

export default function Help() {
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
      <div className="bg-[#003366] text-white h-16 flex items-center justify-center shadow-md px-6">
        <h4 className="text-xl font-bold">Help</h4>
      </div>

      <div className="flex min-h-[calc(100vh-64px)]">
        <AdminSidebar userName={firstName} />

        <div className="flex-1 px-10 py-12 w-full">
          <div className="max-w-[800px] mx-auto text-black">
            <h2 className="text-2xl font-bold mb-4">How to Use the Website</h2>
            <p className="mb-6">
              Follow these instructions to navigate and use the website
              effectively.
            </p>

            <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md space-y-6">
              <h4 className="font-semibold text-lg">Dashboard</h4>
              <p>
                - The left sidebar allows you to access different pages like
                booking, chat room, and feedback.
              </p>

              <h4 className="font-semibold text-lg">Book Your Slot</h4>
              <p>- Choose an available time slot and confirm your booking.</p>

              <h4 className="font-semibold text-lg">Chat Room</h4>
              <p>
                - In the chat room, you can start a new discussion by clicking
                "New Topic", or reply to existing topics.
              </p>

              <h4 className="font-semibold text-lg">Feedback</h4>
              <p>- Fill out the feedback form to share your experience.</p>

              <h4 className="font-semibold text-lg">About Us</h4>
              <p>
                - If you need further assistance, contact the support team
                through the **"About Us"** page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
