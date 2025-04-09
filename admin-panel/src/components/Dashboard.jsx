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
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 24 }}>Dashboard Overview</h2>

      <div style={{ display: "flex", gap: 32, marginBottom: 40 }}>
        <div style={styles.card}>
          <h3>Total Users</h3>
          <p style={styles.value}>{totalUsers}</p>
        </div>
        <div style={styles.card}>
          <h3>Latest News Posts</h3>
          <p style={styles.value}>{latestNews.length}</p>
        </div>
      </div>

      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#275c6c" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const styles = {
  card: {
    flex: 1,
    background: "#eef6ee",
    border: "1px solid #ccc",
    borderRadius: 8,
    padding: 20,
  },
  value: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
  },
};

export default Dashboard;
