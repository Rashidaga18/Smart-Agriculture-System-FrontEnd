import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Mail, Lock } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    // Dummy login success
    alert("Login Successful ✅");

    // Redirect to Home (you can change later to dashboard)
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex justify-center items-center py-16 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mb-6">
            Login to continue to Farm Support
          </p>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>

              <div className="flex items-center border rounded-md mt-1 px-3">
                <Mail size={18} className="text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 outline-none"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 rounded-md font-semibold hover:bg-green-900 transition"
            >
              Login
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-green-700 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;