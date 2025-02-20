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
function JobRequest() {
  const [requestModal, setRequestModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [visibleModals, setVisibleModals] = useState({});
  const [accordionState, setAccordionState] = useState({});
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data: jobData, isLoading, error } = useGetAllJobsQuery();
  const { data: technicianData } = useGetAllTechnicianQuery({ limit: 100 });

  const [jobs, setJobs] = useState([]);

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

  const toggleAccordion = (_id) => {
    setAccordionState((prev) => ({
      ...prev,
      [_id]: !prev[_id],
    }));
  };

  // console.log(filterTechnicians,'filterTechnicians')

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
    // console.log(bodyData,"bodyData")
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

  // console.log(jobData?.data,'jobData?.data')

  // console.log(openSelectTechnician,'openSelectTechnician')
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
              <button onClick={() => toggleModal(job._id)} className="w-6 h-6">
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
                  </div>
                </div>
              )}
              {messageModal && (
                <MessageModal setMessageModal={setMessageModal} job={job} />
              )}
            </td>
          </tr>
        ))}
        {requestModal && <JobRequestModal setRequestModal={setRequestModal} currentRecord={currentRecord} />}

        {addModalVisible && (
          <AddInvoiceModal setAddModalVisible={setAddModalVisible} />
        )}
      </tbody>
    </table>
  );
}

export default JobRequest;
