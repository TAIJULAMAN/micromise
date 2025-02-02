import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useForgotPasswordMutation } from "../../redux/api/authApi";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSendCode = (e) => {
    e.preventDefault();
    // console.log("email of forgot pass", email);
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your email!",
      });
      return;
    }

    forgotPassword({ email })
      .unwrap()
      .then((response) => {
        console.log("response of forgot pass", response);
        Swal.fire({
          icon: "success",
          title: "OTP Sent",
          text: "The OTP has been sent to your email successfully!",
        });
        navigate(`/verification-code?email=${email}`);
      })
      .catch((error) => {
        // console.log("error of forgot pass", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error?.data?.message ,
        });
      });
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 md:w-[60%]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="w-full md:w-1/2 bg-white p-8">
            <h2 className="text-[#6F6F6F] text-2xl font-bold text-center mb-6">
              Forgot Password
            </h2>
            <form onSubmit={handleSendCode} className="space-y-6">
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
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white font-semibold py-2 rounded-lg mt-5"
              >
                {isLoading ? "Sending..." : "Send Code"}
              </button>
            </form>
          </div>
          <div className="w-full md:w-1/2 text-center">
            <p className="text-[#6F6F6F] text-lg">
              Welcome to our forgot password page ! provide your email for
              confirm 6 digit verification code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
