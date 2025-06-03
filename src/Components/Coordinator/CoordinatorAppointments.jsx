import { useEffect, useState } from "react";
import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";
import supabase from "../../supabase";
import AdminNavbar from "../Admin/AdminNavbar";
import FeedbackWidget from "./CoordinatorFeedback";
import { useSelector } from "react-redux";

export default function CoordinatorAppointments() {
  // State variables
  const [openDropdown, setOpenDropdown] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const user = useSelector((state) => state.loggedInUser.success);

  // Fetch user's first name from Supabase
  useEffect(() => {
    const fetchAppointments = async () => {
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select("id, location, date, time, user_id");

      if (error) {
        console.error("Error fetching appointments:", error);
        return;
      }

      const enriched = await Promise.all(
        bookings.map(async (b) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("first_name")
            .eq("id", b.user_id)
            .single();

          return {
            id: b.id,
            listenerName: profile?.first_name || "Unknown",
            time: b.time,
            date: b.date,
            location: b.location,
          };
        })
      );
      setAppointments(enriched);
    };

    fetchAppointments();
  }, []);

  //it will toggle the dropdown button when it is clicked
  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  //it will handle the edit button when it is clicked
  const handleEdit = (appointment) => {
    setSelectedBooking(appointment);
    setEditModal(true);
  };

  //it will save the edited booking details
  const saveEdit = async () => {
    const { error } = await supabase
      .from("bookings")
      .update({
        time: selectedBooking.time,
        date: selectedBooking.date,
        location: selectedBooking.location,
      })
      .eq("id", selectedBooking.id);

    // If no error, update the local state
    if (!error) {
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === selectedBooking.id ? { ...a, ...selectedBooking } : a
        )
      );
      setEditModal(false);
    } else {
      console.error("Error updating booking:", error.message);
    }
  };

  //it will handle the delete button when it is clicked
  const handleDelete = async (id) => {
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (!error) {
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <>
      {/* Render the appropriate navbar based on user role */}
      {user.role === "admin" ? (
        <AdminNavbar title="Coordinator Dashboard" />
      ) : (
        <CoordinatorNavbar title="Coordinator Dashboard" />
      )}

      {/* Render the sidebar and main content */}
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar />
        </div>

        {/* Main content area */}
        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">
            Confirmed Listener Bookings
          </h2>

          {/* Render the appointments in a grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {appointments.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              appointments.map((appointment) => (
                // Render each appointment card
                <div
                  key={appointment.id}
                  className="relative bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition w-full"
                >
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => toggleDropdown(appointment.id)}
                      className="text-gray-600 hover:text-black text-xl"
                    >
                      ⋮
                    </button>

                    {/* Dropdown menu for edit and delete options */}
                    {openDropdown === appointment.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
                        <button
                          onClick={() => handleEdit(appointment)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-blue-600"
                        >
                          Edit
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={() => handleDelete(appointment.id)}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Render the listener's name and appointment details */}
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-[#003366] flex items-center gap-2">
                      {appointment.listenerName}
                    </h3>
                  </div>

                  {/* Display appointment details */}
                  <div className="text-sm space-y-1 text-gray-700">
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Time:</span>{" "}
                      {appointment.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Date:</span>{" "}
                      {appointment.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Location:</span>{" "}
                      {appointment.location}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Edit modal for updating booking details */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl space-y-4 w-96">
            <h2 className="text-lg font-bold mb-2">Edit Booking</h2>
            <label className="block text-sm font-medium">Time</label>
            <input
              type="time"
              value={selectedBooking.time}
              onChange={(e) =>
                setSelectedBooking({ ...selectedBooking, time: e.target.value })
              }
              className="border rounded px-3 py-1 w-full"
            />

            {/* Date and location inputs */}
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              value={selectedBooking.date}
              onChange={(e) =>
                setSelectedBooking({ ...selectedBooking, date: e.target.value })
              }
              className="border rounded px-3 py-1 w-full"
            />

            {/* Location input */}
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              value={selectedBooking.location}
              onChange={(e) =>
                setSelectedBooking({
                  ...selectedBooking,
                  location: e.target.value,
                })
              }
              className="border rounded px-3 py-1 w-full"
            />

            {/* Buttons to cancel or save the edit */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setEditModal(false)}
                className="text-gray-600"
              >
                Cancel
              </button>

              {/* Save button to update the booking */}
              <button
                onClick={saveEdit}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <FeedbackWidget />
    </>
  );
}
