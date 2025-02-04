import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../components/Modals/DeleteModal";
import { FiEdit3 } from "react-icons/fi";
import AddServiceModal from "../../components/Modals/AddServiceModal";
import EditServiceModal from "../../components/Modals/EditServiceModal";
import { useGetAllServicesQuery } from "../../redux/api/serviceCategoryApi";

const initialTableData = [
  {
    id: 1,
    category: "ECU Remapping",
  },
  {
    id: 2,
    category: "Car Diagnostics",
  },
  {
    id: 3,
    category: "Performance Tuning",
  },
  {
    id: 4,
    category: "Diesel Tuning",
  },
  {
    id: 5,
    category: "Petrol Engine Tuning",
  },
];

function AddServicePage() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState(null);
  const [tableData, setTableData] = useState(initialTableData);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Add new record to the tableData state
    setTableData((prevData) => [
      ...prevData,
      { id: prevData.length + 1, ...data },
    ]);

    setIsAddModalVisible(false);
  };

  const onDelete = (id) => {
    setTableData(tableData.filter((item) => item.id !== id));
  };

  const { data: serviceData, error, isLoading } = useGetAllServicesQuery();
  console.log(serviceData);

  return (
    <div className="pb-10 overflow-y-auto">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold text-[#242424]">
          Service category
        </h2>
        <button
          onClick={() => setIsAddModalVisible(true)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-green-500"
        >
          + Add category
        </button>
      </div>

      <div className="py-10 bg-white">
        <table className="min-w-full">
          <thead className="pt-[100px]">
            <tr className="text-center text-[#1f1f1f]">
              <th className="py-3 pr-4 pl-10">SL no.</th>
              <th className="py-3 px-4 ">Category</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {serviceData?.data?.map((service, index) => (
              <tr key={index} className="text-center space-y-5 text-[#707070]">
                <td className="py-3 pr-4 pl-10">0{index + 1}</td>
                <td className="py-3 px-4">{service?.name}</td>
                <td className="py-3 px-4 flex gap-2 justify-center text-center">
                  <button
                    onClick={() => {
                      setIsEditModalVisible(true);
                      setCurrentRecord(service);
                    }}
                    className="w-6 h-6"
                  >
                    <FiEdit3 />
                  </button>
                  <button
                    onClick={() => {
                      setIsDeleteModalVisible(true);
                      setCurrentRecord(service);
                    }}
                    className="text-primary w-6 h-6"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isAddModalVisible && (
          <AddServiceModal
            onSubmit={onSubmit}
            setIsAddModalVisible={setIsAddModalVisible}
          />
        )}
        {isEditModalVisible && (
          <EditServiceModal
            onSubmit={onSubmit}
            setIsEditModalVisible={setIsEditModalVisible}
          />
        )}

        {isDeleteModalVisible && (
          <DeleteModal
            setIsDeleteModalVisible={setIsDeleteModalVisible}
            onDelete={onDelete}
            currentRecord={currentRecord}
          />
        )}
      </div>
    </div>
  );
}

export default AddServicePage;
