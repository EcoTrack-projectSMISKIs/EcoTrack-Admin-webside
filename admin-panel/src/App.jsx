// src/App.jsx
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Users from './components/Users';

function App() {
  const [section, setSection] = useState("dashboard");

  const renderSection = () => {
    switch (section) {
      case "dashboard": return <Dashboard />;
      case "users": return <Users />;
      default: return <h2 style={{ padding: "20px" }}>Coming Soon</h2>;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar onSectionChange={setSection} />
      <main className="main-content">
        {renderSection()}
      </main>
    </div>
  );
}

export default App;