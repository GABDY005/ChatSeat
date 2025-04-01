import React from 'react'

export default function Scheduling() {
  return (
    <>
   <div class="sidebar">
    <div class="logo">Logo</div>
    <div class="nav-links">
        <a href="dashboard.html">Dashboard</a>
        <a href="coordinator.html">Coordinator</a>
        <a href="listenertips.html">Listener Tips</a>
        <a href="chatroom.html"> Chat Room</a>
        <a href="feedback.html"> Feedback</a>
        <a href="help.html">Help</a>
        <a href="aboutus.html">About Us</a>
    </div>
      <a href="login.html" class="logout-btn">Logout</a>
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
