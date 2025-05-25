import React, { useState } from "react";
import supabase from "../supabase";
import logo from "../assets/Logo.jpg";
import { Link, useNavigate } from "react-router-dom";

export default function ResetRequest() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleResetRequest = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://chatseats.com.au/reset-password",
    });

    setMessage(
      error
        ? "Error: " + error.message
        : "Password reset link sent to your email."
    );
  };
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#003366] shadow-lg w-full">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5">
          <div
            onClick={handleLogoClick}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img
              src={logo}
              alt="ChatSeat Logo"
              className="w-12 h-12 object-cover border-2 border-white shadow-md"
            />
          </div>

          <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <h1 className="text-white font-extrabold text-xl md:text-3xl tracking-wide text-center">
              Have a Chat Seat
            </h1>
          </div>

          
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/BookedListener"
              className="bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200"
            >
              Who's at the Seat?
            </Link>
            <Link
              to="/Login"
              className="bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200"
            >
              Login
            </Link>
          </div>

          

          <div className="md:hidden">
            {isMenuOpen ? (
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-xl hover:text-gray-300"
              >
                ✕
              </button>
            ) : (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <div className="w-5 h-0.5 bg-white mb-1"></div>
                  <div className="w-5 h-0.5 bg-white mb-1"></div>
                  <div className="w-5 h-0.5 bg-white"></div>
                </div>
              </button>
            )}
          </div>
        </div>

        
        {isMenuOpen && (
          <div className="md:hidden bg-[#003366] border-t border-white/20">
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/BookedListener"
                className="block bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Who's at the Seat?
              </Link>
              <Link
                to="/Login"
                className="block bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
      <div className="min-h-screen flex items-center justify-center bg-[#A8E4F2]">
        <form
          onSubmit={handleResetRequest}
          className="bg-white p-8 rounded shadow w-full max-w-md"
        >
          <h2 className="text-xl font-bold mb-4 text-[#1E3A8A]">
            Forgot Password
          </h2>
          <input
            type="email"
            className="w-full border p-3 rounded mb-4"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#003366] text-white py-2 rounded"
          >
            Send Reset Link
          </button>
          {message && <p className="mt-4 text-center">{message}</p>}
        </form>
      </div>
    </>
  );
}
