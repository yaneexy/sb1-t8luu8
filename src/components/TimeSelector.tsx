import React from 'react';
import { Clock } from 'lucide-react';
import { useBreathingStore } from '../store/useBreathingStore';

const DURATIONS = [
  { label: '5 min', value: 300 },
  { label: '10 min', value: 600 },
  { label: '15 min', value: 900 },
  { label: '20 min', value: 1200 },
];

export function TimeSelector() {
  const { duration, setDuration } = useBreathingStore();

  return (
    <div className="w-full max-w-xs">
      <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
        <Clock size={16} />
        Session Duration
      </label>
      <div className="grid grid-cols-4 gap-2">
        {DURATIONS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setDuration(value)}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors
              ${duration === value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}