import React, { use, useEffect, useState } from "react";
//import { Link } from 'react-router-dom'
import ListenerSidebar from "./ListenerSidebar";
import supabase from "../../supabase";
import ListenerNavbar from "./ListenerNavbar";
import AdminNavbar from "../Admin/AdminNavbar";

export default function CoordinatorsListInListener() {
  const [firstName, setFirstName] = useState("User");
  const [coordinators, setCoordinators] = useState([]);
const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
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

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCoordinators = async () => {
      const { data, error } = await supabase
      .from("profiles")
      .select("id, first_name, email, phone_number, place")
      .eq("role", "coordinator");
      if (!error) setCoordinators(data);
    };
    fetchCoordinators();
  }, []);

  return (
    <>
    {userRole === "admin" ? (
        <AdminNavbar title="Listener Dashboard" />
      ) : (
       <ListenerNavbar title="Coordinators" />
      )}
      
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <ListenerSidebar userName={firstName} />
        </div>
        <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-2 auto-rows-min">
          {coordinators.length === 0 ? (
            <p className="text-gray-500">No coordinators available.</p>
          ) : (
            coordinators.map((c) => (
              <div
                key={c.id}
                className="bg-white p-3 rounded-xl shadow-md border-t-4 border-blue-400 h-fit"
              >
                <p className="text-base text-gray-700 mb-1">
                  <span className="text-lg">📌</span>{" "}
                  <span className="font-semibold">{c.first_name}</span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="text-lg">📍</span> {c.place}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="text-lg">✉️</span> {c.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="text-lg">📞</span> {c.phone_number}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
