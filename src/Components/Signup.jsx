import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../Controller/UserController";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signupUser({ email, password, firstName, lastName });
      alert("Signup successful!");
      navigate("/Login");
    } catch (error) {
      console.error("Signup error:", error.message);
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#A8E4F2] px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#1E3A8A] mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSignup}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Create Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-[#003366] text-white py-3 rounded-md font-semibold hover:bg-[#1E3A8A] transition"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/Login"
            className="text-black font-semibold hover:underline"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
