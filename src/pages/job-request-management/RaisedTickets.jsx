import { useState } from "react";
import image from "/table.png";
import { TbDotsVertical } from "react-icons/tb";
import JobRequestModal from "../../components/Modals/JobRequestModal";
import MessageModal from "../../components/Modals/MessageModal";
import MessageTechnisianModal from "../../components/Modals/MessageTechnisianModal";
import { useGetAllRaisedJobsQuery } from "../../redux/api/jobApi";
import RaisedTicketModal from "../../components/Modals/RaisedTicketModal";

function RaisedTickets() {
  const [ticketModal, setTicketModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [messageTechnisian, setMessageTechnisian] = useState(false);
  const [accordionState, setAccordionState] = useState({});
  const [currentRecord, setCurrentRecord] = useState(null);

  const toggleAccordion = (id) => {
    setAccordionState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const [visibleModals, setVisibleModals] = useState({});

  const toggleModal = (_id) => {
    setVisibleModals((prev) => ({
      ...prev,
      [_id]: !prev[_id],
    }));
  };

  const { data: raisedJobsData, isLoading, error } = useGetAllRaisedJobsQuery();
  console.log(raisedJobsData?.data);
  const filteredRaisedJobs = raisedJobsData?.data.filter(
    (job) => job.status === "raised"
  );
  console.log(filteredRaisedJobs);

  return (
    <table className="bg-white w-full pt-5">
      <thead>
        <tr className="grid grid-cols-[.5fr_1fr_1fr_1.5fr_1fr_1.5fr_1fr_1fr_.5fr] px-2 py-4 text-[#171717]">
          <th>Job Id</th>
          <th className="flex justify-start">Client</th>
          <t className="flex justify-start font-bold">Supervisor</t>
          <th>Needed Service</th>
          <th>Date</th>
          <th>Assign Technician</th>
          <th>Status</th>
          <th>Payment</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className="text-start">
        {filteredRaisedJobs?.length > 0 ? (
          filteredRaisedJobs.map((job, index) => (
            <tr
              key={index + 1}
              className="grid grid-cols-[.5fr_1fr_1fr_1.5fr_1fr_1.5fr_1fr_1fr_.5fr] px-2 py-4 text-center text-[#707070]"
            >
              <td>{index + 1}</td>
              <td>
                {job?.grandId ? (
                  <div className="flex gap-2 justify-start items-center">
                    <img
                      src={
                        job?.grandId?.profileImg
                          ? `${job?.grandId?.profileImg}`
                          : "https://avatar.iran.liara.run/public/44"
                      }
                      alt={job?.grandId?.fullName}
                      className="h-8 w-8 rounded-full object-cover"
                      width={20}
                      height={20}
                    />
                    <span>{job?.grandId?.fullName}</span>
                  </div>
                ) : job?.userId?.role === "client" ? (
                  <div className="flex gap-2 justify-start items-center">
                    <img
                      src={
                        job?.userId?.profileImg
                          ? `${job?.userId?.profileImg}`
                          : "https://avatar.iran.liara.run/public/44"
                      }
                      alt={job?.userId?.fullName}
                      className="h-6 w-6 rounded-full object-cover"
                      width={20}
                      height={20}
                    />
                    <span>{job?.userId?.fullName}</span>
                  </div>
                ) : (
                  <span>No Client</span>
                )}
              </td>
              <td>
                {job?.userId?.role === "supervisor" ? (
                  <div className="flex gap-2 justify-start items-center">
                    <img
                      src={
                        job?.userId?.profileImg
                          ? `${job?.userId?.profileImg}`
                          : "https://avatar.iran.liara.run/public/44"
                      }
                      alt={job?.userId?.fullName || "Anonymous User"}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <span>{job?.userId?.fullName || "Unknown User"}</span>
                  </div>
                ) : (
                  <span>No Supervisor</span>
                )}
              </td>
              <td className="text-xs">
                <ul className="flex gap-2 list-disc text-left border p-2 border-primary rounded">
                  {job?.services?.map((service, index) => (
                    <li key={index} className="list-inside">
                      {service}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                {job?.createdAt
                  ? new Date(job?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })
                  : "N/A"}
              </td>

              <td>
                <div className="flex gap-2 justify-center items-center border border-primary p-1 rounded-lg">
                  <img
                    src={
                      job?.assignedTechnician
                        ? `${job?.assignedTechnician?.profileImg}`
                        : "https://avatar.iran.liara.run/public/44"
                    }
                    alt={job?.assignedTechnician?.fullName}
                    className="h-6 w-6 rounded-full object-cover"
                    width={20}
                    height={20}
                  />
                  <span>{job?.assignedTechnician?.fullName}</span>
                </div>
              </td>
              {/* Job Status dropdown */}
              <td className="flex justify-center">
                <span
                  style={{
                    backgroundColor:
                      job?.status === "pending"
                        ? "#d95f5f"
                        : job?.status === "raised"
                        ? "#f0d29c"
                        : job?.status === "completed"
                        ? "#3ac75d"
                        : "#F32929",
                  }}
                  className="py-1 px-3 rounded text-white flex justify-center text-center w-[100px]"
                >
                  {job?.status}
                </span>
              </td>
              <td className="flex flex-col items-center relative">
                <span
                  style={{
                    backgroundColor:
                      job?.paymentStatus === "cancelled"
                        ? "#F32929"
                        : job?.paymentStatus === "completed"
                        ? "#3ac75d"
                        : "#ff9500",
                  }}
                  className="py-1 px-3 rounded text-white flex justify-center text-center w-[100px] cursor-pointer"
                >
                  {job?.paymentStatus}
                </span>
              </td>
              <td className="relative">
                <button
                  onClick={() => toggleModal(job?._id)}
                  className="w-6 h-6"
                >
                  <TbDotsVertical />
                </button>

                {/* Popover Modal */}
                {visibleModals[job?._id] && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-primary rounded-lg shadow-lg w-[130px] z-10">
                    <div className="bg-white shadow-lg rounded-lg p-2">
                      <button
                        className="bg-primary text-white py-2 rounded w-full mb-2 text-xs"
                        onClick={() => {
                          setTicketModal(true);
                          setCurrentRecord(job);
                        }}
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
                    </div>
                  </div>
                )}

                {/* Overlay to close the popover */}
                {visibleModals[job._id] && (
                  <div
                    onClick={() => toggleModal(job._id)}
                    className="fixed inset-0 z-0"
                  ></div>
                )}
              </td>
            </tr>
          ))
        ) : (
          <p>No raised jobs found.</p>
        )}

        {ticketModal && (
          <RaisedTicketModal
          setTicketModal={setTicketModal}
            currentRecord={currentRecord}
          />
        )}
        {messageModal && <MessageModal setMessageModal={setMessageModal} />}
        {messageTechnisian && (
          <MessageTechnisianModal setMessageTechnisian={setMessageTechnisian} />
        )}
      </tbody>
    </table>
  );
}

export default RaisedTickets;
