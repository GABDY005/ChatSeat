import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import supabase from '../supabase';
import './Scheduling.css';

export default function Scheduling() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [calendarLocation, setCalendarLocation] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const timeslots = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"];

  useEffect(() => {
    flatpickr('#date-picker', {
      dateFormat: "Y-m-d",
      minDate: "2025-04-01",
      maxDate: "2025-04-30",
      onChange: function (selectedDates, dateStr) {
        setDate(dateStr);
      }
    });
  }, []);

  useEffect(() => {
    if (location && date) loadAvailableTimes();
  }, [location, date]);

  useEffect(() => {
    if (calendarLocation) fetchCalendarEvents(calendarLocation);
  }, [calendarLocation]);

  const loadAvailableTimes = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('location', location)
      .eq('date', date);
  
    if (error) {
      console.error('Error loading times:', error);
      return;
    }
  
    if (!data || data.length === 0) {
      setAvailableTimes(timeslots);
      return;
    }
  
    const bookedTimes = data.reduce((acc, cur) => {
      acc[cur.time] = (acc[cur.time] || 0) + 1;
      return acc;
    }, {});
  
    const available = timeslots.filter(t => !bookedTimes[t] || bookedTimes[t] < 2);
    setAvailableTimes(available);
  };

  const bookSlot = async () => {
    if (!location || !date || !time) return alert('Please complete all fields.');

    const { data: existing, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('location', location)
      .eq('date', date)
      .eq('time', time);

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      return;
    }

    if (existing.length >= 2) return alert('This slot is fully booked.');

    const { error: insertError } = await supabase
      .from('bookings')
      .insert([{ location, date, time, user_id: 'anonymous' }]);

    if (insertError) {
      console.error('Insert error:', insertError);
      return;
    }

    setConfirmation(`You have booked a chat seat at ${location} on ${date} at ${time}.`);
    setTime('');
    loadAvailableTimes();
  };

  const fetchCalendarEvents = async (loc) => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('location', loc);

    if (error) {
      console.error('Fetch calendar error:', error);
      return;
    }

    const grouped = data.reduce((acc, cur) => {
      const key = `${cur.date}T${cur.time}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const events = Object.entries(grouped).map(([start, count]) => ({
      title: `${start.slice(11)} (${count}/2)`,
      start,
      allDay: false,
    }));

    setCalendarEvents(events);
  };

  return (
    <>
      {/* Header */}
      <div className="bg-[#003366] text-white text-center py-3">
        <h4 className="m-0 text-lg font-semibold">Scheduling</h4>
      </div>

      <div className="flex min-h-[calc(100vh-60px)]">
        {/* Sidebar */}
        <div className="w-1/5 bg-[#A8E4F2] p-4 flex flex-col">
          <div className="logo mb-4">
            <img src="assets/GetAttachmentThumbnail.png" alt="Chat Seats Logo" className="w-20 h-20 rounded-full border-4 border-[#A8E4F2] object-cover" />
          </div>
          <div className="nav-links space-y-4">
            <Link to="/Coordinators" className="block text-[#003366] font-bold hover:underline">Coordinators</Link>
            <Link to="/Scheduling" className="block text-[#003366] font-bold hover:underline">Scheduling</Link>
            <Link to="/Listener" className="block text-[#003366] font-bold hover:underline">Listener</Link>
            <Link to="/Chatroom" className="block text-[#003366] font-bold hover:underline">Chat Room</Link>
            <Link to="/About" className="block text-[#003366] font-bold hover:underline">About</Link>
            <Link to="/Feedback" className="block text-[#003366] font-bold hover:underline">Feedback</Link>
            <Link to="/Help" className="block text-[#003366] font-bold hover:underline">Help</Link>
          </div>
          <div className="mt-auto pt-4">
            <Link to="/" className="bg-white text-black font-bold px-5 py-2 rounded-lg hover:bg-gray-200 inline-block">Logout</Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex p-10 gap-10 bg-[#d9ecf5]">
          {/* Booking Box */}
          <div className="booking-box bg-white p-6 rounded shadow w-1/2">
            <h2 className="text-xl font-bold mb-4">Book your Slot</h2>
            <label className="font-semibold text-[#003366]">Select Place:</label>
            <select value={location} onChange={e => setLocation(e.target.value)} className="form-select mb-3 w-full p-2 rounded">
              <option value="">-- Select Location --</option>
              <option value="Tea_Tree_Plaza">Tea Tree Plaza</option>
              <option value="Campbelltown_Library">Campbelltown Library</option>
              <option value="Rundle_Mall">Rundle Mall</option>
            </select>

            <label className="font-semibold text-[#003366]">Select Date:</label>
            <input type="text" id="date-picker" className="form-control mb-3 w-full p-2 rounded" readOnly />

            <label className="font-semibold text-[#003366]">Select Time:</label>
            <select value={time} onChange={e => setTime(e.target.value)} className="form-select mb-3 w-full p-2 rounded">
              <option value="">-- Choose Time --</option>
              {availableTimes.map((t, i) => (
                <option key={i} value={t}>{t}</option>
              ))}
            </select>

            <button className="bg-[#003366] text-white px-4 py-2 rounded w-full hover:bg-blue-800" onClick={bookSlot}>Book Slot</button>
            {confirmation && (
              <div className="bg-blue-100 text-blue-900 p-3 mt-3 rounded">{confirmation}</div>
            )}
          </div>

          {/* Calendar Box */}
          <div className="calendar-box bg-white p-6 rounded shadow w-1/2">
            <h4 className="text-lg font-bold mb-4 text-[#003366]">View Booked Schedule</h4>
            <label className="font-semibold text-[#003366]">Select Location:</label>
            <select value={calendarLocation} onChange={e => setCalendarLocation(e.target.value)} className="form-select mb-3 w-full p-2 rounded">
              <option value="">-- Select Location --</option>
              <option value="Tea_Tree_Plaza">Tea Tree Plaza</option>
              <option value="Campbelltown_Library">Campbelltown Library</option>
              <option value="Rundle_Mall">Rundle Mall</option>
            </select>

            <div id="calendar">
              <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                height={500}
                events={calendarEvents}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}