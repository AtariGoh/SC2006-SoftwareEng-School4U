import { useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const LoginRegister = () => {
  const navigate = useNavigate(); // For navigation
  const location = useLocation(); // Get current route

  const isLogin = location.pathname === "/login"; // Check which route is active

  return (
    <div className="min-h-screen bg-gray-100 mb-24">
      {/* Secondary Navbar positioned lower under primary navbar */}
      <div className="fixed top-32 left-0 w-full bg-[#EF5A6F] shadow-md z-40">
        <div className="flex w-full max-w-4xl mx-auto">
          <button
            className={`w-1/2 py-5 text-lg font-bold ${
              isLogin ? "bg-[#FAEDCE] text-black" : "bg-[#EF5A6F] text-white"
            }`}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-5 text-lg font-bold ${
              !isLogin ? "bg-[#FAEDCE] text-black" : "bg-[#EF5A6F] text-white"
            }`}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center min-h-[calc(100vh-19rem)] bg-gray-100 pt-44">
        <div
          className={`w-full ${
            isLogin ? "max-w-2xl p-12" : "max-w-5xl p-16"
          } bg-white rounded-lg shadow-lg`}
        >
          {isLogin ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
