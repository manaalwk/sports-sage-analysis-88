
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import VideoUpload from '@/components/VideoUpload';
import VideoPlayer from '@/components/VideoPlayer';
import TacticalMap from '@/components/TacticalMap';
import EventTimeline from '@/components/EventTimeline';
import AnalysisResult from '@/components/AnalysisResult';
import UploadGuide from '@/components/UploadGuide';
import { UploadStatus, VideoAnalysis } from '@/types';
import { mockAnalysis } from '@/lib/mockData';
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [analysis, setAnalysis] = useState<VideoAnalysis | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    status: 'idle',
    progress: 0
  });

  // Simulate loading the analysis based on the analysis ID
  const handleAnalysisComplete = (analysisId: string) => {
    // In a real application, this would fetch the analysis from a server
    setAnalysis(mockAnalysis);
  };

  // Handle video upload completion
  const handleUploadComplete = (url: string, duration: number) => {
    setVideoUrl(url);
    setVideoDuration(duration);
  };

  // Handle time update from video player
  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  // Handle event selection from timeline
  const handleSelectEvent = (time: number) => {
    setCurrentTime(time);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background animate-enter">
      <Toaster />
      
      {/* Header */}
      <Header className="animate-enter" />
      
      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero section - Show only when no video is uploaded */}
        {!videoUrl && (
          <div className="mb-12 text-center animate-enter">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
              Computer Vision + AI Commentary
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Advanced Sports Video Analysis
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your sports footage and get AI-powered insights, tactical visualizations, and real-time commentary.
            </p>
          </div>
        )}
        
        {/* Video upload section */}
        <VideoUpload 
          onUploadComplete={handleUploadComplete}
          onAnalysisComplete={handleAnalysisComplete}
          setUploadStatus={setUploadStatus}
          uploadStatus={uploadStatus}
          className="max-w-3xl mx-auto mb-8 animate-enter"
        />
        
        {/* Analysis section - Show only when video is uploaded and analysis is complete */}
        {videoUrl && analysis && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left column - Video player and timeline */}
            <div className="lg:col-span-2 space-y-6">
              <VideoPlayer 
                videoUrl={videoUrl}
                analysis={analysis}
                currentTime={currentTime}
                onTimeUpdate={handleTimeUpdate}
                className="w-full aspect-video animate-enter"
              />
              
              <EventTimeline 
                analysis={analysis}
                currentTime={currentTime}
                onSelectEvent={handleSelectEvent}
                className="animate-enter"
              />
            </div>
            
            {/* Right column - Tactical map and analysis results */}
            <div className="space-y-6">
              <TacticalMap 
                analysis={analysis}
                currentTime={currentTime}
                className="w-full aspect-video animate-enter"
              />
              
              <AnalysisResult 
                analysis={analysis}
                className="animate-enter"
              />
            </div>
          </div>
        )}
        
        {/* Guide section - Show only when no video is uploaded */}
        {!videoUrl && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 animate-enter">
            <UploadGuide />
            
            <div className="glass-panel p-5">
              <h3 className="text-base font-medium mb-4">Features</h3>
              
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-background/70">
                  <h4 className="text-sm font-medium">Player Tracking</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    State-of-the-art YOLOv8 detection and tracking algorithms follow each player throughout the match.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg bg-background/70">
                  <h4 className="text-sm font-medium">Tactical Map</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Visualize player positions, movements, and team formations with our interactive tactical map.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg bg-background/70">
                  <h4 className="text-sm font-medium">Event Detection</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Automatically identify key events like goals, passes, shots, fouls, and more with precision.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg bg-background/70">
                  <h4 className="text-sm font-medium">AI Commentary</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Experience your games with professional-grade commentary generated by our advanced AI system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="py-6 border-t border-border mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2023 Vizion Sports Analysis. All rights reserved.</p>
          <p className="mt-1">Powered by YOLOv8 and advanced AI technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
