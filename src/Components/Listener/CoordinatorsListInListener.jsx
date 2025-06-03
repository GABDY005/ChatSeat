import { useEffect, useState } from "react";
import ListenerSidebar from "./ListenerSidebar";
import supabase from "../../supabase";
import ListenerNavbar from "./ListenerNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import ListenerFeedbackWidget from "./ListenerFeedback";
import { useSelector } from "react-redux";

export default function CoordinatorsListInListener() {
  const [coordinators, setCoordinators] = useState([]);
  const user = useSelector((state) => state.loggedInUser.success);

  // Set the first name from localStorage or default to "User"
  useEffect(() => {
    const fetchCoordinators = async () => {
      const { data, error } = await supabase.from("coordinators").select("*");
      if (!error) setCoordinators(data);
    };

    fetchCoordinators();
  }, []);

  return (
    <>
      {user.role === "admin" ? (
        <AdminNavbar title="Listener Dashboard" />
      ) : (
        <ListenerNavbar title="Coordinators" />
      )}

      {/* Main content area */}
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <ListenerSidebar />
        </div>

        {/*  Coordinator list section */}
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
