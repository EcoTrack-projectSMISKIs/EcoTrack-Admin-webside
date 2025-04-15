import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "User Management", path: "/users" },
    { label: "News & Updates", path: "/news" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-60 min-h-screen bg-[#10172a] text-white flex flex-col justify-between px-5 py-8">
      <div>
        <h2 className="text-xl font-semibold text-cyan-400 mb-8 tracking-wide">
          ⚡ EcoTrack Admin
        </h2>
        <ul className="flex flex-col gap-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-4 py-3 rounded-lg font-medium text-sm transition duration-200 ${
                  isActive(item.path)
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-slate-500">© 2025 EcoTrack</p>
    </aside>
  );
};

export default Sidebar;