// src/components/Dashboard.jsx
const Dashboard = () => (
    <section className="content-section">
      <h2>Dashboard Overview</h2>
      <div className="dashboard-widgets">
        <div className="widget">Total Users: <span>500</span></div>
        <div className="widget">Pending Approvals: <span>10</span></div>
        <div className="widget">Latest News Posts: <span id="news-count">2</span></div>
      </div>
      <div className="chart-container">
        <canvas id="userChart"></canvas>
      </div>
    </section>
  );
  
  export default Dashboard;