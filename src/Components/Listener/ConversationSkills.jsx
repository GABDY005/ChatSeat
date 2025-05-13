import React, { useEffect, useState } from "react";
import ListenerSidebar from "./ListenerSidebar";
import supabase from "../../supabase";
import ListenerNavbar from "./ListenerNavbar";
import { Link } from "react-router-dom";
import AdminNavbar from "../Admin/AdminNavbar";

export default function ConversationSkills() {
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
        <ListenerNavbar title="Good Conversation Skills" />
      )}
      
      <div className="flex flex-col lg:flex-row min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="lg:sticky top-16 lg:h-[calc(100vh-64px)]">
          <ListenerSidebar userName={firstName} />
        </div>

        <div className="flex-1 px-10 py-12 w-full">
          <div className="max-w-[800px] mx-auto text-black">
            <h2 className="text-2xl font-bold mb-4 text-center">Chat Seats – Conversation Guide</h2>
            <p className="mb-6 text-lg text-gray-700 font-medium text-center">
              Connecting Through Conversation
            </p>

            <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md space-y-4 text-gray-800">
              <h4 className="font-semibold text-lg">Start the Conversation</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Greet the participant warmly and introduce yourself.</li>
                <li>Ask them their name.</li>
              </ul>

              <h4 className="font-semibold text-lg">During the Chat</h4>
              <p>Ask open-ended questions like:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>How long have you lived around here?</li>
                <li>Do you enjoy living here? Why or why not?</li>
                <li>Do you have family and friends living around here?</li>
                <li>What have you been doing today? What’s on for the rest of the day?</li>
                <li>What’s been on your mind lately?</li>
              </ul>

              <p>Use reflective listening to show understanding:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>"So, you are saying that...?"</li>
                <li>"It sounds like you really enjoyed/or didn’t enjoy that?"</li>
                <li>"It sounds like you’re feeling..."</li>
              </ul>

              <p>Summarize periodically to ensure clarity and understanding.</p>

              <h4 className="font-semibold text-lg">Ending the Chat</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Thank them for taking the time to chat.</li>
                <li>Say how much you enjoyed chatting and that it’s always great to meet people from the local community.</li>
                <li>Let them know the Chat Seat will be here at different times and they’re always welcome to sit and chat.</li>
                <li>If you know when you’ll be back, invite them to join again.</li>
              </ul>

              <h4 className="font-semibold text-lg">Extra Resource</h4>
              <p>
                Tip sheet from Ending Loneliness Together:{" "}
                <Link to="https://endingloneliness.com.au/wp-content/uploads/2024/11/Conversation-Starters.pdf">
                   <strong> View PDF </strong>
                </Link>
                  
              </p>

              <p>
                Thank you for supporting your local community through conversation.
                We hope you'll continue to join future “Chat Seat” opportunities!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}