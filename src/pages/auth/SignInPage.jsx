import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLogInMutation } from "../../redux/api/authApi";
import { storeUserToken } from "../../services/auth.service";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [logIn, { isLoading }] = useLogInMutation();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: !email ? "Email is required!" : "Password is required!",
      });
      return;
    }

    const loginData = { email, password };

    try {
      const response = await logIn(loginData).unwrap();
      if (response?.data?.accessToken) {
        storeUserToken({ accessToken: response?.data?.accessToken });
        if (rememberMe) {
          localStorage.setItem("accessToken", response?.data?.accessToken);
        }
        Swal.fire({
          icon: "success",
          title: "Login successful!",
          text: "You are now logged in.",
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse mmd:flex-row lg:flex-row justify-between items-center gap-10">
          <div className="w-full lg:w-1/2 bg-white p-8">
            <h2 className="text-[#6F6F6F] text-2xl md:text-3xl font-bold text-center mb-6">
              Login to Account
            </h2>
            <p className="text-[#6F6F6F] text-center mb-8">
              Please enter your email and password to continue.
            </p>

            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <label className="block text-md font-medium text-[#575757] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border-2 border-[#F2F2F2] rounded-md focus:outline-none text-md"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="w-full">
                <label className="text-[15px] font-[400] text-[#575757]">
                  Password
                </label>
                <div className="w-full relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2 text-primary focus:ring-secondary"
                  />
                  Remember Me
                </label>
                <Link
                  to="/forget-password"
                  className="text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-primary-dark transition mt-5 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Log In"}
              </button>
            </form>
          </div>

          <div className="w-full lg:w-1/2 text-center">
            <h1 className="text-3xl font-bold mb-6 text-[#6F6F6F]">
              Welcome Back!
            </h1>
            <p className="text-[#6F6F6F] text-lg">
              Please sign in to your account with the given information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
