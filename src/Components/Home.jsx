import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.jpg";
import Seat from "../assets/Seat.JPG";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 flex flex-col sm:flex-row items-center justify-between bg-[#003366] sm:px-8 py-4 sm:py-5 shadow-lg w-full">
        <div
          onClick={handleLogoClick}
          className="flex items-center space-x-2 cursor-pointer mb-2 sm:mb-0"
        >
          <img
            src={logo}
            alt="ChatSeat Logo"
            className="w-12 h-12 object-cover border-2 border-white shadow-md"
          />
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl tracking-wide text-center sm:text-left">
            Have a Chat Seat
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/BookedListener"
            className="bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200"
          >
            Who's at the Seat?
          </Link>
          <Link
            to="/Login"
            className="bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200"
          >
            Login
          </Link>
        </div>
      </nav>

      <section className="w-full bg-white py-12 px-6 sm:px-12 text-gray-800">
        <div className="max-w-screen-xl mx-auto space-y-12">
          <div className="text-center space-y-4" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-[#1E3A8A]">
              Welcome to “Chat Seats”
            </h2>
            <p className="leading-relaxed">
              In a bid to tackle social isolation, we would like to establish a
              series of Chat Seats across Australia. The{" "}
              <strong>Chat Seats</strong> initiative aims to provide a safe and
              inviting place for people to talk. It will allow members of the
              community to <strong>“Connect through Conversation.”</strong> For
              this initiative to be successful, we need people like yourselves
              to volunteer to be either Listeners and/or Coordinators.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8" data-aos="fade-up">
            <div className="bg-[#F0F9FF] p-6 rounded-xl shadow space-y-4">
              <h3 className="text-xl font-bold text-[#003366]">Listeners</h3>
              <p>
                Listeners are individuals who volunteer their time to sit on a
                Chat Seat and listen to members of the community who may join
                them. Some of these members of the community may also be lonely
                and/or isolated. We are hoping to connect them back into their
                community through conversation.
              </p>
              <p>
                So, who would be a great volunteer? Someone who enjoys listening
                to other people and is interested in what is happening for them.
                Also, someone who has a couple of hours each week where they
                would like to sit at one of our Chat Seat locations. Does this
                sound like you?
              </p>
              <p>
                If you would like to volunteer as a Listener, then you will need
                to sign in and proceed to the page for Listeners. On this page
                you will find some helpful information, a booking calendar and a
                place where you can chat with other Listeners.
              </p>
            </div>

            <div className="bg-[#E8F5E9] p-6 rounded-xl shadow space-y-4">
              <h3 className="text-xl font-bold text-[#003366]">Coordinators</h3>
              <p>
                Coordinators are individuals who are also volunteers and may
                also choose to be Listeners. They will help to establish a site
                and support the Listeners. So, who would be a good Coordinator?
                Someone who enjoys negotiating with potential venue “managers”
                and has good organisational skills.
              </p>
              <p>
                If you would like to volunteer as a Coordinator, then you will
                need to sign in and proceed to the page for Coordinators. On
                this page you will find some helpful information, and a place
                where you can chat with other Coordinators.
              </p>
            </div>
          </div>

          <div
            className="bg-[#E0F7FA] p-6 sm:p-8 rounded-xl shadow"
            data-aos="zoom-in"
          >
            <h4 className="text-xl sm:text-2xl font-bold mb-4 text-[#003366]">
              Does this sound like something that you would be interested in
              doing?
            </h4>
            <p>
              If you would like to volunteer as a Coordinator, then you will
              need to sign in and proceed to the page for Coordinators. On this
              page you will find information about “Lessons learned” which
              describes some of the lessons we and others have learned when they
              established Chat Seats. There are also files of the graphics that
              have been used previously: banner, logo, name tags.
            </p>
          </div>

          <div className="text-center" data-aos="fade-up">
            <h4 className="text-lg sm:text-xl font-semibold mb-4">
              How do you identify a Chat Seat?
            </h4>
            <p className="mb-6">
              It will have a banner like the one below, at one of our Chat Seats
              locations.
            </p>
            <img
              src={Seat}
              alt="Chat Seat Banner"
              className="mx-auto w-full max-w-xs sm:max-w-sm rounded-xl shadow-lg"
            />
          </div>

          <div
            className="bg-[#F3F4F6] p-6 rounded-xl text-center shadow-md space-y-2"
            data-aos="fade-up"
          >
            <p className="text-base sm:text-lg text-gray-700">
              We hope you have the passion and the time to be part of this
              initiative.
            </p>
            <p className="text-base sm:text-lg text-gray-700">
              Thank you for taking the time to visit our website. We welcome any
              suggestions.
            </p>
            <div className="mt-4">
              <p className="text-[#003366] font-semibold text-lg">
                Warm regards,
              </p>
              <p className="text-[#003366] font-medium">Tricia and Noel</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}