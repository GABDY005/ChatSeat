import React, { useEffect, useState } from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import supabase from "../../supabase";
import AdminNavbar from "./AdminNavbar";

export default function Feedback() {
  const [firstName, setFirstName] = useState("User");
  const [feedback, setFeedback] = useState([]);

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

  useEffect(() => {
    const fetchFeedback = async () => {
      const { data, error } = await supabase
        .from("feedback")
        .select("id, user_id, name, email,role, message, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching feedback:", error);
      } else {
        setFeedback(data);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <>
      <AdminNavbar title="Feedback" />
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]" />
        <AdminSidebar userName={firstName} />

        <div className="flex-1 px-8 py-10">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">
            📬 Feedback from Listeners & Coordinators
          </h2>

          {feedback.map((item) => (
            <div key={item.id} className="bg-white shadow rounded p-4 mb-4">
              <p className="font-medium">{item.message}</p>
              <p className="text-sm text-gray-500 mt-2">
                <span className="font-semibold">Role:</span> {item.role || ""} <br />
                <span className="font-semibold">Name:</span>{" "}
                {item.name || "N/A"} <br />
                <span className="font-semibold">Email:</span>{" "}
                {item.email || "N/A"} <br />
                <span className="font-semibold">Submitted:</span>{" "}
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* <div className="ml-48 flex-1 px-8 py-10">
          <div className="max-w-[600px] mx-auto text-black">
            <h2 className="font-bold mb-4">We Value Your Feedback</h2>
            <p className="mb-6">
              Please let us know your thoughts about your experience.
            </p>

            <div className="bg-white p-5 rounded-lg shadow-md">
              <form
                action="https://formsubmit.co/chatseatstest1@gmail.com"
                method="POST"
              >
                <input
                  type="hidden"
                  name="_subject"
                  value="New Feedback Submission"
                />
                <input type="hidden" name="_captcha" value="false" />

                <div className="mb-3">
                  <label htmlFor="name" className="block font-medium mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="block font-medium mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="block font-medium mb-1">
                    Your Feedback
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                  Submit Feedback
                </button>
              </form>
            </div> */}
      </div>
    </>
  );
}
