import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase";
import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import { toast } from "react-toastify";

export default function Feedback() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("User");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  // const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
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
  //       .select("first_name, role, email")
  //       .eq("id", user.id)
  //       .single();

  //     if (!profile ||
  //       profileError ||
  //       !["admin", "coordinator"].includes(profile.role)
  //     ) {
  //       navigate("/");
  //       return;
  //     }


  //     setFirstName(profile.first_name);
  //     setUserRole(profile.role);
  //     setEmail(profile.email);
  //     setUserId(user.id);
  //   };

  //   fetchUserInfo();
  // }, [navigate]);

  //To prevent the page from reloading when the feedback is submitted
    useEffect(() => {
      localStorage.getItem("userRole") === "admin"
        ? setUserRole("admin")
        : setUserRole("Coordinator");
    }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!userId) {
      toast.warning("You must be logged in to submit feedback.");
      setLoading(false);
      return;
    }

    //It will take the inserted feedback to the database
    const { error } = await supabase.from("feedback").insert([
      {
        user_id: userId,
        message: message,
        role: "Coordinator",
        name: firstName || "Unknown",
        email: email || "Unknown",
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
      setOpen(false);
    }
  };

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
  
    
      {/* {userRole === "admin" ? (
        <AdminNavbar title="Coordinator Dashboard" />
      ) : (
        <CoordinatorNavbar title="Your Feedback Matters" />
      )}

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="w-full sm:w-auto sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar userName={firstName} />
        </div>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
          <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-t-4 border-blue-600">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-[#1E3A8A] mb-2">
              We Value Your Feedback
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Please let us know your thoughts about your experience.
            </p>


            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-semibold mb-1 text-gray-700">
                  {" "}
                  Your Feedback
                </label>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="6"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      </div> */}
     
    </>
  );
}
