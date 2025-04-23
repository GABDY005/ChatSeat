import React from "react";
import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";

function CoordinatorChatroom() {
  return (
    <>
      <CoordinatorNavbar title="Let's talk" />

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
            <div className="sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar userName="Tricia" />
        </div>
      </div>
    </>
  );
}

export default CoordinatorChatroom;
