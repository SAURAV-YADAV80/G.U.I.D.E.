import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

function DesktopNav() {
  const navigate = useNavigate();
  const location = useLocation(); // To track the current route
  const dispatch = useDispatch();

  // Authentication state from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navItems = [
    { name: "Todos", path: "/todos" },
    { name: "Academics", path: "/academics" },
    { name: "Diary", path: "/diary" },
    { name: "MoodTracker", path: "/moodtracker" },
    { name: "References", path: "/pages" },
  ];

  return (
    <div className="hidden lg:flex items-center justify-between flex-1 ml-10">
      {/* Navigation Links */}
      <div className="flex space-x-6">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`text-white transition-colors hover:text-emerald-300 relative ${
              location.pathname === item.path
                ? "underline font-semibold text-emerald-300"
                : ""
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Authentication Buttons */}
      <div className="flex items-center space-x-4">
        {!isAuthenticated && (
          <>
            <button
              onClick={() => navigate("/login")}
              className="text-white transition-colors hover:text-emerald-300"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-white transition-colors hover:text-emerald-300"
            >
              Signup
            </button>
          </>
        )}
        {isAuthenticated && (
          <>
          <p className="pl-4 hidden lg:flex">{localStorage.getItem('name')}</p>
          <button
            onClick={handleLogout}
            className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition-colors"
          >
            Logout
          </button>
          </>
        )}
      </div>
    </div>
  );
}

export default DesktopNav;