import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../components/Modals/DeleteModal";
import EditInvoiceModal from "../../components/Modals/EditInvoiceModal";
import AddInvoiceModal from "../../components/Modals/AddInvoiceModal";
import ShowInvoiceModal from "../../components/Modals/ShowInvoiceModal";
import { useGetAllInvoicesQuery } from "../../redux/api/invoiceApi";
import { Pagination } from "antd";

function InvoicePage() {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const query = { isDeleted: false, page: currentPage };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const { data: invoiceData, isLoading, error } = useGetAllInvoicesQuery(query);
  // console.log(invoiceData);

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
              }}
              className="flex flex-col"
            >
              <p>Invoice no : {invoice?.invoiceNo || "No data"}</p>
              <p className="text-sm">Job Id : {invoice?.jobId}</p>
              <p>
                Date:{" "}
                {invoice?.createdAt
                  ? new Date(invoice.createdAt).toLocaleDateString("en-US", {
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
                  setIsDeleteModalVisible(true);
                }}
                className="text-primary w-6 h-6"
              />
            </div>
          </div>
        ))}

        {isDeleteModalVisible && (
          <DeleteModal setIsDeleteModalVisible={setIsDeleteModalVisible} />
        )}

        {editModalVisible && (
          <EditInvoiceModal setEditModalVisible={setEditModalVisible} />
        )}
        {showInvoiceModal && (
          <ShowInvoiceModal setShowInvoiceModal={setShowInvoiceModal} />
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
