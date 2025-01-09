import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddNewAdmin from "../../components/Modals/AddNewAdmin";
import DeleteModal from "../../components/Modals/DeleteModal";

const initialTableData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    userType: "admin",
    contact: "123-456-7890",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    userType: "user",
    contact: "234-567-8901",
  },
  {
    id: 3,
    name: "Bob Smith",
    email: "bob@example.com",
    userType: "admin",
    contact: "345-678-9012",
  },
  {
    id: 4,
    name: "Alice Johnson",
    email: "alice@example.com",
    userType: "user",
    contact: "456-789-0123",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael@example.com",
    userType: "admin",
    contact: "567-890-1234",
  },
];

function MakeAdminPage() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
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
          <thead className="pt-[100px]">
            <tr className="text-left text-[#1f1f1f]">
              <th className="py-3 pr-4 pl-10">S.ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Contact no</th>
              <th className="py-3 px-4">User Type</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr key={item.id} className="space-y-5 text-[#707070]">
                <td className="py-3 pr-4 pl-10">#{item.id}</td>
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4">{item.email}</td>
                <td className="py-3 px-4">{item.contact}</td>
                <td className="py-3 px-4">
                  <span
                    className={
                      item.userType === "admin"
                        ? "text-primary"
                        : "text-[#707070]"
                    }
                  >
                    {item.userType === "admin" ? "Admin" : "User"}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => {
                      setIsDeleteModalVisible(true);
                      setCurrentRecord(item);
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
          <AddNewAdmin
            onSubmit={onSubmit}
            setIsAddModalVisible={setIsAddModalVisible}
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

export default MakeAdminPage;
