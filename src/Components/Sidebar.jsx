import { Link } from "react-router-dom";

export default function Sidebar({ userName = "Guest" }) {
  return (
    <>
      <div className="w-64 bg-[#A8E4F2] min-h-screen flex flex-col justify-between p-6">
        <div className="mb-6 text-[#1E3A8A] font-semibold text-lg">
          👋 Hello, {userName}
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <Link
            to="/Coordinators"
            className="bg-white text-[#1E3A8A] font-medium px-4 py-2 rounded-full shadow hover:bg-[#d9eefe] hover:shadow-md transition text-center"
          >
            Coordinators
          </Link>
          <Link
            to="/Scheduling"
            className="bg-white text-[#1E3A8A] font-medium px-4 py-2 rounded-full shadow hover:bg-[#d9eefe] hover:shadow-md transition text-center"
          >
            Scheduling
          </Link>
          <Link
            to="/Listener"
            className="bg-white text-[#1E3A8A] font-medium px-4 py-2 rounded-full shadow hover:bg-[#d9eefe] hover:shadow-md transition text-center"
          >
            Listener
          </Link>
          <Link
            to="/Chatroom"
            className="bg-white text-[#1E3A8A] font-medium px-4 py-2 rounded-full shadow hover:bg-[#d9eefe] hover:shadow-md transition text-center"
          >
            Chatroom
          </Link>
          <Link
            to="/Help"
            className="bg-white text-[#1E3A8A] font-medium px-4 py-2 rounded-full shadow hover:bg-[#d9eefe] hover:shadow-md transition text-center"
          >
            Help
          </Link>
          <Link
            to="/About"
            className="bg-white text-[#1E3A8A] font-medium px-4 py-2 rounded-full shadow hover:bg-[#d9eefe] hover:shadow-md transition text-center"
          >
            About Us
          </Link>
          <Link
            to="/Feedback"
            className="bg-white text-[#1E3A8A] font-medium px-4 py-2 rounded-full shadow hover:bg-[#d9eefe] hover:shadow-md transition text-center"
          >
            Feedback
          </Link>
        </div>

        <div className="pt-6">
          <Link
            to="/"
            className="bg-white text-[#1E3A8A] font-medium px-4 py-2 rounded-full shadow hover:bg-[#d9eefe] hover:shadow-md transition text-center w-full"
          >
            Logout
          </Link>
        </div>
      </div>
    </>
  );
}
