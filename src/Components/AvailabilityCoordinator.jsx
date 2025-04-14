import React, { useEffect, useState } from "react";
import SidebarCoordinator from "./SidebarCoordinator";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

const dummyCalendarData = [
  { date: "2025-04-15", time: "09:00", count: 2 },
  { date: "2025-04-15", time: "10:00", count: 1 },
  { date: "2025-04-16", time: "11:00", count: 0 },
];

export default function AvailabilityCoordinator() {
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    const allTimeSlots = [];

    const timeslots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
    const days = ["2025-04-15", "2025-04-16"];

    days.forEach((date) => {
      timeslots.forEach((time) => {
        const match = dummyCalendarData.find((slot) => slot.date === date && slot.time === time);
        const count = match ? match.count : 0;

        let color = "#86efac"; // green for available
        if (count === 1) color = "#fde047"; // yellow for partially booked
        if (count === 2) color = "#f87171"; // red for fully booked

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
      <div className="bg-[#003366] text-white h-16 flex items-center justify-center shadow-md px-6">
        <h4 className="text-xl font-bold">Availability Calendar</h4>
      </div>

      <div className="flex min-h-[calc(100vh-64px)]">
        <SidebarCoordinator userName="Tricia" />

        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">View All Slots</h2>

          {/* Legend */}
          <div className="flex gap-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#86efac] rounded-sm"></div> Available
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#fde047] rounded-sm"></div> Partially Booked
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#f87171] rounded-sm"></div> Fully Booked
            </div>
          </div>

          {/* Calendar View */}
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
