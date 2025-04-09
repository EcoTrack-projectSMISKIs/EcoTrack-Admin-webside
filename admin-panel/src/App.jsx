import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import Sidebar from "./components/Sidebar";
import News from "./components/News";
import Settings from "./components/Settings";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const Layout = ({ children }) => (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "24px" }}>{children}</div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/users"
          element={
            isAuthenticated ? (
              <Layout>
                <Users />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/news"
          element={
            isAuthenticated ? (
              <Layout>
                <News />
              </Layout>
            ) : (
              <Navigate to="/news" />
            )
          }
        />
        <Route
  path="/settings"
  element={
    isAuthenticated ? (
      <Layout>
        <Settings />
      </Layout>
    ) : (
      <Navigate to="/" />
    )
  }
/>
      </Routes>
    </Router>
  );
}

export default App;
