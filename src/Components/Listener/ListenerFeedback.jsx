import React, { useState, useEffect } from "react";
import ListenerSidebar from "./ListenerSidebar";
import supabase from "../../supabase";
import ListenerNavbar from "./ListenerNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Feedback() {
  const [firstName, setFirstName] = useState("User");
  // const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

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
      toast.warning("You must be logged in to submit feedback.");
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
      toast.error("Oops! Something went wrong. Please try again later.");
    } else {
      toast.success("Thank you for your feedback!");
      setMessage("");
    }
  };

  //it will get the user data from database
  
  
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const {
  //       data: { user },
  //       error: authError,
  //     } = await supabase.auth.getUser();

  //     if (!user || authError) {
  //       navigate("/");
  //       return;
  //     }

  //     const { data: profile, error: profileError } = await supabase
  //       .from("profiles")
  //       .select("first_name, role")
  //       .eq("id", user.id)
  //       .single();

  //     if (!profile || profileError) {
  //       navigate("/");
  //       return;
  //     }

      
  //     if (
  //       profile.role !== "listener" &&
  //       profile.role !== "coordinator" &&
  //       profile.role !== "admin"
  //     ) {
  //       navigate("/");
  //       return;
  //     }

  //     setFirstName(profile.first_name);
  //     setUserRole(profile.role);
  //   };

  //   fetchUser();
  // }, [navigate]);
  useEffect(() => {
    sessionStorage.getItem("userRole") === "admin"
      ? setUserRole("admin")
      : setUserRole("listener");
  }, []);
  return (
    <>
    {userRole === "admin" ? (
        <AdminNavbar title="Listener Dashboard" />
      ) : (
   <ListenerNavbar title="Your Feedback Matters" />
      )}
     
      <div className="flex flex-col lg:flex-row min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <ListenerSidebar userName={firstName} />
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-t-4 border-blue-600 text-black">
            <h2 className="text-2xl font-bold text-center text-[#1E3A8A] mb-2">We Value Your Feedback</h2>
            <p className="text-center text-gray-600 mb-6">
              Please let us know your thoughts about your experience.
            </p>

 
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="block font-medium mb-1">
                    {" "}
                    Your Feedback
                  </label>

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="6"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  {loading ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>
            </div>
          </div>
        </div>
      
    </>
  );
}
