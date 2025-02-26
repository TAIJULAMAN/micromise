import { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { useGetAllDashboardQuery } from "../../redux/api/dashboardApi";

const UserGrowth = () => {
  const [selectedYear, setselectedYear] = useState(dayjs().year());
  const [selectedMonth, setselectedMonth] = useState(dayjs().month() + 1);

  const { data: dashboardData, isLoading, error } = useGetAllDashboardQuery();
  const userData = dashboardData?.data?.userGrowthMonthly;

  if (isLoading)
    return (
      <div className="w-10 h-10 animate-spin rounded-full border-dashed border-10 border-primary"></div>
    );
  if (error) return <p className="text-red-500">Failed to load data!</p>;


  const onChange = (e) => {
    const dateString = e.target.value;
    setselectedYear(dateString.split("-")[0]);
    setselectedMonth(dateString.split("-")[1]);
  };

  return (
    <div className="mt-5">
      <div className="bg-white rounded-lg shadow px-4 py-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-lg md:text-xl font-medium">
          User Growth
          </h1>
          <div className="w-full md:w-auto">
            <input
              type="month"
              value={`${selectedYear}-${String(selectedMonth).padStart(
                2,
                "0"
              )}`}
              onChange={onChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>

        {/* Chart Section */}
        <div className="mt-6" style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={userData}
              margin={{
                top: 10,
                right: 20,
                left: -10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis  />
              {/* <YAxis tickFormatter={(value) => `${value}%`} /> */}
              <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
              <Legend />
              <Bar dataKey="count" fill="#F32929" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserGrowth;
