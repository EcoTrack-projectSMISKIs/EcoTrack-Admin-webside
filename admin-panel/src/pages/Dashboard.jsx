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
    <div style={{ padding: "32px" }}>
      <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#0f172a", marginBottom: "24px" }}>
        Dashboard Overview
      </h2>

      <div style={{ display: "flex", gap: "24px", marginBottom: "40px" }}>
        <div style={styles.statCard}>
          <h4 style={styles.statLabel}>Total Users</h4>
          <p style={styles.statValue}>{totalUsers}</p>
        </div>
        <div style={styles.statCard}>
          <h4 style={styles.statLabel}>Latest News Posts</h4>
          <p style={styles.statValue}>{latestNews.length}</p>
        </div>
      </div>

      <div style={{ height: "320px", background: "#fff", padding: "24px", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <h3 style={{ marginBottom: "16px", fontSize: "18px", color: "#334155" }}>Activity Chart</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const styles = {
  statCard: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  statLabel: {
    fontSize: "16px",
    color: "#64748b",
    marginBottom: "8px",
  },
  statValue: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#0f172a",
  },
};

export default Dashboard;