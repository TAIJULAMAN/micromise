import { FaUsers } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { BsDatabase } from "react-icons/bs";

const AnalyticsInfo = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Job request */}
        <div className="flex flex-col justify-between items-center p-4 bg-white rounded-md gap-5 h-auto md:h-28">
          <div className="flex gap-3 items-center">
            <p className="rounded-full flex justify-center items-center">
              <BsDatabase size={20} />
            </p>
            <p className="text-base md:text-lg">Total Job request</p>
          </div>
          <p className="text-[#34C759] text-xl font-bold">150.10K</p>
        </div>
        {/* Total User */}
        <div className="flex flex-col justify-between items-center p-4 bg-white rounded-md gap-5 h-auto md:h-28">
          <div className="flex gap-3 items-center">
            <p className="rounded-full flex justify-center items-center">
              <FaUsers size={20} />
            </p>
            <p className="text-base md:text-lg">Total User</p>
          </div>
          <p className="text-[#34C759] text-xl font-bold">25.5K</p>
        </div>
        {/* Total client */}
        <div className="flex flex-col justify-between items-center p-4 bg-white rounded-md gap-5 h-auto md:h-28">
          <div className="flex gap-3 items-center">
            <p className="rounded-full flex justify-center items-center">
              <FaUsers size={20} />
            </p>
            <p className="text-base md:text-lg">Total client</p>
          </div>
          <p className="text-[#34C759] text-xl font-bold">70+</p>
        </div>
        {/* Total Technician */}
        <div className="flex flex-col justify-between items-center p-4 bg-white rounded-md gap-5 h-auto md:h-28">
          <div className="flex gap-3 items-center">
            <p className="rounded-full flex justify-center items-center">
              <FaUserDoctor size={20} />
            </p>
            <p className="text-base md:text-lg">Total Technician</p>
          </div>
          <p className="text-[#34C759] text-xl font-bold">70+</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsInfo;
