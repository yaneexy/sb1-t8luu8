import React from 'react';
import { Music } from 'lucide-react';
import { useBreathingStore } from '../store/useBreathingStore';
import { tracks } from '../data/tracks';

export function MusicSelector() {
  const { selectedTrack, setTrack } = useBreathingStore();

  const categories = Array.from(new Set(tracks.map(track => track.category)));

  return (
    <div className="w-full">
      <label className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-700">
        <Music size={16} />
        Background Music
      </label>
      
      {categories.map(category => (
        <div key={category} className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">{category}</h3>
          <div className="space-y-2">
            {tracks
              .filter(track => track.category === category)
              .map(track => (
                <button
                  key={track.id}
                  onClick={() => setTrack(track)}
                  className={`w-full px-4 py-2 text-left rounded-md transition-colors ${
                    selectedTrack?.id === track.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {track.title}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}