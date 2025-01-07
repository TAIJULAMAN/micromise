import { useState } from "react";

function EditProfile() {
  const [profilePic, setProfilePic] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="bg-white px-20 w-[715px] pt-5 pb-2 rounded-md">
      <p className="text-primary text-center font-bold text-xl mb-5">Edit Your Profile</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-md font-medium text-[#575757] mb-2">User Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border-2 border-[#F2F2F2] rounded-md focus:outline-none  text-md"
            placeholder="Enter Name"
            required
          />
        </div>
        <div>
          <label className="block text-md font-medium text-[#575757] mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border-2 border-[#F2F2F2] rounded-md focus:outline-none  text-md"
            placeholder="Enter Email"
            required
          />
        </div>
        <div>
          <label className="block text-md font-medium text-[#575757] mb-2">Contact No</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-2 border-2 border-[#F2F2F2] rounded-md focus:outline-none  text-md"
            placeholder="Enter Contact Number"
            required
          />
        </div>
        <div>
          <label className="block text-md font-medium text-[#575757] mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border-2 border-[#F2F2F2] rounded-md focus:outline-none  text-md"
            placeholder="Enter Address"
            required
          />
        </div>

        <div className="text-center">
          {profilePic ? (
            <button
              type="button"
              onClick={() => alert("Uploading image...")}
              className="bg-primary text-white p-2 px-10 py-2 rounded-md shadow-lg"
            >
              Upload Profile Picture
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

export default EditProfile;
