import Navbar from "../components/Navbar";
import { Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex justify-center items-center py-16 px-4">

        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

          <h2 className="text-2xl font-bold text-center mb-2">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mb-6">
            Join Farm Support to access smart tools
          </p>

          {/* Full Name */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>

            <div className="flex items-center border rounded-md mt-1 px-3">
              <User size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="flex items-center border rounded-md mt-1 px-3">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="flex items-center border rounded-md mt-1 px-3">
              <Lock size={18} className="text-gray-400" />
              <input
                type="password"
                placeholder="Create a password"
                className="w-full p-2 outline-none"
              />
            </div>
          </div>

          {/* Button */}
          <button className="w-full bg-green-800 text-white py-2 rounded-md font-semibold hover:bg-green-900 transition">
            Sign Up
          </button>

          {/* Switch to Login */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link 
              to="/login"
              className="text-green-700 hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Signup;