import { useEffect, useState } from "react";
import { TbDotsVertical } from "react-icons/tb";
import JobRequestModal from "../../components/Modals/JobRequestModal";
import MessageModal from "../../components/Modals/MessageModal";
import AddInvoiceModal from "../../components/Modals/AddInvoiceModal";
import {
  useGetAllJobsQuery,
  useUpdateJobMutation,
} from "../../redux/api/jobApi";
import { useGetAllTechnicianQuery } from "../../redux/api/technicianApi";
import SelectAndSubmit from "../../components/Common/SelectAndSubmit";
import Swal from "sweetalert2";
import { Pagination } from "antd";
import { IoSearch } from "react-icons/io5";
import { useDebounced } from "../../utils/hook";
function JobRequest() {
  const [requestModal, setRequestModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [visibleModals, setVisibleModals] = useState({});
  const [currentRecord, setCurrentRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const query = { isDeleted: false, page: currentPage };
  const { data: jobData, isLoading, error } = useGetAllJobsQuery(query);
  const { data: technicianData } = useGetAllTechnicianQuery({ limit: 100 });

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

  const [, setJobs] = useState([]);

  useEffect(() => {
    if (jobData?.data) {
      setJobs(jobData.data);
    }
  }, [jobData]);

  const toggleModal = (_id) => {
    setVisibleModals((prev) => ({
      ...prev,
      [_id]: !prev[_id],
    }));
  };

  const [updateJob] = useUpdateJobMutation();

  // ! Technicians Selecting
  const filterTechnicians = Array.isArray(technicianData?.data?.result)
    ? technicianData?.data?.result.map((technician) => {
        return {
          label: technician.fullName,
          value: technician._id,
        };
      })
    : [];
  const handleTechnicianSelect = async (value, jobId) => {
    const bodyData = {
      Job: {
        assignedTechnician: value,
      },
    };
    const result = await updateJob({
      _id: jobId,
      data: bodyData,
    });
    if (result?.data?.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "The job has been assigned successfully.",
      });
    }
  };

  //! Job Status Update
  const filterJobStatus = ["cancelled", "pending", "completed", "raised"]?.map(
    (status) => {
      return {
        label: status,
        value: status,
      };
    }
  );
  const HandleJobStatusUpdate = async (value, jobId) => {
    const bodyData = {
      Job: {
        status: value,
      },
    };
    // console.log(bodyData,"bodyData")
    const result = await updateJob({
      _id: jobId,
      data: bodyData,
    });
    if (result?.data?.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "The job status has been updated successfully.",
      });
    }
  };

  //! Payment Status Update
  const filterPaymentStatus = [
    {
      label: <span className="text-red-500">cancelled</span>,
      value: "cancelled",
    },
    {
      label: <span className="text-yellow-500">pending</span>,
      value: "pending",
    },
    {
      label: <span className="text-green-500">completed</span>,
      value: "completed",
    },
  ];
  const handleUpdatePaymentStatus = async (value, jobId) => {
    const bodyData = {
      Job: {
        paymentStatus: value,
      },
    };
    const result = await updateJob({
      _id: jobId,
      data: bodyData,
    });
    if (result?.data?.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "The payment Status has been updated successfully.",
      });
    }
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
            placeholder="Search Using Job Id"
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
            <th className="flex justify-start text-start ml-10">Needed Service</th>
            <th className="flex justify-start text-start ml-10">Date</th>
            <th className="flex justify-start text-start ml-10">Assign Technician</th>
            <th className="flex justify-start text-start ml-10">Job Status</th>
            <th className="flex justify-start text-start ml-10">Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center text-sm">
          {jobData?.data?.map((job) => (
            <tr
              key={job?._id}
              className="grid grid-cols-[.5fr_1fr_1fr_1.5fr_1fr_1.5fr_1fr_1fr_.5fr] px-2 py-4 text-center text-[#707070]"
            >
              <td >{job?.jobId}</td>
              <td>
                {job?.grandId ? (
                  <div className="flex gap-2 justify-center items-center text-sm">
                    <img
                      src={
                        job?.grandId?.profileImg
                          ? `${job?.grandId?.profileImg}`
                          : "https://avatar.iran.liara.run/public/44"
                      }
                      alt={job?.grandId?.fullName || "Anonymous User"}
                      className="h-5 w-5 rounded-full object-cover"
                      width={20}
                      height={20}
                    />
                    <span>{job?.grandId?.fullName || "No Name"}</span>
                  </div>
                ) : job?.userId?.role === "client" ? (
                  <div className="flex gap-2 justify-center items-center text-sm">
                    <img
                      src={
                        job?.userId?.profileImg
                          ? `${job?.userId?.profileImg}`
                          : "https://avatar.iran.liara.run/public/44"
                      }
                      alt={job?.userId?.fullName || "Anonymous User"}
                      className="h-5 w-5 rounded-full object-cover"
                      width={20}
                      height={20}
                    />
                    <span>{job?.userId?.fullName || "No Name"}</span>
                  </div>
                ) : (
                  <span className="text-sm">No Client</span>
                )}
              </td>
              <td>
                {job?.userId?.role === "supervisor" ? (
                  <div className="flex gap-2 text-sm">
                    <img
                      src={
                        job.userId.profileImg
                          ? `${job.userId.profileImg}`
                          : "https://avatar.iran.liara.run/public/44"
                      }
                      alt={job.userId.fullName || "Anonymous User"}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    <span>{job.userId.fullName || "Unknown User"}</span>
                  </div>
                ) : (
                  <span className="flex text-sm ">No Supervisor</span>
                )}
              </td>
              <td className="text-xs w-full">
                <ul className="flex gap-1 list-disc text-left border p-1 border-primary rounded">
                  {(job?.services || []).map((service, index) => (
                    <li key={index} className="list-inside">
                      {service}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{new Date(job?.createdAt).toLocaleDateString()}</td>

              {/*//! selectTechnician */}
              <td>
                <div className="relative w-[280px]">
                  <SelectAndSubmit
                    options={filterTechnicians}
                    Id={job?._id}
                    OnSaveHandler={handleTechnicianSelect}
                    defaultValues={
                      job?.assignedTechnician
                        ? [
                            {
                              value: job?.assignedTechnician?._id,
                              label: job?.assignedTechnician?.fullName,
                            },
                          ]
                        : []
                    }
                  />
                </div>
              </td>
              <td>
                <SelectAndSubmit
                  options={filterJobStatus}
                  Id={job?._id}
                  OnSaveHandler={HandleJobStatusUpdate}
                  defaultValues={
                    job?.status
                      ? [
                          {
                            value: job?.status,
                            label: job?.status,
                          },
                        ]
                      : []
                  }
                />
              </td>
              <td>
                <div className="ml-2">
                  <SelectAndSubmit
                    options={filterPaymentStatus}
                    Id={job?._id}
                    OnSaveHandler={handleUpdatePaymentStatus}
                    defaultValues={
                      job?.paymentStatus
                        ? [
                            {
                              value: job?.paymentStatus,
                              label: job?.paymentStatus,
                            },
                          ]
                        : []
                    }
                  />
                </div>
              </td>
              <td className="relative">
                <button
                  onClick={() => toggleModal(job._id)}
                  className="w-6 h-6"
                >
                  <TbDotsVertical />
                </button>
                {visibleModals[job._id] && (
                  <div className="absolute top-full right-0 bg-white border border-primary rounded-lg shadow-lg w-[130px] z-10">
                    <div className="bg-white shadow-lg rounded-lg p-2">
                      <button
                        className="bg-primary text-white py-2 rounded w-full mb-2 text-xs"
                        onClick={() => {
                          setRequestModal(true);
                          setCurrentRecord(job);
                        }}
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
                      {addModalVisible && (
                        <AddInvoiceModal
                          setAddModalVisible={setAddModalVisible}
                          job={job}
                        />
                      )}
                    </div>
                  </div>
                )}
                {messageModal && (
                  <MessageModal setMessageModal={setMessageModal} job={job} />
                )}
              </td>
            </tr>
          ))}
          {requestModal && (
            <JobRequestModal
              setRequestModal={setRequestModal}
              currentRecord={currentRecord}
            />
          )}
        </tbody>
      </table>
      <div className="mt-5 flex justify-end ">
        {jobData?.data?.length !== 0 && (
          <Pagination
            current={jobData?.meta?.page}
            pageSize={jobData?.meta?.limit}
            total={jobData?.meta?.total}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default JobRequest;
