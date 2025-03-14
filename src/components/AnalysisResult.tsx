
import React from 'react';
import { VideoAnalysis, AnalysisEvent } from '@/types';
import { cn } from '@/lib/utils';
import { Award, ArrowRight, Target, ShieldAlert, Save, Sparkles, Swords, BadgeX } from 'lucide-react';

interface AnalysisResultProps {
  analysis: VideoAnalysis | null;
  className?: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, className }) => {
  if (!analysis) return null;
  
  // Count event types
  const eventCounts = analysis.events.reduce((counts, event) => {
    counts[event.type] = (counts[event.type] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  
  // Get icon for event type
  const getEventIcon = (type: AnalysisEvent['type']) => {
    switch (type) {
      case 'goal':
        return <Award className="h-5 w-5" />;
      case 'pass':
        return <ArrowRight className="h-5 w-5" />;
      case 'shot':
        return <Target className="h-5 w-5" />;
      case 'foul':
        return <ShieldAlert className="h-5 w-5" />;
      case 'save':
        return <Save className="h-5 w-5" />;
      case 'dribble':
        return <Sparkles className="h-5 w-5" />;
      case 'tackle':
        return <Swords className="h-5 w-5" />;
      case 'offside':
        return <BadgeX className="h-5 w-5" />;
      default:
        return null;
    }
  };
  
  const statItems = [
    { type: 'goal', label: 'Goals' },
    { type: 'shot', label: 'Shots' },
    { type: 'pass', label: 'Passes' },
    { type: 'dribble', label: 'Dribbles' },
    { type: 'tackle', label: 'Tackles' },
    { type: 'foul', label: 'Fouls' },
    { type: 'save', label: 'Saves' },
    { type: 'offside', label: 'Offsides' }
  ];
  
  return (
    <div className={cn('glass-panel p-5', className)}>
      <h3 className="text-base font-medium mb-4">Analysis Summary</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statItems.map((item) => (
          <div 
            key={item.type} 
            className="flex flex-col items-center justify-center p-3 bg-background/70 rounded-xl"
          >
            <div className="text-primary mb-1">
              {getEventIcon(item.type as AnalysisEvent['type'])}
            </div>
            <div className="text-xl font-semibold">
              {eventCounts[item.type] || 0}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-5">
        <h4 className="text-sm font-medium mb-2">Key Events</h4>
        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
          {analysis.events.map((event) => (
            <div 
              key={event.id}
              className="flex items-start space-x-3 p-3 rounded-lg bg-background/70"
            >
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0',
                event.type === 'goal' ? 'bg-red-500' :
                event.type === 'shot' ? 'bg-amber-500' :
                event.type === 'pass' ? 'bg-blue-500' :
                event.type === 'foul' ? 'bg-purple-500' :
                event.type === 'save' ? 'bg-green-500' :
                event.type === 'dribble' ? 'bg-indigo-500' :
                event.type === 'tackle' ? 'bg-orange-500' :
                event.type === 'offside' ? 'bg-rose-500' :
                'bg-gray-500'
              )}>
                {getEventIcon(event.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="text-sm font-medium">{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</div>
                  <div className="text-xs text-muted-foreground">
                    {Math.floor(event.time / 60)}:{Math.floor(event.time % 60).toString().padStart(2, '0')}
                  </div>
                </div>
                <p className="text-xs mt-1">{event.description}</p>
                {event.player && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Player: {event.player}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
