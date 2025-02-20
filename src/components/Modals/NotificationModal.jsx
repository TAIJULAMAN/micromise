import { IoCloseSharp } from "react-icons/io5";

function NotificationModal({ setIsModalOpen, currentRecord }) {
  console.log(currentRecord);
  const handleModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white px-5 py-10 rounded shadow-lg w-96 relative">
        {/* Close Button */}
        <button
          onClick={handleModal}
          className="absolute top-2 right-2 text-white bg-secondary focus:outline-none p-1 rounded-full"
        >
          <IoCloseSharp />
        </button>
        <h3 className="text-lg font-semibold mb-4 text-start text-[#555555]">
          {currentRecord?.status == "created"
            ? "New notification about creation"
            : currentRecord?.status == "raised"
            ? "New notification about technisian"
            : "New Notification"}
        </h3>
        <p className="text-sm mb-4 text-[#919191] text-start">
          {currentRecord?.message}
        </p>
      </div>
    </div>
  );
}

export default NotificationModal;
