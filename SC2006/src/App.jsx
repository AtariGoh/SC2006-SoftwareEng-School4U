import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LoginRegister from "./pages/LoginRegister"; // Handles both Login & Register
import Login from './pages/Login'
import Register from "./pages/Register";
import ComparisonDashboard from "./pages/ComparisonDashboard";
import Chat from "./pages/Chat";
import PSGChat from "./pages/PSGChat";
import AftPriChat from "./pages/AftPriChat";
import AftSecChat from "./pages/AftSecChat";
import AuthForChat from "./pages/AuthForChat";
import SearchSchools from "./pages/SearchSchools";
import DetailedCard from "./components/DetailedCard.jsx";
import Review from "./pages/Review";
import logo from "./assets/removebg.png";
import { useAuth } from './context/AuthContext.jsx';
import { APIProvider } from "@vis.gl/react-google-maps";
import SchoolReview from "./pages/SchoolReview.jsx";

const App = () => {
  const { loggedIn, setLoggedIn } = useAuth()


  const handleLogout = async () => {
    await fetch(`$http://localhost:5000/api/logout`, { method: 'POST', credentials: 'include' });
    setLoggedIn(false);
    window.location.href = '/'; // Optional: Redirect to homepage on logout
  };

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
            <Link to="/chat" className="hover:underline">
                Chat Forum
              </Link>
            </li>
            <li className="flex-grow text-center">
              {loggedIn ? (
                // Render Logout button if logged in
                <button onClick={handleLogout} className="hover:underline">
                  Logout
                </button>
              ) : (
                // Render Login / Register link if not logged in
                <Link to="/loginAndRegister/login" className="hover:underline">
                  Login / Register
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
      {/* Page Content */}
      <div className="pt-16"></div> {/* Adjusted padding to avoid overlap */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loginAndRegister" element={<LoginRegister />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          {/* Correct Route */}
          <Route path="/dashboard" element={<ComparisonDashboard />} />
          <Route path="/search" element={<SearchSchools />} />
          <Route path="/school/:id" element={<DetailedCard />} />
          <Route path = "/chat" element={<Chat />} />
          <Route path = "/psgchat" element ={<PSGChat/>}/>
          <Route path = "/aftprichat" element ={<AftPriChat/>}/>
          <Route path = "/aftsecchat" element ={<AftSecChat/>}/>
          <Route path="/review" element={<Review />} />
          <Route path="/school-review" element={<SchoolReview />} />
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
