import React from "react";
import { useNavigate } from "react-router-dom";

function MobileNav({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const navItems = [
    { name: "Todos", path: "/todos" },
    { name: "Academics", path: "/academics" },
    { name: "Diary", path: "/diary" },
    { name: "MoodTracker", path: "/moodtracker" },
    { name: "References", path: "/pages" },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setIsOpen(false); // Close the navbar
  };

  return (
    <div
      className={`${
        isOpen ? "max-h-96" : "max-h-0"
      } lg:hidden overflow-hidden transition-all duration-300 ease-in-out`}
    >
      <div className="pt-2 pb-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavClick(item.path)}
            className="block w-full text-left px-3 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="pt-4 pb-3 border-t border-blue-600">
        <button
          onClick={() => handleNavClick("/login")}
          className="block w-full text-left px-3 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
        <button
          onClick={() => handleNavClick("/signup")}
          className="block w-full text-left px-3 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default MobileNav;