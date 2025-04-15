import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const sidebarStyle = {
    width: "240px",
    background: "#10172a",
    color: "#fff",
    height: "100vh",
    padding: "32px 20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const navList = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const navItem = (path) => ({
    background: location.pathname === path ? "#1e293b" : "transparent",
    borderRadius: "8px",
    padding: "12px 16px",
    transition: "0.3s",
  });

  const linkStyle = {
    color: "#e2e8f0",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: 500,
    display: "block",
  };

  return (
    <aside style={sidebarStyle}>
      <div>
        <h2 style={{ fontSize: "20px", marginBottom: "32px", color: "#38bdf8" }}>
          ⚡ EcoTrack Admin
        </h2>
        <ul style={navList}>
          <li style={navItem("/dashboard")}>
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
          </li>
          <li style={navItem("/users")}>
            <Link to="/users" style={linkStyle}>User Management</Link>
          </li>
          <li style={navItem("/news")}>
            <Link to="/news" style={linkStyle}>News & Updates</Link>
          </li>
          <li style={navItem("/settings")}>
            <Link to="/settings" style={linkStyle}>Settings</Link>
          </li>
        </ul>
      </div>
      <p style={{ fontSize: "12px", color: "#64748b" }}>© 2025 EcoTrack</p>
    </aside>
  );
};

export default Sidebar;