import { useState } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Legend, Bar, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";

const UserGrowth = () => {
    const [selectedYear, setselectedYear] = useState(dayjs().year());
    const [selectedMonth, setselectedMonth] = useState(dayjs().month() + 1);

    // Mock data
    const mockData = [
        { name: "Jan", User: 100 },
        { name: "Feb", User: 45 },
        { name: "Mar", User: 35 },
        { name: "Apr", User: 100 },
        { name: "May", User: 20 },
        { name: "Jun", User: 80 },
        { name: "Jul", User: 70 },
        { name: "Aug", User: 40 },
        { name: "Sep", User: 60 },
        { name: "Oct", User: 50 },
        { name: "Nov", User: 30 },
        { name: "Dec", User: 10 },
    ];

    // const maxValue = Math.max(...mockData.map(item => item.User));
    // const normalizeData = mockData.map(item => ({ ...item, User: item.User / maxValue * 100 }));

    const onChange = (e) => {
        const dateString = e.target.value;
        setselectedYear(dateString.split("-")[0]);
        setselectedMonth(dateString.split("-")[1]);
    };

    return (
        <div className="mt-4 p-4">
            <div className="bg-white rounded-lg shadow px-4 py-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <h1 className="text-lg md:text-xl font-medium">
                        Total Users Statistics
                    </h1>
                    <div className="w-full md:w-auto">
                        <input
                            type="month"
                            value={`${selectedYear}-${String(selectedMonth).padStart(2, "0")}`}
                            onChange={onChange}
                            className="p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                </div>

                {/* Chart Section */}
                <div className="mt-6" style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={mockData}
                            margin={{
                                top: 10,
                                right: 20,
                                left: -10,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `${value}%`} />
                            <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                            <Legend />
                            <Bar dataKey="User" fill="#F32929" />
                            {/* <Bar dataKey="Active" fill="#f79292" /> */}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default UserGrowth;
