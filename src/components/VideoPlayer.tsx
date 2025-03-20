
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play } from 'lucide-react';
import { VideoAnalysis } from '@/types';
import { cn } from '@/lib/utils';
import { generateCommentaryForTime } from '@/lib/mockData';
import { useTTS } from '@/hooks/useTTS';
import VideoControls from './video/VideoControls';
import CommentaryOverlay from './video/CommentaryOverlay';

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
  const [commentaryPaused, setCommentaryPaused] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);
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
        if (audioEnabled && newCommentary && newCommentary !== previousCommentary && !commentaryPaused && isPlaying) {
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
  }, [currentTime, analysis, commentary, audioEnabled, previousCommentary, speak, volume, commentaryPaused, isPlaying]);
  
  // Toggle commentary pause
  const toggleCommentaryPause = useCallback(() => {
    if (commentaryPaused) {
      // Resume commentary
      setCommentaryPaused(false);
      // If video is playing, also resume audio commentary with current text
      if (isPlaying && audioEnabled && commentary) {
        speak(commentary);
      }
    } else {
      // Pause commentary
      setCommentaryPaused(true);
      // Stop current speech
      stop();
    }
  }, [commentaryPaused, isPlaying, audioEnabled, commentary, speak, stop]);
  
  // Handle play/pause
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        
        // Resume commentary if it was paused and we're resuming the video
        if (commentaryPaused) {
          setCommentaryPaused(false);
        }
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, commentaryPaused]);
  
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
      
      // Only update if the time has changed significantly
      if (Math.abs(currentVideoTime - lastUpdateTime) >= 0.5) {
        setLastUpdateTime(currentVideoTime);
        const progress = (currentVideoTime / duration) * 100;
        setProgress(progress);
        onTimeUpdate(currentVideoTime);
      }
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
      
      // If we seek to a different position, update the commentary immediately
      if (Math.abs(newTime - lastUpdateTime) > 0.5) {
        setLastUpdateTime(newTime);
      }
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
      
      {/* Commentary overlay component */}
      <CommentaryOverlay 
        commentary={commentary}
        showCommentary={showCommentary}
        isSpeaking={isSpeaking}
        audioEnabled={audioEnabled}
        commentaryPaused={commentaryPaused}
        onTogglePause={toggleCommentaryPause}
      />
      
      {/* Video controls */}
      <div 
        className={cn(
          'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-4 pb-4 pt-10 transition-opacity duration-300',
          showControls ? 'opacity-100' : 'opacity-0'
        )}
      >
        <VideoControls 
          isPlaying={isPlaying}
          progress={progress}
          volume={volume}
          isMuted={isMuted}
          duration={duration}
          currentTime={videoRef.current?.currentTime || 0}
          showCommentary={showCommentary}
          audioEnabled={audioEnabled}
          onPlayPause={togglePlay}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          onToggleMute={toggleMute}
          onToggleCommentary={toggleCommentary}
          onToggleAudioCommentary={toggleAudioCommentary}
          onSkipForward={skipForward}
          onSkipBackward={skipBackward}
          onToggleFullscreen={toggleFullscreen}
        />
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
