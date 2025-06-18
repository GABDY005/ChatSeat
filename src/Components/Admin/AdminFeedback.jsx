import { useEffect, useState } from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import supabase from "../../supabase";
import AdminNavbar from "./AdminNavbar";

export default function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchRole, setSearchRole] = useState("All Users");
  const [searchDate, setSearchDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [showMore, setShowMore] = useState(null);

  // Fetch feedback data from Supabase on component mount
  useEffect(() => {
    const fetchFeedback = async () => {
      const { data, error } = await supabase
        .from("feedback")
        .select("id, user_id, name, email, role, message, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching feedback:", error);
      } else {
        setFeedback(data);
      }
    };

    fetchFeedback();
  }, []);

  // Function to handle deleting feedback
  const handleDelete = async (id) => {
    const { error } = await supabase.from("feedback").delete().eq("id", id);

    if (!error) {
      setFeedback((prev) => prev.filter((item) => item.id !== id));
      setOpenDropdown(null);
    }
  };

  // Fetch first name from localStorage or set default
  const toggleDropdown = (id) => {
    setOpenDropdown((prevId) => (prevId === id ? null : id));
  };

  // Format date to YYYY-MM-DD for comparison
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Filter feedback based on search criteria
  const filteredFeedback = feedback
    .filter((item) =>
      item.name.toLowerCase().includes(searchName.toLowerCase())
    )
    .filter((item) =>
      searchRole === "" || searchRole === "All Users"
        ? true
        : item.role?.toLowerCase() === searchRole
    )
    .filter((item) =>
      !searchDate ? true : formatDate(item.created_at) === searchDate
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFeedback.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);

  // Function to toggle "Show More" text
  const toggleShowMore = (id) => {
    setShowMore((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <AdminNavbar title="Feedback from Listener and Coordinators" />
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="w-full sm:w-auto sticky top-16 h-[calc(100vh-64px)]" />
        <AdminSidebar />

        <div className="flex-1 px-4 sm:px-6 md:px-8 py-6 sm:py-10">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <input
              type="text"
              placeholder="Search by Name.."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 text-sm shadow-sm"
            />

            <select
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 text-sm shadow-sm"
            >
              <option value="" disabled selected hidden>
                Search by Role...
              </option>
              <option value="All Users">All Users</option>
              <option value="coordinator">Coordinator</option>
              <option value="listener">Listener</option>
            </select>

            <input
              type="text"
              placeholder="Search by Date..."
              value={searchDate}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
              onChange={(e) => setSearchDate(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 text-sm shadow-sm"
            />

            <button
              type="button"
              onClick={() => {
                setSearchName("");
                setSearchRole("");
                setSearchDate("");
                setCurrentPage(1);
              }}
              className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium text-gray-700"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className={`self-start bg-white shadow-md rounded-xl p-6 border-t-4 ${
                  item.role.toLowerCase() === "coordinator"
                    ? "border-green-500"
                    : "border-blue-500"
                } hover:shadow-lg hover:scale-105 transition-transform duration-300`}
              >
                <button
                  onClick={() => toggleDropdown(item.id)}
                  className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
                >
                  ⋮
                </button>

                {openDropdown === item.id && (
                  <div className="absolute top-10 right-2 bg-white border border-gray-300 rounded shadow-md z-10">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 w-full text-left"
                    >
                      Delete
                    </button>
                  </div>
                )}

                <div className="mb-4 space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold"> Name:</span>{" "}
                    {item.name || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {item.email || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Role:</span>{" "}
                    {item.role || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Submitted:</span>{" "}
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="border-t my-3"></div>

                <p className="text-gray-800 font-medium whitespace-pre-line">
                  {showMore === item.id
                    ? item.message
                    : item.message && item.message.length > 50
                    ? `${item.message.slice(0, 50)}...`
                    : item.message}
                </p>

                {item.message.length > 50 && (
                  <button
                    onClick={() => toggleShowMore(item.id)}
                    className="text-blue-500 text-sm mt-2 hover:underline"
                  >
                    {showMore === item.id ? "Less" : "More"}
                  </button>
                )}
              </div>
            ))}
          </div>

          {filteredFeedback.length > itemsPerPage && (
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-sm mt-1">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < totalPages ? prev + 1 : prev
                  )
                }
                disabled={currentPage === totalPages}
                className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
