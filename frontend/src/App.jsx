import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Todos from "./pages/Todos";
import Academics from "./pages/Academics";
import Diary from "./pages/Diary";
import MoodTracker from "./pages/MoodTracker";
import Reff from "./pages/Reff";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import TypingSpeedTester from "./pages/TypingSpeedTester";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/moodtracker" element={<MoodTracker />} />
            <Route path="/pages" element={<Reff />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<h1 className="text-3xl font-bold text-red-500">404 - Page Not Found</h1>} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;