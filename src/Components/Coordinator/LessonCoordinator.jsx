import { useEffect, useState } from "react";
import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import FeedbackWidget from "./CoordinatorFeedback";
import supabase from "../../supabase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function LessonCoordinator() {
  const [activeTab, setActiveTab] = useState(0);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const user = useSelector((state) => state.loggedInUser.success);

  // Fetch user details from Redux store
  useEffect(() => {
    fetchImages();
  }, []);

  // Fetch images from Supabase storage
  const fetchImages = async () => {
    const { data, error } = await supabase.storage
      .from("coordinator-images")
      .list("", {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) {
      console.error("Failed to list images:", error);
      return;
    }

    // Create signed URLs for the images
    const signed = await Promise.all(
      data.map(async (file) => {
        const { data: signedUrl } = await supabase.storage
          .from("coordinator-images")
          .createSignedUrl(file.name, 300);

        return { name: file.name, url: signedUrl?.signedUrl };
      })
    );

    setFiles(signed);
  };

  // Handle file upload
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("coordinator-images")
      .upload(fileName, file);

    if (error) {
      toast.error("Upload failed.");
      console.error(error);
    } else {
      fetchImages();
    }

    setUploading(false);
  };

  // Handle file deletion
  const handleDelete = async (fileName) => {
    const { error } = await supabase.storage
      .from("coordinator-images")
      .remove([fileName]);

    if (error) {
      toast.error("Failed to delete.");
      console.error(error);
    } else {
      fetchImages();
    }
  };

  // Render content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
              How to Attract Volunteer Listeners
            </h2>
            <p className="text-gray-700 text-lg">
              <strong>Volunteer Callout – Chat Seats</strong>
            </p>
            <p className="text-gray-700 text-lg">
              We are looking for volunteers who enjoy listening to others and
              want to help create a connected, supportive community through Chat
              Seats.
            </p>
            <p className="text-gray-700 text-lg">
              <strong>About the Chat Seat</strong>
            </p>
            <p className="text-gray-700 text-lg">
              We’ll be setting up a Chat Seat in “Name your Venue”. Its purpose
              is to help community members connect through conversation.
            </p>
            <p className="text-gray-700 text-lg">
              <strong>What’s Involved</strong>
            </p>
            <p className="text-gray-700 text-lg">
              Volunteers will spend time listening at the Chat Seat. This helps
              people who may be lonely feel heard and supported.
            </p>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
              Lessons Learned in Establishing Chat Seats
            </h2>
            <p className="text-gray-700 text-lg">
              Below are some of the lessons we have learned when establishing{" "}
              <strong>Chat Seats</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 bg-[#f0f8ff] p-6 rounded-xl shadow">
              <li>
                Selection of listeners – need to ensure they are interested in
                other peoples’ experiences and have well developed listening
                skills.
              </li>
              <li>
                Have one very experienced listener who sits with other less
                experienced listeners.
              </li>
              <li>Listeners work in pairs.</li>
              <li>
                It is important that it is about listening and not counselling.
              </li>
              <li>
                Have banners and graphics ready when talk to venue managers.
              </li>
              <li>
                Be prepared to be flexible about location of chat seats and
                style.
              </li>
              <li>
                Be prepared to do whatever induction activities, et cetera that
                are required by the venue.
              </li>
              <li>Observe the requirements of the venue.</li>
              <li>
                To have certain clearances as required by the venue manager.
              </li>
              <li>
                Check out with venue manager on a regular basis that everything
                is Okay or if we need to change somethings.
              </li>
              <li>
                Advertised times on the website of when{" "}
                <strong>Chat Seats</strong> will be available at a particular
                venue.
              </li>
              <li>Get together for listeners, biannually?</li>
              <li>Inter-generational listeners a plus.</li>
              <li>Materials to help with development of Listening skills.</li>
              <li>Badge to wear “Hello my name is ……”.</li>
              <li>A plus if tea/coffee is available.</li>
              <li>
                Great if the venue advertises that the{" "}
                <strong>Chat Seats</strong> are available at their venue.
              </li>
            </ul>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">
              Image Gallery
            </h2>
            <div className="mb-4">
              <input
                type="file"
                onChange={handleUpload}
                disabled={uploading}
                className="block w-full text-sm text-gray-600"
              />
            </div>
            {uploading && <p className="text-blue-500">Uploading...</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {files.length === 0 && <p>No images found.</p>}
              {files.map((file) => (
                <div
                  key={file.name}
                  className="w-full border p-3 rounded bg-white shadow"
                >
                  <img
                    src={file.url}
                    alt={file.name}
                    className="mb-2 max-w-full h-auto"
                  />
                  <p className="text-sm break-words">{file.name}</p>
                  <div className="flex space-x-4 mt-2">
                    <a
                      href={file.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(file.name)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {user.role === "admin" ? (
        <AdminNavbar title="Coordinator Dashboard" />
      ) : (
        <CoordinatorNavbar title="Resources" />
      )}

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="w-full sm:w-auto sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar />
        </div>

        <div className="flex-1 p-4 sm:p-10">
          <div className="max-w-4xl mx-auto bg-white sm:p-10 p-6 rounded-2xl shadow-lg">
            <div className="mb-6">
              <div className="flex space-x-4 border-b">
                <button
                  className={`py-2 px-4 ${
                    activeTab === 0
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(0)}
                >
                  How to Attract Volunteer Listeners
                </button>
                <button
                  className={`py-2 px-4 ${
                    activeTab === 1
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(1)}
                >
                  Lessons Learned
                </button>
                <button
                  className={`py-2 px-4 ${
                    activeTab === 2
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(2)}
                >
                  Image Gallery
                </button>
              </div>
            </div>
            {renderTabContent()}
          </div>
        </div>
      </div>

      <FeedbackWidget />
    </>
  );
}

export default LessonCoordinator;
