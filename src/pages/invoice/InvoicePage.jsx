import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../components/Modals/DeleteModal";
import EditInvoiceModal from "../../components/Modals/EditInvoiceModal";
import {
  useCreateInvoiceMutation,
  useDeleteInvoiceMutation,
  useGetAllInvoicesQuery,
} from "../../redux/api/invoiceApi";
import { Pagination } from "antd";
import Swal from "sweetalert2";
import { IoCloseSharp } from "react-icons/io5";
import ShowInvoiceModal from "../../components/Modals/ShowInvoiceModal";

function InvoicePage() {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const query = { isDeleted: false, page: currentPage };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const {
    data: invoiceData,
    isLoading,
    error,
    refetch,
  } = useGetAllInvoicesQuery(query);
  // console.log(invoiceData);

  const [deleteInvoice] = useDeleteInvoiceMutation();

  const [createInvoice] = useCreateInvoiceMutation();

  const handleDeleteAdmin = (invoice) => {
    // console.log(invoice);
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteInvoice(invoice?._id).unwrap();

          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "The admin has been deleted successfully.",
          });
          refetch();
        } catch (error) {
          console.error("delete Error:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete the admin. Please try again.",
          });
        }
      }
    });
  };

  const [newInvoice, setNewInvoice] = useState({
    Invoice: {
      jobId: "",
      clientAdminName: "",
      services: [{ serviceName: "", serviceCost: "" }],
      paymentStatus: "Pending",
      totalCost: 0,
    },
  });

  const calculateTotalCost = () => {
    return newInvoice.Invoice.services?.reduce(
      (acc, service) => acc + Number(service.serviceCost || 0),
      0
    );
  };

  const handleAddService = () => {
    setNewInvoice({
      ...newInvoice,
      Invoice: {
        ...newInvoice.Invoice,
        services: [
          ...newInvoice.Invoice.services,
          { serviceName: "", serviceCost: "" },
        ],
      },
    });
  };

  const handleInputChange = (e, index = null, field = null) => {
    if (index !== null && field) {
      const updatedServices = [...newInvoice.Invoice.services];
      updatedServices[index][field] =
        field === "serviceCost" ? Number(e.target.value) : e.target.value;
      setNewInvoice({
        ...newInvoice,
        Invoice: {
          ...newInvoice.Invoice,
          services: updatedServices,
          totalCost: calculateTotalCost().toString(),
        },
      });
    } else {
      setNewInvoice({
        ...newInvoice,
        Invoice: { ...newInvoice.Invoice, [e.target.name]: e.target.value },
      });
    }
  };

  const handleCreateInvoice = async () => {
    try {
      const invoiceData = {
        Invoice: {
          ...newInvoice.Invoice,
          totalCost: calculateTotalCost().toString(),
        },
      };
      await createInvoice(invoiceData).unwrap();
      Swal.fire("Success", "Invoice created successfully!", "success");
      setAddModalVisible(false);
      refetch();
    } catch (error) {
      Swal.fire("Error", "Failed to create invoice.", "error");
    }
  };
  if (isLoading)
    return (
      <div className="w-10 h-10 animate-spin rounded-full border-dashed border-10 border-primary"></div>
    );
  if (error) return <p className="text-red-500">Failed to load service!</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold text-[#242424]">All Invoices</h2>
        <button
          onClick={() => setAddModalVisible(true)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-green-500"
        >
          + Create New Invoice
        </button>
      </div>

      {addModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-[500px] relative">
            <h3 className="text-lg font-semibold mb-4">Create Invoice</h3>
            <button
              onClick={() => setAddModalVisible(false)}
              className="absolute top-2 right-2"
            >
              <IoCloseSharp />
            </button>

            <input
              type="text"
              name="jobId"
              placeholder="Job ID"
              value={newInvoice.Invoice.jobId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            />
            <select
              name="paymentStatus"
              value={newInvoice.Invoice.paymentStatus}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <input
              type="text"
              name="clientAdminName"
              placeholder="Client Admin Name"
              value={newInvoice.Invoice.clientAdminName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            />
            {newInvoice.Invoice.services.map((service, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Service Name"
                  value={service.serviceName}
                  onChange={(e) => handleInputChange(e, index, "serviceName")}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Service Cost"
                  value={service.serviceCost}
                  onChange={(e) => handleInputChange(e, index, "serviceCost")}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
            <button
              onClick={handleAddService}
              className="w-full p-2 bg-gray-200 rounded"
            >
              + Add Service
            </button>

            <button
              onClick={handleCreateInvoice}
              className="mt-4 w-full p-2 bg-primary text-white rounded"
            >
              Publish
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 mmd:grid-cols-2 lg:grid-cols-4  gap-5">
        {invoiceData?.data?.map((invoice, index) => (
          <div
            key={index}
            className="flex justify-between p-5 bg-white rounded-lg gap-5 h-auto md:h-28 border border-primary"
          >
            <div
              onClick={() => {
                setShowInvoiceModal(true);
                setCurrentRecord(invoice);
              }}
              className="flex flex-col"
            >
              <p>Invoice no : {invoice?.invoiceNo || "No data"}</p>
              <p className="text-sm">Job Id : {invoice?.jobId}</p>
              <p>
                Date:{" "}
                {invoice?.createdAt
                  ? new Date(invoice?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "No data"}
              </p>
            </div>
            <div className="flex place-items-start gap-1">
              <FiEdit3
                onClick={() => {
                  setEditModalVisible(true);
                }}
                className="w-6 h-6"
              />
              <RiDeleteBin6Line
                onClick={() => {
                  handleDeleteAdmin(invoice);
                }}
                className="text-primary w-6 h-6"
              />
            </div>
          </div>
        ))}
        {showInvoiceModal && (
          <ShowInvoiceModal
            currentRecord={currentRecord}
            setShowInvoiceModal={setShowInvoiceModal}
          />
        )}
        {isDeleteModalVisible && (
          <DeleteModal setIsDeleteModalVisible={setIsDeleteModalVisible} />
        )}

        {editModalVisible && (
          <EditInvoiceModal setEditModalVisible={setEditModalVisible} />
        )}
      </div>
      <div className="mt-5 flex justify-end ">
        {invoiceData?.data?.length !== 0 && (
          <Pagination
            current={invoiceData?.meta?.page}
            pageSize={invoiceData?.meta?.limit}
            total={invoiceData?.meta?.total}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default InvoicePage;
