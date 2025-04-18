import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Export";
import { Dashboard, News, Users, Settings, Login, AdminManagement, Forbidden, } from "./pages/Export";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  if (!isAuthenticated) {
    return <Login setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f1f5f9", fontFamily: "Segoe UI, sans-serif" }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/news" element={<News />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin-management" element={<AdminManagement />} />
          <Route path="/forbidden" element={<Forbidden />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;