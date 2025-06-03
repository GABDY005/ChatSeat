import { useState } from "react";
import supabase from "../../supabase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function Feedback() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.loggedInUser.success);
  const [open, setOpen] = useState(false);

  

  //To prevent the page from reloading when the feedback is submitted
  // useEffect(() => {
  //   localStorage.getItem("userRole") === "admin"
  //     ? setUserRole("admin")
  //     : setUserRole("Coordinator");
  // }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user.id) {
      toast.warning("You must be logged in to submit feedback.");
      setLoading(false);
      return;
    }

    //It will take the inserted feedback to the database
    const { error } = await supabase.from("feedback").insert([
      {
        user_id: user.id,
        message: message,
        role: user.role || "Coordinator",
        name: user.first_name || "Unknown",
        email: user.email || "Unknown",
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
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 text-sm"
              >
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
