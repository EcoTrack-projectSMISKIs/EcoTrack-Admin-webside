import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalNews, setTotalNews] = useState(0);
  const [newUsersToday, setNewUsersToday] = useState(12); // Mock
  const [newUsersThisWeek, setNewUsersThisWeek] = useState(58); // Mock

  useEffect(() => {
    fetchUserCount();
    fetchNewsCount();
  }, []);

  const fetchUserCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5003/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalUsers(res.data.length);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchNewsCount = async () => {
    try {
      const res = await axios.get("http://localhost:5003/api/news");
      setTotalNews(res.data.length);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  const usageData = [
    { month: "Jan", kWh: 120 },
    { month: "Feb", kWh: 200 },
    { month: "Mar", kWh: 180 },
    { month: "Apr", kWh: 250 },
    { month: "May", kWh: 300 },
    { month: "Jun", kWh: 270 },
    { month: "Jul", kWh: 320 },
    { month: "Aug", kWh: 350 },
    { month: "Sep", kWh: 400 },
    { month: "Oct", kWh: 420 },
  ];

  const deviceData = [
    { name: "Air Conditioners", value: 35 },
    { name: "Refrigerators", value: 25 },
    { name: "Water Heaters", value: 20 },
    { name: "Other", value: 20 },
  ];

  const COLORS = ["#16a34a", "#4ade80", "#86efac", "#bbf7d0"];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h4 className="text-sm text-gray-500 mb-2">Total Users</h4>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-800">{totalUsers}</span>
            <span className="text-green-600 font-semibold text-sm bg-green-100 px-2 py-1 rounded-full">+8%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h4 className="text-sm text-gray-500 mb-2">Total News Posted</h4>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-800">{totalNews}</span>
            <span className="text-green-600 font-semibold text-sm bg-green-100 px-2 py-1 rounded-full">+5%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h4 className="text-sm text-gray-500 mb-2">Energy Saved (kWh)</h4>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-800">45,517</span>
            <span className="text-green-600 font-semibold text-sm bg-green-100 px-2 py-1 rounded-full">+15%</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Energy Usage Trends</h4>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="kWh" stroke="#22c55e" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Device Distribution</h4>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* New Users Summary */}
      <div className="bg-white p-6 rounded-lg shadow border mt-8">
        <h4 className="text-lg font-semibold text-gray-700 mb-4">New Users Summary</h4>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">New Users Today</p>
            <p className="text-2xl font-bold text-gray-800">+{newUsersToday}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">New This Week</p>
            <p className="text-2xl font-bold text-gray-800">+{newUsersThisWeek}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;