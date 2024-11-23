export const MoodEntry = ({ mood, moodColors, isToday, onDelete }) => (
    <div className={`flex items-center gap-4 p-3 rounded-lg ${moodColors[mood.score].light}`}>
      <div className={`w-8 h-8 rounded-full ${moodColors[mood.score].color}`} />
      <div className="flex-1">
        <p className="font-medium">{moodColors[mood.score].label}</p>
        <p className="text-sm text-gray-600">{mood.note || 'No additional notes.'}</p>
        <p className="text-xs text-gray-500">
          Recorded at {new Date(mood.timestamp).toLocaleString()}
        </p>
      </div>
      {isToday && (
        <button
          onClick={() => onDelete(mood.timestamp)}
          className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-gray-100"
          aria-label="Delete mood"
        >
          &#10005;
        </button>
      )}
    </div>
  );