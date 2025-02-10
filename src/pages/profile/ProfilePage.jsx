import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import EditProfile from "./EditProfile";
import ChangePass from "./ChangePass";
import { useOwnDataQuery } from "../../redux/api/getMeApi";
import { getBaseUrl } from "../../config/envConfig";

function ProfilePage() {
  const [profilePic, setProfilePic] = useState(null);
  const [activeTab, setActiveTab] = useState("editProfile");

  const { data: getMeData, isLoading, refetch } = useOwnDataQuery();
  console.log(getMeData);

  const handleProfilePicUpload = (e) => {
    setProfilePic(e.target.files[0]);
  };

  return (
    <div className=" overflow-y-auto">
      <div className="px-5 pb-5 h-full">
        <h3 className="font-semibold pb-5 text-xl text-[#242424]">
          Admin Profile(Super Admin)
        </h3>
        <div className="mx-auto flex flex-col justify-center items-center">
          {/* Profile Picture Section */}
          <div className="flex justify-center items-center bg-secondary mt-5 text-white w-[715px] mx-auto p-5 gap-5 rounded-md">
            <div className="relative">
              <div className="w-[122px] h-[122px] bg-gray-300 rounded-full border-4 border-white shadow-xl flex justify-center items-center">
                <img
                  src={
                    getMeData?.data?.profileImg
                      ? `${getBaseUrl()}/${getMeData?.data?.profileImg}`
                      : "https://avatar.iran.liara.run/public/44"
                  }
                  alt={getMeData?.data?.fullName || "User"}
                  className="h-30 w-32 rounded-full"
                />
                {/* Upload Icon */}
                <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer">
                  <label htmlFor="profilePicUpload" className="cursor-pointer">
                    <FaCamera className="text-[#575757]" />
                  </label>
                  <input
                    type="file"
                    id="profilePicUpload"
                    onChange={handleProfilePicUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold">
                {getMeData?.data?.fullName}
              </p>
              <p className="text-sm font-semibold">{getMeData?.data?.role}</p>
            </div>
          </div>

          {/* Tab Navigation Section */}
          <div className="flex justify-center items-center gap-5 text-md md:text-xl font-semibold my-5">
            <p
              onClick={() => setActiveTab("editProfile")}
              className={`cursor-pointer pb-1 ${
                activeTab === "editProfile"
                  ? "text-primary border-b-2 border-primary"
                  : "text-[#575757]"
              }`}
            >
              Edit Profile
            </p>
            <p
              onClick={() => setActiveTab("changePassword")}
              className={`cursor-pointer pb-1 ${
                activeTab === "changePassword"
                  ? "text-primary border-b-2 border-primary"
                  : "text-[#575757]"
              }`}
            >
              Change Password
            </p>
          </div>

          {/* Tab Content Section */}
          <div className="flex justify-center items-center p-5 rounded-md">
            <div className="w-full max-w-3xl">
              {activeTab === "editProfile" && <EditProfile />}
              {activeTab === "changePassword" && <ChangePass />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
