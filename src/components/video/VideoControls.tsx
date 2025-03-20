
import React from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack, MessageSquare, Speaker } from 'lucide-react';

interface VideoControlsProps {
  isPlaying: boolean;
  progress: number;
  volume: number;
  isMuted: boolean;
  duration: number;
  currentTime: number;
  showCommentary: boolean;
  audioEnabled: boolean;
  onPlayPause: () => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleMute: () => void;
  onToggleCommentary: () => void;
  onToggleAudioCommentary: () => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
  onToggleFullscreen: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  progress,
  volume,
  isMuted,
  duration,
  currentTime,
  showCommentary,
  audioEnabled,
  onPlayPause,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleCommentary,
  onToggleAudioCommentary,
  onSkipForward,
  onSkipBackward,
  onToggleFullscreen
}) => {
  // Format time helper function
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col w-full px-4 pb-4">
      {/* Progress bar */}
      <div className="w-full flex items-center mb-3">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={onSeek}
          className="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer accent-primary"
        />
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onPlayPause}
            className="text-white hover:text-primary transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          
          <button 
            onClick={onSkipBackward}
            className="text-white hover:text-primary transition-colors"
            aria-label="Skip backward 10 seconds"
          >
            <SkipBack className="h-5 w-5" />
          </button>
          
          <button 
            onClick={onSkipForward}
            className="text-white hover:text-primary transition-colors"
            aria-label="Skip forward 10 seconds"
          >
            <SkipForward className="h-5 w-5" />
          </button>
          
          <div className="text-xs text-white">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleCommentary}
            className={`text-white hover:text-primary transition-colors ${!showCommentary ? 'opacity-50' : ''}`}
            aria-label={showCommentary ? 'Hide Commentary Text' : 'Show Commentary Text'}
          >
            <MessageSquare className="h-5 w-5" />
          </button>
          
          <button
            onClick={onToggleAudioCommentary}
            className={`text-white hover:text-primary transition-colors ${!audioEnabled ? 'opacity-50' : ''}`}
            aria-label={audioEnabled ? 'Disable Audio Commentary' : 'Enable Audio Commentary'}
          >
            <Speaker className={`h-5 w-5 ${audioEnabled ? '' : 'opacity-50'}`} />
          </button>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={onToggleMute}
              className="text-white hover:text-primary transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={onVolumeChange}
              className="w-16 h-1 bg-white/30 rounded-full appearance-none cursor-pointer accent-primary"
            />
          </div>
          
          <button 
            onClick={onToggleFullscreen}
            className="text-white hover:text-primary transition-colors"
            aria-label="Fullscreen"
          >
            <Maximize className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
