import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [usersRes, newsRes] = await Promise.all([
          axios.get("http://localhost:5003/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5003/api/news", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setTotalUsers(usersRes.data.length);
        setLatestNews(newsRes.data.slice(0, 5));
      } catch (error) {
        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/";
        } else {
          console.error("Dashboard data fetch failed:", error);
        }
      }
    };

    fetchDashboardData();
  }, []);

  const chartData = [
    { name: "Users", count: totalUsers },
    { name: "News Posts", count: latestNews.length },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Overview</h2>

      <div className="flex flex-wrap gap-6 mb-10">
        <div className="flex-1 min-w-[200px] bg-white shadow rounded p-6">
          <h4 className="text-sm text-gray-500 mb-1">Total Users</h4>
          <p className="text-3xl font-semibold text-blue-700">{totalUsers}</p>
        </div>
        <div className="flex-1 min-w-[200px] bg-white shadow rounded p-6">
          <h4 className="text-sm text-gray-500 mb-1">Latest News Posts</h4>
          <p className="text-3xl font-semibold text-blue-700">{latestNews.length}</p>
        </div>
      </div>

      <div className="h-80 bg-white shadow rounded p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;