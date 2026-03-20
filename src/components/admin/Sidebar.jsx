import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/employees", label: "Employees" },
  { to: "/admin/shifts", label: "Shifts" },
  { to: "/admin/leaves", label: "Leave Requests" },
  { to: "/admin/timesheets", label: "Timesheets" },
  { to: "/admin/notifications", label: "Notifications" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
      <div className="text-xl font-semibold text-gray-900 mb-8">Workforce Admin</div>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-orange-100 text-orange-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
