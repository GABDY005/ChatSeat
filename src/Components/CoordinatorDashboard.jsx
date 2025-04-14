import React from "react";
import SidebarCoordinator from "./SidebarCoordinator";

function CoordinatorDashboard() {
  return (
    <>
      {/* Navbar */}
      <div className="bg-[#003366] text-white h-16 flex items-center justify-center shadow-md px-6">
        <h4 className="text-xl font-bold">Coordinator Dashboard</h4>
      </div>

      {/* Main Layout */}
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <SidebarCoordinator userName="Tricia" />

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-10">
          <div className="text-center max-w-[600px]">
            <h2 className="font-bold text-3xl mb-5 text-[#1E3A8A]">Welcome, Coordinators</h2>
            <p className="text-lg text-gray-700 mb-4">
              You're now logged into your dashboard where you can manage appointments,
              update availability, give feedback and more.
            </p>
            <p className="text-lg text-gray-700">
              Use the sidebar on the left to navigate through the available options.
              Let's make meaningful conversation happen!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CoordinatorDashboard;
