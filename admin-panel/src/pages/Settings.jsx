import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/");
      window.location.reload(); // recheck auth
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-slate-900">Settings</h2>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-6 py-2 rounded-md text-base hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;