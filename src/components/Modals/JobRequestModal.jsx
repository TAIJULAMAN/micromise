import { IoCloseSharp } from "react-icons/io5";

function JobRequestModal({ setRequestModal, currentRecord }) {
  console.log(currentRecord);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-white w-[400px] rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-secondary pt-5 pb-2 text-center relative">
          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
            <div className="flex gap-2 justify-start items-center">
              <img
                src={
                  currentRecord?.userId?.profileImg
                    ? `${currentRecord?.userId?.profileImg}`
                    : "https://avatar.iran.liara.run/public/44"
                }
                alt={currentRecord?.userId?._id || "Anonymous User"}
                className="h-20 w-20 rounded-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-md font-bold mt-2 text-white">
            {currentRecord?.userId?.fullName}
          </h2>
          <h2 className="text-sm mt-1 text-gray-600">Client</h2>
          {/* Close Button */}
          <button
            onClick={() => setRequestModal(false)}
            className="absolute top-2 right-2 text-white bg-primary focus:outline-none p-2 rounded-full"
          >
            <IoCloseSharp />
          </button>
        </div>

        {/* Details Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Admin Client Details
          </h2>
          <div className="space-y-2">
            <div className="flex flex-col space-y-2">
              <span className="font-medium text-[#171717]">User Name</span>
              <span className="text-[#707070]">
                {" "}
                {currentRecord?.userId?.fullName}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-medium text-[#171717]">Reg No</span>
              <span className="text-[#707070]"> {currentRecord?.jobId}</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-medium text-[#171717]">Date</span>
              <span className="text-[#707070]">
                {currentRecord?.createdAt
                  ? new Date(currentRecord?.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }
                    )
                  : "N/A"}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-medium text-[#171717]">Services</span>
              <span className="text-[#707070]">
                {currentRecord?.services?.length
                  ? currentRecord.services.join(", ")
                  : "No services available"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobRequestModal;
