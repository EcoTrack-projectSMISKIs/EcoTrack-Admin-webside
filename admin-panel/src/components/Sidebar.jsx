// src/components/Sidebar.jsx
const Sidebar = ({ onSectionChange }) => (
    <aside className="sidebar">
      <h2>EcoTrack Admin</h2>
      <nav>
        <ul>
          <li><a onClick={() => onSectionChange('dashboard')}>Dashboard</a></li>
          <li><a onClick={() => onSectionChange('users')}>User Management</a></li>
          <li><a onClick={() => onSectionChange('news')}>News & Updates</a></li>
          <li><a onClick={() => onSectionChange('notifications')}>System Notifications</a></li>
          <li><a onClick={() => onSectionChange('settings')}>Settings</a></li>
        </ul>
      </nav>
    </aside>
  );
  
  export default Sidebar;