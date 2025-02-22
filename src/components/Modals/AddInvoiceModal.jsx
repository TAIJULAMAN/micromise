import { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useCreateInvoiceMutation } from "../../redux/api/invoiceApi";
import Swal from "sweetalert2";

function AddInvoiceModal({ setAddModalVisible, job }) {
  const [createInvoice] = useCreateInvoiceMutation();

  const [newInvoice, setNewInvoice] = useState({
    Invoice: {
      jobId: job._id || "", // Automatically set jobId
      clientAdminName: "",
      services: [{ serviceName: "", serviceCost: "" }],
      paymentStatus: "Pending",
      totalCost: "0",
    },
  });

  useEffect(() => {
    setNewInvoice((prevState) => ({
      Invoice: { ...prevState.Invoice, jobId: job._id || "" },
    }));
  }, [job]);

  const calculateTotalCost = () => {
    return newInvoice.Invoice.services?.reduce(
      (acc, service) => acc + Number(service.serviceCost || 0),
      0
    ).toString();
  };

  const handleAddService = () => {
    setNewInvoice({
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
        Invoice: {
          ...newInvoice.Invoice,
          services: updatedServices,
          totalCost: calculateTotalCost(),
        },
      });
    } else {
      setNewInvoice({
        Invoice: { ...newInvoice.Invoice, [e.target.name]: e.target.value },
      });
    }
  };

  const handleCreateInvoice = async () => {
    try {
      const invoiceData = {
        Invoice: {
          ...newInvoice.Invoice,
          totalCost: calculateTotalCost(),
        },
      };
      await createInvoice(invoiceData).unwrap();
      Swal.fire("Success", "Invoice created successfully!", "success");
      setAddModalVisible(false);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to create invoice.", "error");
    }
  };

  return (
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
          disabled
          className="w-full p-2 border rounded mb-4 bg-gray-200 cursor-not-allowed"
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
  );
}

export default AddInvoiceModal;
