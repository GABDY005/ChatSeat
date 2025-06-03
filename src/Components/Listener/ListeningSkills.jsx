import { useEffect, useState } from "react";
import ListenerSidebar from "./ListenerSidebar";
import supabase from "../../supabase";
import ListenerNavbar from "./ListenerNavbar";
import AdminNavbar from "../Admin/AdminNavbar";

import ListenerFeedbackWidget from "./ListenerFeedback";

export default function ListeningSkills() {
  const [firstName, setFirstName] = useState("User");
  const [userRole, setUserRole] = useState("");

  // Fetch the user's first name from local storage or supabase
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
        <ListenerNavbar title="Listener Guide" />
      )}

      <div className="flex flex-col lg:flex-row min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="lg:sticky top-16 h-auto lg:h-[calc(100vh-64px)]">
          <ListenerSidebar userName={firstName} />
        </div>

         <div className="flex-1 px-4 sm:px-6 py-10 w-full">
          <h2 className="text-4xl font-bold text-center text-[#1E3A8A] mb-2">
            Chat Seats – Listener Guide
          </h2>
          <p className="text-center text-gray-600 mb-10 text-lg">
            Connecting Through Conversation
          </p>

          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            <div className="w-full sm:w-[45%] lg:w-[30%] bg-blue-50 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold text-[#003366] mb-2">1. Active Listening</h3>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Listen attentively without interrupting.</li>
                <li>Validate their feelings and experiences.</li>
              </ul>
            </div>

            <div className="w-full sm:w-[45%] lg:w-[30%] bg-green-50 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold text-green-700 mb-2">2. Empathy and Support</h3>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Respond with empathy and understanding.</li>
                <li>Encourage them to express themselves freely.</li>
              </ul>
            </div>

            <div className="w-full sm:w-[45%] lg:w-[30%] bg-yellow-50 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold text-yellow-700 mb-2">3. Maintain Boundaries</h3>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Understand your limits in providing support.</li>
                <li>Avoid personal advice or solutions; focus on facilitating conversation.</li>
              </ul>
            </div>

            <div className="w-full sm:w-[45%] lg:w-[30%] bg-purple-50 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold text-purple-700 mb-2">Best Practices</h3>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li><strong>Confidentiality:</strong> Maintain strict confidentiality about all conversations.</li>
                <li><strong>Respect Differences:</strong> Be aware of and respect cultural, gender, age, social, and personal differences.</li>
              </ul>
            </div>

            <div className="w-full sm:w-[45%] lg:w-[30%] bg-red-50 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold text-red-700 mb-2">If Something Seems Not Right</h3>
              <ul className="list-disc ml-5 space-y-1 text-sm">
                <li>Remain calm and ensure they feel heard.</li>
                <li>Ask them if they are okay?</li>
                <li>Ask if they would like you to contact someone.</li>
                <li>If needed, contact local crisis services or emergency contacts for immediate support.</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-base text-gray-800 max-w-4xl mx-auto space-y-2 px-2 text-center">
            <p>We hope that you find this guide sheet helpful.</p>
            <p>
              Thank you for taking the time to support your local community through chatting with some of its members. We hope that you will be able to commit to further “Chat” time in the future.
            </p>
            </div>
          </div>
        </div>
      <ListenerFeedbackWidget />
    </>
  );
}