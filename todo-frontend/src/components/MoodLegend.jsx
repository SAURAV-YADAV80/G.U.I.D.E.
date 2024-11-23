
export const MoodLegend = ({ moodColors }) => (
    <div className="flex flex-wrap gap-4 justify-center mb-6">
      {Object.entries(moodColors).map(([score, { color, label }]) => (
        <div key={score} className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded ${color}`} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );