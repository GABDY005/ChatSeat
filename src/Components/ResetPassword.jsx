import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";
import Navbar from "./Navbar";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Effect to handle password reset link from URL hash
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

  // Function to handle password reset
  const handleReset = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return setMessage("Reset failed: " + error.message);

    setMessage("Password updated successfully!");
    setTimeout(() => navigate("/Login"), 2000);
  };

  return (
    <>
      <Navbar />
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
