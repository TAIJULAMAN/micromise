import { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useUpdateInvoiceMutation } from "../../redux/api/invoiceApi";
import Swal from "sweetalert2";

function EditInvoiceModal({ setEditModalVisible, invoice }) {
  const [updateInvoice] = useUpdateInvoiceMutation();

  // Initialize State Properly
  const [updatedInvoice, setUpdatedInvoice] = useState({
    Invoice: {
      jobId: invoice?.jobId || "",
      clientAdminName: invoice?.clientAdminName || "",
      services: invoice?.services || [{ serviceName: "", serviceCost: "" }],
      paymentStatus: invoice?.paymentStatus || "Pending",
      totalCost: invoice?.totalCost?.toString() || "0",
    },
  });
  console.log(updatedInvoice);

  useEffect(() => {
    if (invoice) {
      setUpdatedInvoice({
        Invoice: {
          ...invoice,
          totalCost: invoice.totalCost?.toString() || "0",
        },
      });
    }
  }, [invoice]);

  const calculateTotalCost = () => {
    return updatedInvoice.Invoice.services
      ?.reduce((acc, service) => acc + Number(service.serviceCost || 0), 0)
      .toString();
  };

  const handleInputChange = (e, index = null, field = null) => {
    if (index !== null && field) {
      const updatedServices = [...updatedInvoice.Invoice.services];
      updatedServices[index][field] =
        field === "serviceCost" ? Number(e.target.value) : e.target.value;
      setUpdatedInvoice({
        Invoice: {
          ...updatedInvoice.Invoice,
          services: updatedServices,
          totalCost: calculateTotalCost(),
        },
      });
    } else {
      setUpdatedInvoice({
        Invoice: { ...updatedInvoice.Invoice, [e.target.name]: e.target.value },
      });
    }
  };

  const handleUpdateInvoice = async () => {
    try {
      if (
        !updatedInvoice.Invoice.services ||
        updatedInvoice.Invoice.services.length === 0
      ) {
        Swal.fire("Error", "At least one service is required.", "error");
        return;
      }

      const invoiceData = {
        Invoice: {
          ...updatedInvoice.Invoice,
          totalCost: calculateTotalCost(),
          services: updatedInvoice.Invoice.services.map((service) => ({
            serviceName: service?.serviceName || "Unknown Service",
            serviceCost: service?.serviceCost?.toString() || "0",
          })),
        },
      };

      await updateInvoice({
        _id: invoice._id,
        data: invoiceData,
      }).unwrap();
      Swal.fire("Success", "Invoice updated successfully!", "success");
      setEditModalVisible(false);
    } catch (error) {
      Swal.fire("Error", "Failed to update invoice.", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-[500px] relative">
        <h3 className="text-lg font-semibold mb-4">Edit Invoice</h3>
        <button
          onClick={() => setEditModalVisible(false)}
          className="absolute top-2 right-2"
        >
          <IoCloseSharp />
        </button>

        <input
          type="text"
          name="jobId"
          placeholder="Job ID"
          value={updatedInvoice.Invoice.jobId}
          disabled
          className="w-full p-2 border rounded mb-4 bg-gray-200 cursor-not-allowed"
        />
        <select
          name="paymentStatus"
          value={updatedInvoice.Invoice.paymentStatus}
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
          value={updatedInvoice.Invoice.clientAdminName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded mb-4"
        />
        {updatedInvoice.Invoice.services.map((service, index) => (
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
          onClick={handleUpdateInvoice}
          className="mt-4 w-full p-2 bg-primary text-white rounded"
        >
          Update Invoice
        </button>
      </div>
    </div>
  );
}

export default EditInvoiceModal;
