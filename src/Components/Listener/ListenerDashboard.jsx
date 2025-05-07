import React, { useEffect, useState } from "react";
import ListenerSidebar from "./ListenerSidebar";
import supabase from "../../supabase";
import ListenerNavbar from "./ListenerNavbar";
import { Link } from "react-router-dom";


export default function ListenerDashboard() {
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
      <ListenerNavbar title="Dashboard" />
      <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <ListenerSidebar userName={firstName} />
        </div>

      <div className="flex-1 p-10">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-4xl font-bold text-[#1E3A8A] mb-10 text-center">
            Welcome, Listeners!
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
          Thank you for agreeing to volunteer some of your time as a Listener on our Chat Seats.
          </p>
          <p className="text-gray-700 mb-6 text-lg">
          On this page you will find some information about your role as a Listener.
          </p>

          <ul className="list-disc pl-6 text-gray-700 text-lg mb-6 space-y-1">
            <li>
              <Link to="/listener/listener-skills" className="text-black hover:underline" >
              <strong>"Good Listening Skills."</strong>
              </Link>
            </li>
            <li>
            <Link to="/listener/conversation-skills" className="text-black hover:underline" >
              <strong>"Good Conversation Skills."</strong>
              </Link>
              </li>
            <li>
            <Link to="/listener/make-people-comfortable" className="text-black hover:underline" >
              <strong>"How to make people feel comfortable about joining you on the Chat Seat."</strong>
              </Link>
               </li>
          </ul>

          <p className="text-gray-700 mb-2 text-lg">
          There are also links to other web sites that host information on being an effective Listener. 
          </p>

          <ul className="list-disc pl-6 text-gray-700 text-lg mb-6 space-y-1">
            <li>
            <Link to="https://endingloneliness.com.au/" className="text-black hover:underline mb-2 text-lg">
          <strong>Ending Loneliness together</strong>
          </Link>
            </li>
            <li>
            <Link to="https://www.rosthomas.com.au/features" className="text-black hover:underline" >
              <strong>Ros Thomas - Research on Loneliness</strong>
              </Link>
              </li>
         
          </ul>

         
          <p className="text-gray-700 mb-2 text-lg">
          There is a <strong>Booking tab</strong> where you can select the venue you want to sit on a <strong>Chat Seat</strong> and select what time suits you.
          </p>
          <p className="text-gray-700 mb-2 text-lg">
          A <strong>Chat room</strong> is also available where you can chat with other Listeners to exchange ideas or give support.
          </p>

          <p className="text-gray-700 mb-4 text-lg">
          Also if you would like to provide any <strong>Feedback</strong> to us, please go to <strong>Feedback tab</strong>.
          </p>
        </div>
      </div>
      </div>
    </>
  );
}
