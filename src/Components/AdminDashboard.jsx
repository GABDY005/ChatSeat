import React from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminDashboard() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#003366] text-white h-16 flex items-center justify-center shadow-md px-6">
        <h4 className="text-xl font-bold">Admin Dashboard</h4>
      </div>

     
      {/* The main content of the dashboard goes here */}
      <div className="flex min-h-[calc(100vh-64px)] bg-[#f0f6fa]">
        <AdminSidebar userName="Tricia" />
          
          {/* Main content area */}
        <div className="flex-1 flex items-center justify-center p-10">
          <div className="text-center max-w-[600px]">
            <h2 className="font-bold text-2xl mb-5 text-[#1E3A8A]">Welcome, Admin</h2>  
            <p className="text-gray-700 mb-4">
              This is your dashboard. From here, you can manage users, 
              access shared resources.
            </p>

            <p className="text-gray-700">
              Use the sidebar on the left to navigate between pages.
              Thank you for keeping things running smoothly!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
