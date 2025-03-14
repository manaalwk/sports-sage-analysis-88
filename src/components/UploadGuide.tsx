
import React from 'react';
import { cn } from '@/lib/utils';
import { Camera, Upload, BarChart, MessageSquare } from 'lucide-react';

interface UploadGuideProps {
  className?: string;
}

const UploadGuide: React.FC<UploadGuideProps> = ({ className }) => {
  const steps = [
    {
      icon: <Upload className="h-5 w-5" />,
      title: 'Upload your video',
      description: 'Select or drag & drop a sports video file to begin the analysis process.'
    },
    {
      icon: <Camera className="h-5 w-5" />,
      title: 'Automatic CV Analysis',
      description: 'Our system uses YOLOv8 to detect players, track movements and identify key events.'
    },
    {
      icon: <BarChart className="h-5 w-5" />,
      title: 'Tactical Visualization',
      description: 'View player positions, movements, and statistical analysis of the match.'
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: 'AI Commentary',
      description: 'Get real-time AI-generated commentary describing the game events as they happen.'
    }
  ];

  return (
    <div className={cn('glass-panel p-5', className)}>
      <h3 className="text-base font-medium mb-4">How It Works</h3>
      
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex space-x-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
              {step.icon}
            </div>
            <div>
              <h4 className="text-sm font-medium">{step.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-3 bg-secondary/50 rounded-lg">
        <p className="text-xs">
          <strong>Note:</strong> For optimal results, use high-quality video footage with clear visibility of all players. The system works best with top-down or sideline camera angles.
        </p>
      </div>
    </div>
  );
};

export default UploadGuide;
