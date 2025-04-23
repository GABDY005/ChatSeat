import React, { useEffect, useState } from "react";
import ListenerSidebar from "./ListenerSidebar";
import supabase from "../../supabase";
import ListenerNavbar from "./ListenerNavbar";

export default function About() {
  const [firstName, setFirstName] = useState("User");

  useEffect(() => {
    const fetchUserName = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user && !error) {
        const { data: profile } = await supabase
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
     <ListenerNavbar title="About Us"/>
           <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
             <div className="sticky top-16 h-[calc(100vh-64px)]">
               <ListenerSidebar userName={firstName} />
             </div>

        <div className="flex-1 p-10">
          <div className="mw-[800px] bg-white p-5 border-r-8 shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
            <h4>
              <strong>Dr Tricia Vilkinas, B.SC., B. Comm., M.Psych.</strong>
            </h4>
            <p>
              In my working life, I was the Foundation Professor of Management
              at University of South Australia (now Adelaide University). My
              research has mainly focused on leadership as has my teaching. My
              other interests are time with my husband and my family,
              particularly those grandchildren, traveling in regional and remote
              Australia, time with friends, gardening, and crafty things.
            </p>
            <p>
              I have always had an interest in people, talking with them,
              wanting to understand their life story, and what makes them happy
              and/or sad. Just getting to know them.
            </p>
            <p>
              The <strong>Chat Seats</strong> initiative, while not a new idea,
              is a great opportunity to connect members in our community,
              particularly those who may be feeling isolated and lonely.
            </p>

            <h4>Noel Fraser</h4>
            <p>
              Noel experienced extreme loneliness for most of his life,
              including throughout the entirety of a twenty-year stint in the
              Army. A chance conversation set him on the path to making some
              important life choices, including in his case the need to take the
              first important step of forgiveness. Deciding to ‘get better, not
              stay bitter’ and approaching the age of 50, Noel decided to
              undertake a Behavioural Sciences degree, applying via the Flinders
              University Foundation program for aged students. More recently, he
              participated in the SA Governors Leadership Foundation (GLF)
              program and through a GLF alumni newsletter, read about and then
              volunteered to help plan and initiate Tricia’s Chat Seats idea in
              his local area.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
