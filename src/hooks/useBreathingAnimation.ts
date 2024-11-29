import { useState, useEffect } from 'react';
import type { BreathingPhase, BreathingPattern } from '../types/breathing';

export function useBreathingAnimation(pattern: BreathingPattern, isPlaying: boolean) {
  const [phase, setPhase] = useState<BreathingPhase>('inhale');
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const cycle = async () => {
      // Inhale phase
      setPhase('inhale');
      await new Promise((resolve) => setTimeout(resolve, pattern.inhale * 1000));
      
      // Hold phase
      setPhase('hold');
      await new Promise((resolve) => setTimeout(resolve, pattern.hold * 1000));
      
      // Exhale phase
      setPhase('exhale');
      await new Promise((resolve) => setTimeout(resolve, pattern.exhale * 1000));
    };

    const cycleInterval = setInterval(() => {
      cycle();
    }, (pattern.inhale + pattern.hold + pattern.exhale) * 1000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const total = pattern.inhale + pattern.hold + pattern.exhale;
        return (prev + 1) % total;
      });
    }, 1000);

    cycle();

    return () => {
      clearInterval(cycleInterval);
      clearInterval(progressInterval);
    };
  }, [isPlaying, pattern]);

  return { phase, progress, elapsedTime };
}