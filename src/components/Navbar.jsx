import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-500 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="relative flex justify-between items-center h-16">
          {/* Logo with Tooltip */}
          <div className="relative group">
            <button
              className="flex items-center space-x-2 text-xl font-bold hover:text-gray-200 transition-colors"
              onClick={() => navigate("/")} // Navigate to the home route
            >
              {/* SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>G.U.I.D.E.</span>
            </button>
            {/* Horizontal Tooltip */}
            <div className="absolute hidden group-hover:flex items-center top-1/2 left-full ml-4 transform -translate-y-1/2 bg-black text-white text-sm px-4 py-2 rounded shadow-lg whitespace-nowrap">
              Goal-oriented Utility for Improving Daily Education
            </div>
          </div>

          {/* Hamburger Icon */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <DesktopNav />
        </div>

        {/* Mobile Navigation */}
        <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </nav>
  );
}

export default Navbar;