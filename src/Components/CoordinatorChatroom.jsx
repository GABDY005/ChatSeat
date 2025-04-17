import React from "react";
import CoordinatorSidebar from "./CoordinatorSidebar";

function CoordinatorChatroom() {
    return(
        <>
        
      <div className="bg-[#003366] text-white h-16 flex items-center justify-center shadow-md px-6">
        <h4 className="text-xl font-bold">Let's Talk</h4>
      </div>

     
      <div className="flex min-h-[calc(100vh-64px)]">
        
        <CoordinatorSidebar userName="Tricia" />

        </div>

      </>
    )
    
}

export default CoordinatorChatroom;