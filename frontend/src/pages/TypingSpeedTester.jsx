import React, { useState, useEffect } from "react";

const TypingSpeedTester = () => {
  const [text, setText] = useState(
    "The quick brown fox jumps over the lazy dog."
  );
  const [input, setInput] = useState("");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(null);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!isRunning) {
      setIsRunning(true);
    }

    if (value === text) {
      setIsRunning(false);
      const words = text.split(" ").length;
      const minutes = time / 60;
      setWpm(Math.round(words / minutes || 0));
    }
  };

  const resetTest = () => {
    setInput("");
    setTime(0);
    setIsRunning(false);
    setWpm(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-4 flex flex-col justify-center items-center">
      <div className="max-w-xl backdrop-blur-sm bg-white/90 p-6 md:p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-teal-800 mb-4">
          Typing Speed Tester
        </h2>
        <p className="text-gray-700 mb-6">
          Type the following sentence as quickly as you can:
        </p>
        <blockquote className="p-4 italic border-l-4 border-teal-500 text-teal-800">
          "{text}"
        </blockquote>

        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={wpm !== null}
          placeholder="Start typing here..."
          className="mt-6 w-full p-3 border border-teal-200 rounded-md focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
        />

        {wpm !== null ? (
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-semibold text-teal-600">
              Your Speed: {wpm} WPM
            </h3>
            <button
              onClick={resetTest}
              className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md shadow hover:bg-teal-500 focus:outline-none"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <p className="text-gray-600">
              Time Elapsed: <span className="font-semibold">{time}s</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingSpeedTester;