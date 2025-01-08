import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteModal from "../../components/Modals/DeleteModal";
import { FiEdit3 } from "react-icons/fi";
import AddServiceModal from "../../components/Modals/AddServiceModal";
import EditServiceModal from "../../components/Modals/EditServiceModal";

const userData = [
  {
    id: "#1239",
    userName: "Mahmud20",
    name: "Mahmud",
    email: "mr101@mail.ru",
    contact: "(+33) 7 00 55 59 27",
    location: "Corona, Michigan",
    skill: "ECU Remapping",
    completedJob: "10",
  },
  {
    id: "#1240",
    userName: "JohnDoe42",
    name: "John Doe",
    email: "john.doe@mail.com",
    contact: "(+1) 415 555 0101",
    location: "San Francisco, California",
    skill: "Web Development",
    completedJob: "25",
  },
  {
    id: "#1241",
    userName: "JaneSmith22",
    name: "Jane Smith",
    email: "jane.smith@mail.com",
    contact: "(+44) 20 7946 0958",
    location: "London, UK",
    skill: "Graphic Design",
    completedJob: "18",
  },
  {
    id: "#1242",
    userName: "Samurai33",
    name: "Samantha Lee",
    email: "sam.lee@mail.com",
    contact: "(+61) 3 9876 5432",
    location: "Sydney, Australia",
    skill: "Cyber Security",
    completedJob: "30",
  },
  {
    id: "#1243",
    userName: "TechGenius01",
    name: "David Brown",
    email: "david.brown@mail.com",
    contact: "(+91) 98 7654 3210",
    location: "Mumbai, India",
    skill: "AI Development",
    completedJob: "5",
  },
  {
    id: "#1244",
    userName: "CreativeAmy01",
    name: "Amy Watson",
    email: "amy.watson@mail.com",
    contact: "(+33) 1 70 28 69 45",
    location: "Paris, France",
    skill: "UX/UI Design",
    completedJob: "12",
  },
  {
    id: "#1245",
    userName: "CoderX100",
    name: "Alex Turner",
    email: "alex.turner@mail.com",
    contact: "(+1) 212 555 0173",
    location: "New York, USA",
    skill: "Full Stack Development",
    completedJob: "40",
  },
  {
    id: "#1246",
    userName: "Maya99",
    name: "Maya Patel",
    email: "maya.patel@mail.com",
    contact: "(+44) 20 7091 0988",
    location: "Bristol, UK",
    skill: "Digital Marketing",
    completedJob: "15",
  },
  {
    id: "#1247",
    userName: "RobTechPro",
    name: "Robert Green",
    email: "robert.green@mail.com",
    contact: "(+34) 91 234 5678",
    location: "Madrid, Spain",
    skill: "Robotics",
    completedJob: "8",
  },
  {
    id: "#1248",
    userName: "CraftMaster56",
    name: "Olivia Taylor",
    email: "olivia.taylor@mail.com",
    contact: "(+1) 305 555 0192",
    location: "Miami, Florida",
    skill: "3D Printing",
    completedJob: "20",
  },
];

function Technician() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState(null);
  const [tableData, setTableData] = useState(userData);

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
    <div className="pb-10 overflow-y-auto">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-semibold text-[#242424]">Technician</h2>
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
            <tr className="text-start text-[#1f1f1f]">
              <th className="py-3 pr-4 ">User name</th>
              <th className="py-3 px-4 ">Name</th>
              <th className="py-3 pr-4 ">Email</th>
              <th className="py-3 px-4 ">Contact Number</th>
              <th className="py-3 pr-4 ">Location</th>
              <th className="py-3 px-4 ">Technician Skills</th>
              <th className="py-3 pr-4 ">Completed job</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr
                key={item.id}
                className="text-center space-y-5 text-[#707070]"
              >
                <td className="py-3 pr-4">0{item.userName}</td>
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 pr-4">0{item.email}</td>
                <td className="py-3 px-4">{item.contact}</td>
                <td className="py-3 pr-4">0{item.location}</td>
                <td className="py-3 px-4">{item.skill}</td>
                <td className="py-3 pr-4">0{item.completedJob}</td>
                <td className="py-3 px-4 flex gap-2 justify-center text-center">
                  <button
                    onClick={() => {
                      setIsEditModalVisible(true);
                      setCurrentRecord(item);
                    }}
                    className="w-6 h-6"
                  >
                    <FiEdit3 />
                  </button>
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

export default Technician;
