<<<<<<< HEAD
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
=======
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> 5725d41b06bcf22559d404f488bc9c963dced8d2
import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import FeedbackWidget from "./CoordinatorFeedback";
<<<<<<< HEAD
import { useSelector } from "react-redux";

function LessonCoordinator() {
  // const [firstName, setFirstName] = useState("User");
  // const [userRole, setUserRole] = useState("");
  // const [userId, setUserId] = useState("");
  // const [role, setRole] = useState("");
  // const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  const user = useSelector((state) => state.loggedInUser.success);
=======
import supabase from "../../supabase";
import { toast } from "react-toastify";

function LessonCoordinator() {
  const [firstName, setFirstName] = useState("User");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
>>>>>>> 5725d41b06bcf22559d404f488bc9c963dced8d2

  const navigate = useNavigate();

<<<<<<< HEAD
  //     setUserId(user.id);

  //     const isCoordinator = await checkUserRole("coordinator");
  //     const isAdmin = await checkUserRole("admin");

  //     if (!isCoordinator && !isAdmin) {
  //       toast.error("Access denied. Coordinators and Admins only.");
  //       navigate("/");
  //       return;
  //     }

  //     setRole(isAdmin ? "admin" : "coordinator");

  //     const { data: profile, error: profileError } = await supabase
  //       .from("profiles")
  //       .select("first_name, role")
  //       .eq("id", user.id)
  //       .single();

  //     if (profileError || !profile) {
  //       toast.error("Failed to load user profile.");
  //       navigate("/");
  //       return;
  //     }

  //     setFirstName(profile.first_name);
  //     setUserRole(profile.role);
  //   };

  //   verifyUser();
  // }, [navigate]);
  // useEffect(() => {
  //   localStorage.getItem("userRole") === "admin"
  //     ? setUserRole("admin")
  //     : setUserRole("coordinator");
  // }, []);
=======
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role === "admin" ? "admin" : "coordinator");
  }, []);

  useEffect(() => {
    fetchImages();
  }, []);

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
              We are looking for volunteers who enjoy listening to others and want to help create a connected, supportive community through Chat Seats.
            </p>
            <p className="text-gray-700 text-lg">
              <strong>About the Chat Seat</strong>
            </p>
            <p className="text-gray-700 text-lg">
              We’ll be setting up a Chat Seat in “Name your Venue”. Its purpose is to help community members connect through conversation.
            </p>
            <p className="text-gray-700 text-lg">
              <strong>What’s Involved</strong>
            </p>
            <p className="text-gray-700 text-lg">
              Volunteers will spend time listening at the Chat Seat. This helps people who may be lonely feel heard and supported.
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
              Below are some of the lessons we have learned when establishing <strong>Chat Seats</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-800 bg-[#f0f8ff] p-6 rounded-xl shadow">
              <li>Selection of listeners – need to ensure they are interested in other peoples’ experiences and have well developed listening skills.</li>
              <li>Have one very experienced listener who sits with other less experienced listeners.</li>
              <li>Listeners work in pairs.</li>
              <li>It is important that it is about listening and not counselling.</li>
              <li>Have banners and graphics ready when talk to venue managers.</li>
              <li>Be prepared to be flexible about location of chat seats and style.</li>
              <li>Be prepared to do whatever induction activities, et cetera that are required by the venue.</li>
              <li>Observe the requirements of the venue.</li>
              <li>To have certain clearances as required by the venue manager.</li>
              <li>Check out with venue manager on a regular basis that everything is Okay or if we need to change somethings.</li>
              <li>Advertised times on the website of when <strong>Chat Seats</strong> will be available at a particular venue.</li>
              <li>Get together for listeners, biannually?</li>
              <li>Inter-generational listeners a plus.</li>
              <li>Materials to help with development of Listening skills.</li>
              <li>Badge to wear “Hello my name is ……”.</li>
              <li>A plus if tea/coffee is available.</li>
              <li>Great if the venue advertises that the <strong>Chat Seats</strong> are available at their venue.</li>
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

>>>>>>> 5725d41b06bcf22559d404f488bc9c963dced8d2
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
<<<<<<< HEAD
        <div className="flex-1 p-4 sm:p-10">
          <div className="max-w-4xl mx-auto bg-white sm:p-10 p-6 rounded-2xl shadow-lg space-y-6">
            <div className="text-center"></div>
            <h2 className="text-4xl font-bold text-[#1E3A8A] mb-4">
              Lessons Learned in Establishing Chat Seats
            </h2>

            <p className="text-gray-700 text-lg">
              Below are some of the lessons we have learned when establishing
              Chat Seats:
            </p>

            <div className="grid sm:grid-cols-2 gap-6"></div>
            <ul className="list-disc pl-6 space-y-3 text-gray-800 bg-[#f0f8ff] p-6 rounded-xl shadow">
              <li>
                Selection of listeners – ensure they are interested in other
                peoples’ experiences and have well developed listening skills.
              </li>
              <li>
                Have one very experienced listener who sits with less
                experienced listeners.
              </li>
              <li>Listeners work in pairs.</li>
              <li>
                It is important that it is about listening and not counselling.
              </li>
              <li>
                Have banners and graphics ready when talking to venue managers.
              </li>
              <li>
                Be prepared to be flexible about location of Chat Seats and
                setup style.
              </li>
              <li>Complete any required induction activities at the venue.</li>
              <li>Observe all requirements of the venue.</li>
            </ul>
            <ul className="list-disc pl-6 space-y-3 text-gray-800 bg-[#f9f9fb] p-6 rounded-xl shadow">
              <li>Hold required clearances as requested by venue managers.</li>
              <li>
                Check in regularly with the venue manager to see if anything
                needs to be adjusted.
              </li>
              <li>
                Advertise available Chat Seat times on the website for each
                venue.
              </li>
              <li>Hold biannual get-togethers for listeners.</li>
              <li>Inter-generational listeners are a plus.</li>
              <li>Provide materials to help develop listening skills.</li>
              <li>Provide name badges (e.g., "Hello my name is…").</li>
              <li>It’s a bonus if tea/coffee is available at the venue.</li>
              <li>
                It’s great if the venue advertises the availability of Chat
                Seats.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <FeedbackWidget />
=======

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

      <FeedbackWidget
        userId={userId}
        firstName={firstName}
        email={email}
        role={userRole}
      />
>>>>>>> 5725d41b06bcf22559d404f488bc9c963dced8d2
    </>
  );
}

