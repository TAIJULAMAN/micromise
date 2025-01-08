import { useState } from "react";
import { Link } from "react-router-dom";
function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 md:w-[60%]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="w-full md:w-1/2 bg-white p-8">
            <h2 className="text-[#6F6F6F] text-2xl font-bold text-center mb-6">
              Forgot Password
            </h2>

            {/* Form Section */}
            <form className="space-y-6">
              <div>
                <label className="block text-md font-medium text-[#575757] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-[#F2F2F2] rounded-md focus:outline-none text-md"
                  placeholder="Enter Email"
                  required
                />
              </div>

            <Link to="/verification-code">
            <button
                type="button"
                className="w-full bg-primary text-white font-semibold py-2 rounded-lg mt-5"
              >
                Send Code
              </button>
            </Link>
            </form>
          </div>
          <div className="w-full md:w-1/2 text-center">
            <p className="text-[#6F6F6F] text-lg">
              Welcome to out forgot password page ! provide your email for
              confirm 6 digit verification code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
