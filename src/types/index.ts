
export interface AnalysisEvent {
  id: string;
  time: number; // Time in seconds
  type: 'goal' | 'pass' | 'shot' | 'foul' | 'save' | 'dribble' | 'tackle' | 'offside';
  description: string;
  player?: string;
  team?: string;
  coordinates?: {
    x: number;
    y: number;
  };
}

export interface PlayerPosition {
  id: string;
  team: 'home' | 'away';
  number: number;
  position: {
    x: number;
    y: number;
  };
  name?: string;
  possession?: boolean;
}

export interface VideoAnalysis {
  id: string;
  duration: number; // In seconds
  events: AnalysisEvent[];
  commentary: {
    [timeKey: string]: string; // Key is time in seconds, value is commentary text
  };
  frames: {
    [timeKey: string]: {
      players: PlayerPosition[];
      ballPosition: {
        x: number;
        y: number;
      };
    };
  };
}

export interface UploadStatus {
  status: 'idle' | 'uploading' | 'analyzing' | 'complete' | 'error';
  progress: number;
  message?: string;
  error?: string;
}
