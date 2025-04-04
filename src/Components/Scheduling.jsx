import React from 'react'
import { Link } from 'react-router-dom'

function Scheduling() {
  return (
    <>

<div className="bg-[#003366] text-white text-center py-3">
         <h4 className="m-0 text-lg font-semibold">Book Your Slot</h4>
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


    
    <div class="ml-[240px] mt-[80px] px-10 py-6 flex gap-6">
        <h2 className='text-xl font-bold mb-4' > Book your Slot</h2>
        {/* <form action="dashboard.html" method="get"> */}

            <label htmlFor="location" className='font-bold text-[#003366]'> Select Place:</label>
            <select id="location" name="Location" className='mt-1 mb-4 p-2 rounded w-full' required>
                <option value="">----Select Location----</option>
                <option value="Tea_Tree_Plaza">Tea Tree Plaza</option>
                <option value="Campbelltown_Library">Campbelltown Library</option>
                <option value="Rundle_Mall">Rundle Mall</option>
                <option value="Burnside">Burnside</option>
                <option value="Greenacres_Library">Greenacres Library</option>
                <option value="Prospect_Library">Prospect Library</option>
        </select>
        
        <label htmlFor="date" className='font-bold text-[#003366]'>Select Date:</label>
        <input type="date" id="date" name="date" className='mt-1 mb-4 p-2 rounded-full' placeholder='YYYY-MM-DD' disabled/>

        <label htmlFor="time" className="font-bold text-[#003366]">Select Time:</label>
          <select id="time" className="mt-1 mb-4 p-2 rounded w-full" disabled>
            <option value="">-- Choose Time --</option>

          </select>

        <button type="button" id="book-slot">Book Slot</button>
        
        {/* </form> */}
    
        <div className="bg-[#e6f3ff] text-[#003366] p-[15px] rounded-md border-l-[5px] border-l-[#003366] border-solid" id="confirmation-box">
            <strong>Booking Confirmed!</strong>
            You have booked a chat seat at <strong id="confirm-location"></strong>
            on <strong id="confirm-date"></strong> at <strong id="confirm-time"></strong>.
        </div>
    </div>
    
    </div>
    </>
  )
}

export default Scheduling;
