import React from 'react';
import { TimeSelector } from './TimeSelector';
import { PatternSelector } from './PatternSelector';
import { MusicSelector } from './MusicSelector';
import { MusicPlayer } from './MusicPlayer';

export function Settings() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <TimeSelector />
      <PatternSelector />
      <MusicSelector />
      <MusicPlayer />
    </div>
  );
}