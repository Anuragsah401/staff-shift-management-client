import React, { useState } from "react";
import { LogOut, Bell, Menu, X } from "lucide-react";

const UserHeader = ({ userName = "John Doe", onLogout = () => {} }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const notifications = [
    { id: 1, message: "You checked in at 09:00 AM", time: "2 hours ago" },
    { id: 2, message: "Your shift ends in 1 hour", time: "30 minutes ago" },
    { id: 3, message: "Time tracking reminder", time: "1 hour ago" },
  ];

  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow-md flex items-center justify-between p-4 mb-8">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">Time Entry System</h1>
          <p className=" text-gray-600 mt-1">Welcome, {userName}</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Notification Bell - Hidden on Mobile */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex cursor-pointer items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition"
            >
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition"
                      >
                        <p className="text-sm text-gray-900 font-medium">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">No notifications</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Logout Button - Hidden on Mobile */}
          <button
            onClick={onLogout}
            className="hidden md:flex cursor-pointer items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition"
          >
            <LogOut size={18} />
            <span>Sign out</span>
          </button>

          {/* Notification Bell - Visible on Mobile */}
          <div className="relative md:hidden">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex cursor-pointer items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition"
            >
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown Mobile */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition"
                      >
                        <p className="text-sm text-gray-900 font-medium">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">No notifications</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Hamburger Menu - Visible on Mobile */}
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="md:hidden flex cursor-pointer items-center p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition"
          >
            {showSidebar ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 z-60 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-[#1f1e1e83] bg-opacity-50"
            onClick={() => setShowSidebar(false)}
          ></div>

          {/* Sidebar Panel - Right Side */}
          <div className="absolute right-0 top-0 h-screen w-64 bg-white shadow-lg flex flex-col">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Menu</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-2 hover:bg-gray-200 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 p-6">
              <p className="text-gray-600 mb-6 font-semibold">{userName}</p>
            </div>

            {/* Logout Button at Bottom */}
            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowSidebar(false);
                  onLogout();
                }}
                className="w-full flex cursor-pointer items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition font-semibold"
              >
                <LogOut size={18} />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserHeader;
