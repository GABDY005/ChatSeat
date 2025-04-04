import React from 'react';
import { Link } from 'react-router-dom';

export default function Feedback() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#003366] text-white text-center p-4 w-full fixed top-0 left-0 z-50">
        <h4 className="m-0 font-bold">Feedback Form</h4>
      </div>

      <div className="flex pt-16 min-h-screen">
        {/* Sidebar */}
        <div className="bg-[#A8E4F2] fixed top-16 left-0 h-full w-48 p-5 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <Link to="/Coordinators" className="text-[#003366] font-bold text-lg hover:underline">Coordinators</Link>
            <Link to="/Scheduling" className="text-[#003366] font-bold text-lg hover:underline">Scheduling</Link>
            <Link to="/Listener" className="text-[#003366] font-bold text-lg hover:underline">Listener</Link>
            <Link to="/Chatroom" className="text-[#003366] font-bold text-lg hover:underline">Chat Room</Link>
            <Link to="/About" className="text-[#003366] font-bold text-lg hover:underline">About</Link>
            <Link to="/Feedback" className="text-[#003366] font-bold text-lg hover:underline">Feedback</Link>
            <Link to="/Help" className="text-[#003366] font-bold text-lg hover:underline">Help</Link>
          </div>

          <div className="mt-6">
            <Link to="/" className="bg-white text-black font-bold py-2 px-4 rounded-lg inline-block hover:bg-gray-100">Logout</Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-48 flex-1 px-8 py-10">
          <div className="max-w-[600px] mx-auto text-black">
            <h2 className="font-bold mb-4">We Value Your Feedback</h2>
            <p className="mb-6">Please let us know your thoughts about your experience.</p>

            <div className="bg-white p-5 rounded-lg shadow-md">
              <form action="https://formsubmit.co/chatseatstest1@gmail.com" method="POST">
                <input type="hidden" name="_subject" value="New Feedback Submission" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="mb-3">
                  <label htmlFor="name" className="block font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="block font-medium mb-1">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="block font-medium mb-1">Your Feedback</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
