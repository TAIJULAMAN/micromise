import { useEffect, useState } from "react";
import { TbDotsVertical } from "react-icons/tb";
import JobRequestModal from "../../components/Modals/JobRequestModal";
import MessageModal from "../../components/Modals/MessageModal";
import { IoSearch } from "react-icons/io5";
import AddInvoiceModal from "../../components/Modals/AddInvoiceModal";
import { useGetAllJobsQuery } from "../../redux/api/jobApi";
import { useGetAllTechnicianQuery } from "../../redux/api/technicianApi";

function JobRequest() {
  const [searchText, setSearchText] = useState("");
  const [requestModal, setRequestModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [visibleModals, setVisibleModals] = useState({});
  const [accordionState, setAccordionState] = useState({});
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: jobData, isLoading, error } = useGetAllJobsQuery();
  const { data: technicianData } = useGetAllTechnicianQuery();

  // Ensure technicianData?.data?.result is an array before filtering
  const filteredTechnicians = Array.isArray(technicianData?.data?.result)
    ? technicianData.data.result.filter((technician) =>
        technician.fullName?.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  const handleSelectTechnician = (technician) => {
    setSelectedTechnician(technician);
    setSearchText(technician.fullName);
    setDropdownOpen(false);
  };

  const toggleModal = (_id) => {
    setVisibleModals((prev) => ({
      ...prev,
      [_id]: !prev[_id],
    }));
  };

  const toggleAccordion = (_id) => {
    setAccordionState((prev) => ({
      ...prev,
      [_id]: !prev[_id],
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
        {jobData?.data?.map((job, index) => (
          <tr
            key={job._id}
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
                    alt={job?.grandId?.fullName || "Anonymous User"}
                    className="h-8 w-8 rounded-full object-cover"
                    width={20}
                    height={20}
                  />
                  <span>{job?.grandId?.fullName || "No Name"}</span>
                </div>
              ) : job?.userId?.role === "client" ? (
                <div className="flex gap-2 justify-start items-center">
                  <img
                    src={
                      job?.userId?.profileImg
                        ? `${job?.userId?.profileImg}`
                        : "https://avatar.iran.liara.run/public/44"
                    }
                    alt={job?.userId?.fullName || "Anonymous User"}
                    className="h-8 w-8 rounded-full object-cover"
                    width={20}
                    height={20}
                  />
                  <span>{job?.userId?.fullName || "No Name"}</span>
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
                      job.userId.profileImg
                        ? `${job.userId.profileImg}`
                        : "https://avatar.iran.liara.run/public/44"
                    }
                    alt={job.userId.fullName || "Anonymous User"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span>{job.userId.fullName || "Unknown User"}</span>
                </div>
              ) : (
                <span>No Supervisor</span>
              )}
            </td>
            <td className="text-xs w-full">
              <ul className="flex gap-2 list-disc text-left border p-2 border-primary rounded">
                {(job?.services || []).map((service, index) => (
                  <li key={index} className="list-inside">
                    {service}
                  </li>
                ))}
              </ul>
            </td>
            <td>{new Date(job?.createdAt).toLocaleDateString()}</td>
            <td>
              <div className="relative w-[280px]">
                <input
                  type="text"
                  placeholder="Search Technician"
                  className="border border-primary rounded-md py-[4px] px-3 w-full focus:outline-none"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    setDropdownOpen(true);
                  }}
                />
                {dropdownOpen && searchText && (
                  <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto">
                    {filteredTechnicians.length > 0 ? (
                      filteredTechnicians.map((technician) => (
                        <li
                          key={technician._id}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-200 flex items-center gap-2"
                          onClick={() => handleSelectTechnician(technician)}
                        >
                          <img
                            src={
                              technician?.profileImg ||
                              "https://avatar.iran.liara.run/public/44"
                            }
                            className="h-6 w-6 rounded-full object-cover"
                          />
                          <span>{technician?.fullName}</span>
                        </li>
                      ))
                    ) : (
                      <p className="px-3 py-2">No technician found.</p>
                    )}
                  </ul>
                )}
              </div>
            </td>
            <td>
              <span
                style={{
                  backgroundColor:
                    job?.status === "pending"
                      ? "#d95f5f"
                      : job.status === "raised"
                      ? "#f0d29c"
                      : job.status === "completed"
                      ? "#3ac75d"
                      : "#F32929",
                }}
                className="py-1 px-3 rounded text-white flex justify-center text-center w-[100px]"
              >
                {job?.status}
              </span>
            </td>
            <td>
              <span
                style={{
                  backgroundColor:
                    job?.paymentStatus === "pending"
                      ? "#ff9500"
                      : job?.paymentStatus === "completed"
                      ? "#3ac75d"
                      : "#F32929",
                }}
                className="py-1 px-3 rounded text-white flex justify-center text-center w-[200px] cursor-pointer"
                onClick={() => toggleAccordion(job?._id)}
              >
                {job.paymentStatus}
              </span>
              {accordionState[job._id] && (
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
              <button onClick={() => toggleModal(job._id)} className="w-6 h-6">
                <TbDotsVertical />
              </button>
              {visibleModals[job._id] && (
                <div className="absolute top-full right-0 bg-white border border-primary rounded-lg shadow-lg w-[130px] z-10">
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
                      onClick={() => toggleModal(job._id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              {visibleModals[job.id] && (
                <div
                  onClick={() => toggleModal(job._id)}
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

// import { useEffect, useState } from "react";
// import { TbDotsVertical } from "react-icons/tb";
// import JobRequestModal from "../../components/Modals/JobRequestModal";
// import MessageModal from "../../components/Modals/MessageModal";
// import { IoSearch } from "react-icons/io5";
// import AddInvoiceModal from "../../components/Modals/AddInvoiceModal";
// import { useGetAllJobsQuery } from "../../redux/api/jobApi";
// import { useGetAllTechnicianQuery } from "../../redux/api/technicianApi";

// function JobRequest() {
//   const [searchText, setSearchText] = useState("");
//   const [requestModal, setRequestModal] = useState(false);
//   const [messageModal, setMessageModal] = useState(false);
//   const [addModalVisible, setAddModalVisible] = useState(false);
//   const [visibleModals, setVisibleModals] = useState({});
//   const [accordionState, setAccordionState] = useState({});

//   const { data: jobData, isLoading, error } = useGetAllJobsQuery();
//   // console.log(jobData?.data);

//   const { data: technicianData } = useGetAllTechnicianQuery();
//   console.log(technicianData);

//   const toggleModal = (_id) => {
//     setVisibleModals((prev) => ({
//       ...prev,
//       [_id]: !prev[_id],
//     }));
//   };

//   const toggleAccordion = (_id) => {
//     setAccordionState((prev) => ({
//       ...prev,
//       [_id]: !prev[_id],
//     }));
//   };
//   // .........................................................................................

//   const [selectedTechnician, setSelectedTechnician] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // Ensure technicianData is an array before filtering
//   const filteredTechnicians =
//     technicianData?.data?.result?.filter((technician) =>
//       technician.fullName?.toLowerCase().includes(searchText.toLowerCase())
//     ) || [];

//   const handleSelectTechnician = (technician) => {
//     setSelectedTechnician(technician);
//     setSearchText(technician.fullName);
//     setDropdownOpen(false);
//   };

//   return (
//     <table className="bg-white w-full pt-5">
//       <thead>
//         <tr className="grid grid-cols-[.5fr_1fr_1fr_1.5fr_1fr_1.5fr_1fr_1fr_.5fr] px-2 py-4 text-[#171717]">
//           <th>Job Id</th>
//           <th className="flex justify-start">Client</th>
//           <th className="flex justify-start">Supervisor</th>
//           <th>Needed Service</th>
//           <th>Date</th>
//           <th>Assign Technician</th>
//           <th className="">Job Status</th>
//           <th className="flex justify-start">Payment</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody className="text-start">
//         {jobData?.data?.map((job, index) => (
//           <tr
//             key={index}
//             className="grid grid-cols-[.5fr_1fr_1fr_1.5fr_1fr_1.5fr_1fr_1fr_.5fr] px-2 py-4 text-center text-[#707070]"
//           >
//             <td>{index + 1}</td>
//             <td>
//               {job?.grandId ? (
//                 <div className="flex gap-2 justify-start items-center">
//                   <img
//                     src={
//                       job?.grandId?.profileImg
//                         ? `${job?.grandId?.profileImg}`
//                         : "https://avatar.iran.liara.run/public/44"
//                     }
//                     alt={job?.grandId?.fullName || "Anonymous User"}
//                     className="h-8 w-8 rounded-full object-cover"
//                     width={20}
//                     height={20}
//                   />
//                   <span>{job?.grandId?.fullName || "No Name"}</span>
//                 </div>
//               ) : job?.userId?.role === "client" ? (
//                 <div className="flex gap-2 justify-start items-center">
//                   <img
//                     src={
//                       job?.userId?.profileImg
//                         ? `${job?.userId?.profileImg}`
//                         : "https://avatar.iran.liara.run/public/44"
//                     }
//                     alt={job?.userId?.fullName || "Anonymous User"}
//                     className="h-8 w-8 rounded-full object-cover"
//                     width={20}
//                     height={20}
//                   />
//                   <span>{job?.userId?.fullName || "No Name"}</span>
//                 </div>
//               ) : (
//                 <span>No Client</span>
//               )}
//             </td>
//             <td>
//               {job?.userId?.role === "supervisor" ? (
//                 <div className="flex gap-2 justify-start items-center">
//                   <img
//                     src={
//                       job.userId.profileImg
//                         ? `${job.userId.profileImg}`
//                         : "https://avatar.iran.liara.run/public/44"
//                     }
//                     alt={job.userId.fullName || "Anonymous User"}
//                     className="h-8 w-8 rounded-full object-cover"
//                   />
//                   <span>{job.userId.fullName || "Unknown User"}</span>
//                 </div>
//               ) : (
//                 <span>No Supervisor</span>
//               )}
//             </td>
//             <td className="text-xs w-full">
//               <ul className="flex gap-2 list-disc text-left border p-2 border-primary rounded">
//                 {job?.services?.map((service, index) => (
//                   <li key={index} className="list-inside">
//                     {service}
//                   </li>
//                 ))}
//               </ul>
//             </td>
//             <td>
//               {new Date(job?.createdAt).toLocaleString("en-US", {
//                 day: "2-digit",
//                 month: "2-digit",
//                 year: "numeric",
//               })}
//             </td>
//             {/* assign technisian */}
//             <td>
//               <div className="relative w-[280px]">
//                 <input
//                   type="text"
//                   placeholder="Search Technician"
//                   className="border border-primary rounded-md py-[4px] px-3 w-full focus:outline-none"
//                   value={searchText}
//                   onChange={(e) => {
//                     setSearchText(e.target.value);
//                     setDropdownOpen(true);
//                   }}
//                 />
//                 <span className="bg-gray-300 text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-gray-400 group">
//                   <IoSearch className="text-[1.3rem] text-primary" />
//                 </span>

//                 {dropdownOpen && filteredTechnicians.length > 0 && (
//                   <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto">
//                     {filteredTechnicians?.map((technician) => (
//                       <li
//                         key={technician?._id}
//                         className="px-3 py-2 cursor-pointer hover:bg-gray-200"
//                         onClick={() => handleSelectTechnician(technician)}
//                       >
//                         <img
//                           src={
//                             technician?.profileImg ||
//                             "https://avatar.iran.liara.run/public/44"
//                           }
//                           alt={technician?.fullName}
//                           className="h-6 w-6 rounded-full object-cover"
//                         />
//                         <span>{technician?.fullName}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}

//                 {dropdownOpen &&
//                   searchText &&
//                   filteredTechnicians.length === 0 && (
//                     <p className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full px-3 py-2">
//                       No technician found.
//                     </p>
//                   )}
//               </div>
//             </td>
//             <td className="flex justify-center">
//               <span
//                 style={{
//                   backgroundColor:
//                     job?.status === "pending"
//                       ? "#d95f5f"
//                       : job.status === "raised"
//                       ? "#f0d29c"
//                       : job.status === "completed"
//                       ? "#3ac75d"
//                       : "#F32929",
//                 }}
//                 className="py-1 px-3 rounded text-white flex justify-center text-center w-[100px]"
//               >
//                 {job?.status}
//               </span>
//             </td>
//             <td className="flex flex-col items-center relative">
//               <span
//                 style={{
//                   backgroundColor:
//                     job?.paymentStatus === "pending"
//                       ? "#ff9500"
//                       : job?.paymentStatus === "completed"
//                       ? "#3ac75d"
//                       : "#F32929",
//                 }}
//                 className="py-1 px-3 rounded text-white flex justify-center text-center w-[200px] cursor-pointer"
//                 onClick={() => toggleAccordion(job?._id)}
//               >
//                 {job.paymentStatus}
//               </span>
//               {accordionState[job._id] && (
//                 <div className="z-50 mt-10 w-[200px] bg-white p-3 rounded shadow flex justify-center items-center gap-2 absolute">
//                   <button
//                     className="bg-white text-primary py-1 px-3 rounded w-full border border-primary"
//                     onClick={() => alert("Decline clicked")}
//                   >
//                     Decline
//                   </button>
//                   <button
//                     className="bg-primary text-white py-1 px-3 rounded w-full"
//                     onClick={() => alert("Approve clicked")}
//                   >
//                     Approve
//                   </button>
//                 </div>
//               )}
//             </td>
//             <td className="relative">
//               <button onClick={() => toggleModal(job._id)} className="w-6 h-6">
//                 <TbDotsVertical />
//               </button>
//               {visibleModals[job._id] && (
//                 <div className="absolute top-full right-0 mt-2 bg-white border border-primary rounded-lg shadow-lg w-[130px] z-10">
//                   <div className="bg-white shadow-lg rounded-lg p-2">
//                     <button
//                       className="bg-primary text-white py-2 rounded w-full mb-2 text-xs"
//                       onClick={() => setRequestModal(true)}
//                     >
//                       View details
//                     </button>
//                     <button
//                       className="bg-primary text-white py-2 rounded w-full mb-2 text-xs"
//                       onClick={() => setMessageModal(true)}
//                     >
//                       Message client
//                     </button>
//                     <button
//                       className="bg-primary text-white py-2 rounded w-full mb-2 text-xs"
//                       onClick={() => setAddModalVisible(true)}
//                     >
//                       Create invoice
//                     </button>
//                     <button
//                       className="border border-primary text-primary py-2 rounded w-full mb-2 text-xs"
//                       onClick={() => toggleModal(job._id)}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {visibleModals[job.id] && (
//                 <div
//                   onClick={() => toggleModal(job._id)}
//                   className="fixed inset-0 z-0"
//                 ></div>
//               )}
//             </td>
//           </tr>
//         ))}
//         {requestModal && <JobRequestModal setRequestModal={setRequestModal} />}
//         {messageModal && <MessageModal setMessageModal={setMessageModal} />}
//         {addModalVisible && (
//           <AddInvoiceModal setAddModalVisible={setAddModalVisible} />
//         )}
//       </tbody>
//     </table>
//   );
// }

// export default JobRequest;
