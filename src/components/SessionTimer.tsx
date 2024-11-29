import React from 'react';
import { Timer } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';

export function SessionTimer() {
  const { remainingTime, formatTime } = useTimer();

  return (
    <div className="flex items-center gap-2 text-gray-600">
      <Timer size={16} />
      <span className="font-mono text-lg">{formatTime(remainingTime)}</span>
    </div>
  );
}