import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase";
import logo from "../assets/Logo.jpg";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      supabase.auth
        .setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        .then(({ error }) => {
          if (error) {
            setMessage("Session error: " + error.message);
          }
        });
    } else {
      setMessage("Invalid or expired password reset link.");
    }
  }, []);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return setMessage("Reset failed: " + error.message);

    setMessage("Password updated successfully!");
    setTimeout(() => navigate("/Login"), 2000);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#003366] shadow-lg w-full">
        <div className="flex items-center justify-around px-4 md:px-8 py-4 md:py-5">
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

          {/* Desktop Navigation */}
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
        </div>
      </nav>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
          {message && <p className="mb-4 text-red-500">{message}</p>}
          <form onSubmit={handleReset}>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
