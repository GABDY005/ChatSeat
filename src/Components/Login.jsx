import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
   
    if (email === "trialsite@chatseat.com" && password === "ChatSeat") {
      navigate("/dashboard"); 
    } else {
      alert("Invalid login credentials!"); 
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#A8E4F2] px-4]">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-[#1E3A8A] mb-6">
              Log In
          </h2>

          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold mb-1 text-gray-700"> Email </label>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            required
          />

<label className="block text-sm font-semibold mb-1 text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
            required
          />

          <button type="submit" className="w-full bg-[#003366] text-white py-3 rounded-md font-semibold hover:bg-[#1E3A8A] transition">
            Login
          </button>
          </form>

          <div className="text-center mt-6 text-sm">
            <p>
              Don't have an account? {" "}
              <Link to="/Signup" className="text-[#1E3A8A] font-semibold hover:underline"> SignUp</Link>
            </p>

            <Link to="/" className="inline-block mt-4 text-black font-semibold hover:underline"> ⬅️Back</Link>
          </div>
        </div>
      </div>
    </>
  );
}
