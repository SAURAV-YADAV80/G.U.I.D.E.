import React from "react";

const ProgressBar = ({ completed, total }) => {
  if (total === 0) return null;

  const progressPercentage = Math.round((completed / total) * 100);

  return (
    <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-teal-100">
      <div className="flex justify-between items-center text-xs md:text-sm text-teal-600">
        <span>Progress</span>
        <span>{progressPercentage}%</span>
      </div>
      <div className="mt-2 h-1.5 md:h-2 bg-teal-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-500 transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;