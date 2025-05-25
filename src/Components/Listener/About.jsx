import React, { useEffect, useState } from "react";
import ListenerSidebar from "./ListenerSidebar";
import supabase from "../../supabase";
import ListenerNavbar from "./ListenerNavbar";
import AdminNavbar from "../Admin/AdminNavbar";
import { useNavigate } from "react-router-dom";

export default function About() {
  const [firstName, setFirstName] = useState("User");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const {
  //       data: { user },
  //       error: authError,
  //     } = await supabase.auth.getUser();

  //     if (!user || authError) {
  //       navigate("/");
  //       return;
  //     }

  //     const { data: profile, error: profileError } = await supabase
  //       .from("profiles")
  //       .select("first_name, role")
  //       .eq("id", user.id)
  //       .single();

  //     if (!profile || profileError) {
  //       navigate("/");
  //       return;
  //     }

  //     if (
  //       profile.role !== "listener" &&
  //       profile.role !== "coordinator" &&
  //       profile.role !== "admin"
  //     ) {
  //       navigate("/");
  //       return;
  //     }

  //     setFirstName(profile.first_name);
  //     setUserRole(profile.role);
  //   };

  //   fetchUser();
  // }, [navigate]);
  useEffect(() => {
    localStorage.getItem("userRole") === "admin"
      ? setUserRole("admin")
      : setUserRole("listener");
  }, []);
  return (
    <>
      {userRole === "admin" ? (
        <AdminNavbar title="Listener Dashboard" />
      ) : (
        <ListenerNavbar title="About Us" />
      )}

      <div className="flex flex-col lg:flex-row min-h-screen pt-16 bg-[#e6f4f9]">
        <div className="sticky top-16 h-[calc(100vh-64px)]">
          <ListenerSidebar userName={firstName} />
        </div>

        <div className="flex-1 flex justify-center items-start p-4 sm:p-6 md:p-10">
          <div className="max-w-5xl bg-white p-8 rounded-2xl shadow-lg space-y-10 leading-relaxed">
            <div className="grid md:grid-cols-2 gap-10">
              <section className="bg-[#f0f4ff] p-6 rounded-xl shadow-md">
                <h4 className="text-xl font-bold text-[#1E3A8A] mb-3">
                  Dr Tricia Vilkinas, B.SC., B. Comm., M.Psych.
                </h4>
                <p>
                  In my working life, I was the Foundation Professor of Management
                  at University of South Australia (now Adelaide University). My
                  research has mainly focused on leadership as has my teaching. My
                  other interests are time with my husband and my family,
                  particularly those grandchildren, traveling in regional and remote
                  Australia, time with friends, gardening, and crafty things.
                </p>
                <p className="mt-3">
                  I have always had an interest in people, talking with them,
                  wanting to understand their life story, and what makes them happy
                  and/or sad. Just getting to know them.
                </p>
                <p className="mt-3">
                  The <strong>Chat Seats</strong> initiative, while not a new idea,
                  is a great opportunity to connect members in our community,
                  particularly those who may be feeling isolated and lonely.
                </p>
              </section>

              <section className="bg-[#fef3c7] p-6 rounded-xl shadow-md">
                <h4 className="text-xl font-bold text-[#92400e] mb-3">Noel Fraser</h4>
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
              </section>
            </div>

            <footer className="border-t pt-6 text-sm text-center text-gray-600">
              <p>
                Website developed by <strong>Darshi Gabani</strong> <strong>Chun Ho Chan</strong>, a student at the
                University of South Australia (UniSA), as part of the Capstone
                Project for the final year of <strong>Bachelor of Information Technology</strong>.
              </p>
              <p className="mt-1">
                Contact: <a href="mailto:darshi.gabani2001@gmail.com" className="text-blue-600 hover:underline">darshi.gabani2001@gmail.com</a>
                <p><a href="mailto:chacy239@gmail.com" className="text-blue-600 hover:underline">chacy239@gmail.com</a></p>
              </p>
            </footer>

          </div>
        </div>
      </div>
    </>
  );
}