import React, { useEffect, useState } from "react";
import ListenerSidebar from "./ListenerSidebar";
import supabase from "../../supabase";
import ListenerNavbar from "./ListenerNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
import ListenerFeedbackWidget from "./ListenerFeedback";
import { Link } from "react-router-dom";

export default function ListenerResources() {
  const [firstName, setFirstName] = useState("User");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

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
    localStorage.getItem("userRole") === "admin"
      ? setUserRole("admin")
      : setUserRole("listener");
  }, []);
  return (
    <>
      {userRole === "admin" ? (
        <AdminNavbar title="Listener Dashboard" />
      ) : (
        <ListenerNavbar title="Resources" />
      )}

      <div className="flex flex-col lg:flex-row min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <ListenerSidebar userName={firstName} />
        </div>

<div className="flex-1 p-6 sm:p-10">
          <div className="max-w-4xl mx-auto bg-white sm:p-10 p-6 rounded-2xl shadow-lg space-y-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-[#1E3A8A] mb-4">
                Guide for Chat Seat
              </h2>
              <p className="text-gray-700 text-lg">
                Thank you for agreeing to volunteer some of your time as a
                Listener on our Chat Seats. On this page you will find some
                information about your role as a Listener.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#f0f8ff] p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold text-[#1E3A8A] mb-4">
                  Learn More About Listening
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-800">
                  <li>
                    <Link
                      to="/listener/listening-skills"
                      className="text-[#1E3A8A] hover:underline"
                    >
                      Good Listening Skills
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/listener/conversation-skills"
                      className="text-[#1E3A8A] hover:underline"
                    >
                      Good Conversation Skills
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/listener/make-people-comfortable"
                      className="text-[#1E3A8A] hover:underline"
                    >
                      Making People Comfortable on the Chat Seat
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="bg-[#f9f9fb] p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold text-[#1E3A8A] mb-4">
                  External Resources
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-800">
                  <li>
                    <Link
                      to="https://endingloneliness.com.au/"
                      className="text-[#1E3A8A] hover:underline"
                    >
                      Ending Loneliness Together
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.rosthomas.com.au/features"
                      className="text-[#1E3A8A] hover:underline"
                    >
                      Ros Thomas – Research on Loneliness
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#e8f5e9] p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-[#1E3A8A] mb-4">
                Tools and Support
              </h3>
              <p className="text-gray-800 mb-2">
                Use the <strong>Booking tab</strong> to choose your Chat Seat venue and time.
              </p>
              <p className="text-gray-800 mb-2">
                Use the <strong>Chat room</strong> to exchange ideas with other Listeners.
              </p>
              <p className="text-gray-800">
                Provide your <strong>Feedback</strong> through the <strong>Feedback tab</strong>.
              </p>
            </div>
            </div>
        {/* <div className="flex-1 p-4 sm:p-10">
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
          </div> */}
        </div>
      </div>
<ListenerFeedbackWidget />
    </>
  );
}