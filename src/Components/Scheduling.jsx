import React, { useCallback, useEffect, useState } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import supabase from '../supabase';
import Sidebar from './Sidebar';

export default function Scheduling() {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [calendarLocation, setCalendarLocation] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [userName, setUserName] = useState('');
  const [userBookings, setUserBookings] = useState([]);
  const [userId, setUserId] = useState(null);

  const timeslots = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"];

  useEffect(() => {
    flatpickr('#date-picker', {
      dateFormat: "Y-m-d",
      minDate: "2025-04-01",
      maxDate: "2025-04-30",
      onChange: (selectedDates, dateStr) => setDate(dateStr)
    });
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', user.id)
          .single();

        if (profile) setUserName(profile.first_name);
        fetchUserBookings(user.id);
      }
    };

    getUser();
  }, []);

  const fetchUserBookings = async (uid) => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', uid);

    if (!error && data) setUserBookings(data);
  };

  const handleCancel = async (id) => {
    await supabase.from('bookings').delete().eq('id', id);
    fetchUserBookings(userId);
    loadAvailableTimes();
  };

  const loadAvailableTimes = useCallback(async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('location', location)
      .eq('date', date);
    if (error) return;

    const bookedTimes = data.reduce((acc, cur) => {
      acc[cur.time] = (acc[cur.time] || 0) + 1;
      return acc;
    }, {});
    const available = timeslots.filter(t => !bookedTimes[t] || bookedTimes[t] < 2);
    setAvailableTimes(available);
  }, [location, date]);

  useEffect(() => {
    if (location && date) loadAvailableTimes();
  }, [location, date, loadAvailableTimes]);

  const fetchCalendarEvents = async (loc) => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('location', loc);
    if (error) return;

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

  useEffect(() => {
    if (calendarLocation) fetchCalendarEvents(calendarLocation);
  }, [calendarLocation]);

  const bookSlot = async () => {
    if (!location || !date || !time) return alert('Please complete all fields.');

    const { data: existing } = await supabase
      .from('bookings')
      .select('*')
      .eq('location', location)
      .eq('date', date)
      .eq('time', time);

    if (existing.length >= 2) return alert('Slot full');

    await supabase.from('bookings').insert([{ location, date, time, user_id: userId }]);
    setConfirmation(`Booked at ${location} on ${date} at ${time}.`);
    setTime('');
    fetchUserBookings(userId);
    loadAvailableTimes();
  };

  return (
    <>
      <div className="bg-[#003366] text-white text-center py-3">
        <h4 className="text-lg font-semibold">Scheduling</h4>
      </div>
      <div className="flex">
        <Sidebar userName={userName || "Guest"} />
        <div className="flex-grow bg-[#d9ecf5] p-10 flex flex-col gap-10 min-h-screen">
          {/* Booking Form */}
          <div className="flex gap-10">
            <div className="bg-white p-6 rounded shadow w-1/2">
              <h2 className="text-xl font-bold mb-4 text-[#1E3A8A]">Book your Slot</h2>
              <label className="block mb-1 font-semibold text-[#003366]">Select Place:</label>
              <select value={location} onChange={e => setLocation(e.target.value)} className="form-select w-full p-2 mb-3 rounded border">
                <option value="">-- Select Location --</option>
                <option value="Tea_Tree_Plaza">Tea Tree Plaza</option>
                <option value="Campbelltown_Library">Campbelltown Library</option>
                <option value="Rundle_Mall">Rundle Mall</option>
              </select>

              <label className="block mb-1 font-semibold text-[#003366]">Select Date:</label>
              <input type="text" id="date-picker" className="form-control w-full p-2 mb-3 rounded border" readOnly />

              <label className="block mb-1 font-semibold text-[#003366]">Select Time:</label>
              <select value={time} onChange={e => setTime(e.target.value)} className="form-select w-full p-2 mb-3 rounded border">
                <option value="">-- Choose Time --</option>
                {availableTimes.map((t, i) => (
                  <option key={i} value={t}>{t}</option>
                ))}
              </select>

              <button onClick={bookSlot} className="w-full bg-[#003366] text-white py-2 rounded hover:bg-[#1E3A8A]">Book Slot</button>
              {confirmation && <div className="bg-blue-100 text-blue-900 mt-3 p-3 rounded">{confirmation}</div>}
            </div>

            {/* Calendar */}
            <div className="bg-white p-6 rounded shadow w-1/2">
              <h4 className="text-lg font-bold mb-4 text-[#1E3A8A]">View Booked Schedule</h4>
              <select value={calendarLocation} onChange={e => setCalendarLocation(e.target.value)} className="form-select w-full p-2 mb-3 rounded border">
                <option value="">-- Select Location --</option>
                <option value="Tea_Tree_Plaza">Tea Tree Plaza</option>
                <option value="Campbelltown_Library">Campbelltown Library</option>
                <option value="Rundle_Mall">Rundle Mall</option>
              </select>
              <FullCalendar plugins={[timeGridPlugin]} initialView="timeGridWeek" height={500} events={calendarEvents} />
            </div>
          </div>

          {/* User's Bookings */}
          <div className="bg-white p-6 rounded shadow w-full">
            <h3 className="text-xl font-bold mb-3 text-[#1E3A8A]">Your Bookings</h3>
            {userBookings.length === 0 ? (
              <p>No bookings yet.</p>
            ) : (
              <ul className="space-y-2">
                {userBookings.map(b => (
                  <li key={b.id} className="flex justify-between items-center p-2 border rounded">
                    {b.date} at {b.time} in {b.location}
                    <button onClick={() => handleCancel(b.id)} className="text-red-600 hover:underline">Cancel</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}