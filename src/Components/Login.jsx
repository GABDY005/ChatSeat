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
    <div className="font-sans bg-[#a8e4f2] ml-0 p-0 flex justify-center items-center h-[100vh]">
      <div class="login-box">
        <h2 className="font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <label className="font-bold text-primary-blue" htmlFor="email"> Username or Email:</label>
          <input className="w-full p-3 mt-2 mb-5 border-solid rounded-md"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <label className="font-bold text-primary-blue" htmlFor="password">Password:</label>
          <input className="w-full p-3 mt-2 mb-5 border-solid rounded-md"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
          />

          <button
            className="bg-[#003366] text-white font-bold p-3 rounded-md w-full cursor-pointer"
            type="submit"
          >
            Login{" "}
          </button>


        </form>

        <div class="text-center mt-3">
          <p>
            Don’t have an account?{" "}
            
            <Link to="/Signup" className="text-[#003366] font-bold"> Sign Up</Link>
              
          </p>
        </div>

        <Link to="/" className="text-center mt-6 font-bold text-none text-[#003366]">
          Back{" "}
        </Link>
      </div>
    </div>
  );
}
