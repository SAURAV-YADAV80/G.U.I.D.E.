import React, { useEffect } from 'react';

export default function Modal({ onClose, children, title }) {
  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent scroll on body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-teal-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      {/* Modal Overlay - closes modal when clicking outside */}
      <div
        className="absolute inset-0 bg-transparent"
        onClick={onClose}
      />
     
      {/* Modal Content */}
      <div className="relative bg-white dark:bg-teal-900 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-teal-100 dark:border-teal-700">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-teal-100 dark:border-teal-700">
          <h2 className="text-xl font-semibold text-teal-800 dark:text-teal-100">
            {title}
          </h2>
        </div>

        {/* Modal Body with Scroll */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-teal-100 dark:border-teal-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 
                     dark:bg-emerald-600 dark:hover:bg-emerald-700 
                     transition-colors shadow-md hover:shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}