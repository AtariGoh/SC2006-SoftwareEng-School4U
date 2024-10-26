import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react"; // Remove useState, useEffect stays
import HomePage from "./pages/Homepage";
import LoginRegister from "./pages/LoginRegister";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ComparisonDashboard from "./pages/ComparisonDashboard";
import Chat from "./pages/Chat";
import PSGChat from "./pages/PSGChat";
import AftPriChat from "./pages/AftPriChat";
import AftSecChat from "./pages/AftSecChat";
import SearchSchools from "./pages/SearchSchools";
import Review from "./pages/Review";
import logo from "./assets/removebg.png";
import { useAuth } from "./context/AuthContext"; // Import AuthContext

const App = () => {
  const { loggedIn, logout, login } = useAuth(); // Use AuthContext's values
  const navigate = useNavigate();

  // Redirect to dashboard if user logs in
  useEffect(() => {
    if (loggedIn) {
      navigate("/dashboard"); // Redirect if logged in
    }
  }, [loggedIn, navigate]);

  const handleLogout = () => {
    logout(); // Use logout from AuthContext
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* NavBar */}
      <nav className="fixed top-0 left-0 w-full bg-[#536493] py-2.5 text-white shadow-md z-40">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex-shrink-0 bg-[#FEFAE0] p-1 rounded-full ml-[-100px]"
            style={{ width: "100px", height: "100px" }}
          >
            <img src={logo} alt="Logo" className="w-full h-full rounded-full" />
          </div>

          {/* Navigation Links */}
          <ul className="flex justify-between items-center w-full pl-10 space-x-8">
            <li className="flex-grow text-center">
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li className="flex-grow text-center">
              <Link to="/search" className="hover:underline">
                Browse Schools
              </Link>
            </li>
            <li className="flex-grow text-center">
              <Link to="/dashboard" className="hover:underline">
                Compare Schools
              </Link>
            </li>
            <li className="flex-grow text-center">
              <Link to="/chat" className="hover:underline">
                Chat Forum
              </Link>
            </li>
            <li className="flex-grow text-center">
              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  className="hover:underline text-red-400"
                >
                  Logout
                </button>
              ) : (
                <Link to="/loginAndRegister/login" className="hover:underline">
                  Login / Register
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex-grow pt-16">
        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loginAndRegister" element={<LoginRegister />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/dashboard" element={<ComparisonDashboard />} />
          <Route path="/search" element={<SearchSchools />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/psgchat" element={<PSGChat />} />
          <Route path="/aftprichat" element={<AftPriChat />} />
          <Route path="/aftsecchat" element={<AftSecChat />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-[#536493] text-white py-6 text-center">
        <Link to="/review" className="hover:underline">
          Leave us a review
        </Link>{" "}
        | <span>www.rightschoolforyourkid.com</span>
      </footer>
    </div>
  );
};

export default App;
