import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Users", path: "/users" },
  { name: "News", path: "/news" },
  { name: "Settings", path: "/settings" },
  { name: "Manage Admins", path: "/admin-management" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("adminInfo");
      window.location.href = "/login";
    }
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-green-700 text-white flex items-center justify-between px-4 py-3 shadow">
        <div className="flex items-center gap-2">
          <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[14px] border-l-transparent border-r-transparent border-b-white" />
          <span className="text-xl font-semibold">ecotrack</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-green-700 text-white transition-transform duration-300 md:translate-x-0 md:static md:block ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ paddingTop: "60px" }} // push below the mobile topbar
      >
        {/* Desktop branding */}
        <div className="hidden md:flex items-center gap-2 mb-6 px-6">
          <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[14px] border-l-transparent border-r-transparent border-b-white" />
          <span className="text-xl font-semibold">ecotrack</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-6">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                  isActive ? "bg-green-800" : "hover:bg-green-600"
                } transition-colors duration-200`}
              >
                <div className="w-4 h-4 border border-white" />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="mt-10 px-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
          >
            <div className="w-4 h-4 border border-white" />
            <span className="text-sm">Log Out</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-green-900 bg-opacity-40 z-30 md:hidden"
        ></div>
      )}
    </>
  );
}