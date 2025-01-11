import { useState } from "react";
import image from "/table.png";
import { TbDotsVertical } from "react-icons/tb";
import JobRequestModal from "../../components/Modals/JobRequestModal";
import MessageModal from "../../components/Modals/MessageModal";
import { IoSearch } from "react-icons/io5";
import AddInvoiceModal from "../../components/Modals/AddInvoiceModal";

function JobRequest() {
  const [searchText, setSearchText] = useState("");
  const [requestModal, setRequestModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const data = [
    {
      id: 1,
      aName: "Dindiniya10",
      sName: "Dindiniya",
      services: ["ECU", "Diagnostics", "Software"],
      date: "2025-01-01",
      jobStatus: "Pending",
      paymentStatus: "Pending",
    },
    {
      id: 2,
      aName: "TechGuru20",
      sName: "Guru",
      services: ["Hardware", "Network Setup"],
      date: "2025-01-02",
      jobStatus: "Assigned",
      paymentStatus: "Completed",
    },
    {
      id: 3,
      aName: "FixItFast",
      sName: "Fixer",
      services: ["Cleaning", "Replacement"],
      date: "2025-01-03",
      jobStatus: "Completed",
      paymentStatus: "Pending",
    },
    {
      id: 4,
      aName: "CodeMaster",
      sName: "Coder",
      services: ["Troubleshoot", "Debug"],
      date: "2025-01-04",
      jobStatus: "Canceled",
      paymentStatus: "Pending",
    },
    {
      id: 5,
      aName: "NetPro",
      sName: "Networker",
      services: ["Optimization", "Setup", "VPN"],
      date: "2025-01-05",
      jobStatus: "Pending",
      paymentStatus: "Completed",
    },
  ];

  const [visibleModals, setVisibleModals] = useState({});

  const toggleModal = (id) => {
    setVisibleModals((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <table className="bg-white w-full pt-5">
      <thead>
        <tr className="grid grid-cols-[.5fr_1fr_1fr_2fr_1fr_2fr_1fr_1fr_.5fr] px-2 py-4 text-[#171717]">
          <th>Job Id</th>
          <th className="flex justify-start">Client Admin</th>
          <th className="flex justify-start">Client Supervisor</th>
          <th>Needed Service</th>
          <th>Date</th>
          <th>Assign Technician</th>
          <th className="flex justify-start">Job Status</th>
          <th className="flex justify-start">Payment</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className="text-start">
        {data.map((item) => (
          <tr
            key={item.id}
            className="grid grid-cols-[.5fr_1fr_1fr_2fr_1fr_2fr_1fr_1fr_.5fr] px-2 py-4 text-center text-[#707070]"
          >
            <td>{item.id}</td>
            <td>
              <div className="flex gap-2 justify-start">
                <img
                  className="h-[20px] w-[20px] object-cover rounded"
                  alt="avatar"
                  src={image}
                />
                <span>{item.aName}</span>
              </div>
            </td>
            <td>
              <div className="flex gap-2 justify-start">
                <img
                  className="h-[20px] w-[20px] object-cover rounded"
                  alt="avatar"
                  src={image}
                />
                <span>{item.sName}</span>
              </div>
            </td>
            <td className="text-xs w-[280px]">
              <ul className="flex gap-2 list-disc text-left border p-2 border-primary rounded">
                {item.services.map((service, index) => (
                  <li key={index} className="list-inside">
                    {service}
                  </li>
                ))}
              </ul>
            </td>
            <td>{item.date}</td>
            <td>
              <div className="relative w-[280px]">
                <input
                  type="text"
                  placeholder="Search Technician"
                  className="border border-primary rounded-md py-[4px] px-3 w-full focus:outline-none"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <span className="bg-gray-300 text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-gray-400 group">
                  <IoSearch className="text-[1.3rem] text-primary" />
                </span>
              </div>
            </td>
            <td className="flex justify-start ">
              <span
                style={{
                  backgroundColor:
                    item.jobStatus === "Pending"
                      ? "#f79292"
                      : item.jobStatus === "Assigned"
                      ? "#FFDB97CC"
                      : item.jobStatus === "Completed"
                      ? "#34C759F2"
                      : "#F32929",
                }}
                className="py-1 px-3 rounded text-white"
              >
                {item.jobStatus}
              </span>
            </td>
            <td className="flex justify-start">
              <span
                style={{
                  backgroundColor:
                    item.paymentStatus === "Pending"
                      ? "#F32929"
                      : item.paymentStatus === "Completed"
                      ? "#34C759F2"
                      : "#ff9500",
                }}
                className="py-1 px-3 rounded text-white"
              >
                {item.paymentStatus}
              </span>
            </td>

            <td className="relative">
              <button onClick={() => toggleModal(item.id)} className="w-6 h-6">
                <TbDotsVertical />
              </button>
              {visibleModals[item.id] && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-primary rounded-lg shadow-lg w-[130px] z-10">
                  <div className="bg-white shadow-lg rounded-lg p-2">
                    <button
                      className="bg-primary text-white py-2 rounded w-full mb-2 text-xs"
                      onClick={() => setRequestModal(true)}
                    >
                      View details
                    </button>
                    <button
                      className="bg-primary text-white py-2 rounded w-full mb-2 text-xs"
                      onClick={() => setMessageModal(true)}
                    >
                      Message client
                    </button>
                    <button
                      className="bg-primary text-white py-2 rounded w-full mb-2 text-xs"
                      onClick={() =>   setAddModalVisible(true)}
                    >
                       

                      Create invoice
                    </button>
                    <button
                      className="border border-primary text-primary py-2 rounded w-full mb-2 text-xs"
                      onClick={() => toggleModal(item.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {visibleModals[item.id] && (
                <div
                  onClick={() => toggleModal(item.id)}
                  className="fixed inset-0 z-0"
                ></div>
              )}
            </td>
          </tr>
        ))}
        {requestModal && <JobRequestModal setRequestModal={setRequestModal} />}
        {messageModal && <MessageModal setMessageModal={setMessageModal} />}
        {addModalVisible && <AddInvoiceModal  setAddModalVisible={setAddModalVisible} />}
      </tbody>
    </table>
  );
}

export default JobRequest;
