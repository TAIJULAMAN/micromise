import { useState } from "react";
import { IoCloseSharp, IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
function AddNewAdmin({ onSubmit, setIsAddModalVisible }) {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    userType: "admin",
  });

  // State for password visibility
  const [isEyeOpen, setIsEyeOpen] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setIsAddModalVisible(false);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white p-6 rounded shadow-lg px-10 w-[500px]">
        <h3 className="text-lg font-semibold mb-4">Make Admin</h3>

        {/* Close Button */}
        <button
          onClick={() => setIsAddModalVisible(false)}
          className="absolute top-2 right-2 text-white bg-secondary focus:outline-none p-2 rounded-full"
        >
          <IoCloseSharp />
        </button>

        <form onSubmit={onSubmit}>
          <div>
            <label className="block text-md font-medium text-[#575757] mb-2">
              User Name
            </label>
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
            <label className="block text-md font-medium text-[#575757] mb-2">
              Email
            </label>
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
            <label className="block text-md font-medium text-[#575757] mb-2">
              Contact No
            </label>
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
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">User Type</label>
            <select
              name="userType"
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="flex justify-start space-x-2">
            <button
              onClick={handleSubmit}
              type="submit"
              className="px-4 py-2 bg-primary text-white"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewAdmin;
