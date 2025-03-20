
import React from 'react';
import { cn } from '@/lib/utils';
import { Pause } from 'lucide-react';

interface CommentaryOverlayProps {
  commentary: string;
  showCommentary: boolean;
  isSpeaking: boolean;
  audioEnabled: boolean;
  commentaryPaused: boolean;
  onTogglePause: () => void;
}

const CommentaryOverlay: React.FC<CommentaryOverlayProps> = ({
  commentary,
  showCommentary,
  isSpeaking,
  audioEnabled,
  commentaryPaused,
  onTogglePause
}) => {
  return (
    <>
      {/* Commentary text overlay */}
      {showCommentary && commentary && (
        <div className="absolute bottom-20 left-0 right-0 px-6 transition-opacity duration-300">
          <div className="glass-panel py-3 px-4 backdrop-blur-md bg-black/30 rounded-lg flex justify-between items-center">
            <p className="text-sm font-medium text-white">{commentary}</p>
            {audioEnabled && (
              <button 
                onClick={onTogglePause}
                className="ml-2 p-1.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label={commentaryPaused ? "Resume commentary" : "Pause commentary"}
              >
                <Pause className={`h-4 w-4 text-white ${commentaryPaused ? 'opacity-50' : 'opacity-100'}`} />
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Speaking indicator */}
      {isSpeaking && audioEnabled && !commentaryPaused && (
        <div className="absolute top-4 right-4 bg-black/40 p-2 rounded-full backdrop-blur-sm">
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-1.5 h-5 bg-blue-400 rounded-full animate-pulse delay-75"></div>
            <div className="w-1.5 h-4 bg-blue-400 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentaryOverlay;
