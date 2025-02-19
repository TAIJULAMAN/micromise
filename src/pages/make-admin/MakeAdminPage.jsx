import { useState } from "react";
import DeleteModal from "../../components/Modals/DeleteModal";
import {
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useGetAllAdminsQuery,
} from "../../redux/api/adminApi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import { IoCloseSharp } from "react-icons/io5";
import { Pagination } from "antd";

function MakeAdminPage() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const query = { isDeleted: false, page: currentPage };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const {
    data: adminsData,
    error,
    isLoading,
    refetch,
  } = useGetAllAdminsQuery(query);

  const [createAdmin] = useCreateAdminMutation();
  const [deleteAdmin] = useDeleteAdminMutation();

  // Handle deleting an admin
  const handleDeleteAdmin = (admin) => {
    console.log(admin);
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete admin: ${admin.fullName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteAdmin(admin._id).unwrap();

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
  const [newAdmin, setNewAdmin] = useState({
    User: {
      fullName: "",
      email: "",
      password: "",
      contactNo: "",
      role: "admin",
    },
  });

  // Function to update User fields inside newAdmin
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prevState) => ({
      ...prevState,
      User: {
        ...prevState.User,
        [name]: value,
      },
    }));
  };

  const handleAddAdmin = async () => {
    try {
      await createAdmin(newAdmin).unwrap();
      Swal.fire({
        icon: "success",
        title: "Admin Added",
        text: "The new admin was added successfully!",
      });

      setIsAddModalVisible(false);
      setNewAdmin({
        User: {
          fullName: "",
          email: "",
          password: "",
          contactNo: "",
          role: "admin",
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add the new admin. Please try again.",
      });
    }
  };

  if (isLoading)
    return (
      <div className="w-10 h-10 animate-spin rounded-full border-dashed border-10 border-primary"></div>
    );
  if (error) return <p className="text-red-500">Failed to load admins!</p>;

  return (
    <div className="mt-5 overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold text-[#242424]">Make Admin</h2>
        <button
          onClick={() => setIsAddModalVisible(true)}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-green-500"
        >
          + Make Admin
        </button>
      </div>

      <div className="py-10 bg-white">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-[#1f1f1f]">
              <th className="py-3 pr-4 pl-10">S no.</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Contact No</th>
              <th className="py-3 px-4">User Type</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {adminsData?.data?.map((admin, index) => (
              <tr key={index} className="text-[#707070]">
                <td className="py-3 pr-4 pl-10">#{index + 1}</td>
                <td className="py-3 px-4">{admin?.fullName}</td>
                <td className="py-3 px-4">{admin?.email}</td>
                <td className="py-3 px-4">{admin?.contactNo}</td>
                <td className="py-3 px-4">
                  <span
                    className={
                      admin?.role === "admin"
                        ? "text-primary"
                        : "text-[#707070]"
                    }
                  >
                    {admin?.role === "admin" ? "Admin" : "User"}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleDeleteAdmin(admin)}
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
          {adminsData?.data?.length !== 0 && (
            <Pagination
              current={adminsData?.meta?.page}
              pageSize={adminsData?.meta?.limit}
              total={adminsData?.meta?.total}
              onChange={handlePageChange}
            />
          )}
        </div>

        {isDeleteModalVisible && (
          <DeleteModal setIsDeleteModalVisible={setIsDeleteModalVisible} />
        )}

        {isAddModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white p-6 rounded shadow-lg px-10 w-[500px]">
              <h3 className="text-lg font-semibold mb-4 text-[#242424]">
                Make Admin
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
                  User Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={newAdmin?.User?.fullName}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-[#F2F2F2] rounded-md focus:outline-none text-md"
                  placeholder="Enter Name"
                  required
                />
              </div>

              <div>
                <label className="block text-md font-medium text-[#575757] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={newAdmin.User.email}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-[#F2F2F2] rounded-md focus:outline-none text-md"
                  placeholder="Enter Email"
                  required
                />
              </div>

              <div>
                <label className="block text-md font-medium text-[#575757] mb-2">
                  Contact No
                </label>
                <input
                  type="text"
                  name="contactNo"
                  value={newAdmin.User.contactNo}
                  onChange={handleChange}
                  className="w-full p-2 border-2 border-[#F2F2F2] rounded-md focus:outline-none text-md"
                  placeholder="Enter Contact Number"
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="password"
                  className="text-[15px] font-[400] text-[#575757]"
                >
                  Password
                </label>
                <div className="w-full relative">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={newAdmin.User.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-start space-x-2 mt-5">
                <button
                  onClick={handleAddAdmin}
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded"
                >
                  Add Admin
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MakeAdminPage;
