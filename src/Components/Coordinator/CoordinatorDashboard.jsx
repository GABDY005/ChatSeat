import React from "react";
import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";

function CoordinatorDashboard() {
  return (
    <>
      <CoordinatorNavbar title="Dashboard"/>

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
      <div className="sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar userName="" />
        </div>

        <div className="flex-1 flex items-center justify-center p-10">
          <div className="text-center max-w-[600px]">
            <h2 className="font-bold text-3xl mb-5 text-[#1E3A8A]">
              Welcome, Coordinators
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              You're now logged into your dashboard where you can manage
              appointments, update availability, give feedback and more.
            </p>
            <p className="text-lg text-gray-700">
              Use the sidebar on the left to navigate through the available
              options. Let's make meaningful conversation happen!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CoordinatorDashboard;
