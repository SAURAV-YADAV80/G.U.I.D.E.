import { ChevronLeft, ChevronRight } from 'lucide-react';

export const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth }) => (
    <div className="flex justify-between items-center mb-4">
      <button onClick={onPrevMonth} className="p-2 hover:bg-gray-100 rounded-full">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <h2 className="text-xl font-semibold">
        {new Date(currentDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </h2>
      <button onClick={onNextMonth} className="p-2 hover:bg-gray-100 rounded-full">
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );