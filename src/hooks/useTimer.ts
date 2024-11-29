import { useState, useEffect } from 'react';
import { useBreathingStore } from '../store/useBreathingStore';

export function useTimer() {
  const { isPlaying, duration } = useBreathingStore();
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = setInterval(() => {
      setElapsedTime(prev => {
        if (prev >= duration) {
          clearInterval(interval);
          return duration;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const remainingTime = Math.max(0, duration - elapsedTime);

  return {
    elapsedTime,
    remainingTime,
    formatTime,
  };
}