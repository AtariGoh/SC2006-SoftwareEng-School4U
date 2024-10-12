import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ComparisonDashboard from "./pages/ComparisonDashboard";
import SearchSchools from "./pages/SearchSchools";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* NavBar */}
      <nav className="bg-blue-600 p-4 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/search">Search Schools</Link>
          </li>
        </ul>
      </nav>

      {/* Page Content */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ComparisonDashboard />} />
          <Route path="/search" element={<SearchSchools />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
