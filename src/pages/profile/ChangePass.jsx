import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

function ChangePass() {
  const [isEyeOpen, setIsEyeOpen] = useState();
  const [profilePic, setProfilePic] = useState(null);

  const handleSubmit = () => {};
  return (
    <div className="bg-white px-20 w-[715px] pt-10 pb-5 rounded-md">
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
              name="password"
              id="password"
              placeholder="Password"
              className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1"
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
              name="password"
              id="password"
              placeholder="Password"
              className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1"
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
              name="password"
              id="password"
              placeholder="Password"
              className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1"
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
          {profilePic ? (
            <button
              type="button"
              onClick={() => alert("Uploading image...")}
              className="bg-primary text-white p-2 px-10 py-2 rounded-md shadow-lg"
            >
              Upload Picture
            </button>
          ) : (
            <button
              type="submit"
              className="font-bold bg-primary text-white p-2 px-10 py-2 rounded-md shadow-lg"
            >
              Save & Changes
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ChangePass;
