import React from 'react'
import { Link } from 'react-router-dom';

export default function Listener() {
  return (
    <>
      <div className="bg-[#003366] text-white text-center p-4 w-[100%] fixed top-0 left-0 z-1000">
               <h4 className="m-0 text-lg font-semibold">Listener</h4>
           </div>
      
           <div class="flex min-h-[calc(100vh-60px)]">
               <div className="bg-[#A8E4F2] fixed top-14 left-0 h-[calc(100vh-60px)] w-48 min-h-[100vh] p-5 float-left overflow-y-auto">
                   <div>
                       
                           
                           <div className="nav-links space-y-4">
                              <Link to="/Coordinators" className="block text-[#003366] font-bold text-lg hover:underline">Coordinators</Link>
                              <Link to="/Scheduling" className="block text-[#003366] font-bold text-lg hover:underline">Scheduling</Link>
                              <Link to="/Listener" className="block text-[#003366] font-bold text-lg hover:underline">Listener</Link>
                              <Link to="/Chatroom" className="block text-[#003366] font-bold text-lg hover:underline"> Chat Room</Link>
                              <Link to="/About" className="block text-[#003366] font-bold text-lg hover:underline"> About</Link>
                              <Link to="/Feedback" className="block text-[#003366] font-bold text-lg hover:underline">Feedback</Link>
                              <Link to="/Help" className="block text-[#003366] font-bold text-lg hover:underline">Help</Link>
                           </div>
      
                       
      
                       <div className="mt-auto pt-4">
                          
                           <Link to="/" className="bg-white text-black font-bold px-5 py-2 rounded-lg hover:bg-gray-200 inline-block">Logout</Link>
                       </div>
                   </div>
      
                   </div>
    <div class="md:ml-[220px] pt-20 px-6 pb-10">
        <div className="ml-[17%] pt-20 pb-10 px-10">
                <div className="mw-[90%] m-auto text-left">
                  <p>Thank you for agreeing to volunteer some of your time as a Listener on our Chat Seats.</p>
        
                  <p>On this page you will find some information about:</p>
                  {/* <ul>
                    <li><Link to="assets/Listener_Guide.pdf" target="_blank">Good Listening Skills</Link></li>
                    <li><Link to="assets/Conversation_Guide_Sheet.pdf" target="_blank">Good Conversation Skills</li>
                    <li><Link to="assets/Attracting_Chatters.pdf" target="_blank">How to make people feel comfortable about joining you on the Chat Seat</Link></li> 
                  </ul>
        
                  <p>There are also links to other web sites that host information on being an effective Listener.</p>
                  <ul>
                  <li><Link to="https://endingloneliness.com.au/" target="_blank">Ending Loneliness Together</Link></li>
                    <li><Link to="https://www.rosthomas.com.au/features" target="_blank">Ros Thomas - Research on Loneliness</li>
                </ul> */}
                  <p>There is a booking tab where you can select the venue you want to sit on a <strong>chat Seat</strong> and select what time suits you.</p>
                  <p>A Chat room is also available where you can chat with other Listeners to exchange ideas or give support.</p>
                  <p>Also if you would like to provide any feedback to us, please contact us.</p>
                </div>
            </div>
        </div>
        </div>
    
    </>
  )
}
