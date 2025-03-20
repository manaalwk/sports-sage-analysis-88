
import { useState, useRef, useEffect, useCallback } from 'react';
import { useTTS } from '@/hooks/useTTS';
import { VideoAnalysis } from '@/types';
import { generateCommentaryForTime } from '@/lib/mockData';

interface UseVideoPlayerProps {
  videoUrl: string;
  analysis: VideoAnalysis | null;
  onTimeUpdate: (time: number) => void;
}

export const useVideoPlayer = ({ videoUrl, analysis, onTimeUpdate }: UseVideoPlayerProps) => {
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
    if (videoRef.current) {
      const currentVideoTime = videoRef.current.currentTime;
      if (Math.abs(currentVideoTime - lastUpdateTime) >= 0.5) {
        // Update internal state based on external time changes
        setProgress((currentVideoTime / duration) * 100);
      }
    }
  }, [duration, lastUpdateTime]);
  
  // Update commentary based on current time
  useEffect(() => {
    const currentVideoTime = videoRef.current?.currentTime || 0;
    
    if (analysis) {
      const newCommentary = generateCommentaryForTime(currentVideoTime, analysis);
      
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
  }, [analysis, commentary, audioEnabled, previousCommentary, speak, volume, commentaryPaused, isPlaying]);
  
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

  return {
    videoRef,
    isPlaying,
    volume,
    isMuted,
    duration,
    progress,
    showControls,
    commentary,
    showCommentary,
    audioEnabled,
    commentaryPaused,
    isSpeaking,
    handleMouseMove,
    handleTimeUpdate,
    togglePlay,
    handleVolumeChange,
    toggleMute,
    handleSeek,
    toggleFullscreen,
    skipForward,
    skipBackward,
    toggleCommentary,
    toggleAudioCommentary,
    toggleCommentaryPause
  };
};
