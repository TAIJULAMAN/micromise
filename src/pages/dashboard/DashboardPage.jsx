import { FaUsers } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { BsDatabase } from "react-icons/bs";
import EarningGrowth from "../../components/Dashboard/EarningGrowth";
import SubscriptionGrowth from "../../components/Dashboard/SubscriptionGrowth";
import UserGrowth from "../../components/Dashboard/UserGrowth";
import { useGetAllDashboardQuery } from "../../redux/api/dashboardApi";

function DashboardPage() {
  const { data: dashboardData,isLoading, error} = useGetAllDashboardQuery();
  if (isLoading)
    return (
      <div className="w-10 h-10 animate-spin rounded-full border-dashed border-10 border-primary"></div>
    );
  if (error) return <p className="text-red-500">Failed to load service!</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 mmd:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Job request */}
        <div className="flex flex-col justify-between items-center p-4 bg-white rounded-md gap-5 h-auto md:h-28">
          <div className="flex gap-3 items-center">
            <p className="rounded-full flex justify-center items-center">
              <BsDatabase size={20} />
            </p>
            <p className="text-base md:text-lg">Total Job request</p>
          </div>
          <p className="text-[#34C759] text-xl font-bold">
            {dashboardData?.data?.totalJobs}
          </p>
        </div>
        {/* Total User */}
        <div className="flex flex-col justify-between items-center p-4 bg-white rounded-md gap-5 h-auto md:h-28">
          <div className="flex gap-3 items-center">
            <p className="rounded-full flex justify-center items-center">
              <FaUsers size={20} />
            </p>
            <p className="text-base md:text-lg">Total User</p>
          </div>
          <p className="text-[#34C759] text-xl font-bold">
            {dashboardData?.data?.totalUsers}
          </p>
        </div>
        {/* Total client */}
        <div className="flex flex-col justify-between items-center p-4 bg-white rounded-md gap-5 h-auto md:h-28">
          <div className="flex gap-3 items-center">
            <p className="rounded-full flex justify-center items-center">
              <FaUsers size={20} />
            </p>
            <p className="text-base md:text-lg">Total client</p>
          </div>
          <p className="text-[#34C759] text-xl font-bold">
            {dashboardData?.data?.totalClients}
          </p>
        </div>
        {/* Total Technician */}
        <div className="flex flex-col justify-between items-center p-4 bg-white rounded-md gap-5 h-auto md:h-28">
          <div className="flex gap-3 items-center">
            <p className="rounded-full flex justify-center items-center">
              <FaUserDoctor size={20} />
            </p>
            <p className="text-base md:text-lg">Total Technician</p>
          </div>
          <p className="text-[#34C759] text-xl font-bold">
            {dashboardData?.data?.totalTechnicians}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 mmd:grid-cols-1 lg:grid-cols-2 gap-5">
        <UserGrowth />
        <SubscriptionGrowth />
      </div>
      <EarningGrowth />
    </div>
  );
}

export default DashboardPage;
