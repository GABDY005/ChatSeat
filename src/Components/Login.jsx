import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import supabase from "../supabase";
import { useDispatch } from "react-redux";
import { setloggedInUserSuccess } from "../state/loggedInUser";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

      // Check if profile data is available
      const role = profileData.role;

      // Store user session info for protected routes
      localStorage.setItem("userRole", role);

      toast.success("Login successful!");

      dispatch(setloggedInUserSuccess(profileData));

      // Navigate based on role (keeping your existing navigation logic)
      if (role === "admin") {
        navigate("/admindashboard");
      } else if (role === "listener") {
        navigate("/listenerdashboard");
      } else if (role === "coordinator") {
        navigate("/coordinatordashboard");
      } else if (role === "pending") {
        navigate("/pendingapproval");
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
        <Navbar />

        {/* Main container for the login form */}
        <div className="h-full flex items-center justify-center bg-[#A8E4F2] px-4 md:px-6">
          <div className="bg-white px-6 py-8 md:p-10 shadow-lg w-full max-w-sm rounded-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#003366] mb-6 md:mb-8">
              Login
            </h2>

            {/* Login form */}
            <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
              <div>
                {/* Input field for email address */}
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                {/* Component for email input */}
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
                {/* Input field for password */}
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>

                {/* Component for password input with show/hide functionality */}
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

              {/* Button to submit the form */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#003366] hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {/* Links for navigation */}
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

              {/* Link to reset password */}
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
