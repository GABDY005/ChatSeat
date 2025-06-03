import ListenerSidebar from "./ListenerSidebar";
import ListenerNavbar from "./ListenerNavbar";
import { Link } from "react-router-dom";
import AdminNavbar from "../Admin/AdminNavbar";
import ListenerFeedbackWidget from "./ListenerFeedback";
import { useSelector } from "react-redux";

export default function ListenerDashboard() {
  const user = useSelector((state) => state.loggedInUser.success);

  return (
    <>
      {user.role === "admin" ? (
        <AdminNavbar title="Listener Dashboard" />
      ) : (
        <ListenerNavbar title="Listener Dashboard" />
      )}
      <div className="flex flex-col lg:flex-row min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <ListenerSidebar />
        </div>

        <div className="flex-1 p-6 sm:p-10">
          <div className="max-w-4xl mx-auto bg-white sm:p-10 p-6 rounded-2xl shadow-lg space-y-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-[#1E3A8A] mb-4">
                Welcome, Listeners!
              </h2>
              <p className="text-gray-700 text-lg">
                Thank you for agreeing to volunteer some of your time as a
                Listener on our Chat Seats. On this page you will find some
                information about your role as a Listener.
              </p>
            </div>
            <div className="flex-1 p-6 sm:p-10">
              <div className="max-w-4xl mx-auto rounded-2xl  space-y-6">
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
                    Use the <strong>Booking tab</strong> to choose your Chat
                    Seat venue and time.
                  </p>
                  <p className="text-gray-800 mb-2">
                    Use the <strong>Chat room</strong> to exchange ideas with
                    other Listeners.
                  </p>
                  <p className="text-gray-800">
                    Provide your <strong>Feedback</strong> through the{" "}
                    <strong>Feedback tab</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ListenerFeedbackWidget />
    </>
  );
}
