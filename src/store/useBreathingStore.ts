import { create } from 'zustand';
import type { BreathingPattern, Track } from '../types/breathing';

interface BreathingState {
  selectedPattern: BreathingPattern;
  selectedTrack: Track | null;
  duration: number;
  isPlaying: boolean;
  setPattern: (pattern: BreathingPattern) => void;
  setTrack: (track: Track | null) => void;
  setDuration: (duration: number) => void;
  togglePlaying: () => void;
}

const defaultPattern: BreathingPattern = {
  name: '4-4-4',
  inhale: 4,
  hold: 4,
  exhale: 4,
};

export const useBreathingStore = create<BreathingState>((set) => ({
  selectedPattern: defaultPattern,
  selectedTrack: null,
  duration: 300, // 5 minutes in seconds
  isPlaying: false,
  setPattern: (pattern) => set({ selectedPattern: pattern }),
  setTrack: (track) => set({ selectedTrack: track }),
  setDuration: (duration) => set({ duration }),
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));