<<<<<<< HEAD
export default LessonCoordinator;
{
  /* <div className="flex-1 px-4 sm:px-6 md:px-8 pt-8 pb-8">
  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E3A8A] text-center">
    Volunteer Callout – Chat Seats
  </h2>

  <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-6">
    We are looking for volunteers who enjoy listening to others and want to help create a connected, supportive community through Chat Seats.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
   
    <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-blue-900 mb-2">About the Chat Seat</h3>
      <p>
        We’ll be setting up a <strong>Chat Seat</strong> in <em>“Name your Venue”</em>. Its purpose is to help community members connect through conversation.
      </p>
    </div>

    <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-green-900 mb-2">What’s Involved</h3>
      <p>
        Volunteers will spend time listening at the Chat Seat. This helps people who may be lonely feel heard and supported by the community.
      </p>
    </div>

 
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-yellow-900 mb-2">Who We’re Looking For</h3>
      <p>
        We need individuals who enjoy listening and can commit just two hours a week. Right now, we're looking for <strong>five</strong> volunteers.
      </p>
    </div>

    <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-purple-900 mb-2">Next Steps</h3>
      <p className="mb-2">
        Visit&nbsp;
        <Link to="https://chatseats.com.au" className="text-blue-600 underline">
          chatseats.com.au
        </Link>{" "}
        to find out more.
      </p>
      <p>If you’re still interested, message me to learn more about what’s involved.</p>
    </div>
  </div>
</div> */
}
=======
export default LessonCoordinator;
>>>>>>> 5725d41b06bcf22559d404f488bc9c963dced8d2
