// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

const Sidebar = () => (
  <aside className="sidebar">
    <h2>EcoTrack Admin</h2>
    <nav>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/users">User Management</Link></li>
        <li><Link to="/news">News & Updates</Link></li>
        <li><Link to="/">System Notifications</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
