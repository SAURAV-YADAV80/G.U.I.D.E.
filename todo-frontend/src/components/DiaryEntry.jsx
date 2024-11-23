const DiaryEntry = ({ input, setInput, isEditing, handleSaveDiary }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg border border-teal-100 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-teal-700">
          Today's Entry
          {!isEditing && <span className="text-red-500 text-sm ml-2">(Locked)</span>}
        </h2>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your thoughts for today..."
          className="w-full p-4 border border-teal-200 rounded-lg mb-4 min-h-[200px] focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          disabled={!isEditing}
        />
        <div className="flex justify-between items-center">
          <button
            onClick={handleSaveDiary}
            disabled={!isEditing}
            className={`px-6 py-2 rounded-md ${
              isEditing
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md transition-all'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Save Entry
          </button>
          {isEditing && (
            <span className="text-sm text-teal-600">
              Auto-locks at midnight
            </span>
          )}
        </div>
      </div>
    );
  };
  
  export default DiaryEntry;  