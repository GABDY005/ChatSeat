import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../Controller/UserController";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";
// import logo from "../assets/Logo.jpg";
import Navbar from "./Navbar";

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

export default function Signup() {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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

  // const handleLogoClick = () => {
  //   navigate("/");
  // };

  // Function to handle signup form submission
  // const handleSignup = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await signupUser({ email, password, firstName, lastName, phoneNumber });
  //     alert("Signup successful!");
  //     navigate("/Login");
  //   } catch (error) {
  //     console.error("Signup error:", error.message);
  //     alert("Signup failed: " + error.message);
  //   }
  // };

  return (
    <>
      <div className=" bg-white">
        <Navbar />
      </div>
      <div className="h-[calc(100vh-80px)] flex items-center justify-center bg-[#A8E4F2] px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#1E3A8A] mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  First Name
                </label>
                <input
                  {...register("firstName")}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                />
                <p className="text-sm text-red-500">
                  {errors.firstName?.message}
                </p>
              </div>
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

            <button
              type="submit"
              className="w-full mt-6 bg-[#003366] text-white py-3 rounded-md font-semibold hover:bg-[#1E3A8A] transition"
            >
              Sign Up
            </button>
          </form>

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
