import { useRef, useState } from "react";
import { Link } from "react-router-dom";
function VerificationCode() {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputRefs = useRef([]);

  const handleKeyDown = (e) => {
    const index = inputRefs.current.indexOf(e.target);

    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      if (otp[index]) {
        // Clear current input
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index),
          "",
          ...prevOtp.slice(index + 1),
        ]);
      } else if (index > 0) {
        // Move to the previous input
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleInput = (e) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
    const value = e.target.value.trim();

    if (/^[0-9]$/.test(value)) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        value,
        ...prevOtp.slice(index + 1),
      ]);

      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, otp.length);
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp((prevOtp) => prevOtp.map((_, index) => digits[index] || ""));
      const lastFilledIndex = Math.min(digits.length, otp.length) - 1;
      inputRefs.current[lastFilledIndex]?.focus();
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
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onPaste={handlePaste}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="shadow-xs w-20 h-20 text-2xl text-center border border-primary text-primary rounded-md focus:outline-none"
                  />
                ))}
              </div>

              <Link to="/new-password">
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-primary-dark transition mt-10"
                >
                  Verify Code
                </button>
              </Link>
            </form>

            <p className="text-[#6F6F6F] mt-10 text-center">
              You have not received the email?{" "}
              <span className="text-primary">Resend</span>
            </p>
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

export default VerificationCode;
