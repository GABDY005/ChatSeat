import React, { useState, useEffect } from "react";
import ListenerSidebar from "./ListenerSidebar";
import supabase from "../../supabase";
import ListenerNavbar from "./ListenerNavbar";

export default function Feedback() {
  const [firstName, setFirstName] = useState("User");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //It prevents the page from reloading when the feedback is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //it will get the user data from database
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    //it will check whether the user is log in or not
    if (!user || authError) {
      alert("You must be logged in to submit feedback.");
      setLoading(false);
      return;
    }

    //To get the details of user from database
    const { data: profile } = await supabase
      .from("profiles")
      .select("first_name, email")
      .eq("id", user.id)
      .single();

    //It will take the inserted feedback to the database  
    const { error } = await supabase.from("feedback").insert([
      {
        user_id: user.id,
        message: message,
        role: "Listener",
        name: profile?.first_name || "Unknown",
        email: profile?.email || "Unknown",
      },
    ]);

    setLoading(false);

    //if-else to check if the feedback block is empty or not
    if (error) {
      console.error("Feedback insert error:", error);
      alert("Oops! Something went wrong. Please try again later.");
    } else {
      alert("Thank you for your feedback!");
      setMessage("");
    }
  };

  //it will get the user data from database
   useEffect(() => {
     const fetchUserProfile = async () => {
       const { data: { user } } = await supabase.auth.getUser();

       if (user) {
         const { data: profile } = await supabase
           .from("profiles")
           .select("first_name, email")
           .eq("id", user.id)
           .single();

         if (profile?.first_name) setFirstName(profile.first_name);
         if (profile?.email) setEmail(profile.email);
       }
     };
     fetchUserProfile();
   }, []);

  return (
    <>
      <ListenerNavbar title="Your Feedback Matters" />
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <ListenerSidebar userName={"firstName"} />
        </div>

        <div className="ml-48 flex-1 px-8 py-10">
          <div className="max-w-[600px] mx-auto text-black">
            <h2 className="font-bold mb-4">We Value Your Feedback</h2>
            <p className="mb-6">
              Please let us know your thoughts about your experience.
            </p>

            <div className="bg-white p-5 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="block font-medium mb-1">
                    {" "}
                    Your Feedback
                  </label>

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
                >
                  {loading ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
