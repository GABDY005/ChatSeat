import React from "react";
import { Link } from "react-router-dom";


export default function Login() {
  return (
    <div className="font-sans bg-[#a8e4f2] ml-0 p-0 flex justify-center items-center h-[100vh]">
      <div class="login-box">
        <h2 className="font-bold text-center mb-6">Login</h2>
        <form action="dashboard.html" method="get">
          <label className="font-bold text-primary-blue" for="email"> Username or Email:</label>
          <input className="w-full p-3 mt-2 mb-5 border-solid rounded-md"
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            required
          />

          <label className="font-bold text-primary-blue" for="password">Password:</label>
          <input className="w-full p-3 mt-2 mb-5 border-solid rounded-md"
            type="password"
            name="password"
            id="password"
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
