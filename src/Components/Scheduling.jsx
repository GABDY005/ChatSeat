import React from 'react'
import { Link } from 'react-router-dom'

export default function Scheduling() {
  return (
    <>
   <div class="sidebar">
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
                    
                     <Link to="login.html" className="bg-white text-black font-bold px-5 py-2 rounded-lg hover:bg-gray-200 inline-block">Logout</Link>
                 </div>
             </div>


    
    <div class="booking-box">
        <h2> Book your Slot</h2>
        <form action="dashboard.html" method="get">

            <label for="location">Select Place:</label>
            <select id="location" name="Location" requuired>
                <option value="">----Select Location----</option>
                <option value="Tea_Tree_Plaza">Tea Tree Plaza</option>
                <option value="Campbelltown_Library">Campbelltown Library</option>
                <option value="Rundle_Mall">Rundle Mall</option>
                <option value="Burnside">Burnside</option>
                <option value="Greenacres_Library">Greenacres Library</option>
                <option value="Prospect_Library">Prospect Library</option>
        </select>
        
        <label for="date">Select Date:</label>
        <input type="date" id="date" name="date" required />

        <label for="time"> Select Time:</label>
        <input type="time" id="time" min="09:00" max="16:00" step="3600" required />

        <button type="button" id="book-slot">Book Slot</button>
        
        </form>
    
        <div class="confirmation-box" id="confirmation-box">
            <strong>Booking Confirmed!</strong>
            You have booked a chat seat at <strong id="confirm-location"></strong>
            on <strong id="confirm-date"></strong> at <strong id="confirm-time"></strong>.
        </div>
    </div>
    
    
    </>
  )
}
