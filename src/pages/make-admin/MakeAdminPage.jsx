import { useState } from "react";
import AddNewAdmin from "../../components/Modals/AddNewAdmin";
import DeleteModal from "../../components/Modals/DeleteModal";
import { useGetAllAdminsQuery } from "../../redux/api/adminApi";
import { RiDeleteBin6Line } from "react-icons/ri";

function MakeAdminPage() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data:adminsData, error, isLoading } = useGetAllAdminsQuery();
  console.log(adminsData);

  const handleDeleteClick = (item) => {
    setCurrentRecord(item);
    setIsDeleteModalVisible(true);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load admins.</p>;

  return (
    <div className="px-5 pb-5">
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
            {adminsData?.data?.map((admin) => (
              <tr key={admin?._id} className="text-[#707070]">
                <td className="py-3 pr-4 pl-10">#{admin?._id}</td>
                <td className="py-3 px-4">{admin?.fullName
                }</td>
                <td className="py-3 px-4">{admin?.email}</td>
                <td className="py-3 px-4">{admin?.contactNo}</td>
                <td className="py-3 px-4">
                  <span className={admin?.role === "admin" ? "text-primary" : "text-[#707070]"}>
                    {admin?.role === "admin" ? "Admin" : "User"}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button onClick={() => handleDeleteClick(admin)} className="text-primary w-6 h-6">
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isAddModalVisible && <AddNewAdmin setIsAddModalVisible={setIsAddModalVisible} />}
        {isDeleteModalVisible && (
          <DeleteModal setIsDeleteModalVisible={setIsDeleteModalVisible} currentRecord={currentRecord} />
        )}
      </div>
    </div>
  );
}

export default MakeAdminPage;
