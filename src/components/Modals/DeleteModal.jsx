import { IoCloseSharp } from "react-icons/io5";

function DeleteModal({ setIsDeleteModalVisible }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded">
      <div className="bg-white px-5 py-10 rounded shadow-lg w-96 relative">
        {/* Close Button */}
        <button
          onClick={() => setIsDeleteModalVisible(false)}
          className="absolute top-2 right-2 text-white bg-secondary focus:outline-none p-1 rounded-full"
        >
          <IoCloseSharp />
        </button>
        <h3 className="text-lg font-semibold mb-4 text-center">
          Are you sure!!
        </h3>
        <p className="text-sm mb-4 text-gray-600 text-center">
          Do you want to delete this ?
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => {
              setIsDeleteModalVisible(false);
            }}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
