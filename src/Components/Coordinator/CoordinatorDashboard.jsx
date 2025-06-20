import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import FeedbackWidget from "./CoordinatorFeedback";
import { useSelector } from "react-redux";

function CoordinatorDashboard() {
  const user = useSelector((state) => state.loggedInUser.success);

  return (
    <>
      {user.role === "admin" ? (
        <AdminNavbar title="Coordinator Dashboard" />
      ) : (
        <CoordinatorNavbar title="Coordinator Dashboard" />
      )}

      <div className="flex h-screen overflow-hidden">
        <div className="w-64 bg-[#A8E4F2] h-screen sticky top-0 overflow-y-auto">
          <CoordinatorSidebar />
        </div>

        <main className="flex-1 overflow-y-auto bg-[#e6f4f9]">
          <div className="p-6 sm:p-8 md:p-10 max-w-5xl mx-auto mt-8">
            <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-md border border-blue-100 text-gray-800 space-y-8 mt-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#1E3A8A]">
                Welcome, Coordinators!
              </h2>

              <p className="text-center text-gray-700 text-lg max-w-3xl mx-auto">
                Thank you for volunteering your time to serve as a Coordinator
                for one of our Chat Seats. This page outlines your
                responsibilities and available resources to help you support our
                community effectively.
              </p>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-semibold text-blue-900 text-xl mb-4">
                  Your Role
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-800">
                  <li>Identify venues where Chat Seats can be placed</li>
                  <li>Obtain permission from the venue manager or owner</li>
                  <li>Recruit Listeners and assess their suitability</li>
                  <li>
                    Advise Listeners on necessary clearances (e.g., Working with
                    Children Certificate)
                  </li>
                  <li>Introduce Listeners to available resources and tools</li>
                  <li>
                    Guide them to nominate volunteering times on the calendar
                  </li>
                  <li>
                    Encourage use of the Chat Room to connect with fellow
                    volunteers
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="font-semibold text-purple-900 text-xl mb-4">
                  Coordinator Resources
                </h3>
                <p className="text-gray-800">
                  This section includes useful tips from experienced
                  coordinators, examples of successful outreach strategies, and
                  branding materials like banners, logos, and name tags that
                  you're welcome to use.
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="font-semibold text-green-900 text-xl mb-4">
                  Tools and Support
                </h3>
                <p className="text-gray-800 mb-2">
                  Use the <strong>Availability</strong> tab to schedule times
                  and manage locations.
                </p>
                <p className="text-gray-800 mb-2">
                  Use the <strong>Coordinator Chat Room</strong> to collaborate
                  and exchange ideas with other coordinators.
                </p>
                <p className="text-gray-800">
                  Submit your thoughts or report issues through the{" "}
                  <strong>Feedback</strong> tab.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <FeedbackWidget />
    </>
  );
}

export default CoordinatorDashboard;
