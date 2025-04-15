import React, { useEffect, useState } from "react";
import CoordinatorSidebar from "./CoordinatorSidebar";
import supabase from "../supabase";

export default function CoordinatorFeedback() {
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
        <h4 className="text-xl font-bold">Feedback</h4>
      </div>
      <div className="flex min-h-[calc(100vh-60px)]">
        <CoordinatorSidebar userName={firstName} />

        <div className="ml-48 flex-1 px-8 py-10">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
