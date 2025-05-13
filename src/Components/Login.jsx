  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { loginUser } from "../Controller/UserController";

  export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Function will run when the login button is clicked
    // It will call the loginUser function from UserController and navigate to the dashboard based on the role approved by admin
      const handleLogin = async (e) => {
      e.preventDefault();

      try {
        const { role } = await loginUser({ email, password });

        if (role === "admin") {
          navigate("/AdminDashboard");
        } else if (role === "listener") {
          navigate("/ListenerDashboard");
        } else if (role === "coordinator") {
          navigate("/CoordinatorDashboard");
        } else if (role === "pending") {
          navigate("/PendingApproval");
        } else {
          alert("Unknown role. Please contact admin.");
        }
      } catch (err) {
        alert("Login failed: " + err.message);
      }
    };

    return (
    <div className="min-h-screen flex items-center justify-center bg-[#A8E4F2] px-4 sm:px-6">
      <div className="bg-white px-6 py-8 sm:p-10 shadow-lg w-full max-w-sm rounded-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#003366] mb-6 sm:mb-8">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
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
            className="w-full bg-[#003366] hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>

          <div className="flex justify-between mt-6 text-sm text-[#003366] font-semibold">
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
  );
}