
import React, { useRef, useEffect, useState } from 'react';
import { VideoAnalysis, PlayerPosition } from '@/types';
import { cn } from '@/lib/utils';

interface TacticalMapProps {
  analysis: VideoAnalysis | null;
  currentTime: number;
  className?: string;
}

const TacticalMap: React.FC<TacticalMapProps> = ({
  analysis,
  currentTime,
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentFrame, setCurrentFrame] = useState<{
    players: PlayerPosition[];
    ballPosition: { x: number; y: number; };
  } | null>(null);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Get current frame based on time
  useEffect(() => {
    if (!analysis) return;
    
    // Find the closest frame to the current time
    const times = Object.keys(analysis.frames).map(Number);
    const closestTime = times.reduce((prev, curr) => {
      return (Math.abs(curr - currentTime) < Math.abs(prev - currentTime)) ? curr : prev;
    }, times[0]);
    
    setCurrentFrame(analysis.frames[closestTime.toString()]);
  }, [analysis, currentTime]);
  
  // Draw tactical map
  useEffect(() => {
    if (!canvasRef.current || !currentFrame) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw soccer field
    drawSoccerField(ctx, canvas.width, canvas.height);
    
    // Draw players
    currentFrame.players.forEach(player => {
      drawPlayer(
        ctx, 
        canvas.width * (player.position.x / 100), 
        canvas.height * (player.position.y / 100),
        player.team,
        player.number.toString(),
        player.possession || false
      );
    });
    
    // Draw ball
    drawBall(
      ctx,
      canvas.width * (currentFrame.ballPosition.x / 100),
      canvas.height * (currentFrame.ballPosition.y / 100)
    );
    
  }, [currentFrame, dimensions]);
  
  // Draw soccer field
  const drawSoccerField = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Field background
    ctx.fillStyle = '#5D8233';
    ctx.fillRect(0, 0, width, height);
    
    // Outline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.strokeRect(width * 0.05, height * 0.05, width * 0.9, height * 0.9);
    
    // Center line
    ctx.beginPath();
    ctx.moveTo(width * 0.5, height * 0.05);
    ctx.lineTo(width * 0.5, height * 0.95);
    ctx.stroke();
    
    // Center circle
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.5, width * 0.1, 0, Math.PI * 2);
    ctx.stroke();
    
    // Penalty areas
    // Left
    ctx.strokeRect(width * 0.05, height * 0.3, width * 0.15, height * 0.4);
    // Right
    ctx.strokeRect(width * 0.8, height * 0.3, width * 0.15, height * 0.4);
    
    // Goal areas
    // Left
    ctx.strokeRect(width * 0.05, height * 0.4, width * 0.05, height * 0.2);
    // Right
    ctx.strokeRect(width * 0.9, height * 0.4, width * 0.05, height * 0.2);
    
    // Center dot
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.5, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  };
  
  // Draw player
  const drawPlayer = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    team: 'home' | 'away',
    number: string,
    hasPossession: boolean
  ) => {
    const radius = dimensions.width * 0.02;
    
    // Player circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = team === 'home' ? '#1E40AF' : '#BE123C';
    ctx.fill();
    
    // Possession indicator
    if (hasPossession) {
      ctx.beginPath();
      ctx.arc(x, y, radius + 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    // Player number
    ctx.fillStyle = 'white';
    ctx.font = `${radius}px "SF Pro Display", Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(number, x, y);
  };
  
  // Draw ball
  const drawBall = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const radius = dimensions.width * 0.01;
    
    // Ball circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.stroke();
  };
  
  return (
    <div className={cn('relative rounded-2xl overflow-hidden glass-panel', className)}>
      <div className="absolute top-3 left-3 z-10">
        <h3 className="text-sm font-medium">Tactical View</h3>
      </div>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
    </div>
  );
};

export default TacticalMap;
