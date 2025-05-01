import React from "react";
import logo from "../../assets/Logo.jpg";


export default function CoordinatorNavbar({title = "Coordinator Dashboard" }) {
  const handleLogoClick = () => {
    window.location.reload();
  };
  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#003366] text-white h-16 shadow-md flex items-center justify-between px-6">
        <div
          onClick={handleLogoClick}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <img
            src={logo}
            alt="Chat Seat Logo"
            className="w-10 h-10 object-cover  border-2 border-black shadow cursor-pointer"
          />
        </div>
        <div>
          <h1 className="text-white font-semibold text-2xl sm:text-3xl tracking-wide">
            {title}
          </h1>
        </div>
        <div className="w-10 h-10" />
      </nav>
    </>
  );
}


