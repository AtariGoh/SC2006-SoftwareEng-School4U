import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LoginRegister from "./pages/LoginRegister"; // Handles both Login & Register
import ComparisonDashboard from "./pages/ComparisonDashboard";
import SearchSchools from "./pages/SearchSchools";
import Review from "./pages/Review";
import logo from "./assets/removebg.png";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* NavBar */}
      <nav className="fixed top-0 left-0 w-full bg-[#536493] py-4 text-white shadow-md z-50">
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
              <span className="opacity-50 cursor-not-allowed">Chat Forum</span>
            </li>
            <li className="flex-grow text-center">
              <Link to="/login" className="hover:underline">
                Login / Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* Page Content */}
      <div className="pt-16"></div> {/* Adjusted padding to avoid overlap */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginRegister />} />{" "}
          <Route path="/register" element={<LoginRegister />} />
          {/* Correct Route */}
          <Route path="/dashboard" element={<ComparisonDashboard />} />
          <Route path="/search" element={<SearchSchools />} />
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
