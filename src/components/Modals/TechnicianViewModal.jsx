import { IoCloseSharp } from "react-icons/io5";
import img from "/table.png";
function TechnicianViewModal({ setIsModalVisible, currentRecord }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-white w-[400px] rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-secondary pt-5 pb-2 text-center relative">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
            <img src={img} alt="Technician Profile" className="w-full h-full" />
          </div>
          <h2 className="text-md font-bold mt-2 text-white">
            {currentRecord?.name}
          </h2>
          <h2 className="text-sm mt-1 text-gray-600">Technisian</h2>
          {/* Close Button */}
          <button
            onClick={() => setIsModalVisible(false)}
            className="absolute top-2 right-2 text-white bg-primary focus:outline-none p-2 rounded-full"
          >
            <IoCloseSharp />
          </button>
        </div>

        {/* Details Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Technician Details
          </h2>
          <div className="space-y-2">
            <div className="flex flex-col space-y-2">
              <span className="font-medium text-[#171717]">User Name</span>
              <span className="text-[#707070]">{currentRecord?.username}</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-medium text-[#171717]">Email</span>
              <span className="text-[#707070]">{currentRecord?.email}</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-medium text-[#171717]">Contact</span>
              <span className="text-[#707070]">{currentRecord?.contact}</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-medium text-[#171717]">Location</span>
              <span className="text-[#707070]">{currentRecord?.location}</span>
            </div>
            {currentRecord?.skills && (
              <div className="flex flex-col space-y-2">
                <span className="font-medium text-[#171717]">Skills</span>
                <span className="text-[#707070]">{currentRecord.skills}</span>
              </div>
            )}

            {currentRecord?.upline && (
              <div className="flex flex-col space-y-2">
                <span className="font-medium text-[#171717]">Upline</span>
                <span className="text-[#707070]">{currentRecord.upline}</span>
              </div>
            )}
          </div>

          {/* <div className="mt-6 flex justify-center">
            <button
              onClick={() => setIsModalVisible(false)}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Close
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default TechnicianViewModal;
