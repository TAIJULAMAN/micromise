import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOwnDataQuery } from "../../redux/api/getMeApi";
import { useEditAdminMutation } from "../../redux/api/profileApi";
import Swal from "sweetalert2";

function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    contactNo: "",
    location: "",
    userName: "",
    dob: "",
  });

  const { data: getMeData, isLoading, refetch } = useOwnDataQuery();

  useEffect(() => {
    if (getMeData) {
      setFormData({
        fullName: getMeData?.data?.fullName || "",
        contactNo: getMeData?.data?.contactNo || "",
        location: getMeData?.data?.location || "",
        userName: getMeData?.data?.userName || "",
        dob: getMeData?.data?.dob || "",
      });
    }
  }, [getMeData]);

  const [EditAdmin] = useEditAdminMutation();

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!getMeData?.data?._id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "User information is missing. Please log in again.",
      });
      return;
    }

   
    const updatedData = {
      User: {
        fullName: formData.fullName,
        contactNo: formData.contactNo,
        location: formData.location,
        userName: formData.userName,
        dob: formData.dob,
      },
    };

    console.log(updatedData);

    try {
      await EditAdmin({
        _id: getMeData?.data?._id,
        data: updatedData,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
      });
      refetch();

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error updating profile",
        text: error?.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="bg-white px-20 w-[715px] py-5 rounded-md">
      <p className="text-primary text-center font-bold text-xl mb-5">
        Edit Your Profile
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-md font-medium text-[#575757] mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border-2 border-[#F2F2F2] rounded-md focus:outline-none text-md"
            placeholder="Enter full name"
            required
          />
        </div>

        <div>
          <label className="block text-md font-medium text-[#575757] mb-2">
            Contact No
          </label>
          <input
            type="text"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            className="w-full p-2 border-2 border-[#F2F2F2] rounded-md focus:outline-none text-md"
            placeholder="Enter Contact Number"
            required
          />
        </div>

        <div>
          <label className="block text-md font-medium text-[#575757] mb-2">
            Address
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border-2 border-[#F2F2F2] rounded-md focus:outline-none text-md"
            placeholder="Enter Address"
            required
          />
        </div>

        <div>
          <label className="block text-md font-medium text-[#575757] mb-2">
            Username
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-2 border-2 border-[#F2F2F2] rounded-md focus:outline-none text-md"
            placeholder="Enter Username"
            required
          />
        </div>

        <div>
          <label className="block text-md font-medium text-[#575757] mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 border-2 border-[#F2F2F2] rounded-md focus:outline-none text-md"
            required
          />
        </div>

        <div className="text-center my-5">
          <button
            type="submit"
            className={`font-bold bg-primary text-white p-2 px-10 py-2 rounded-md shadow-lg ${
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

export default EditProfile;
