import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import ForgotPasswordModal from "../../components/Modals/ForgotPasswordModal";
import { Link } from "react-router-dom";

function SignInPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  // const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form values:", formData);
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Form Section */}
          <div className="w-full md:w-1/2 bg-white p-8">
            <h2 className="text-[#6F6F6F] text-2xl md:text-3xl font-bold text-center mb-6">
              Login to Account
            </h2>
            <p className="text-[#6F6F6F] text-center mb-8">
              Please enter your email and password to continue
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-md font-medium text-[#575757] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-[#F2F2F2] rounded-md focus:outline-none text-md"
                  placeholder="Enter Email"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="text-[15px] font-[400] text-[#575757]"
                >
                  Password
                </label>
                <div className="w-full relative">
                  <input
                    type={isEyeOpen ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    id="password"
                    placeholder="Password"
                    className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1"
                    required
                  />
                  {isEyeOpen ? (
                    <IoEyeOutline
                      className="absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                      onClick={() => setIsEyeOpen(false)}
                    />
                  ) : (
                    <IoEyeOffOutline
                      className="absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                      onClick={() => setIsEyeOpen(true)}
                    />
                  )}
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex justify-between items-center">
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="remember"
                      className="h-4 w-4 text-primary border-gray-300 rounded"
                    />
                    <span className="text-gray-700">Remember Password</span>
                  </label>
                </div>
                <Link to="/forgate-password">
                  <p className="text-primary">Forgot Password?</p>
                </Link>
              </div>

              {/* Submit Button */}
              <Link to="/">
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-primary-dark transition"
                >
                  Log In
                </button>
              </Link>
            </form>
          </div>

          {/* Welcome Section */}
          <div className="w-full md:w-1/2 text-center">
            <h1 className="text-3xl font-bold mb-6 text-[#6F6F6F]">
              Welcome Back
            </h1>
            <p className="text-[#6F6F6F] text-lg">
              Please Sign in into your account with the given details to
              continue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
