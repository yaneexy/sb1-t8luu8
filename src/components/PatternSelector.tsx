import React from 'react';
import { Wind } from 'lucide-react';
import { useBreathingStore } from '../store/useBreathingStore';
import type { BreathingPattern } from '../types/breathing';

export function PatternSelector() {
  const { selectedPattern, setPattern } = useBreathingStore();

  const handlePatternChange = (key: keyof BreathingPattern, value: number) => {
    if (value >= 0 && value <= 9) {
      setPattern({
        ...selectedPattern,
        [key]: value,
      });
    }
  };

  return (
    <div className="w-full max-w-xs">
      <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
        <Wind size={16} />
        Breathing Pattern
      </label>
      <div className="grid grid-cols-3 gap-4">
        {(['inhale', 'hold', 'exhale'] as const).map((phase) => (
          <div key={phase} className="flex flex-col items-center">
            <span className="text-sm text-gray-600 capitalize mb-1">{phase}</span>
            <input
              type="number"
              min="0"
              max="9"
              value={selectedPattern[phase]}
              onChange={(e) => handlePatternChange(phase, parseInt(e.target.value) || 0)}
              className="w-16 px-3 py-2 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}