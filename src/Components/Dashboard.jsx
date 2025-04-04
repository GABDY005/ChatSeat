import React from 'react'
import { Link } from 'react-router-dom';


export default function Dashboard() {
  return (
    <>
    <div className="bg-[#003366] text-white text-center py-3">
         <h4 className="m-0 text-lg font-semibold">Welcome to Dashboard</h4>
     </div>

     <div class="flex min-h-[calc(100vh-60px)]">
         <div className="w-1/5 bg-[#A8E4F2] p-4 flex flex-col">
             <div>
                 <div className="flex flex-col p-4 space-y-4">
                     
                     <div className="nav-links space-y-4">
                        <Link to="/Coordinators" className="block text-[#003366] font-bold text-lg hover:underline">Coordinators</Link>
                        <Link to="/Scheduling" className="block text-[#003366] font-bold text-lg hover:underline">Scheduling</Link>
                        <Link to="/Listener" className="block text-[#003366] font-bold text-lg hover:underline">Listener</Link>
                        <Link to="/Chatroom" className="block text-[#003366] font-bold text-lg hover:underline"> Chat Room</Link>
                        <Link to="/About" className="block text-[#003366] font-bold text-lg hover:underline"> About</Link>
                        <Link to="/Feedback" className="block text-[#003366] font-bold text-lg hover:underline">Feedback</Link>
                        <Link to="/Help" className="block text-[#003366] font-bold text-lg hover:underline">Help</Link>
                     </div>

                 </div>

                 <div className="mt-auto pt-4">
                    
                     <Link to="/" className="bg-white text-black font-bold px-5 py-2 rounded-lg hover:bg-gray-200 inline-block">Logout</Link>
                 </div>
             </div>

             </div>

             <div className=" flex items-center justify-center p-10">
                 <div className="text-center max-w-[55%]">
                     <h2 className="font-bold text-2xl mb-5">Have a chat seat</h2>
                     <p className="font-bold mb-5">
                         The purpose behind setting up chat seat is to connect members of the community through
                         conversation.
                     </p>
                     <p className="font-bold mb-5">
                         You may find a chat seat in a library or shopping centre. You will recognise them by a banner
                         such as one shown.
                     </p>
                 </div>

             </div>
         </div>
  
     </>
  )
}

