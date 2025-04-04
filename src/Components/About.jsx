import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      
      <div className="bg-[#003366] text-white text-center py-3">
         <h4 className="m-0 text-lg font-semibold">About Us</h4>
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

    <div className="ml-[17%] pt-20 pb-10 px-10">
        
        <div class="mw-[800px] bg-white p-5 border-r-8 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">

            <h4><strong>Dr Tricia Vilkinas, B.SC., B. Comm., M.Psych.</strong></h4>
            <p>
              In my working life, I was the Foundation Professor of Management at University of South Australia (now Adelaide University).
              My research has mainly focused on leadership as has my teaching. My other interests are time with my husband and my family,
              particularly those grandchildren, traveling in regional and remote Australia, time with friends, gardening, and crafty things.
            </p>
            <p>
              I have always had an interest in people, talking with them, wanting to understand their life story,
              and what makes them happy and/or sad. Just getting to know them.
            </p>
            <p>
              The <strong>Chat Seats</strong> initiative, while not a new idea, is a great opportunity to connect members in our community,
              particularly those who may be feeling isolated and lonely.
            </p>
          
           
          
            <h4>Noel Fraser</h4>
            <p>
              Noel experienced extreme loneliness for most of his life, including throughout the entirety of a twenty-year stint in the Army.
              A chance conversation set him on the path to making some important life choices, including in his case the need to take
              the first important step of forgiveness. Deciding to ‘get better, not stay bitter’ and approaching the age of 50,
              Noel decided to undertake a Behavioural Sciences degree, applying via the Flinders University Foundation program for aged students.
              More recently, he participated in the SA Governors Leadership Foundation (GLF) program and through a GLF alumni newsletter,
              read about and then volunteered to help plan and initiate Tricia’s Chat Seats idea in his local area.
            </p>
          
          </div>
    </div>
</div>

    </>
  )
}
