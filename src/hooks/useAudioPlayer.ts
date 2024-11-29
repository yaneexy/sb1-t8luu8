import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import type { Track } from '../types/breathing';

export function useAudioPlayer(track: Track | null, isPlaying: boolean) {
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const soundRef = useRef<Howl | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!track) return;

    setIsLoading(true);
    setError(null);

    const sound = new Howl({
      src: [track.url],
      html5: true,
      loop: true,
      volume: volume,
      onload: () => {
        setIsLoading(false);
        setDuration(sound.duration());
        if (isPlaying) {
          sound.play();
        }
      },
      onloaderror: () => {
        setIsLoading(false);
        setError('Unable to load audio file. Please try a different track.');
      },
      onplayerror: () => {
        setError('Unable to play audio. Please try again.');
      }
    });

    soundRef.current = sound;

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      sound.unload();
    };
  }, [track]);

  useEffect(() => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.play();
      intervalRef.current = window.setInterval(() => {
        if (soundRef.current) {
          setCurrentTime(soundRef.current.seek());
        }
      }, 1000);
    } else {
      soundRef.current.pause();
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const toggleMute = () => {
    if (!soundRef.current) return;
    
    if (isMuted) {
      soundRef.current.volume(volume);
    } else {
      soundRef.current.volume(0);
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVolume: number) => {
    if (!soundRef.current) return;
    
    const normalizedVolume = newVolume / 100;
    setVolume(normalizedVolume);
    soundRef.current.volume(normalizedVolume);
    
    if (isMuted && normalizedVolume > 0) {
      setIsMuted(false);
    }
  };

  return {
    isMuted,
    error,
    isLoading,
    currentTime,
    duration,
    volume: Math.round(volume * 100),
    toggleMute,
    handleVolumeChange
  };
}