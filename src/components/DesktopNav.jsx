import React from "react";
import { useNavigate } from "react-router-dom";

function DesktopNav() {
  const navigate = useNavigate();

  const navItems = [
    { name: "Todos", path: "/todos" },
    { name: "Academics", path: "/academics" },
    { name: "Diary", path: "/diary" },
    { name: "MoodTracker", path: "/moodtracker" },
    { name: "References", path: "/pages" },
  ];

  return (
    <div className="hidden lg:flex items-center justify-between flex-1 ml-10">
      <div className="flex space-x-6">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="hover:text-gray-200 transition-colors"
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="hover:text-gray-200 transition-colors"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="hover:bg-blue-600 px-4 py-2 rounded-md transition-colors"
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default DesktopNav;