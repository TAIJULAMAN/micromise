import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

function ForgotPasswordModal({ setOpen }) {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white flex flex-col md:flex-row justify-between items-center gap-10 rounded shadow-lg py-10">
        <div className="p-5  w-full md:w-1/2">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-white bg-secondary focus:outline-none p-2 rounded-full"
          >
            <IoCloseSharp className="text-2xl" />
          </button>

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

            <button
              type="button"
              className="w-full bg-primary text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-primary-dark transition"
            >
              Send Code
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 text-center">
          <p className="text-[#6F6F6F] text-lg">
            Please Sign in into your account with the given details to continue
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
