import React from "react";
import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";

function CoordinatorDashboard() {
  return (
    <>
      <CoordinatorNavbar title="Dashboard" />

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar userName="" />
        </div>

        <div className="flex-1 p-10">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-blue-100 text-gray-800 text-md space-y-4">
          <h2 className="text-4xl font-bold text-[#1E3A8A] mb-10 text-center">
            Welcome, Coordinators!
          </h2>
            <p>
              Thank you for agreeing to volunteer your time as a Coordinator of
              one of our Chat Seats locations. Coordinators are individuals who
              are also volunteers and may also choose to be Listeners. They
              will:
            </p>

            <ul className="list-disc pl-8 space-y-2">
              <li>Identify venues where to place Chat Seats</li>
              <li>Gain the permission of the venue “owner/manager”</li>
              <li>Attract Listeners</li>
              <li>Assess the Listeners’ suitability</li>
              <li>
                Advise them of the clearances they may need (e.g., Working with
                Children Certificate)
              </li>
              <li>
                Advise of the website and resources available to Listeners
              </li>
              <li>
                Advise them that there is a calendar available on the website to
                nominate their times when they will be volunteering
              </li>
              <li>
                Advise them that there is a Chat Room on the website for them to
                talk with other volunteers
              </li>
            </ul>

            <p>
              On this page you will find some information about “Lessons
              Learned” which is what we and other coordinators have learned when
              setting up a Chat Seat. There is also some information on what we
              said when attracting Listeners. There are graphics that we used on
              the banner, name tags and logos. You are very welcomed to use
              them.
            </p>

            <p>
              A Chat Room is also available where you can chat with other
              Coordinators to exchange ideas or give support.
            </p>

            <p>
              Also, if you would like to provide any feedback to us, please
              contact us.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CoordinatorDashboard;
