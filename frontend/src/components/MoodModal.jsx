export const MoodModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 pt-20 z-50">
        <div className="relative bg-white rounded-lg p-6 max-w-lg w-full overflow-y-auto max-h-[90vh]">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 text-gray-600 hover:text-black rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            &#10005;
          </button>
          {children}
        </div>
      </div>
    );
  };