import React, { useState, useEffect } from "react";
import ListenerSidebar from "./ListenerSidebar";
import supabase from "../../supabase";
import ListenerNavbar from "./ListenerNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Feedback() {
  const [firstName, setFirstName] = useState("User");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  //It prevents the page from reloading when the feedback is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    //it will get the user data from database
    // const {
    //   data: { user },
    //   error: authError,
    // } = await supabase.auth.getUser();

    //it will check whether the user is log in or not
    if (!userId) {
      toast.warning("You must be logged in to submit feedback.");
      setLoading(false);
      return;
    }

    //To get the details of user from database
    const { data: profile } = await supabase
      .from("profiles")
      .select("first_name, email")
      .eq("id", userId)
      .single();

    //It will take the inserted feedback to the database  
    const { error } = await supabase.from("feedback").insert([
      {
        user_id: userId,
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
  
  
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!user || authError) {
        navigate("/");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("first_name, role")
        .eq("id", user.id)
        .single();

      if (!profile || profileError) {
        navigate("/");
        return;
      }

      
      if (
        profile.role !== "listener" &&
        profile.role !== "coordinator" &&
        profile.role !== "admin"
      ) {
        navigate("/");
        return;
      }

      setFirstName(profile.first_name);
       setEmail(profile.email || "Unknown");
      setUserRole(profile.role);
      setUserId(user.id);
      
    };

    fetchUser();
  }, [navigate]);
  useEffect(() => {
    localStorage.getItem("userRole") === "admin"
      ? setUserRole("admin")
      : setUserRole("listener");
  }, []);
  return (
    <>
    <div className="fixed bottom-6 right-6 z-50">
{!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-[#003366] text-white px-4 py-2 rounded-full shadow-lg"
        >
          💬 Feedback
        </button>
      ) : (
        <div className="w-[400px]  bg-white border border-gray-300 rounded-lg shadow-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-[#003366]">Your Feedback</h4>
            <button onClick={() => setOpen(false)} className="text-gray-500 text-sm">
              ✖
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-24 p-2 border rounded"
              placeholder="Write your thoughts..."
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#003366] text-white py-1 rounded"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      )}
    </div>
  
    </>
  );
}
