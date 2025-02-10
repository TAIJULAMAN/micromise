import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useOwnDataQuery } from "../../redux/api/getMeApi";
import { useChangeAdminPasswordMutation } from "../../redux/api/profileApi";
import Swal from "sweetalert2";

function ChangePass() {
  const [isEyeOpen, setIsEyeOpen] = useState();
  const [formValues, setFormValues] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const { data: getMeData, isLoading } = useOwnDataQuery();

  console.log(getMeData);

  const [changeAdminPassword] = useChangeAdminPasswordMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = formValues;

    // Password validation
    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "The passwords do not match. Please try again.",
      });
      return;
    }

    if (!getMeData?.data?.email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User information is missing. Please log in again.",
      });
      return;
    }

    // Submit the password change request

    changeAdminPassword({
      email: getMeData?.data?.email,
      oldPassword,
      newPassword,
    })
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Password Updated",
          text: "Your password has been updated successfully.",
        });
        setFormValues({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error?.data?.message || "An error occurred. Please try again.",
        });
      });
  };
  return (
    <div className="bg-white px-20 w-[715px] pt-10 py-5 rounded-md">
      <p className="text-primary text-center font-bold text-xl mb-5">
        Change Password
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="w-full">
          <label
            htmlFor="password"
            className="text-[15px] font-[400] text-[#575757]"
          >
            Old Password
          </label>
          <div className="w-full relative">
            <input
              type={isEyeOpen ? "text" : "password"}
              name="oldPassword"
              id="oldPassword"
              value={formValues?.oldPassword}
              onChange={handleChange}
              placeholder="Old Password"
              className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1"
              required
            />
            {isEyeOpen ? (
              <IoEyeOutline
                className=" absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                onClick={() => setIsEyeOpen(false)}
              />
            ) : (
              <IoEyeOffOutline
                className=" absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                onClick={() => setIsEyeOpen(true)}
              />
            )}
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="password"
            className="text-[15px] font-[400] text-[#575757]"
          >
            New Password
          </label>
          <div className="w-full relative">
            <input
              type={isEyeOpen ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              value={formValues.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1"
              required
            />
            {isEyeOpen ? (
              <IoEyeOutline
                className=" absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                onClick={() => setIsEyeOpen(false)}
              />
            ) : (
              <IoEyeOffOutline
                className=" absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                onClick={() => setIsEyeOpen(true)}
              />
            )}
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="password"
            className="text-[15px] font-[400] text-[#575757]"
          >
            Confirm Password
          </label>
          <div className="w-full relative">
            <input
              type={isEyeOpen ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1"
              required
            />
            {isEyeOpen ? (
              <IoEyeOutline
                className=" absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                onClick={() => setIsEyeOpen(false)}
              />
            ) : (
              <IoEyeOffOutline
                className=" absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                onClick={() => setIsEyeOpen(true)}
              />
            )}
          </div>
        </div>

        <div className="text-center my-5">
          <button
            type="submit"
            className={`font-bold bg-primary text-white px-10 py-2 rounded-md shadow-lg ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save & Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePass;
