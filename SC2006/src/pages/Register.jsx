const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Register Form Card */}
      <div className="w-full max-w-4xl bg-white p-12 rounded-lg shadow-lg">
        <h2 className="text-4xl font-semibold mb-8 text-center">Register</h2>
        <form className="space-y-8">
          {/* Language Selection */}
          <div>
            <label className="block font-medium mb-3">Language:</label>
            <div className="grid grid-cols-4 gap-4">
              <button className="py-3 bg-[#FAEDCE] text-black rounded">
                English
              </button>
              <button className="py-3 bg-[#FAEDCE] text-black rounded">
                华语
              </button>
              <button className="py-3 bg-[#FAEDCE] text-black rounded">
                Malay
              </button>
              <button className="py-3 bg-[#FAEDCE] text-black rounded">
                தமிழ்
              </button>
            </div>
          </div>

          {/* Name and Mobile Number */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Name:</label>
              <input
                type="text"
                className="w-full p-4 border rounded bg-[#FAEDCE] focus:outline-none"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Mobile Number:</label>
              <input
                type="tel"
                className="w-full p-4 border rounded bg-[#FAEDCE] focus:outline-none"
                placeholder="+65"
              />
            </div>
          </div>

          {/* Email and Area of Residence */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Email:</label>
              <input
                type="email"
                className="w-full p-4 border rounded bg-[#FAEDCE] focus:outline-none"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Area of Residence:
              </label>
              <input
                type="text"
                className="w-full p-4 border rounded bg-[#FAEDCE] focus:outline-none"
                placeholder="Residence"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block font-medium mb-1">Username:</label>
            <input
              type="text"
              className="w-full p-4 border rounded bg-[#FAEDCE] focus:outline-none"
              placeholder="Username"
            />
            <small className="text-gray-600">
              Your username can only contain lowercase letters and numbers.
              Avoid spaces or special characters.
            </small>
          </div>

          {/* Password and Confirm Password */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">Password:</label>
              <input
                type="password"
                className="w-full p-4 border rounded bg-[#FAEDCE] focus:outline-none"
                placeholder="Password"
              />
              <small className="text-gray-600">
                Password must be at least 10 characters, with upper/lower case
                letters, numbers, and symbols.
              </small>
            </div>
            <div>
              <label className="block font-medium mb-1">
                Confirm Password:
              </label>
              <input
                type="password"
                className="w-full p-4 border rounded bg-[#FAEDCE] focus:outline-none"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="text-sm text-gray-600">
            We would like to keep you updated with school-related updates.
            Communications will comply with our{" "}
            <a href="#" className="text-blue-500 underline">
              Data Privacy Policy
            </a>
            .
          </div>

          {/* Register Button */}
          <button className="w-full bg-[#EF5A6F] text-white py-4 rounded hover:bg-red-500">
            Register
          </button>

          {/* Agreement */}
          <div className="text-sm text-center mt-4">
            By signing up, you agree to our{" "}
            <a href="#" className="text-blue-500 underline">
              Data Privacy Policy
            </a>
            .
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
//Really needed chatgpt help for this one
