
import React from 'react';
import { cn } from '@/lib/utils';

interface CommentaryOverlayProps {
  commentary: string;
  showCommentary: boolean;
  isSpeaking: boolean;
  audioEnabled: boolean;
}

const CommentaryOverlay: React.FC<CommentaryOverlayProps> = ({
  commentary,
  showCommentary,
  isSpeaking,
  audioEnabled
}) => {
  return (
    <>
      {/* Commentary text overlay */}
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
    </>
  );
};

export default CommentaryOverlay;
