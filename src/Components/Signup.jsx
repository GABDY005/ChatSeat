import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../Controller/UserController";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";

// Validation schema for the signup form
const schema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only letters allowed")
    .required("First name is required"),
  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only letters allowed")
    .required("Last name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number")
    .required("Phone number is required"),
  password: Yup.string()
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}/,
      "Password must be 8+ chars, include uppercase, lowercase, number, special char"
    )
    .required("Password is required"),
});

// Signup component
export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Initialise the form with validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // Function to handle form submission and it will be called when the form is submitted
  const onSubmit = async (data) => {
    try {
      await signupUser(data);
      toast.success("Signup successful!");
      navigate("/Login");
    } catch (err) {
      console.error("Signup error:", err.message);
      toast.error("Signup failed:" + err.message);
    }
  };

  return (
    <>
      {/* Helmet component to manage the document head */}
      <Helmet>
        <title>Sign Up</title>
        <meta
          name="description"
          content="Access your ChatSeat account to book a listener or manage your availability."
        />
      </Helmet>

      {/* Navbar component for the header */}
      <div className=" bg-white">
        <Navbar />
      </div>

      {/* Main container for the signup form */}
      <div className="h-[calc(100vh-80px)] flex items-center justify-center bg-[#A8E4F2] px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#1E3A8A] mb-6">
            Create an Account
          </h2>

          {/* Form for user signup */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  First Name
                </label>

                {/* Input field for first name with validation */}
                <input
                  {...register("firstName")}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />
                <p className="text-sm text-red-500">
                  {errors.firstName?.message}
                </p>
              </div>

              {/* Input field for last name with validation */}
              <div className="w-1/2">
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Last Name
                </label>
                <input
                  {...register("lastName")}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />
                <p className="text-sm text-red-500">
                  {errors.lastName?.message}
                </p>
              </div>
            </div>

            {/* Input field for email address with validation */}
            <div className="mt-4">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <p className="text-sm text-red-500">{errors.email?.message}</p>
            </div>

            {/* Input field for phone number with validation */}
            <div className="mt-4">
              <label className="text-sm font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("phoneNumber")}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <p className="text-sm text-red-500">
                {errors.phoneNumber?.message}
              </p>
            </div>

            {/* Input field for password with validation and show/hide functionality */}
            <div className="mt-4 relative">
              <label className="text-sm font-semibold text-gray-700">
                Create Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full p-3 pr-12 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[44px] right-4 text-sm text-blue-600 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              <p className="text-sm text-red-500">{errors.password?.message}</p>
            </div>

            {/* Submit button for the form */}
            <button
              type="submit"
              className="w-full mt-6 bg-[#003366] text-white py-3 rounded-md font-semibold hover:bg-[#1E3A8A] transition"
            >
              Sign Up
            </button>
          </form>

          {/* Link to navigate back to the login page */}
          <div className="text-center mt-6">
            <Link
              to="/Login"
              className="text-black font-semibold hover:underline"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
