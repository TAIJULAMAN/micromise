import { useState } from "react";
import image from "/table.png";
import { TbDotsVertical } from "react-icons/tb";
import JobRequestModal from "../../components/Modals/JobRequestModal";
import MessageModal from "../../components/Modals/MessageModal";
import MessageTechnisianModal from "../../components/Modals/MessageTechnisianModal";

function RaisedTickets() {
  const [jobStatus, setJobStatus] = useState({});
  const [paymentStatus, setPaymentStatus] = useState({});
  const [requestModal, setRequestModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [messageTechnisian, setMessageTechnisian] = useState(false);

  const data = [
    {
      id: 1,
      aName: "Dindiniya10",
      sName: "Dindiniya",
      services: ["ECU", "Diagnostics", "Software"],
      date: "2025-01-01",
    },
    {
      id: 2,
      aName: "TechGuru20",
      sName: "Guru",
      services: ["Hardware", "Network Setup"],
      date: "2025-01-02",
    },
    {
      id: 3,
      aName: "FixItFast",
      sName: "Fixer",
      services: ["Cleaning", "Replacement"],
      date: "2025-01-03",
    },
    {
      id: 4,
      aName: "CodeMaster",
      sName: "Coder",
      services: ["Troubleshoot", "Debug", "Development"],
      date: "2025-01-04",
    },
    {
      id: 5,
      aName: "NetPro",
      sName: "Networker",
      services: ["Optimization", "Setup", "VPN"],
      date: "2025-01-05",
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
          <th>Client Admin</th>
          <th>Client Supervisor</th>
          <th>Needed Service</th>
          <th>Date</th>
          <th>Assign Technician</th>
          <th>Status</th>
          <th>Payment</th>
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
            <td className="text-xs">
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
              <div className="flex gap-2 justify-center items-center border border-primary p-1 rounded-lg">
                <img
                  className="h-[20px] w-[20px] object-cover rounded"
                  alt="avatar"
                  src={image}
                />
                <span> Mr ray</span>
              </div>
            </td>
            {/* Job Status dropdown */}
            <td>
              <select
                className="rounded py-2 px-3 text-white focus:outline-none"
                value={jobStatus[item.id] || "Pending"}
                onChange={(e) =>
                  setJobStatus((prev) => ({
                    ...prev,
                    [item.id]: e.target.value,
                  }))
                }
                style={{
                  backgroundColor:
                    jobStatus[item.id] === "Pending"
                      ? "#f79292"
                      : jobStatus[item.id] === "Assigned"
                      ? "#FFDB97CC"
                      : jobStatus[item.id] === "Completed"
                      ? "#34C759F2"
                      : "#F32929", // Default color when canceled or other status
                }}
              >
                <option value="Pending">Pending</option>
                <option value="Assigned">Assigned</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
              </select>
            </td>
            <td>
              <select
                className="text-white rounded py-2 px-3 focus:outline-none"
                value={paymentStatus[item.id] || "Pending"}
                onChange={(e) =>
                  setPaymentStatus((prev) => ({
                    ...prev,
                    [item.id]: e.target.value,
                  }))
                }
                style={{
                  backgroundColor:
                    paymentStatus[item.id] === "Pending"
                      ? "#F32929"
                      : paymentStatus[item.id] === "Completed"
                      ? "#34C759"
                      : "#F32929",
                }}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </td>
            <td className="relative">
              <button onClick={() => toggleModal(item.id)} className="w-6 h-6">
                <TbDotsVertical />
              </button>

              {/* Popover Modal */}
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
                      onClick={() => setMessageTechnisian(true)}
                    >
                      Message Technisian
                    </button>
                    <button
                      className="bg-primary text-white py-2 rounded w-full mb-2 text-xs"
                      onClick={() => setMessageModal(true)}
                    >
                      Message client
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

              {/* Overlay to close the popover */}
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
        {messageTechnisian && (
          <MessageTechnisianModal setMessageTechnisian={setMessageTechnisian} />
        )}
      </tbody>
    </table>
  );
}

export default RaisedTickets;
