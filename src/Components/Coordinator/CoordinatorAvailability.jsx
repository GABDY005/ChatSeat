import React, { useEffect, useState } from "react";
import CoordinatorSidebar from "./CoordinatorSidebar";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import CoordinatorNavbar from "./CoordinatorNavbar";

const dummyCalendarData = [
  { date: "2025-04-15", time: "09:00", count: 2 },
  { date: "2025-04-15", time: "10:00", count: 1 },
  { date: "2025-04-16", time: "11:00", count: 0 },
];

export default function CoordinatorAvailability() {
  const [calendarEvents, setCalendarEvents] = useState([]);

  //it willtake the dummy data and set the calendar events
  useEffect(() => {
    const allTimeSlots = [];
    const timeslots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
    const days = ["2025-04-15", "2025-04-16"];

    //it will loop through the days and timeslots to get the dummy data and then it will set the color accordingly
    days.forEach((date) => {
      timeslots.forEach((time) => {
        const match = dummyCalendarData.find(
          (slot) => slot.date === date && slot.time === time
        );
        const count = match ? match.count : 0;

        let color = "#86efac";
        if (count === 1) color = "#fde047";
        if (count === 2) color = "#f87171";

        //it will push the data to the allTimeSlots array
        allTimeSlots.push({
          title: `${time} (${count}/2)`,
          start: `${date}T${time}`,
          backgroundColor: color,
          textColor: "#000",
        });
      });
    });

    setCalendarEvents(allTimeSlots);
  }, []);

  return (
    <>
      <CoordinatorNavbar title="Availability" />

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
      <div className="sticky top-16 h-[calc(100vh-64px)]">
    <CoordinatorSidebar userName="Tricia" />
  </div>

        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">
            View All Slots
          </h2>

          <div className="flex gap-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#86efac] rounded-sm"></div> Available
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#fde047] rounded-sm"></div> Partially
              Booked
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#f87171] rounded-sm"></div> Fully
              Booked
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <FullCalendar
              plugins={[timeGridPlugin]}
              initialView="timeGridWeek"
              height={550}
              events={calendarEvents}
            />
          </div>
        </div>
      </div>
    </>
  );
}
