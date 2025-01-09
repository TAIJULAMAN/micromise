import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../components/Modals/DeleteModal";
import EditInvoiceModal from "../../components/Modals/EditInvoiceModal";

const invoices = [
  {
    invoiceNo: "#123554",
    jobId: "#A101",
    date: "02/05/2025",
  },
  {
    invoiceNo: "#123555",
    jobId: "#A102",
    date: "03/05/2025",
  },
  {
    invoiceNo: "#123556",
    jobId: "#A103",
    date: "04/05/2025",
  },
  {
    invoiceNo: "#123557",
    jobId: "#A104",
    date: "05/05/2025",
  },
];

function InvoicePage() {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {invoices.map((invoice, index) => (
        <div
          key={index}
          className="flex justify-between p-5 bg-white rounded-lg gap-5 h-auto md:h-28 border border-primary"
        >
          <div className="flex flex-col">
            <p>Invoice no: {invoice.invoiceNo}</p>
            <p>Job Id: {invoice.jobId}</p>
            <p>Date: {invoice.date}</p>
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
    </div>
  );
}

export default InvoicePage;
