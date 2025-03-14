
import React, { useState, useCallback } from 'react';
import { Upload, FileUp, Video, Check, FileVideo } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UploadStatus } from '@/types';
import { generateRandomAnalysis } from '@/lib/mockData';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

interface VideoUploadProps {
  className?: string;
  onUploadComplete: (videoUrl: string, duration: number) => void;
  onAnalysisComplete: (analysisId: string) => void;
  setUploadStatus: (status: UploadStatus) => void;
  uploadStatus: UploadStatus;
}

const VideoUpload: React.FC<VideoUploadProps> = ({
  className,
  onUploadComplete,
  onAnalysisComplete,
  setUploadStatus,
  uploadStatus
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const processFile = useCallback((file: File) => {
    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file",
        variant: "destructive"
      });
      return;
    }

    setVideoFile(file);
    setUploadStatus({ status: 'uploading', progress: 0 });

    // Simulate upload process
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadStatus({ status: 'uploading', progress });
      
      if (progress >= 100) {
        clearInterval(interval);
        const videoUrl = URL.createObjectURL(file);
        
        // Create a temporary video element to get the duration
        const video = document.createElement('video');
        video.onloadedmetadata = () => {
          const duration = video.duration;
          onUploadComplete(videoUrl, duration);
          
          // Start analysis
          setUploadStatus({ status: 'analyzing', progress: 0 });
          simulateAnalysis(duration);
        };
        video.src = videoUrl;
      }
    }, 200);
  }, [onUploadComplete, setUploadStatus]);

  const simulateAnalysis = useCallback((duration: number) => {
    // Simulate analysis process
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setUploadStatus({ status: 'analyzing', progress });
      
      if (progress >= 100) {
        clearInterval(interval);
        const analysis = generateRandomAnalysis(duration);
        setUploadStatus({ status: 'complete', progress: 100 });
        onAnalysisComplete(analysis.id);
        
        toast({
          title: "Analysis Complete",
          description: "Your video has been analyzed successfully",
          variant: "default"
        });
      }
    }, 300);
  }, [onAnalysisComplete, setUploadStatus]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);

  return (
    <div 
      className={cn(
        'rounded-2xl transition-all duration-300',
        uploadStatus.status === 'idle' ? 'h-[350px]' : 'h-[120px]',
        className
      )}
    >
      {uploadStatus.status === 'idle' ? (
        <div
          className={cn(
            'h-full w-full relative flex flex-col items-center justify-center rounded-xl transition-all duration-300 border-2 border-dashed',
            dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50',
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="video-upload"
            accept="video/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
          
          <div className="flex flex-col items-center text-center p-6 max-w-md space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Upload your video for analysis</h3>
              <p className="text-sm text-gray-600">
                Drag and drop a video file, or click to browse your files
              </p>
            </div>
            
            <div className="text-xs text-gray-500">
              Supported formats: MP4, MOV, AVI, MKV (max 500MB)
            </div>
            
            <Button className="mt-4">
              <FileUp className="mr-2 h-4 w-4" />
              <span>Select Video</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="h-full w-full bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col space-y-3">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              {uploadStatus.status === 'complete' ? (
                <Check className="h-6 w-6 text-green-600" />
              ) : (
                <FileVideo className="h-6 w-6 text-blue-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">
                  {videoFile?.name || 'Video file'}
                </h3>
                <span className="text-xs text-gray-500">
                  {uploadStatus.progress}%
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all", 
                    uploadStatus.status === 'complete' ? 'bg-green-500' : 'bg-blue-600'
                  )}
                  style={{ width: `${uploadStatus.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {uploadStatus.status === 'uploading' && 'Uploading video...'}
                {uploadStatus.status === 'analyzing' && 'Analyzing with AI...'}
                {uploadStatus.status === 'complete' && 'Analysis complete!'}
                {uploadStatus.status === 'error' && uploadStatus.error}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
