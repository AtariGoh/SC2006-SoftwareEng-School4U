const Login = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded-2xl bg-[#FAEDCE]"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded-2xl bg-[#FAEDCE]"
        />
        <button className="w-full bg-[#EF5A6F] text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
