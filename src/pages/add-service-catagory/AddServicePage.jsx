import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../components/Modals/DeleteModal";
import { FiEdit3 } from "react-icons/fi";
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
} from "../../redux/api/serviceCategoryApi";
import Swal from "sweetalert2";
import { IoCloseSharp } from "react-icons/io5";
import { Pagination } from "antd";

function AddServicePage() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const query = { isDeleted: false, page: currentPage };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const {
    data: serviceData,
    error,
    isLoading,
    refetch,
  } = useGetAllServicesQuery(query);

  // deleteServiceData
  const [deleteService] = useDeleteServiceMutation();
  const handleDeleteAdmin = (service) => {
    console.log(service);
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${service?.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteService(service?._id).unwrap();

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
  // add new service
  const [createService] = useCreateServiceMutation();
  const [newService, setNewService] = useState({
    Service: {
      name: "",
    },
  });

  // User fields update  inside newAdmin
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewService((prevState) => ({
      ...prevState,
      Service: {
        ...prevState.Service,
        [name]: value,
      },
    }));
  };

  const handleAddService = async () => {
    try {
      await createService(newService).unwrap();

      Swal.fire({
        icon: "success",
        title: "Service Added",
        text: "The new service was added successfully!",
      });

      setIsAddModalVisible(false);
      setNewService({
        Service: {
          name: "",
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add the new service.Please try again.",
      });
    }
  };

  // Update service
  const [updateService] = useUpdateServiceMutation();
  const [EditService, setEditService] = useState({
    Service: {
      name: "",
    },
  });
  const handleChangeService = (e) => {
    const { name, value } = e.target;
    setEditService((prev) => ({
      ...prev,
      Service: {
        ...prev.Service,
        [name]: value,
      },
    }));
  };

  const handleEditService = async (e) => {
    e.preventDefault();
    try {
      await updateService({
        _id: EditService?.Service?._id,
        // data: { name: EditService?.Service?.name },
        data: {
          Service: {
            name: EditService?.Service?.name,
          },
        },
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Service Updated",
        text: "The service category has been updated successfully!",
      });

      setIsEditModalVisible(false);
      setEditService({
        Service: {
          name: "",
        },
      });
      refetch();
    } catch (error) {
      console.error("Update Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update the service category. Please try again.",
      });
    }
  };

  const handleOpenEditModal = (service) => {
    setEditService({
      Service: {
        _id: service._id,
        name: service.name,
      },
    });
    setIsEditModalVisible(true);
  };

  if (isLoading)
    return (
      <div className="w-10 h-10 animate-spin rounded-full border-dashed border-10 border-primary"></div>
    );
  if (error) return <p className="text-red-500">Failed to load service!</p>;

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
                <td className="py-3 pr-4 pl-10">#{index + 1}</td>
                <td className="py-3 px-4">{service?.name}</td>
                <td className="py-3 px-4 flex gap-2 justify-center text-center">
                  <button
                    onClick={() => handleOpenEditModal(service)}
                    className="w-6 h-6"
                  >
                    <FiEdit3 />
                  </button>
                  <button
                    onClick={() => handleDeleteAdmin(service)}
                    className="text-primary w-6 h-6"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-5 flex justify-end ">
          {serviceData?.data?.length !== 0 && (
            <Pagination
              current={serviceData.meta?.page}
              pageSize={serviceData?.meta?.limit}
              total={serviceData?.meta?.total}
              onChange={handlePageChange}
            />
          )}
        </div>

        {isAddModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white p-6 rounded shadow-lg px-10 w-[500px]">
              <h3 className="text-lg font-semibold mb-5 text-[#242424]">
                Add new service category
              </h3>

              {/* Close Button */}
              <button
                onClick={() => setIsAddModalVisible(false)}
                className="absolute top-2 right-2 text-white bg-secondary focus:outline-none p-2 rounded-full"
              >
                <IoCloseSharp />
              </button>

              <div>
                <label className="block text-md font-medium text-[#575757] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newService?.Service?.name}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-[#F2F2F2] rounded-md focus:outline-none  text-md"
                  placeholder="Enter Name"
                  required
                />
              </div>

              <div className="flex justify-start mt-5">
                <button
                  onClick={handleAddService}
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        )}
        {isEditModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white p-6 rounded shadow-lg px-10 pb-10 w-[500px]">
              <h3 className="text-lg font-semibold mb-5 text-[#242424]">
                Edit service category
              </h3>

              {/* Close Button */}
              <button
                onClick={() => setIsEditModalVisible(false)}
                className="absolute top-2 right-2 text-white bg-secondary focus:outline-none p-2 rounded-full"
              >
                <IoCloseSharp />
              </button>

              <div>
                <label className="block text-md font-medium text-[#575757] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={EditService.Service.name}
                  onChange={handleChangeService}
                  className="w-full p-2 border-2 border-[#F2F2F2] rounded-md focus:outline-none text-md"
                  placeholder="Enter Name"
                  required
                />
              </div>

              <div className="flex justify-start mt-5">
                <button
                  onClick={handleEditService}
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        )}
        {isDeleteModalVisible && (
          <DeleteModal setIsDeleteModalVisible={setIsDeleteModalVisible} />
        )}
      </div>
    </div>
  );
}

export default AddServicePage;
