import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../components/Modals/DeleteModal";
import { LuEye } from "react-icons/lu";
import { IoCloseSharp, IoSearch } from "react-icons/io5";
import {
  useDeleteTechnicianMutation,
  useGetAllTechnicianQuery,
} from "../../redux/api/technicianApi";
import { getBaseUrl } from "../../config/envConfig";
import Swal from "sweetalert2";
import { Pagination } from "antd";
import { useDebounced } from "../../utils/hook";

function Technician() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  // ............................................................
  const [currentPage, setCurrentPage] = useState(1);
  const query = { isDeleted: false, page: currentPage };
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounced({
    searchTerm: searchTerm,
    delay: 500,
  });

  // console.log("add er age", query);
  query.searchTerm = debouncedSearchTerm;
  // console.log("add er pore", query);

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchTerm(searchText);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // ...................................................................

  // fetch all technician
  const {
    data: technicianData,
    error,
    isLoading,
    refetch,
  } = useGetAllTechnicianQuery(query);

  // delete Data
  const [deleteTechnician] = useDeleteTechnicianMutation();
  const handleDeleteAdmin = (technician) => {
    console.log(technician);
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${technician?.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTechnician(technician?._id).unwrap();

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
  if (error) return <p className="text-red-500">Failed to load technisians!</p>;

  return (
    <div className="mt-5 overflow-hidden">
      <div className="flex items-center justify-between pb-5 gap-5">
        <h3 className="font-semibold text-xl text-[#242424]">Technician</h3>
        <div className="relative w-full sm:w-[300px]">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search..."
            className="border border-[#e5eaf2] py-3 pl-4 pr-[65px] outline-none w-full rounded-md"
          />
          <span className="bg-gray-300 text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-gray-400 group">
            <IoSearch className="text-[1.3rem] group-hover:text-gray-200" />
          </span>
        </div>
      </div>

      <div className="min-w-full">
        <table className="bg-white w-full overflow-hidden">
          <thead>
            <tr className="grid grid-cols-[1.5fr_2fr_1.5fr_1fr_1.5fr_1.5fr_1fr] px-2 py-4 text-[#171717]">
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Location</th>
              <th>Technician Skills</th>
              <th>Completed job</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-start">
            {technicianData?.data?.result?.map((technician, index) => (
              <tr
                key={index}
                className="grid grid-cols-[1.5fr_2fr_1.5fr_1fr_1.5fr_1.5fr_1fr] px-2 py-4 text-center text-[#707070]"
              >
                <td>
                  <td className="p-3 flex items-center gap-2">
                    <img
                      src={
                        technician?.image
                          ? `${getBaseUrl()}/${technician?.profileImg}`
                          : "https://avatar.iran.liara.run/public/44"
                      }
                      alt={technician?.fullName || "User"}
                      className="h-10 w-10 rounded-full"
                    />
                    <span>{technician?.fullName || "No Name"}</span>
                  </td>
                </td>
                <td>{technician?.email || "No Data"}</td>
                <td>{technician?.contactNo || "No Data"}</td>
                <td>{technician?.location || "No Data"}</td>
                <td>
                  {technician?.skills?.length ? (
                    <ul>
                      {technician.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  ) : (
                    "No Data"
                  )}
                </td>
                <td>{technician?.completedJobs || "No Data"}</td>
                <td className="flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setIsModalVisible(true);
                      setCurrentRecord(technician);
                    }}
                    className="w-6 h-6"
                  >
                    <LuEye />
                  </button>
                  <button
                    onClick={() => handleDeleteAdmin(technician)}
                    className="text-primary w-6 h-6"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-5 flex justify-end ">
          {technicianData?.data?.result?.length !== 0 && (
            <Pagination
              current={technicianData?.data?.meta?.page}
              pageSize={technicianData?.data?.meta?.limit}
              total={technicianData?.data?.meta?.total}
              onChange={handlePageChange}
            />
          )}
        </div>
      </div>

      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
          <div className="bg-white w-[400px] rounded-lg shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="bg-secondary pt-5 pb-2 text-center relative">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
                <img
                  src={
                    currentRecord?.image
                      ? `${getBaseUrl()}/${currentRecord?.profileImg}`
                      : "https://avatar.iran.liara.run/public/44"
                  }
                  alt={currentRecord?.fullName || "User"}
                  className="h-20 w-20 rounded-full"
                />
              </div>
              <h2 className="text-md font-bold mt-2 text-white">
                {currentRecord?.fullName || "No Name"}
              </h2>
              <h2 className="text-sm mt-1 text-gray-600">Technician</h2>
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
                    {currentRecord?.fullName || "No Data"}
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="font-medium text-[#171717]">Email</span>
                  <span className="text-[#707070]">
                    {currentRecord?.email || "No Data"}
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="font-medium text-[#171717]">Contact</span>
                  <span className="text-[#707070]">
                    {currentRecord?.contactNo || "No Data"}
                  </span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="font-medium text-[#171717]">Location</span>
                  <span className="text-[#707070]">
                    {currentRecord?.location || "No Data"}
                  </span>
                </div>

                {/* Skills */}
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

                {/* Upline */}
                {currentRecord?.upline && (
                  <div className="flex flex-col space-y-2">
                    <span className="font-medium text-[#171717]">Upline</span>
                    <span className="text-[#707070]">
                      {currentRecord.upline}
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

export default Technician;
