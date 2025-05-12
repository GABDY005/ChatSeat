import React, { useEffect, useState } from "react";
import CoordinatorSidebar from "./CoordinatorSidebar";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import CoordinatorNavbar from "./CoordinatorNavbar";
import supabase from "../../supabase";
import AdminNavbar from "../Admin/AdminNavbar";


// const dummyCalendarData = [
//   { date: "2025-04-15", time: "09:00", count: 2 },
//   { date: "2025-04-15", time: "10:00", count: 1 },
//   { date: "2025-04-16", time: "11:00", count: 0 },
// ];

export default function CoordinatorAvailability() {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [firstName, setFirstName] = useState("User");
const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (user && !authError) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name, role")
          .eq("id", user.id)
          .single();

        if (profile?.first_name) {
          setFirstName(profile.first_name);
          setUserRole(profile.role);
        }
      }

    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      const {data: bookings, error} = await supabase
        .from("bookings")
        .select("date, time, user_id, location")
        

        if (error) {
          console.error("Error fetching bookings:", error);
          return;
        }

        const grouped = {};

        for (const booking of bookings || []) {
          const key = `${booking.date}T${booking.time}`;
          if (!grouped[key]) grouped[key] = [];
grouped[key].push({ user_id: booking.user_id, location: booking.location });
        
          }

          const enrichedEvents = await Promise.all(
            Object.entries(grouped).map(async ([start, entries]) => {
              const names = await Promise.all(
                entries.map(async (entry) => {
                  const { data: profile} = await supabase
                    .from("profiles")
                    .select("first_name, last_name")
                    .eq("id", entry.user_id)
                    .single();

                    return profile?.first_name || "Unknown";

                })
              );

              const location = entries[0]?.location || "Unknown";
              const count = names.length;

              let bgColor = "#86efac"; 
              if (count === 1) bgColor = "#fde047";
              if (count >= 2) bgColor = "#f87171";

              return {
                title: `${location} - ${names.join(", ")}`,
                start,
                backgroundColor: bgColor,
                textColor: "#000"
              };
            })
          );

          setCalendarEvents(enrichedEvents);

        };

        fetchCalendarEvents();
      }, []);




  return (
    <>

    {userRole === "admin" ? (
            <AdminNavbar title="Coordinator Dashboard" />
          ) : (
            <CoordinatorNavbar title="Availability" />
          )}
    
      

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
      <div className="sticky top-16 h-[calc(100vh-64px)]">
    <CoordinatorSidebar userName={firstName} />
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
