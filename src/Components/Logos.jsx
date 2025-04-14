import React from "react";
import SidebarCoordinator from "./SidebarCoordinator";

function Logos() {
    return(
        <>
        {/* Navbar */}
      <div className="bg-[#003366] text-white h-16 flex items-center justify-center shadow-md px-6">
        <h4 className="text-xl font-bold">Logos</h4>
      </div>

      {/* Main Layout */}
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <SidebarCoordinator userName="Tricia" />

        </div>

      </>
    )
}
export default Logos;