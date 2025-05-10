import React from "react";
import CoordinatorSidebar from "./CoordinatorSidebar";
import CoordinatorNavbar from "./CoordinatorNavbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../supabase";

function LessonCoordinator() {
  const [firstName, setFirstName] = useState("User");

  useEffect(() => {
    const fetchUserName = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (user && !authError) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", user.id)
          .single();

        if (profile?.first_name) {
          setFirstName(profile.first_name);
        }
      }

    };

    fetchUserName();
  }, []);
  return (
    <>
     <CoordinatorNavbar title="Resources" />

<div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
  <div className="sticky top-16 h-[calc(100vh-64px)]">
    <CoordinatorSidebar userName={firstName}/>
  </div>

  <div className="flex-1 px-10 py-12">
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md text-gray-800 space-y-6">
      <h2 className="text-2xl font-bold text-[#1E3A8A] text-center mb-4">
        Volunteer Callout – Chat Seats
      </h2>

      <p>
        We are looking for volunteers who enjoy listening to other people’s stories.
      </p>

      <p>
        We will be setting up a <strong>Chat Seat</strong> in <em>“Name your Venue”</em> over the next few weeks.
        The purpose of the Chat Seat is to connect members of the community through conversation.
      </p>

      <p>
        <strong>So, what will be involved?</strong> People such as yourself can be a volunteer, acting as a listener,
        by spending some time at a Chat Seat within <em>“The Venue”</em>. The purpose is to encourage members
        of our community to come and chat. Some members may be experiencing loneliness and isolation.
        We hope these individuals will sit down, feel listened to, and start to feel connected to their community.
      </p>

      <p>
        <strong>So, who do we need?</strong> Individuals who enjoy listening to others and have two hours a week
        to commit to such an activity.
      </p>

      <p>
        At this stage, we only need <strong>five</strong> such people.
      </p>

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
