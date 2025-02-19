import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../components/Modals/DeleteModal";
import EditInvoiceModal from "../../components/Modals/EditInvoiceModal";
import AddInvoiceModal from "../../components/Modals/AddInvoiceModal";
import {
  useDeleteInvoiceMutation,
  useGetAllInvoicesQuery,
} from "../../redux/api/invoiceApi";
import { Pagination } from "antd";
import Swal from "sweetalert2";

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
        {addModalVisible && (
          <AddInvoiceModal setAddModalVisible={setAddModalVisible} />
        )}
      </div>
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
                  // setIsDeleteModalVisible(true);
                }}
                className="text-primary w-6 h-6"
              />
            </div>
          </div>
        ))}
        {showInvoiceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white md:w-[400px] mmd:w-[500px] lg:w-[600px] rounded-lg shadow-lg p-5">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Invoice</h2>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="text-gray-500 text-2xl"
                >
                  &times;
                </button>
              </div>

              {/* Invoice Content */}
              <div>
                {/* Logo and Header */}
                <div className="flex justify-between items-center mb-5 bg-[#ffebeb] p-10">
                  <img src="/logo.png" alt="Logo" className="h-10" />
                  <div className="text-right text-[#000000]">
                    <p className="text-sm">
                      Invoice No: <b>{currentRecord?.invoiceNo || "No data"}</b>
                    </p>
                    <p className="text-sm">
                      Job Id: <b>{currentRecord?.jobId || "No data"}</b>
                    </p>
                    <p className="text-sm">
                      Date: <b>{currentRecord?.createdAt || "No data"}</b>
                    </p>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-center text-lg font-semibold mb-4">
                  Your Service Cost
                </h3>

                {/* Client Details */}
                <div className="mb-4">
                  <p>MR. Zuberii</p>
                  <p>Human Resources</p>
                  <p>Micromise</p>
                  <p>1105-D Mugassari, Gergaji</p>
                  <p>E89 USA</p>
                </div>

                {/* Cost Breakdown */}
                <div>
                  <h4 className="font-semibold mb-2">Cost Breakdown</h4>
                  <table className="w-full text-center text-sm">
                    <thead>
                      <tr className="bg-[#ffebeb] rounded-md">
                        <th className="px-2 py-1">No</th>
                        <th className="px-2 py-1">Services</th>
                        <th className="px-2 py-1">Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRecord?.services?.map((service, index) => (
                        <tr key={service._id}>
                          <td className="px-2 py-1">{index + 1}</td>
                          <td className="px-2 py-1">{service?.serviceName}</td>
                          <td className="px-2 py-1">${service?.serviceCost}</td>
                        </tr>
                      ))}
                      {/* Dashed Divider */}
                      <tr>
                        <td colSpan="3">
                          <div className="border-t border-dashed border-secondary my-4"></div>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="2" className="px-2 py-1 font-bold">
                          Total Cost
                        </td>
                        <td className="px-2 py-1">
                          $
                          {currentRecord?.services?.reduce(
                            (acc, service) => acc + service.serviceCost,
                            0
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="px-2 py-1 font-bold">
                          Payment
                        </td>
                        <td className="px-2 py-1">Paid</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-20 w-full h-5 bg-secondary"></div>
            </div>
          </div>
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
