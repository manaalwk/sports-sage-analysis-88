
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
import Footer from '@/components/Footer';

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Toaster />
      
      {/* Header with navigation */}
      <Header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b" />
      
      {/* Hero section - Show only when no video is uploaded */}
      {!videoUrl && (
        <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-4">
                  Professional-Grade Analysis
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Advanced Sports <br />Video Analysis
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl">
                  Upload your sports footage and get AI-powered insights, tactical visualizations, and real-time commentary in minutes.
                </p>
                <a href="#upload-section" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-blue-700 font-medium hover:bg-blue-50 transition-colors">
                  Get Started
                </a>
              </div>
              <div className="flex-1">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src="/placeholder.svg" 
                    alt="Sports analysis demo" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-xs text-white font-medium">LIVE ANALYSIS</span>
                      </div>
                      <div className="text-white text-sm">Player tracking in action</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Main content */}
      <main className="flex-1">
        {/* Upload section */}
        <section id="upload-section" className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl text-center">
            {!videoUrl && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-4">Upload Your Footage</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our AI engine will analyze player movements, detect key events, and provide real-time commentary.
                </p>
              </div>
            )}
            
            <VideoUpload 
              onUploadComplete={handleUploadComplete}
              onAnalysisComplete={handleAnalysisComplete}
              setUploadStatus={setUploadStatus}
              uploadStatus={uploadStatus}
              className="max-w-3xl mx-auto mb-8"
            />
          </div>
        </section>
        
        {/* Analysis section - Show only when video is uploaded and analysis is complete */}
        {videoUrl && analysis && (
          <section className="py-12 px-4 bg-gray-50">
            <div className="container mx-auto max-w-7xl">
              <h2 className="text-2xl font-bold mb-8">Video Analysis Results</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column - Video player and timeline */}
                <div className="lg:col-span-2 space-y-6">
                  <VideoPlayer 
                    videoUrl={videoUrl}
                    analysis={analysis}
                    currentTime={currentTime}
                    onTimeUpdate={handleTimeUpdate}
                    className="w-full aspect-video rounded-xl overflow-hidden shadow-lg"
                  />
                  
                  <EventTimeline 
                    analysis={analysis}
                    currentTime={currentTime}
                    onSelectEvent={handleSelectEvent}
                    className="rounded-xl shadow-lg"
                  />
                </div>
                
                {/* Right column - Tactical map and analysis results */}
                <div className="space-y-6">
                  <TacticalMap 
                    analysis={analysis}
                    currentTime={currentTime}
                    className="w-full aspect-video rounded-xl overflow-hidden shadow-lg"
                  />
                  
                  <AnalysisResult 
                    analysis={analysis}
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Features section - Show only when no video is uploaded */}
        {!videoUrl && (
          <section className="py-16 px-4 bg-gray-50">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Powerful Analysis Features</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Get professional-grade insights from your sports footage with our AI-powered analysis tools.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Player Tracking</h3>
                  <p className="text-gray-600">
                    State-of-the-art YOLOv8 detection and tracking algorithms follow each player throughout the match.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Tactical Map</h3>
                  <p className="text-gray-600">
                    Visualize player positions, movements, and team formations with our interactive tactical map.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Event Detection</h3>
                  <p className="text-gray-600">
                    Automatically identify key events like goals, passes, shots, fouls, and more with precision.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">AI Commentary</h3>
                  <p className="text-gray-600">
                    Experience your games with professional-grade commentary generated by our advanced AI system.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Guide section - Show only when no video is uploaded */}
        {!videoUrl && (
          <section className="py-16 px-4 bg-white">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Our platform is designed to be simple and intuitive. Get started in just a few steps.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <UploadGuide />
                
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Why Choose Vizion Analysis</h3>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-base font-medium">Accurate Detection</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Our AI has been trained on thousands of sports videos for maximum accuracy.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-base font-medium">Fast Processing</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Get your analysis results in minutes, not hours, thanks to our optimized algorithms.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-base font-medium">Professional Insights</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Get the same level of analysis that professional sports teams use, at a fraction of the cost.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* CTA section - Show only when no video is uploaded */}
        {!videoUrl && (
          <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Analyze Your Game?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join coaches and athletes who are taking their performance analysis to the next level.
              </p>
              <a href="#upload-section" className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-blue-700 font-medium hover:bg-blue-50 transition-colors">
                Start Analyzing Now
              </a>
            </div>
          </section>
        )}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
