import React from "react";
import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";

function LessonCoordinator() {
  return (
    <>
      <CoordinatorNavbar />

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
      <div className="sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar userName="Tricia" />
        </div>
        <div className="flex-1 p-10">
          <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
              Welcome, Coordinator!
            </h2>

            <p className="mb-4">
              Thank you for agreeing to volunteer your time as a Coordinator of
              one of our Chat Seats locations.
            </p>

            <p className="mb-4">
              Coordinators are individuals who are also volunteers and may also
              choose to be Listeners. They will:
            </p>

            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Identify venues where to place Chat Seats</li>
              <li>Gain the permission of the venue “owner/manager”</li>
              <li>Attract Listeners</li>
              <li>Assess the Listeners’ suitability</li>
              <li>
                Advise them of the clearances they may need (e.g., Working with
                Children Certificate)
              </li>
              <li>
                Advise them of the website and resources available to Listeners
              </li>
              <li>
                Advise them that there is a calendar available on the website to
                nominate their times
              </li>
              <li>
                Advise them that there is a Chat Room on the website to talk
                with other volunteers
              </li>
            </ul>

            <p className="mb-4">
              On this page you will find some information about “Lessons
              Learned,” which is what we and other coordinators have learned
              when setting up a Chat Seat. There is also some information on
              what we said when attracting Listeners. There are graphics that we
              used on the banner, name tags, and logos. You are very welcome to
              use them.
            </p>

            <p className="mb-4">
              A Chat Room is also available where you can chat with other
              Coordinators to exchange ideas or give support.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LessonCoordinator;
