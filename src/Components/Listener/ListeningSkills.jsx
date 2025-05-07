import React, { useEffect, useState } from "react";
import ListenerSidebar from "./ListenerSidebar";
import supabase from "../../supabase";
import ListenerNavbar from "./ListenerNavbar";

export default function ListeningSkills() {
  const [firstName, setFirstName] = useState("User");

  useEffect(() => {
    const fetchUserName = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (user && !authError) {
        const { data: profile } = await supabase
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
      <ListenerNavbar title="Listener Guide" />
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <ListenerSidebar userName={firstName} />
        </div>

        <div className="flex-1 px-10 py-12 w-full">
          <div className="max-w-[800px] mx-auto text-black">
            <h2 className="text-2xl font-bold mb-4 text-center">Chat Seats – Listener Guide</h2>
            <p className="mb-6 text-lg text-gray-700 font-medium">
              Connecting Through Conversation
            </p>

            <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md space-y-4 text-gray-800">

              <h4 className="font-semibold text-lg">1. Active Listening</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Listen attentively without interrupting.</li>
                <li>Validate their feelings and experiences.</li>
              </ul>

              <h4 className="font-semibold text-lg">2. Empathy and Support</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Respond with empathy and understanding.</li>
                <li>Encourage them to express themselves freely.</li>
              </ul>

              <h4 className="font-semibold text-lg">3. Maintain Boundaries</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Understand your limits in providing support.</li>
                <li>Avoid personal advice or solutions; focus on facilitating conversation.</li>
              </ul>

              <h4 className="font-semibold text-lg">Best Practices</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Confidentiality:</strong> Maintain strict confidentiality about all conversations.</li>
                <li><strong>Respect Differences:</strong> Be aware of and respect cultural, gender, age, social, and personal differences.</li>
              </ul>

              <h4 className="font-semibold text-lg">If Something Seems Not Right</h4>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Remain calm and ensure they feel heard.</li>
                <li>Ask them if they are okay?</li>
                <li>Ask if they would like you to contact someone.</li>
                <li>If needed, contact local crisis services or emergency contacts for immediate support.</li>
              </ul>

              <p>
                We hope that you find this guide sheet helpful.
              </p>
              <p>
                Thank you for taking the time to support your local community through chatting with some of its members. We hope that you will be able to commit to further “Chat” time in the future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
