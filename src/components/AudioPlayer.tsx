import React from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useTimer } from '../hooks/useTimer';
import type { Track } from '../types/breathing';

interface AudioPlayerProps {
  track: Track;
  isPlaying: boolean;
}

export function AudioPlayer({ track, isPlaying }: AudioPlayerProps) {
  const { 
    isMuted, 
    error, 
    isLoading, 
    toggleMute, 
    currentTime, 
    duration,
    volume,
    handleVolumeChange 
  } = useAudioPlayer(track, isPlaying);
  const { formatTime } = useTimer();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMute}
          className="p-2 text-gray-600 hover:text-indigo-600 disabled:opacity-50"
          disabled={isLoading || !!error}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <div className="flex flex-col gap-2 flex-1">
          {isLoading ? (
            <Loader2 size={16} className="animate-spin text-indigo-600" />
          ) : (
            <>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{formatTime(Math.floor(currentTime))}</span>
                <div className="flex-1 h-1 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <span>{formatTime(Math.floor(duration))}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                  className="flex-1 h-1 bg-gray-200 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                />
                <span className="text-xs text-gray-500 min-w-[2rem]">{volume}%</span>
              </div>
            </>
          )}
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}