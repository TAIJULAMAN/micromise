import { IoCloseSharp } from "react-icons/io5";

function AddInvoiceModal({ setAddModalVisible }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white p-6 rounded shadow-lg px-10 w-[500px]">
        <h3 className="text-lg font-semibold mb-4 text-[#242424]">
          Edit Invoice
        </h3>
        {/* Close Button */}
        <button
          onClick={() => setAddModalVisible(false)}
          className="absolute top-2 right-2 text-white bg-secondary focus:outline-none p-2 rounded-full"
        >
          <IoCloseSharp />
        </button>
        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <label className="block text-md font-medium text-[#171717] mb-2">
              Job ID
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border-[1px] border-primary rounded-md focus:outline-none  text-md"
              placeholder="Enter  Job ID"
              required
            />
          </div>
          <div>
            <label className="block text-md font-medium text-[#171717] mb-2">
              Payment state
            </label>
            <p className="py-2 px-6 rounded text-white bg-[#34C759F2]">
              Completed
            </p>
          </div>
        </div>
        <div className="mt-5">
          <label className="block text-md font-medium text-[#171717] mb-2">
            Client Admin Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border-[1px] border-primary rounded-md focus:outline-none  text-md"
            placeholder="Enter Client Admin Name"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
          <div>
            <label className="block text-md font-medium text-[#171717] mb-2">
              Service name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border-[1px] border-primary rounded-md focus:outline-none  text-md"
              placeholder="Enter  Service name"
              required
            />
          </div>
          <div>
            <label className="block text-md font-medium text-[#171717] mb-2">
              Service Price
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border-[1px] border-primary rounded-md focus:outline-none  text-md"
              placeholder="Enter  Service Price"
              required
            />
          </div>
        </div>
        {/* Buttons */}
        <div className="flex justify-start mt-5">
          <button
            type="submit"
            className="px-4 py-2 bg-white text-primary border border-primary rounded-lg w-full"
          >
            +Add more
          </button>
        </div>

        <div className="flex justify-start mt-5">
          <button
            onClick={() => setAddModalVisible(false)}
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddInvoiceModal;
