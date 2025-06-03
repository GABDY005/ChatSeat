import { useEffect, useState } from "react";
import ListenerSidebar from "./ListenerSidebar";
import ListenerNavbar from "./ListenerNavbar";
import { Link } from "react-router-dom";
import AdminNavbar from "../Admin/AdminNavbar";
import ListenerFeedbackWidget from "./ListenerFeedback";

export default function ConversationSkills() {
  const [firstName, setFirstName] = useState("User");
  const [userRole, setUserRole] = useState("");
   
  useEffect(() => {
    localStorage.getItem("userRole") === "admin"
      ? setUserRole("admin")
      : setUserRole("listener");
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

        <div className="flex-1 px-4 sm:px-6 py-10 w-full">
          <h2 className="text-4xl font-bold text-center text-[#1E3A8A] mb-2">
            Chat Seats – Conversation Guide
          </h2>
          <p className="text-center text-gray-600 mb-10 text-lg">
            Connecting Through Conversation
          </p>

          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            <div className="w-full sm:w-[45%] lg:w-[30%] bg-blue-50 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold text-[#003366] mb-2">Start the Conversation</h3>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Greet the participant warmly and introduce yourself.</li>
                <li>Ask them their name.</li>
              </ul>
            </div>

            <div className="w-full sm:w-[45%] lg:w-[30%] bg-green-50 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold text-green-700 mb-2">During the Chat</h3>
              <p className="text-sm mb-1">Ask open-ended questions like:</p>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>How long have you lived around here?</li>
                <li>Do you enjoy living here? Why or why not?</li>
                <li>Do you have family and friends living around here?</li>
                <li>What have you been doing today? What’s on for the rest of the day?</li>
                <li>What’s been on your mind lately?</li>
              </ul>
              <p className="text-sm mt-3 mb-1">Use reflective listening to show understanding:</p>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>"So, you are saying that...?"</li>
                <li>"It sounds like you really enjoyed/or didn’t enjoy that?"</li>
                <li>"It sounds like you’re feeling..."</li>
              </ul>
              <p className="text-sm mt-2">Summarize periodically to ensure clarity and understanding.</p>
            </div>

            <div className="w-full sm:w-[45%] lg:w-[30%] bg-yellow-50 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold text-yellow-700 mb-2">Ending the Chat</h3>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Thank them for taking the time to chat.</li>
                <li>Say how much you enjoyed chatting and that it’s always great to meet people from the local community.</li>
                <li>Let them know the Chat Seat will be here at different times and they’re always welcome to sit and chat.</li>
                <li>If you know when you’ll be back, invite them to join again.</li>
              </ul>
            </div>

            <div className="w-full sm:w-[45%] lg:w-[30%] bg-purple-50 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold text-purple-700 mb-2">Extra Resource</h3>
              <p className="text-sm">
                Tip sheet from Ending Loneliness Together: {" "}
                <Link
                  to="https://endingloneliness.com.au/wp-content/uploads/2024/11/Conversation-Starters.pdf"
                  className="text-blue-600 hover:underline"
                >
                  <strong>View PDF</strong>
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-12 text-base text-gray-800 max-w-4xl mx-auto space-y-2 px-2 text-center">
            <p>Thank you for supporting your local community through conversation.</p>
            <p>We hope you'll continue to join future “Chat Seat” opportunities!</p>
          </div>
          </div>
        </div>
      <ListenerFeedbackWidget />
    </>
  );
}