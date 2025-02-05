import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../components/Modals/DeleteModal";
import { LuEye } from "react-icons/lu";
import { IoCloseSharp, IoSearch } from "react-icons/io5";
import {
  useDeleteClientMutation,
  useGetAllClientQuery,
} from "../../redux/api/clientApi";
import { getBaseUrl } from "../../config/envConfig";
import Swal from "sweetalert2";

function AdminClient() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  // fetch all technician
  const {
    data: clientData,
    error,
    isLoading,
    refetch,
  } = useGetAllClientQuery({ isDeleted: false });
  console.log(clientData);

  // deleteServiceData
  const [deleteClient] = useDeleteClientMutation();
  const handleDeleteAdmin = (client) => {
    console.log(client);
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${client?.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteClient(client?._id).unwrap();

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "The admin has been deleted successfully.",
          });
          refetch();
        } catch (error) {
          console.error("delete Error:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete the admin. Please try again.",
          });
        }
      }
    });
  };

  if (isLoading)
    return (
      <div className="w-10 h-10 animate-spin rounded-full border-dashed border-10 border-primary"></div>
    );
  if (error) return <p className="text-red-500">Failed to load service!</p>;

  return (
    <div className="mt-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-5">
        <h3 className="font-semibold text-xl text-[#242424]">Client</h3>
        <div className="relative w-[320px]">
          <input
            type="text"
            placeholder="Search..."
            className="border border-[#e5eaf2] py-3 pl-4 pr-[65px] outline-none w-full rounded-md "
          />

          <span className="bg-gray-300 text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-gray-400 group">
            <IoSearch className="text-[1.3rem]  group-hover:text-gray-200" />
          </span>
        </div>
      </div>

      <table className="bg-white w-full pt-5">
        <thead>
          <tr className="grid grid-cols-[1.5fr_2fr_2fr_1.5fr_1.5fr_1.5fr] px-2 py-4 text-[#171717]">
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Location</th>
            <th>Requested job</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-start">
          {clientData?.data?.map((client, index) => (
            <tr
              key={index}
              className="grid grid-cols-[1.5fr_2fr_2fr_1.5fr_1.5fr_1.5fr] px-2 py-4 text-center text-[#707070]"
            >
              <td>
                <div className="flex gap-2 justify-start text-center ml-10">
                  <img
                    src={
                      client?.image
                        ? `${getBaseUrl()}/${client?.profileImg}`
                        : "https://avatar.iran.liara.run/public/44"
                    }
                    alt={client?.fullName || "User"}
                    className="h-10 w-10 rounded-full"
                  />
                  <span>{client?.fullName}</span>
                </div>
              </td>
              <td>{client?.email}</td>
              <td>{client?.contactNo}</td>
              <td>{client?.location || "No data"}</td>
              <td>{client?.requestedJobs || "No data"}</td>
              <td className="flex justify-center gap-2">
                <button
                  onClick={() => {
                    setIsModalVisible(true);
                    setCurrentRecord(client);
                  }}
                  className="w-6 h-6"
                >
                  <LuEye />
                </button>
                <button
                  onClick={() => handleDeleteAdmin(client)}
                  className="text-primary w-6 h-6"
                >
                  <RiDeleteBin6Line />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
          <div className="bg-white w-[400px] rounded-lg shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="bg-secondary pt-5 pb-2 text-center relative">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
                <img
                  src={
                    currentRecord?.profileImg
                      ? `${getBaseUrl()}/${currentRecord?.profileImg}`
                      : "https://avatar.iran.liara.run/public/44"
                  }
                  alt={currentRecord?.fullName || "User"}
                  className="h-20 w-20 rounded-full"
                />{" "}
              </div>
              <h2 className="text-md font-bold mt-2 text-white">
                {currentRecord?.fullName}
              </h2>
              <h2 className="text-sm mt-1 text-gray-600">Client</h2>
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
                  <span className="text-[#707070]">
                    {currentRecord?.userName || "No data"}
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="font-medium text-[#171717]">Email</span>
                  <span className="text-[#707070]">{currentRecord?.email}</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="font-medium text-[#171717]">Contact</span>
                  <span className="text-[#707070]">
                    {currentRecord?.contactNo}
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="font-medium text-[#171717]">Location</span>
                  <span className="text-[#707070]">
                    {currentRecord?.location || "No data"}
                  </span>
                </div>
                {currentRecord?.skills?.length > 0 && (
                  <div className="flex flex-col space-y-2">
                    <span className="font-medium text-[#171717]">Skills</span>
                    <ul className="text-[#707070] list-disc pl-5">
                      {currentRecord.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentRecord?.upline && (
                  <div className="flex flex-col space-y-2">
                    <span className="font-medium text-[#171717]">Upline</span>
                    <span className="text-[#707070]">
                      {currentRecord?.upline || "No data"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isDeleteModalVisible && (
        <DeleteModal setIsDeleteModalVisible={setIsDeleteModalVisible} />
      )}
    </div>
  );
}

export default AdminClient;
