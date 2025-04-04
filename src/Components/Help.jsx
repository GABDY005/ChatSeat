import React from 'react'
import { Link } from 'react-router-dom'

export default function Help() {
  return (
    <>
       <div className="bg-[#003366] text-white text-center py-3">
         <h4 className="m-0 text-lg font-semibold">Help</h4>
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
            <div className="ml-56 px-10 py-12 w-full">
                <div className="max-w-[800px] mx-auto text-black">
                    <h2 className="text-2xl font-bold mb-4">How to Use the Website</h2>
                    <p className='mb-6'>Follow these instructions to navigate and use the website effectively.</p>

                    <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md space-y-6">

                        <h4 className="font-semibold text-lg">Dashboard</h4>
                        <p>- The left sidebar allows you to access different pages like booking, chat room, and feedback.</p>

                        <h4 className="font-semibold text-lg">Book Your Slot</h4>
                        <p>- Choose an available time slot and confirm your booking.</p>

                        <h4 className="font-semibold text-lg">Chat Room</h4>
                        <p>- In the chat room, you can start a new discussion by clicking "New Topic", or reply to existing topics.</p>

                        <h4 className="font-semibold text-lg">Feedback</h4>
                        <p>- Fill out the feedback form to share your experience.</p>

                        <h4 className="font-semibold text-lg">About Us</h4>
                        <p>- If you need further assistance, contact the support team through the **"About Us"** page.</p>
                    </div>

                </div>
            </div>
        </div>
   

    </>
  )
}
