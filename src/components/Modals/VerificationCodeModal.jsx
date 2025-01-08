import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

function VerificationCodeModal({ setOpenCodeModal }) {
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
      setOtp((prevOtp) =>
        prevOtp.map((_, index) => digits[index] || "")
      );
      const lastFilledIndex = Math.min(digits.length, otp.length) - 1;
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP Entered:", otp.join(""));
    // Add your verification logic here
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
        {/* Close Button */}
        <button
          onClick={() => setOpenCodeModal(false)}
          className="absolute top-2 right-2 text-white bg-secondary focus:outline-none p-2 rounded-full"
        >
          <IoCloseSharp className="text-2xl" />
        </button>

        <h2 className="text-[#6F6F6F] text-2xl font-bold text-center mb-6">
          Verification Code
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                className="shadow-xs w-12 h-12 text-2xl text-center border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-primary-dark transition"
          >
            Verify Code
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerificationCodeModal;
