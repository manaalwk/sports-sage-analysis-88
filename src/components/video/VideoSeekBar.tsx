
import React from 'react';

interface VideoSeekBarProps {
  progress: number;
  duration: number;
  currentTime: number;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VideoSeekBar: React.FC<VideoSeekBarProps> = ({
  progress,
  duration,
  currentTime,
  onSeek
}) => {
  // Format time helper function
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex flex-col mb-3">
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={onSeek}
        className="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer accent-primary"
      />
      <div className="text-xs text-white mt-1 ml-1">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
};

export default VideoSeekBar;
