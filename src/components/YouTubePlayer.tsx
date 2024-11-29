import React from 'react';
import YouTube from 'react-youtube';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { useBreathingStore } from '../store/useBreathingStore';
import { useTimer } from '../hooks/useTimer';

interface YouTubePlayerProps {
  videoId: string;
  isPlaying: boolean;
}

export function YouTubePlayer({ videoId, isPlaying }: YouTubePlayerProps) {
  const { formatTime } = useTimer();
  const [player, setPlayer] = React.useState<any>(null);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [volume, setVolume] = React.useState(50);

  React.useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      setCurrentTime(player.getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [player]);

  React.useEffect(() => {
    if (!player) return;
    
    if (isPlaying) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  }, [isPlaying, player]);

  const onReady = (event: any) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
    setIsLoading(false);
    event.target.setVolume(volume);
    if (isPlaying) {
      event.target.playVideo();
    }
  };

  const toggleMute = () => {
    if (!player) return;
    if (isMuted) {
      player.unMute();
      player.setVolume(volume);
    } else {
      player.mute();
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (player) {
      player.setVolume(newVolume);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="hidden">
        <YouTube
          videoId={videoId}
          opts={{
            height: '0',
            width: '0',
            playerVars: {
              autoplay: isPlaying ? 1 : 0,
              controls: 0,
              disablekb: 1,
              fs: 0,
              modestbranding: 1,
            },
          }}
          onReady={onReady}
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMute}
          className="p-2 text-gray-600 hover:text-indigo-600 disabled:opacity-50"
          disabled={isLoading}
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
                  onChange={handleVolumeChange}
                  className="flex-1 h-1 bg-gray-200 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600"
                />
                <span className="text-xs text-gray-500 min-w-[2rem]">{volume}%</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}