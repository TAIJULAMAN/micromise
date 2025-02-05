import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../components/Modals/DeleteModal";
import image from "/table.png";
import { LuEye } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import TechnicianViewModal from "../../components/Modals/TechnicianViewModal";
import { useGetAllSupervisorQuery } from "../../redux/api/supervisorApi";
import { getBaseUrl } from "../../config/envConfig";

function ClientSupervisor() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  // get all supervisor
  const {
    data: supervisorData,
    error,
    isLoading,
    refetch,
  } = useGetAllSupervisorQuery({ isDeleted: false });
  console.log(supervisorData);

  if (isLoading)
    return (
      <div className="w-10 h-10 animate-spin rounded-full border-dashed border-10 border-primary"></div>
    );
  if (error) return <p className="text-red-500">Failed to load service!</p>;

  return (
    <div className="mt-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-5">
        <h3 className="font-semibold text-xl text-[#242424]">Supervisor</h3>
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
          <tr className="grid grid-cols-[1.5fr_2fr_1.5fr_1.5fr_1fr_1.5fr_1fr] px-2 py-4 text-[#171717]">
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Location</th>
            <th>Upline</th>
            <th>Completed job</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-start">
          {supervisorData?.data?.map((supervisor, index) => (
            <tr
              key={index}
              className="grid grid-cols-[1.5fr_2fr_1.5fr_1.5fr_1fr_1.5fr_1fr] px-2 py-4 text-center text-[#707070]"
            >
              {" "}
              <td>
                <div className="flex gap-2 justify-center items-center">
                  <img
                    src={
                      supervisor?.profileImg
                        ? `${getBaseUrl()}/${supervisor?.profileImg}`
                        : "https://avatar.iran.liara.run/public/44"
                    }
                    alt={supervisor?.fullName
                      || "User"}
                    className="h-10 w-10 rounded-full"
                  />
                  <span>{supervisor?.fullName
                  }</span>
                </div>
              </td>
              <td>{supervisor?.email}</td>
              <td>{supervisor?.contactNo}</td>
              <td>{supervisor?.location}</td>
              <td>{supervisor?.upline || "No data"}</td>
              <td>{supervisor?.jobRequest || "No data"}</td>
              <td className="flex justify-center gap-2">
                <button
                  onClick={() => {
                    setIsModalVisible(true);
                    setCurrentRecord(supervisor);
                  }}
                  className="w-6 h-6"
                >
                  <LuEye />
                </button>
                <button
                  onClick={() => {
                    setIsDeleteModalVisible(true);
                    setCurrentRecord(supervisor);
                  }}
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
        <TechnicianViewModal
          setIsModalVisible={setIsModalVisible}
          currentRecord={currentRecord}
        />
      )}
      {isDeleteModalVisible && (
        <DeleteModal setIsDeleteModalVisible={setIsDeleteModalVisible} />
      )}
    </div>
  );
}

export default ClientSupervisor;
