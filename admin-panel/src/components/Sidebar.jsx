import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Users", path: "/users" },
  { name: "News", path: "/news" },
  { name: "Settings", path: "/settings" },
  { name: "Manage Admins", path: "/admin-management" }, // ✅ visible to all
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-green-700 text-white flex flex-col justify-between p-6">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[14px] border-l-transparent border-r-transparent border-b-white" />
          <span className="text-xl font-semibold">ecotrack</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md
                  ${isActive ? "bg-green-800" : "hover:bg-green-600"} transition-colors duration-200`}
              >
                <div className="w-4 h-4 border border-white" />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to log out?")) {
              localStorage.removeItem("token");
              localStorage.removeItem("adminInfo");
              window.location.href = "/login";
            }
          }}
          className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
        >
          <div className="w-4 h-4 border border-white" />
          <span className="text-sm">Log Out</span>
        </button>
      </div>
    </div>
  );
}