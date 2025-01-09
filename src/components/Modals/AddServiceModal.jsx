import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

function AddServiceModal({ onSubmit, setIsAddModalVisible }) {
  const [formData, setFormData] = useState({
    name: "",
  });
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
        <h3 className="text-lg font-semibold mb-5 text-[#242424]">Add new service category</h3>

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
              Name
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

          <div className="flex justify-start mt-5">
            <button
              onClick={handleSubmit}
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddServiceModal;
