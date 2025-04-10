import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#A8E4F2] px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-[#1E3A8A] mb-6">
          Create an Account
        </h2>

        {/* Form */}
        <form action="/Login" method="get">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold mb-1 text-gray-700">First Name</label>
              <input
                type="text"
                name="first-name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold mb-1 text-gray-700">Last Name</label>
              <input
                type="text"
                name="last-name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold mb-1 text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold mb-1 text-gray-700">Create Password</label>
            <input
              type="password"
              name="password"
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

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link to="/Login" className="text-black font-semibold hover:underline">
            Back
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}

// <div className="m-0 p-0 flex justify-center items-center h-screen">

// <div class="bg-white w-full">
//     <h2 className="text-primary-blue font-bold text-center mb-6">Create an Account</h2>
//     <form  action="login.html" method="get">
//         <div class="flex gap-2">
//             <div>
//                 <label className="font-bold text-primary-blue" for="first-name">First Name:</label>
//                 <input className='w-full p-3 mt-2 mb-5' type="text" id="first-name" name="first-name" required/>
//             </div>
//             <div>
//                 <label className="font-bold text-primary-blue" for="last-name">Last Name:</label>
//                 <input className='w-full p-3 mt-2 mb-5' type="text" name="last-name" id="last-name" required/>
//             </div>
//         </div>

//         <label className="font-bold text-primary-blue" for="email">Email Address:</label>
//         <input className='w-full p-3 mt-2 mb-5' type="email" id="email" name="email" required/>

//         <label className="font-bold text-primary-blue" for="password">Create Password:</label>
//         <input className='w-full p-3 mt-2 mb-5' type="password" id="password" name="password" required/>

//         <button className="bg-[#002b5c]" type="submit">Sign Up</button>

//     </form>

// <Link to="/Login" className="block text-center mt-6 font-bold text-primary-blue"> Back</Link>

//   )
// }
