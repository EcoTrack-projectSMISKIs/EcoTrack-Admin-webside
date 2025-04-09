import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload(); //reeecheck auth
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px" }}>Settings</h2>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#f44336",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;
