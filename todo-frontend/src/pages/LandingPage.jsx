import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      {/* Hero Section */}
      <section className="flex items-center justify-center h-screen bg-teal-900 text-white text-center py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Welcome to Your Personal Hub</h1>
          <p className="text-xl mb-6">
            Manage your academic progress, track your mood, and stay connected all in one place!
          </p>
          <div className="flex justify-center gap-6">
            <Link
              to="/academics"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition"
            >
              Explore Academics
            </Link>
            <Link
              to="/mood-tracker"
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition"
            >
              Track Your Mood
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-semibold text-teal-900 text-center mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-teal-100 p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-teal-900 mb-4">Academic Tracker</h3>
              <p className="text-teal-600 mb-4">
                Stay on top of your assignments, subjects, and syllabus with our easy-to-use academic tracker.
              </p>
              <Link
                to="/academics"
                className="text-teal-600 hover:text-teal-700 font-semibold"
              >
                Learn More
              </Link>
            </div>
            {/* Feature 2 */}
            <div className="bg-teal-100 p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-teal-900 mb-4">Mood Tracker</h3>
              <p className="text-teal-600 mb-4">
                Track your mood over time and get insights to improve your mental well-being.
              </p>
              <Link
                to="/moodtracker"
                className="text-teal-600 hover:text-teal-700 font-semibold"
              >
                Learn More
              </Link>
            </div>
            {/* Feature 3 */}
            <div className="bg-teal-100 p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-teal-900 mb-4">Social Connections</h3>
              <p className="text-teal-600 mb-4">
                Connect with friends and stay updated with the latest news through various platforms.
              </p>
              <Link
                to="/pages"
                className="text-teal-600 hover:text-teal-700 font-semibold"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-teal-900 text-white">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-3xl font-semibold mb-6">Get Started Today</h2>
          <p className="text-xl mb-8">
            Sign up now and take control of your academic journey and mental well-being!
          </p>
          <Link
            to="/signup"
            className="bg-teal-600 text-white px-8 py-4 rounded-lg hover:bg-teal-700 transition"
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-800 text-white py-6 text-center">
        <p>&copy; 2024 G.U.I.D.E. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;