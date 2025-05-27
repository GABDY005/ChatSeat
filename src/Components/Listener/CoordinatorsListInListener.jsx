import React, { useEffect, useState } from "react";
import ListenerSidebar from "./ListenerSidebar";
import supabase from "../../supabase";
import ListenerNavbar from "./ListenerNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
import ListenerFeedbackWidget from "./ListenerFeedback";

export default function CoordinatorsListInListener() {
  const [firstName, setFirstName] = useState("User");
  const [coordinators, setCoordinators] = useState([]);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const {
  //       data: { user },
  //       error: authError,
  //     } = await supabase.auth.getUser();

  //     if (user && !authError) {
  //       const { data: profile } = await supabase
  //         .from("profiles")
  //         .select("first_name, role")
  //         .eq("id", user.id)
  //         .single();

  //       if (profile?.first_name) {
  //         setFirstName(profile.first_name);
  //         setUserRole(profile.role);
  //       }
  //     }
  //   };

  //   fetchUser();
  // }, []);
  useEffect(() => {
    localStorage.getItem("userRole") === "admin"
      ? setUserRole("admin")
      : setUserRole("listener");
  }, []);
  useEffect(() => {
    const fetchCoordinators = async () => {
      const { data, error } = await supabase.from("coordinators").select("*");
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

        <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {coordinators.length === 0 ? (
            <p className="text-gray-500">No coordinators available.</p>
          ) : (
            coordinators.map((coordinator) => (
              <div
                key={coordinator.id}
                className="bg-white px-4 py-3 rounded-xl shadow-md border-t-4 border-blue-400 w-full sm:w-[290px] h-[210px]"
              >
                <p className="text-base text-gray-700 mb-1">
                  <span className="text-lg">📌</span>{" "}
                  <span className="font-semibold">{coordinator.name}</span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="text-lg">📍</span> {coordinator.place}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="text-lg">✉️</span> {coordinator.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="text-lg">📞</span> {coordinator.phone}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
      <ListenerFeedbackWidget />
    </>
  );
}
