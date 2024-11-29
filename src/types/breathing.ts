export type BreathingPhase = 'inhale' | 'hold' | 'exhale';

export interface BreathingPattern {
  name: string;
  inhale: number;
  hold: number;
  exhale: number;
}

export interface Track {
  id: string;
  title: string;
  url: string;
  category: string;
  type: 'audio' | 'youtube';
  youtubeId?: string;
}