import { Play, Pause, Music, Settings } from 'lucide-react';
import { useBreathingStore } from '../store/useBreathingStore';
import { SessionTimer } from './SessionTimer';

export function Controls() {
  const { isPlaying, togglePlaying } = useBreathingStore();

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <SessionTimer />
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={togglePlaying}
          className="p-4 text-white bg-indigo-600 rounded-full hover:bg-indigo-700"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button className="p-4 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200">
          <Music size={24} />
        </button>
        <button className="p-4 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200">
          <Settings size={24} />
        </button>
      </div>
    </div>
  );
}