import React from 'react';
import { useBreathingStore } from '../store/useBreathingStore';
import { AudioPlayer } from './AudioPlayer';
import { YouTubePlayer } from './YouTubePlayer';

export function MusicPlayer() {
  const { selectedTrack, isPlaying } = useBreathingStore();

  if (!selectedTrack) return null;

  return (
    <div>
      {selectedTrack.type === 'audio' ? (
        <AudioPlayer track={selectedTrack} isPlaying={isPlaying} />
      ) : (
        <YouTubePlayer videoId={selectedTrack.youtubeId!} isPlaying={isPlaying} />
      )}
    </div>
  );
}