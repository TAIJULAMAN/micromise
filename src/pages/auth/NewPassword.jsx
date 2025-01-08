import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function NewPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isConfirmEyeOpen, setIsConfirmEyeOpen] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("New Password Set:", formData.password);
    // Add your password update logic here
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 md:w-[60%]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="w-full md:w-1/2 bg-white p-8">
            <h2 className="text-[#6F6F6F] text-2xl md:text-3xl font-bold text-center mb-6">
              Set New Password
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
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
                    placeholder="Enter new password"
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

              {/* Confirm Password Field */}
              <div className="w-full">
                <label
                  htmlFor="confirmPassword"
                  className="text-[15px] font-[400] text-[#575757]"
                >
                  Confirm Password
                </label>
                <div className="w-full relative">
                  <input
                    type={isConfirmEyeOpen ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    id="confirmPassword"
                    placeholder="Re-enter new password"
                    className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1"
                    required
                  />
                  {isConfirmEyeOpen ? (
                    <IoEyeOutline
                      className="absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                      onClick={() => setIsConfirmEyeOpen(false)}
                    />
                  ) : (
                    <IoEyeOffOutline
                      className="absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                      onClick={() => setIsConfirmEyeOpen(true)}
                    />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Link to="/success-message">
                <button
                  type="submit"
                  className="w-full bg-primary text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-primary-dark transition"
                >
                  Confirm
                </button>
              </Link>
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
