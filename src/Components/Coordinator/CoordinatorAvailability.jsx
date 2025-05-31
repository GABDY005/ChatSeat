import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CoordinatorSidebar from "./CoordinatorSidebar";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import CoordinatorNavbar from "./CoordinatorNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import supabase from "../../supabase";
import FeedbackWidget from "./CoordinatorFeedback";

export default function CoordinatorAvailability() {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [firstName, setFirstName] = useState("User");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     const { data: { user }, error } = await supabase.auth.getUser();
  //     if (!user || error) {
  //       navigate("/");
  //       return;
  //     }

  //     const { data: profile, error: profileError } = await supabase
  //       .from("profiles")
  //       .select("first_name, role")
  //       .eq("id", user.id)
  //       .single();

  //     if (!profile || profileError || (profile.role !== "admin" && profile.role !== "coordinator")) {
  //       navigate("/");
  //       return;
  //     }

  //     setFirstName(profile.first_name);
  //     setUserRole(profile.role);
  //   };

  //   fetchUserInfo();
  // }, [navigate]);
  useEffect(() => {
    localStorage.getItem("userRole") === "admin"
      ? setUserRole("admin")
      : setUserRole("coordinator");
  }, []);
  useEffect(() => {
    const fetchCalendarEvents = async () => {
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select("date, time, user_id, location");

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
        Object.entries(grouped).flatMap(async ([start, entries]) =>
          Promise.all(
            entries.map(async (entry) => {
              const { data: profile } = await supabase
                .from("profiles")
                .select("first_name, last_name")
                .eq("id", entry.user_id)
                .single();

              const name = profile?.first_name || "Unknown";
              const count = entries.length;
              let bgColor = "#86efac";
              if (count === 1) bgColor = "#fde047";
              if (count >= 2) bgColor = "#f87171";

              return {
                title: `${entry.location} - ${name}`,
                start,
                backgroundColor: bgColor,
                textColor: "#000",
              };
            })
          )
        )
      );

      setCalendarEvents(enrichedEvents.flat());
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
        <div className="w-full sm:w-auto sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar userName={firstName} />
        </div>

        <div className="flex-1 p-4 sm:p-6 md:p-10">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">
            View All Slots
          </h2>

          <div className="flex flex-wrap gap-4 sm:gap-6 mb-4">
            
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#fde047] rounded-sm"></div> Partially Booked
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#f87171] rounded-sm"></div> Fully Booked
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded shadow overflow-auto w-full">
            <FullCalendar
              plugins={[timeGridPlugin]}
              initialView="timeGridWeek"
              height={550}
              events={calendarEvents}
              eventDidMount={(info) => {
                const tooltip = `${info.event.title}\n${info.event.start.toLocaleString()}`;
                info.el.setAttribute("title", tooltip);
              }}
            />
          </div>
        </div>
      </div>
      <FeedbackWidget
        userId={userId}
        firstName={firstName}
        email={email}
        role={userRole}
      />
    </>
  );
}
