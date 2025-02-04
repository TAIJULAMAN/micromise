import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

import { useVerifyEmailMutation } from "../../redux/api/authApi";
import { storeResetToken } from "../../services/auth.service";

function VerificationCode() {
  const [code, setCode] = useState(new Array(4).fill(""));
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");
  // console.log("Email of otp page:", email);
  const navigate = useNavigate();

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const handleChange = (value, index) => {
    // Only accept numeric input
    if (!isNaN(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Automatically focus the next input
      if (value && index < 4) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleVerifyCode = async () => {
    const enteredCode = code.join("");
    // console.log(enteredCode);
    if (enteredCode.length === 4) {
      await verifyEmail({ Otp: { email, otp: enteredCode } })
        .unwrap()
        .then((response) => {
          // console.log("Verification response:", response);

        storeResetToken({ resetToken: response?.data?.resetToken });

          Swal.fire({
            icon: "success",
            title: "Verification successful!",
            text: "Your email has been successfully verified.",
          });
          navigate(`/new-password?email=${email}`);
        })
        .catch((err) => {
          console.error("Verification error:", err);
          const errorMessage =
            err?.data?.message ||
            err.message ||
            "Invalid code. Please try again.";
          Swal.fire({
            icon: "error",
            title: "Verification Failed",
            text: errorMessage,
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid 4-digit code.",
      });
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 md:w-[60%]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="w-full md:w-1/2 bg-white p-8">
            <h2 className="text-[#6F6F6F] text-2xl font-bold text-center mb-10">
              Verification Code
            </h2>

            <form className="space-y-6">
              <div className="flex justify-center gap-2">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    className="shadow-xs w-20 h-20 text-2xl text-center border border-primary text-primary rounded-md focus:outline-none"
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyCode}
                disabled={isLoading}
                className="w-full bg-primary text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-primary-dark transition mt-10"
              >
                {isLoading ? "Verifying..." : "Verify Code"}
              </button>
            </form>
          </div>
          <div className="w-full md:w-1/2 text-center">
            <p className="text-[#6F6F6F] text-lg">
              Welcome to forgot password page ! provide your email for confirm 4
              digit verification code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationCode;
