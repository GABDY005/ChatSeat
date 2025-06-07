import Seat from "../assets/Seat.JPG";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";

export default function Home() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <>
      

      <Navbar />

      <div className="w-full bg-white py-8 md:py-12 px-4 md:px-12 text-gray-800">
        <div className="max-w-screen-xl mx-auto space-y-8 md:space-y-12">
          <div className="text-center space-y-4" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A8A]">
              Welcome to "Chat Seats"
            </h2>
            <p className="leading-relaxed text-sm md:text-base">
              In a bid to tackle social isolation, we would like to establish a
              series of Chat Seats across Australia. The{" "}
              <strong>Chat Seats</strong> initiative aims to provide a safe and
              inviting place for people to talk. It will allow members of the
              community to <strong>"Connect through Conversation."</strong> For
              this initiative to be successful, we need people like yourselves
              to volunteer to be either Listeners and/or Coordinators.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            data-aos="fade-up"
          >
            <div className="bg-[#F0F9FF] p-6 rounded-xl shadow space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-[#003366]">
                Listeners
              </h3>
              <p className="text-sm md:text-base">
                Listeners are individuals who volunteer their time to sit on a
                Chat Seat and listen to members of the community who may join
                them. Some of these members of the community may also be lonely
                and/or isolated. We are hoping to connect them back into their
                community through conversation.
              </p>
              <p className="text-sm md:text-base">
                So, who would be a great volunteer? Someone who enjoys listening
                to other people and is interested in what is happening for them.
                Also, someone who has a couple of hours each week where they
                would like to sit at one of our Chat Seat locations. Does this
                sound like you?
              </p>
              <p className="text-sm md:text-base">
                If you would like to volunteer as a Listener, then you will need
                to sign in and proceed to the page for Listeners. On this page
                you will find some helpful information, a booking calendar and a
                place where you can chat with other Listeners.
              </p>
            </div>

            <div className="bg-[#E8F5E9] p-6 rounded-xl shadow space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-[#003366]">
                Coordinators
              </h3>
              <p className="text-sm md:text-base">
                Coordinators are individuals who are also volunteers and may
                also choose to be Listeners. They will help to establish a site
                and support the Listeners. So, who would be a good Coordinator?
                Someone who enjoys negotiating with potential venue "managers"
                and has good organisational skills.
              </p>
              <p className="text-sm md:text-base">
                If you would like to volunteer as a Coordinator, then you will
                need to sign in and proceed to the page for Coordinators. On
                this page you will find some helpful information, and a place
                where you can chat with other Coordinators.
              </p>
            </div>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            data-aos="fade-up"
          >
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                About the Chat Seat
              </h3>
              <p>
                We’ll be setting up a Chat Seat in “Name your Venue”. Its
                purpose is to help community members connect through
                conversation.
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                Who We’re Looking For
              </h3>
              <p>
                We need individuals who enjoy listening and can commit just two
                hours a week. Right now, we're looking for five volunteers.
              </p>
            </div>
          </div>

          <div className="text-center" data-aos="fade-up">
            <h4 className="text-base md:text-xl font-semibold mb-4">
              How do you identify a Chat Seat?
            </h4>
            <p className="mb-6 text-sm md:text-base">
              It will have a banner like the one below, at one of our Chat Seats
              locations.
            </p>
            <img
              src={Seat}
              alt="Chat Seat Banner"
              className="mx-auto w-full max-w-xs md:max-w-sm rounded-xl shadow-lg"
            />
          </div>

          <div
            className="bg-[#F3F4F6] p-6 rounded-xl text-center shadow-md space-y-2"
            data-aos="fade-up"
          >
            <p className="text-sm md:text-lg text-gray-700">
              We hope you have the passion and the time to be part of this
              initiative.
            </p>
            <p className="text-sm md:text-lg text-gray-700">
              Thank you for taking the time to visit our website. We welcome any
              suggestions.
            </p>
            <div className="mt-4">
              <p className="text-[#003366] font-semibold text-base md:text-lg">
                Warm regards,
              </p>
              <p className="text-[#003366] font-medium text-sm md:text-base">
                Tricia and Noel
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
