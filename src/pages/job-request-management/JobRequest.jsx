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
  const [visibleModals, setVisibleModals] = useState({});
  const [accordionState, setAccordionState] = useState({});

  const data = [
    {
      id: 1,
      aName: "Dindiniya10",
      sName: "Dindiniya",
      services: ["ECU", "Diagnostics", "Software"],
      date: "2025-01-01",
      jobStatus: "Pending",
      paymentStatus: "Payment pending",
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
      paymentStatus: "Payment made",
    },
    {
      id: 4,
      aName: "CodeMaster",
      sName: "Coder",
      services: ["Troubleshoot", "Debug"],
      date: "2025-01-04",
      jobStatus: "Canceled",
      paymentStatus: "Payment pending",
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

  const toggleModal = (id) => {
    setVisibleModals((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAccordion = (id) => {
    setAccordionState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <table className="bg-white w-full pt-5">
      <thead>
        <tr className="grid grid-cols-[.5fr_1fr_1fr_1.5fr_1fr_1.5fr_1fr_1fr_.5fr] px-2 py-4 text-[#171717]">
          <th>Job Id</th>
          <th className="flex justify-start">Client</th>
          <th className="flex justify-start">Supervisor</th>
          <th>Needed Service</th>
          <th>Date</th>
          <th>Assign Technician</th>
          <th className="">Job Status</th>
          <th className="flex justify-start">Payment</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className="text-start">
        {data.map((item) => (
          <tr
            key={item.id}
            className="grid grid-cols-[.5fr_1fr_1fr_1.5fr_1fr_1.5fr_1fr_1fr_.5fr] px-2 py-4 text-center text-[#707070]"
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
            <td className="flex justify-center">
              <span
                style={{
                  backgroundColor:
                    item.jobStatus === "Pending"
                      ? "#d95f5f"
                      : item.jobStatus === "Assigned"
                      ? "#f0d29c"
                      : item.jobStatus === "Completed"
                      ? "#3ac75d"
                      : "#F32929",
                }}
                className="py-1 px-3 rounded text-white flex justify-center text-center w-[100px]"
              >
                {item.jobStatus}
              </span>
            </td>
            <td className="flex flex-col items-center relative">
              <span
                style={{
                  backgroundColor:
                    item.paymentStatus === "Payment pending"
                      ? "#F32929"
                      : item.paymentStatus === "Completed"
                      ? "#3ac75d"
                      : "#ff9500",
                }}
                className="py-1 px-3 rounded text-white flex justify-center text-center w-[200px] cursor-pointer"
                onClick={() => toggleAccordion(item.id)}
              >
                {item.paymentStatus}
              </span>
              {accordionState[item.id] && (
                <div className="z-50 mt-10 w-[200px] bg-white p-3 rounded shadow flex justify-center items-center gap-2 absolute">
                  <button
                    className="bg-white text-primary py-1 px-3 rounded w-full border border-primary"
                    onClick={() => alert("Decline clicked")}
                  >
                    Decline
                  </button>
                  <button
                    className="bg-primary text-white py-1 px-3 rounded w-full"
                    onClick={() => alert("Approve clicked")}
                  >
                    Approve
                  </button>
                </div>
              )}
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
                      onClick={() => setAddModalVisible(true)}
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
        {addModalVisible && (
          <AddInvoiceModal setAddModalVisible={setAddModalVisible} />
        )}
      </tbody>
    </table>
  );
}

export default JobRequest;
