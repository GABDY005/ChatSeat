import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import supabase from "../supabase";
import { useDispatch } from "react-redux";
import { setloggedInUserSuccess } from "../state/loggedInUser";
import logo from "../assets/Logo.jpg";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  // Function will run when the login button is clicked
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign in with Supabase Auth
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) throw authError;

      // Get user profile including role
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (profileError) throw profileError;

      const role = profileData.role;
      console.log("User role:", profileData);

      // Store user session info for protected routes
      localStorage.setItem("userRole", role);

      toast.success("Login successful!");

      dispatch(setloggedInUserSuccess(profileData));

      // Navigate based on role (keeping your existing navigation logic)
      if (role === "admin") {
        navigate("/AdminDashboard");
      } else if (role === "listener") {
        navigate("/ListenerDashboard");
      } else if (role === "coordinator") {
        navigate("/CoordinatorDashboard");
      } else if (role === "pending") {
        navigate("/PendingApproval");
      } else {
        toast.warning("Unknown role. Please contact admin.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen">
       <nav className="sticky top-0 z-50 bg-[#003366] shadow-lg w-full">
        <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5">
          <div
            onClick={handleLogoClick}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img
              src={logo}
              alt="ChatSeat Logo"
              className="w-12 h-12 object-cover border-2 border-white shadow-md"
            />
          </div>

          <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <h1 className="text-white font-extrabold text-xl md:text-3xl tracking-wide text-center">
              Have a Chat Seat
            </h1>
          </div>

 
          <div className="hidden md:flex items-center space-x-4">
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

          

          <div className="md:hidden">
            {isMenuOpen ? (
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-xl hover:text-gray-300"
              >
                ✕
              </button>
            ) : (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <div className="w-5 h-0.5 bg-white mb-1"></div>
                  <div className="w-5 h-0.5 bg-white mb-1"></div>
                  <div className="w-5 h-0.5 bg-white"></div>
                </div>
              </button>
            )}
          </div>
        </div>

       
        {isMenuOpen && (
          <div className="md:hidden bg-[#003366] border-t border-white/20">
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/BookedListener"
                className="block bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Who's at the Seat?
              </Link>
              <Link
                to="/Login"
                className="block bg-[#A8E4F2] text-[#003366] font-semibold px-4 py-2 rounded-full hover:bg-white shadow transition duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
        
        <div className="h-full flex items-center justify-center bg-[#A8E4F2] px-4 md:px-6">
          <div className="bg-white px-6 py-8 md:p-10 shadow-lg w-full max-w-sm rounded-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#003366] mb-6 md:mb-8">
              Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-[#003366] cursor-pointer select-none"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#003366] hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="flex flex-col md:flex-row justify-between mt-6 space-y-3 md:space-y-0 text-sm text-[#003366] font-semibold">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="hover:underline"
                >
                  Back to Home
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="hover:underline"
                >
                  Sign Up
                </button>
              </div>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}