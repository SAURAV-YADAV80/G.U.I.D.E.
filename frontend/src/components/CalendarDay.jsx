export const CalendarDay = ({ day, dateStr, avgMood, isToday, moodColors, onClick }) => (
    <div
      onClick={onClick}
      className={`border border-gray-200 cursor-pointer transition-colors 
        ${isToday ? 'bg-blue-200' : avgMood ? moodColors[avgMood].color : 'bg-gray-100'}
        hover:bg-blue-300 bg-opacity-50
        h-24 sm:h-28 md:h-32 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 rounded-lg`}
    >
      <span className="font-semibold text-sm sm:text-base md:text-lg">{day}</span>
      <span className="text-xs sm:text-sm text-gray-500">{dateStr}</span>
    </div>
  );  