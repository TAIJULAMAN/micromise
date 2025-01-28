import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../components/Modals/DeleteModal";
import image from "/table.png";
import { LuEye } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import TechnicianViewModal from "../../components/Modals/TechnicianViewModal";

function AdminClient() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [data, setData] = useState([
    {
      id: 1,
      username: "Dindiniya10",
      name: "Dindiniya",
      email: "bockelboy@att.com",
      contact: "(201) 555-0124",
      location: "Kent, Utah",
      requestedJobs: 1,
    },
    {
      id: 2,
      username: "Dindiniya10",
      name: "Dindiniya",
      email: "bockelboy@att.com",
      contact: "(201) 555-0124",
      location: "Kent, Utah",
      requestedJobs: 1,
    },
    {
      id: 3,
      username: "Dindiniya10",
      name: "Dindiniya",
      email: "bockelboy@att.com",
      contact: "(201) 555-0124",
      location: "Kent, Utah",
      requestedJobs: 1,
    },
    {
      id: 4,
      username: "Dindiniya10",
      name: "Dindiniya",
      email: "bockelboy@att.com",
      contact: "(201) 555-0124",
      location: "Kent, Utah",
      requestedJobs: 1,
    },
    {
      id: 5,
      username: "Dindiniya10",
      name: "Dindiniya",
      email: "bockelboy@att.com",
      contact: "(201) 555-0124",
      location: "Kent, Utah",
      requestedJobs: 1,
    },
  ]);

  const onDelete = () => {
    setData((prevData) =>
      prevData.filter((item) => item.id !== currentRecord.id)
    );
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

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
          {data.map((item) => (
            <tr
              key={item.id}
              className="grid grid-cols-[1.5fr_2fr_2fr_1.5fr_1.5fr_1.5fr] px-2 py-4 text-center text-[#707070]"
            >
              <td>
                <div className="flex gap-2 justify-center">
                  <img
                    className="h-[20px] w-[20px] object-cover rounded"
                    alt="avatar"
                    src={image}
                  />
                  <span>{item.name}</span>
                </div>
              </td>
              <td>{item.email}</td>
              <td>{item.contact}</td>
              <td>{item.location}</td>
              <td>{item.requestedJobs}</td>
              <td className="flex justify-center gap-2">
                <button
                  onClick={() => {
                    setIsModalVisible(true);
                    setCurrentRecord(item);
                  }}
                  className="w-6 h-6"
                >
                  <LuEye />
                </button>
                <button
                  onClick={() => {
                    setIsDeleteModalVisible(true);
                    setCurrentRecord(item);
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
        <DeleteModal
          setIsDeleteModalVisible={setIsDeleteModalVisible}
          onDelete={onDelete}
          currentRecord={currentRecord}
        />
      )}
    </div>
  );
}

export default AdminClient;
