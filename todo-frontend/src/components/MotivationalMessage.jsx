import React from "react";

const MotivationalMessage = ({ getMotivationalMessage }) => {
  const messageData = getMotivationalMessage();

  if (!messageData) return null; // Return nothing if there is no message

  return (
    <div className="text-center py-8 md:py-12">
      <div className="flex flex-col items-center px-4">
        {messageData.icon}
        <h3 className="text-lg md:text-xl font-semibold text-teal-800 mb-2">
          {messageData.title}
        </h3>
        <p className="text-sm md:text-base text-teal-600">
          {messageData.message}
        </p>
      </div>
    </div>
  );
};

export default MotivationalMessage;