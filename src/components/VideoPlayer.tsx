
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack, MessageSquare, Speaker, SpeakerOff } from 'lucide-react';
import { VideoAnalysis } from '@/types';
import { cn } from '@/lib/utils';
import { generateCommentaryForTime } from '@/lib/mockData';
import { useTTS } from '@/hooks/useTTS';

interface VideoPlayerProps {
  videoUrl: string;
  analysis: VideoAnalysis | null;
  currentTime: number;
  onTimeUpdate: (time: number) => void;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  analysis,
  currentTime,
  onTimeUpdate,
  className
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [commentary, setCommentary] = useState('');
  const [showCommentary, setShowCommentary] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [previousCommentary, setPreviousCommentary] = useState('');
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use the TTS hook for audio commentary
  const { speak, isSpeaking, stop } = useTTS();
  
  // Handle video loaded metadata
  useEffect(() => {
    const video = videoRef.current;
    
    const handleLoadedMetadata = () => {
      if (video) {
        setDuration(video.duration);
      }
    };
    
    if (video) {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [videoUrl]);
  
  // Handle external time update and commentary
  useEffect(() => {
    if (videoRef.current && Math.abs(videoRef.current.currentTime - currentTime) > 0.5) {
      videoRef.current.currentTime = currentTime;
    }
    
    // Update commentary based on current time
    if (analysis) {
      const newCommentary = generateCommentaryForTime(currentTime, analysis);
      
      // Only update if commentary changed
      if (newCommentary !== commentary) {
        setCommentary(newCommentary);
        
        // If audio is enabled and it's a new commentary, speak it
        if (audioEnabled && newCommentary && newCommentary !== previousCommentary) {
          setPreviousCommentary(newCommentary);
          // Temporarily reduce video volume during speech
          const originalVolume = videoRef.current?.volume ?? volume;
          if (videoRef.current) {
            videoRef.current.volume = originalVolume * 0.3; // Reduce to 30%
          }
          
          speak(newCommentary).then(() => {
            // Restore volume after speaking
            if (videoRef.current) {
              videoRef.current.volume = originalVolume;
            }
          });
        }
      }
    }
  }, [currentTime, analysis, commentary, audioEnabled, previousCommentary, speak, volume]);
  
  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };
  
  // Handle mute toggle
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Toggle audio commentary
  const toggleAudioCommentary = useCallback(() => {
    if (audioEnabled) {
      stop(); // Stop any current speech
    }
    setAudioEnabled(!audioEnabled);
  }, [audioEnabled, stop]);
  
  // Stop commentary when video is paused
  useEffect(() => {
    if (!isPlaying && isSpeaking) {
      stop();
    }
  }, [isPlaying, isSpeaking, stop]);
  
  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentVideoTime = videoRef.current.currentTime;
      const progress = (currentVideoTime / duration) * 100;
      setProgress(progress);
      onTimeUpdate(currentVideoTime);
    }
  };
  
  // Handle seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setProgress(seekTime);
    if (videoRef.current) {
      const newTime = (seekTime / 100) * duration;
      videoRef.current.currentTime = newTime;
      onTimeUpdate(newTime);
    }
  };
  
  // Handle fullscreen
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };
  
  // Format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Show/hide controls on mouse movement
  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };
  
  // Skip forward/backward
  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
      onTimeUpdate(videoRef.current.currentTime);
    }
  };
  
  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
      onTimeUpdate(videoRef.current.currentTime);
    }
  };
  
  // Toggle commentary visibility
  const toggleCommentary = () => {
    setShowCommentary(!showCommentary);
  };
  
  return (
    <div 
      className={cn('relative rounded-2xl overflow-hidden group', className)}
      onMouseMove={handleMouseMove}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain bg-black rounded-2xl"
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
        onEnded={() => setIsPlaying(false)}
      />
      
      {/* Overlay for play/pause on click */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={togglePlay}
      />
      
      {/* Commentary overlay */}
      {showCommentary && commentary && (
        <div className="absolute bottom-20 left-0 right-0 px-6 transition-opacity duration-300">
          <div className="glass-panel py-3 px-4 backdrop-blur-md bg-black/30 rounded-lg">
            <p className="text-sm font-medium text-white">{commentary}</p>
          </div>
        </div>
      )}
      
      {/* Speaking indicator */}
      {isSpeaking && audioEnabled && (
        <div className="absolute top-4 right-4 bg-black/40 p-2 rounded-full backdrop-blur-sm">
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-1.5 h-5 bg-blue-400 rounded-full animate-pulse delay-75"></div>
            <div className="w-1.5 h-4 bg-blue-400 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      )}
      
      {/* Video controls */}
      <div 
        className={cn(
          'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-4 pb-4 pt-10 transition-opacity duration-300',
          showControls ? 'opacity-100' : 'opacity-0'
        )}
      >
        {/* Progress bar */}
        <div className="w-full flex items-center mb-3">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer accent-primary"
          />
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={togglePlay}
              className="text-white hover:text-primary transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            
            <button 
              onClick={skipBackward}
              className="text-white hover:text-primary transition-colors"
              aria-label="Skip backward 10 seconds"
            >
              <SkipBack className="h-5 w-5" />
            </button>
            
            <button 
              onClick={skipForward}
              className="text-white hover:text-primary transition-colors"
              aria-label="Skip forward 10 seconds"
            >
              <SkipForward className="h-5 w-5" />
            </button>
            
            <div className="text-xs text-white">
              {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleCommentary}
              className={`text-white hover:text-primary transition-colors ${!showCommentary ? 'opacity-50' : ''}`}
              aria-label={showCommentary ? 'Hide Commentary Text' : 'Show Commentary Text'}
            >
              <MessageSquare className="h-5 w-5" />
            </button>
            
            <button
              onClick={toggleAudioCommentary}
              className={`text-white hover:text-primary transition-colors ${!audioEnabled ? 'opacity-50' : ''}`}
              aria-label={audioEnabled ? 'Disable Audio Commentary' : 'Enable Audio Commentary'}
            >
              {audioEnabled ? <Speaker className="h-5 w-5" /> : <SpeakerOff className="h-5 w-5" />}
            </button>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleMute}
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
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-white/30 rounded-full appearance-none cursor-pointer accent-primary"
              />
            </div>
            
            <button 
              onClick={toggleFullscreen}
              className="text-white hover:text-primary transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Big play button in the center when paused */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button 
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-white transition-transform hover:scale-110"
            aria-label="Play"
          >
            <Play className="h-8 w-8" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
