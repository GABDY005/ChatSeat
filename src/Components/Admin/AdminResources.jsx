import React from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import AdminNavbar from "./AdminNavbar";

function AdminResources() {
  return (
    <>
      <AdminNavbar title="Resources" />

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
<div className="sticky top-16 h-[calc(100vh-64px)]" />
        <AdminSidebar userName="Tricia" />
      </div>
    </>
  );
}
export default AdminResources;
