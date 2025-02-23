import { useState } from "react";
import { TbDotsVertical } from "react-icons/tb";
import MessageTechnisianModal from "../../components/Modals/MessageTechnisianModal";
import { useGetAllRaisedJobsQuery } from "../../redux/api/jobApi";
import RaisedTicketModal from "../../components/Modals/RaisedTicketModal";
import TicketMessageModall from "../../components/Modals/TicketMessageModall";
import { Pagination } from "antd";
import { useDebounced } from "../../utils/hook";
import { IoSearch } from "react-icons/io5";

function RaisedTickets() {
  const [ticketModal, setTicketModal] = useState(false);
  const [messageTechnisian, setMessageTechnisian] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [ticketMessageModal, setTicketMessageModall] = useState(false);
  const [visibleModals, setVisibleModals] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleModal = (_id) => {
    setVisibleModals((prev) => ({
      ...prev,
      [_id]: !prev[_id],
    }));
  };
  const query = { isDeleted: false, page: currentPage };

  const {
    data: raisedJobsData,
    isLoading,
    error,
  } = useGetAllRaisedJobsQuery(query);
  const filteredRaisedJobs = raisedJobsData?.data.filter(
    (job) => job.status === "raised"
  );

  const debouncedSearchTerm = useDebounced({
    searchTerm: searchTerm,
    delay: 500,
  });
  query.searchTerm = debouncedSearchTerm;

  const handleSearch = (e) => {
    const searchText = e?.target?.value;
    setSearchTerm(searchText);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading)
    return (
      <div className="w-10 h-10 animate-spin rounded-full border-dashed border-10 border-primary"></div>
    );
  if (error) return <p className="text-red-500">Failed to load service!</p>;

  return (
    <div>
      <div className="flex justify-end items-center mb-5">
        <div className="relative w-[320px]">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            className="border border-[#e5eaf2] py-3 pl-4 pr-[65px] outline-none w-full rounded-md "
          />

          <span className="bg-gray-300 text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-gray-400 group">
            <IoSearch className="text-[1.3rem]  group-hover:text-gray-200" />
          </span>
        </div>
      </div>
      <table className="bg-white w-full pt-5">
        <thead>
          <tr className="grid grid-cols-[.5fr_1fr_1fr_1.5fr_1fr_1.5fr_1fr_1fr_.5fr] px-2 py-4 text-[#171717]">
            <th>Job Id</th>
            <th className="flex justify-center">Client</th>
            <th className="flex justify-start text-center">Supervisor</th>
            <th className="flex justify-start text-start ml-10">
              Needed Service
            </th>
            <th className="flex justify-start text-start ml-16">Date</th>
            <th className="flex justify-start text-start ml-10">
              Assign Technician
            </th>
            <th className="flex justify-start text-start ml-10">Job Status</th>
            <th className="flex justify-start text-start ml-10">Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-start">
          {filteredRaisedJobs?.length > 0 ? (
            filteredRaisedJobs.map((job) => (
              <tr
                key={job?._id}
                className="grid grid-cols-[.5fr_1fr_1fr_1.5fr_1fr_1.5fr_1fr_1fr_.5fr] px-2 py-4 text-center text-[#707070]"
              >
                <td>{job?.jobId}</td>
                <td>
                  {job?.grandId ? (
                    <div className="flex gap-2 justify-center items-center text-sm">
                      <img
                        src={
                          job?.grandId?.profileImg
                            ? `${job?.grandId?.profileImg}`
                            : "https://avatar.iran.liara.run/public/44"
                        }
                        alt={job?.grandId?.fullName}
                        className="h-5 w-5 rounded-full object-cover"
                        width={20}
                        height={20}
                      />
                      <span>{job?.grandId?.fullName}</span>
                    </div>
                  ) : job?.userId?.role === "client" ? (
                    <div className="flex gap-2 justify-center items-center text-sm">
                      <img
                        src={
                          job?.userId?.profileImg
                            ? `${job?.userId?.profileImg}`
                            : "https://avatar.iran.liara.run/public/44"
                        }
                        alt={job?.userId?.fullName}
                        className="h-5 w-5 rounded-full object-cover"
                        width={20}
                        height={20}
                      />
                      <span>{job?.userId?.fullName}</span>
                    </div>
                  ) : (
                    <span className="text-sm">No Client</span>
                  )}
                </td>
                <td>
                  {job?.userId?.role === "supervisor" ? (
                    <div className="flex gap-2 justify-center items-center text-sm">
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
                    <span className="text-sm">No Supervisor</span>
                  )}
                </td>
                <td className="text-xs w-full">
                  <ul className="flex gap-1 list-disc text-left border p-1 border-primary rounded">
                    {job?.services?.map((service, index) => (
                      <li key={index} className="list-inside">
                        {service}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{new Date(job?.createdAt).toLocaleDateString()}</td>
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
                          onClick={() => setTicketMessageModall(true)}
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
                  {ticketMessageModal && (
                    <TicketMessageModall
                      setTicketMessageModall={setTicketMessageModall}
                      job={job}
                    />
                  )}
                  {messageTechnisian && (
                    <MessageTechnisianModal
                      setMessageTechnisian={setMessageTechnisian}
                      job={job}
                    />
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
        </tbody>
      </table>
      <div className="mt-5 flex justify-end ">
        {raisedJobsData?.data?.length !== 0 && (
          <Pagination
            current={raisedJobsData?.meta?.page}
            pageSize={raisedJobsData?.meta?.limit}
            total={raisedJobsData?.meta?.total}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default RaisedTickets;
