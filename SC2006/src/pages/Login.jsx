// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const { loggedIn, setLoggedIn } = useAuth()
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
          credentials: 'include'

      });

      if (response.ok) {
        setLoggedIn(true); // Update AuthContext state to logged in
        localStorage.setItem("isAuthenticated", "true"); // Persist login state
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Attach handleSubmit */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 mb-3 border rounded-2xl bg-[#FAEDCE]"
          value={loginData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded-2xl bg-[#FAEDCE]"
          value={loginData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-[#EF5A6F] text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
