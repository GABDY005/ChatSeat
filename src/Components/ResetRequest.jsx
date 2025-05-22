import React, { useState } from "react";
import supabase from "../supabase";

export default function ResetRequest() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetRequest = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://chatseats.com.au/reset-password",
    });

    setMessage(
      error ? "Error: " + error.message : "Password reset link sent to your email."
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#A8E4F2]">
      <form onSubmit={handleResetRequest} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-[#1E3A8A]">Forgot Password</h2>
        <input
          type="email"
          className="w-full border p-3 rounded mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-[#003366] text-white py-2 rounded">
          Send Reset Link
        </button>
        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
}