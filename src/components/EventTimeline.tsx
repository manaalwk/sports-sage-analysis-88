
import React, { useRef, useEffect } from 'react';
import { AnalysisEvent, VideoAnalysis } from '@/types';
import { cn } from '@/lib/utils';
import { Flag, ArrowRight, Target, ShieldAlert, Award, Swords, BadgeX } from 'lucide-react';

interface EventTimelineProps {
  analysis: VideoAnalysis | null;
  currentTime: number;
  onSelectEvent: (time: number) => void;
  className?: string;
}

const EventTimeline: React.FC<EventTimelineProps> = ({
  analysis,
  currentTime,
  onSelectEvent,
  className
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Scroll to current position
  useEffect(() => {
    if (!timelineRef.current || !analysis) return;
    
    const timelineWidth = timelineRef.current.scrollWidth;
    const visibleWidth = timelineRef.current.clientWidth;
    const scrollPosition = (currentTime / analysis.duration) * timelineWidth - visibleWidth / 2;
    
    timelineRef.current.scrollLeft = Math.max(0, scrollPosition);
  }, [currentTime, analysis]);
  
  if (!analysis) return null;
  
  // Get icon for event type
  const getEventIcon = (type: AnalysisEvent['type']) => {
    switch (type) {
      case 'goal':
        return <Award className="h-4 w-4" />;
      case 'pass':
        return <ArrowRight className="h-4 w-4" />;
      case 'shot':
        return <Target className="h-4 w-4" />;
      case 'foul':
        return <ShieldAlert className="h-4 w-4" />;
      case 'tackle':
        return <Swords className="h-4 w-4" />;
      case 'offside':
        return <BadgeX className="h-4 w-4" />;
      default:
        return <Flag className="h-4 w-4" />;
    }
  };
  
  // Get color for event type
  const getEventColor = (type: AnalysisEvent['type']) => {
    switch (type) {
      case 'goal':
        return 'bg-red-500';
      case 'shot':
        return 'bg-amber-500';
      case 'pass':
        return 'bg-blue-500';
      case 'foul':
        return 'bg-purple-500';
      case 'save':
        return 'bg-green-500';
      case 'dribble':
        return 'bg-indigo-500';
      case 'tackle':
        return 'bg-orange-500';
      case 'offside':
        return 'bg-rose-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  // Format time for display
  const formatTimeDisplay = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className={cn('glass-panel w-full p-4', className)}>
      <h3 className="text-sm font-medium mb-3">Match Events</h3>
      
      <div 
        ref={timelineRef}
        className="relative w-full h-16 overflow-x-auto hide-scrollbar"
      >
        {/* Timeline track */}
        <div 
          className="absolute h-1 bg-muted top-8 left-0"
          style={{ width: '100%' }}
        >
          {/* Current time indicator */}
          <div 
            className="absolute top-0 w-0.5 h-16 bg-primary"
            style={{ 
              left: `${(currentTime / analysis.duration) * 100}%`,
              transform: 'translateY(-32px)'
            }}
          />
        </div>
        
        {/* Events */}
        {analysis.events.map((event) => (
          <div
            key={event.id}
            className="absolute cursor-pointer transform -translate-x-1/2"
            style={{ 
              left: `${(event.time / analysis.duration) * 100}%`,
              top: '32px'
            }}
            onClick={() => onSelectEvent(event.time)}
          >
            <div className="flex flex-col items-center">
              <div 
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-white',
                  getEventColor(event.type)
                )}
              >
                {getEventIcon(event.type)}
              </div>
              <div className="text-xs mt-1">{formatTimeDisplay(event.time)}</div>
            </div>
            
            {/* Event tooltip */}
            <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 w-48 bg-popover text-popover-foreground rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="text-xs font-medium">{event.type.toUpperCase()}</div>
              <div className="text-xs mt-1">{event.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventTimeline;
