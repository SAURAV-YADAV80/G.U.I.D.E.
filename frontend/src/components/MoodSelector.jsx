export const MoodSelector = ({ moodColors, selectedScore, onSelect }) => (
    <div className="flex gap-4 justify-center">
      {Object.entries(moodColors).map(([score, { color, label }]) => (
        <button
          key={score}
          onClick={() => onSelect(parseInt(score))}
          className={`w-10 h-10 rounded-full ${color} transition-all transform hover:scale-110
            ${selectedScore === parseInt(score) ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
          title={label}
        />
      ))}
    </div>
  );