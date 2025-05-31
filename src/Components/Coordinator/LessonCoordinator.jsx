import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
// import supabase from "../../supabase";
// import { checkUserRole } from "../../Controller/UserController";
// import { toast } from "react-toastify";
import FeedbackWidget from "./CoordinatorFeedback";

function LessonCoordinator() {
  const [firstName, setFirstName] = useState("User");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  // const [role, setRole] = useState("");
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     const { data: { user }, error } = await supabase.auth.getUser();
  //     if (error || !user) {
  //       navigate("/");
  //       return;
  //     }

  //     setUserId(user.id);

  //     const isCoordinator = await checkUserRole("coordinator");
  //     const isAdmin = await checkUserRole("admin");

  //     if (!isCoordinator && !isAdmin) {
  //       toast.error("Access denied. Coordinators and Admins only.");
  //       navigate("/");
  //       return;
  //     }

  //     setRole(isAdmin ? "admin" : "coordinator");

  //     const { data: profile, error: profileError } = await supabase
  //       .from("profiles")
  //       .select("first_name, role")
  //       .eq("id", user.id)
  //       .single();

  //     if (profileError || !profile) {
  //       toast.error("Failed to load user profile.");
  //       navigate("/");
  //       return;
  //     }

  //     setFirstName(profile.first_name);
  //     setUserRole(profile.role);
  //   };

  //   verifyUser();
  // }, [navigate]);
  useEffect(() => {
    localStorage.getItem("userRole") === "admin"
      ? setUserRole("admin")
      : setUserRole("coordinator");
  }, []);
  return (
    <>
      {userRole === "admin" ? (
        <AdminNavbar title="Coordinator Dashboard" />
      ) : (
        <CoordinatorNavbar title="Resources" />
      )}

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="w-full sm:w-auto sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar userName={firstName} />
        </div>
 <div className="flex-1 p-4 sm:p-10">
          <div className="max-w-4xl mx-auto bg-white sm:p-10 p-6 rounded-2xl shadow-lg space-y-6">
            <div className="text-center"></div>
            <h2 className="text-4xl font-bold text-[#1E3A8A] mb-4">
              Lessons Learned in Establishing Chat Seats
            </h2>

            <p className="text-gray-700 text-lg">
              Below are some of the lessons we have learned when establishing Chat Seats:
            </p>


          <div className="grid sm:grid-cols-2 gap-6"></div>
            <ul className="list-disc pl-6 space-y-3 text-gray-800 bg-[#f0f8ff] p-6 rounded-xl shadow">
              <li>Selection of listeners – ensure they are interested in other peoples’ experiences and have well developed listening skills.</li>
              <li>Have one very experienced listener who sits with less experienced listeners.</li>
              <li>Listeners work in pairs.</li>
              <li>It is important that it is about listening and not counselling.</li>
              <li>Have banners and graphics ready when talking to venue managers.</li>
              <li>Be prepared to be flexible about location of Chat Seats and setup style.</li>
              <li>Complete any required induction activities at the venue.</li>
              <li>Observe all requirements of the venue.</li>
              </ul>
              <ul className="list-disc pl-6 space-y-3 text-gray-800 bg-[#f9f9fb] p-6 rounded-xl shadow">
              <li>Hold required clearances as requested by venue managers.</li>
              <li>Check in regularly with the venue manager to see if anything needs to be adjusted.</li>
              <li>Advertise available Chat Seat times on the website for each venue.</li>
              <li>Hold biannual get-togethers for listeners.</li>
              <li>Inter-generational listeners are a plus.</li>
              <li>Provide materials to help develop listening skills.</li>
              <li>Provide name badges (e.g., "Hello my name is…").</li>
              <li>It’s a bonus if tea/coffee is available at the venue.</li>
              <li>It’s great if the venue advertises the availability of Chat Seats.</li>

            </ul>
          </div>
           </div>
           </div>
        <FeedbackWidget
          userId={userId}
          firstName={firstName}
          email={email}
          role={userRole}
        />
      
    </>
  );
}

export default LessonCoordinator;
        {/* <div className="flex-1 px-4 sm:px-6 md:px-8 pt-8 pb-8">
  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A8A] text-center">
    Volunteer Callout – Chat Seats
  </h2>

  <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-6">
    We are looking for volunteers who enjoy listening to others and want to help create a connected, supportive community through Chat Seats.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
   
    <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-blue-900 mb-2">About the Chat Seat</h3>
      <p>
        We’ll be setting up a <strong>Chat Seat</strong> in <em>“Name your Venue”</em>. Its purpose is to help community members connect through conversation.
      </p>
    </div>

    <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-green-900 mb-2">What’s Involved</h3>
      <p>
        Volunteers will spend time listening at the Chat Seat. This helps people who may be lonely feel heard and supported by the community.
      </p>
    </div>

 
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-yellow-900 mb-2">Who We’re Looking For</h3>
      <p>
        We need individuals who enjoy listening and can commit just two hours a week. Right now, we're looking for <strong>five</strong> volunteers.
      </p>
    </div>

    <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-purple-900 mb-2">Next Steps</h3>
      <p className="mb-2">
        Visit&nbsp;
        <Link to="https://chatseats.com.au" className="text-blue-600 underline">
          chatseats.com.au
        </Link>{" "}
        to find out more.
      </p>
      <p>If you’re still interested, message me to learn more about what’s involved.</p>
    </div>
  </div>
</div> */}

       