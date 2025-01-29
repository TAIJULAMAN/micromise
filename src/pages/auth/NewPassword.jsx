import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useResetPasswordMutation } from "../../redux/api/authApi";

function NewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  console.log(email);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    console.log(newPassword, confirmPassword);

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "The passwords do not match. Please try again.",
      });
      return;
    }

    try {
      const response = await resetPassword({
        email,
        newPassword: confirmPassword,
      }).unwrap();
      console.log("Password Reset Response:", response);

      // Swal.fire({
      //   icon: "success",
      //   title: "Password Updated!",
      //   text: "Your password has been successfully updated.",
      // });

      navigate("/success-message");
    } catch (err) {
      console.error("Reset Password Error:", err);
      // const errorMessage =
      //   err?.data?.message || "Something went wrong. Please try again later.";
      // Swal.fire({
      //   icon: "error",
      //   title: "Password Reset Failed",
      //   text: errorMessage,
      // });
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 md:w-[60%]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="w-full md:w-1/2 bg-white p-8">
            <h2 className="text-[#6F6F6F] text-2xl md:text-3xl font-bold text-center mb-6">
              Set New Password
            </h2>

            <form className="space-y-6" onSubmit={handleUpdatePassword}>
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="text-[15px] font-[400] text-[#575757]"
                >
                  New Password
                </label>
                <div className="w-full relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="confirmPassword"
                  className="text-[15px] font-[400] text-[#575757]"
                >
                  Confirm Password
                </label>
                <div className="w-full relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-primary-dark transition mt-5"
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
          <div className="w-full md:w-1/2 text-center">
            <p className="text-[#6F6F6F] text-lg">
              Create a new password. Ensure it differs from your previous one.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
