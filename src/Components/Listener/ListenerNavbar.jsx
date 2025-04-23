import React from "react";

export default function ListenerNavbar({title="Listener Dashboard"}) {
    return (
        <div className="fixed top-0 w-full z-50 bg-[#003366] text-white h-16 flex items-center justify-center shadow-md px-6">
            <h4 className="text-xl font-bold">{title}</h4>
        </div>
    );  
}