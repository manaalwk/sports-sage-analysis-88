
import React from 'react';
import { Play } from 'lucide-react';
import { VideoAnalysis } from '@/types';
import { cn } from '@/lib/utils';
import VideoControls from './video/VideoControls';
import CommentaryOverlay from './video/CommentaryOverlay';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import VideoSeekBar from './video/VideoSeekBar';

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
  const {
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
  } = useVideoPlayer({ 
    videoUrl, 
    analysis, 
    onTimeUpdate 
  });

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
        onEnded={() => isPlaying && togglePlay()}
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
        <VideoSeekBar 
          progress={progress}
          duration={duration}
          currentTime={videoRef.current?.currentTime || 0}
          onSeek={handleSeek}
        />
        
        <VideoControls 
          isPlaying={isPlaying}
          volume={volume}
          isMuted={isMuted}
          showCommentary={showCommentary}
          audioEnabled={audioEnabled}
          onPlayPause={togglePlay}
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
