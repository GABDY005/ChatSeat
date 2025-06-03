import ListenerSidebar from "./ListenerSidebar";
import ListenerNavbar from "./ListenerNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import ListenerFeedbackWidget from "./ListenerFeedback";
import { useSelector } from "react-redux";

export default function ListenerHelp() {
  const user = useSelector((state) => state.loggedInUser.success);
  return (
    <>
      {user.role === "admin" ? (
        <AdminNavbar title="Listener Dashboard" />
      ) : (
        <ListenerNavbar title="Attracting Chatters" />
      )}

      <div className="flex flex-col lg:flex-row min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="lg:sticky top-16 h-[calc(100vh-64px)]">
          <ListenerSidebar />
        </div>

        <div className="flex-1 px-6 md:px-10 py-12 w-full">
          <div className="max-w-6xl mx-auto text-black">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl shadow-md">
                <h4 className="text-xl font-semibold text-[#003366] mb-3">
                  1. Open Seating
                </h4>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>
                    Have the seating set up so it is easily accessible to
                    another person(s).
                  </li>
                  <li>
                    Place the banner to the side so the Listeners are visible.
                  </li>
                  <li>
                    Be positioned where there is a lot of foot traffic and
                    highly visible.
                  </li>
                  <li>Have tea/coffee available if possible.</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl shadow-md">
                <h4 className="text-xl font-semibold text-yellow-700 mb-3">
                  2. As Listeners
                </h4>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  <li>Make eye contact with individuals passing by.</li>
                  <li>Smile at anyone who is nearby.</li>
                  <li>Be welcoming and friendly.</li>
                  <li>Say “Hi/Hello/Good morning etc.” to those nearby.</li>
                  <li>
                    Invite them to sit down and grab a coffee or tea if
                    available.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 text-center text-base text-gray-800 space-y-2 px-2">
              <p>
                We hope that you find this guide sheet helpful. If you have
                suggestions on how it could be improved, let us know.
              </p>
              <p>
                Thank you for taking the time to support your local community
                through chatting with some of its members. We hope that you will
                be able to commit to further “Chat” time in the future.
              </p>
              <p className="italic font-semibold text-gray-600 mt-4">
                Connecting Through Conversation
              </p>
            </div>
          </div>
        </div>
      </div>
      <ListenerFeedbackWidget />
    </>
  );
}
