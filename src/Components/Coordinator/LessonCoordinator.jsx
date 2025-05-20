import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import supabase from "../../supabase";
import { checkUserRole } from "../../Controller/UserController";
import { toast } from "react-toastify";

function LessonCoordinator() {
  const [firstName, setFirstName] = useState("User");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     const { data: { user }, error } = await supabase.auth.getUser();
  //     if (error || !user) {
  //       navigate("/");
  //       return;
  //     }

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
  useEffect(() => {
    sessionStorage.getItem("userRole") === "admin"
      ? setUserRole("admin")
      : setUserRole("coordinator");
  }, []);
  return (
    <>
      {userRole === "admin" ? (
        <AdminNavbar title="Coordinator Dashboard" />
      ) : (
        <CoordinatorNavbar title="Resources" />
      )}

      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="w-full sm:w-auto sticky top-16 h-[calc(100vh-64px)]">
          <CoordinatorSidebar userName={firstName} />
        </div>

        <div className="flex-1 px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-12">
          <div className="w-full max-w-3xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-md text-gray-800 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1E3A8A] text-center mb-4">
              Volunteer Callout – Chat Seats
            </h2>

            <p>We are looking for volunteers who enjoy listening to other people’s stories.</p>

            <p>
              We will be setting up a <strong>Chat Seat</strong> in <em>“Name your Venue”</em> over the next few weeks.
              The purpose of the Chat Seat is to connect members of the community through conversation.
            </p>

            <p>
              <strong>So, what will be involved?</strong> People such as yourself can be a volunteer, acting as a
              listener, by spending some time at a Chat Seat within <em>“The Venue”</em>. The purpose is to encourage
              members of our community to come and chat. Some members may be experiencing loneliness and isolation. We
              hope these individuals will sit down, feel listened to, and start to feel connected to their community.
            </p>

            <p>
              <strong>So, who do we need?</strong> Individuals who enjoy listening to others and have two hours a week
              to commit to such an activity.
            </p>

            <p>At this stage, we only need <strong>five</strong> such people.</p>

            <p>
              If you are interested, you can look at our webpage:{" "}
              <Link to="https://chatseats.com.au" className="text-blue-600 underline">
                chatseats.com.au
              </Link>{" "}
              to find out more.
            </p>

            <p>
              If you’re still interested, message me so we can talk further and explain in more detail what’s involved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LessonCoordinator;