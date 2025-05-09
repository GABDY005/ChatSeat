import React, { useEffect, useState } from "react";
//import { Link } from 'react-router-dom'
import ListenerSidebar from "./ListenerSidebar";
import supabase from "../../supabase";
import ListenerNavbar from "./ListenerNavbar";

export default function CoordinatorsListInListener() {
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

    <ListenerNavbar title="Coordinators"/>
               <div className="flex min-h-screen pt-16 bg-[#e6f4f9]">
                 <div className="sticky top-16 h-[calc(100vh-64px)]">
                   <ListenerSidebar userName={firstName} />
                 </div>
      {/* <div className="bg-[#003366] text-white h-16 flex items-center justify-center shadow-md px-6">
        <h4 className="text-xl font-bold">Coordinator</h4>
      </div> */}
      {/* <div className="flex min-h-[calc(100vh-60px)]">
        <ListenerSidebar userName={firstName} /> */}

        {/* <div className="flex pt-16">
          <div className="ml-56 px-10 py-12 w-full">
            <div className="max-w-4xl mx-auto text-black space-y-6">
              <p>
                <strong>
                  Thank you for agreeing to volunteer your time as a Coordinator
                  of one of our <strong>Chat Seats</strong> locations.
                </strong>
              </p>

              <p>
                <strong>Coordinators</strong> are individuals who are also
                volunteers and may also choose to be Listeners. They will:
              </p>

              <ul className="list-disc list-inside space-y-1">
                <li>
                  Identify venues where to place <strong>Chat Seats</strong>
                </li>
                <li>Gain the permission of the venue “owner/manager”</li>
                <li>Attract Listeners</li>
                <li>Assess the Listeners’ suitability</li>
                <li>
                  Advise them of the clearances they may need e.g. Working with
                  Children Certificate
                </li>
                <li>
                  Advise of the website and resources available to Listeners
                </li>
                <li>
                  Advise them that there is a calendar available on the website
                  to nominate their times when they will be volunteering
                </li>
                <li>
                  Advise them that there is a Chat room on the website for them
                  to talk with other volunteers
                </li>
              </ul>

              <p>
                On this page you will find some information about “Lessons
                Learned” which is what we and other coordinators have learned
                when setting up a Chat Seat. There is also some information on
                what we said when attracting Listeners. There are graphics that
                we used on the banner, name tags and logos. You are very welcome
                to use them.
              </p>

              <p>
                A Chat room is also available where you can chat with other
                Coordinators to exchange ideas or give support.
              </p>
              <p>
                Also, if you would like to provide any feedback to us please
                contact us.
              </p>

              <hr />

              <h5 className="text-lg font-semibold">
                Looking for volunteers who enjoy listening to other people’s
                stories.
              </h5>

              <p>
                We will be setting up a <strong>Chat Seat</strong> in “Name your
                Venue” over the next few weeks.
              </p>
              <p>
                The purpose of the <strong>Chat Seat</strong> is to connect
                members of the community through conversation.
              </p>

              <p>
                <strong>So, what will be involved?</strong>
              </p>
              <p>
                People such as yourself can be a volunteer, acting as a
                Listener, by spending some time at a <strong>Chat Seat</strong>{" "}
                within <strong>“The Venue.”</strong> Their purpose is to
                encourage members of our community to come and chat.
              </p>

              <p>
                Some members of the community may be experiencing loneliness and
                isolation. We hope these individuals will sit down, feel
                listened to and start to feel connected to their community.
              </p>

              <p>
                <strong>So, who do we need?</strong>
              </p>
              <p>
                Individuals who enjoy listening to others and have two hours a
                week to commit to such an activity.
              </p>
              <p>At this stage we only need five such people.</p>

              <p>
                So, if you are interested, you can look at our webpage,{" "}
                <a
                  href="https://chatseats.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  https://chatseats.com.au
                </a>
                , to find out more. If you're still interested, message us so
                that we can talk further and explain in more detail what is
                involved.
              </p>

              <hr />

              <h5 className="text-lg font-semibold">Lessons Learned</h5>
              <p>
                Below are some of the lessons we have learned when establishing{" "}
                <strong>Chat Seats</strong>.
              </p>

              <ul className="list-disc list-inside space-y-1">
                <li>
                  Selection of listeners – ensure they are interested in others'
                  experiences and have strong listening skills.
                </li>
                <li>
                  Have one very experienced listener who sits with newer
                  listeners.
                </li>
                <li>Listeners work in pairs.</li>
                <li>It’s about listening, not counselling.</li>
                <li>
                  Have banners and graphics ready when talking to venue
                  managers.
                </li>
                <li>Be flexible about Chat Seat locations and formats.</li>
                <li>Follow all venue induction requirements.</li>
                <li>Respect venue rules and requirements.</li>
                <li>Get clearances as needed by the venue.</li>
                <li>Regularly check in with the venue manager.</li>
                <li>Advertise available Chat Seat times on the website.</li>
                <li>Hold biannual get-togethers for listeners.</li>
                <li>Intergenerational listeners are a plus.</li>
                <li>Provide materials to develop listening skills.</li>
                <li>Use “Hello my name is...” badges.</li>
                <li>Provide tea/coffee if possible.</li>
                <li>Encourage venues to promote Chat Seats availability.</li>
              </ul> */}
            </div>
          {/* </div> */}
        {/* </div> */}
      {/* </div> */}
    </>
  );
}
