import { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { useGetAllDashboardQuery } from "../../redux/api/dashboardApi";

const SubscriptionGrowth = () => {
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  const { data: dashboardData, isLoading, error } = useGetAllDashboardQuery();
  const jobData = dashboardData?.data?.jobGrowthMonthly;

  if (isLoading)
    return (
      <div className="w-10 h-10 animate-spin rounded-full border-dashed border-10 border-primary"></div>
    );
  if (error) return <p className="text-red-500">Failed to load service!</p>;

  const onChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="mt-5">
      <div className="bg-white rounded-lg shadow px-4 py-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-lg md:text-xl font-medium">
            Job Request Growth{" "}
          </h1>
          {/* Custom Year Picker */}
          <select
            value={selectedYear}
            onChange={onChange}
            className="p-2 border border-gray-300 rounded-md w-full md:w-auto"
          >
            {Array.from({ length: 5 }, (_, i) => dayjs().year() - i).map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
        </div>

        {/* Chart Section */}
        <div className="mt-6" style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={jobData}
              margin={{
                top: 10,
                right: 20,
                left: -10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F32929" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F32929" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#F32929"
                fillOpacity={1}
                fill="url(#colorEarnings)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionGrowth;
