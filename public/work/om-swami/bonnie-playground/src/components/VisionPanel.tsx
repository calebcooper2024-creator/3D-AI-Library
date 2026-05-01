import React, { useRef, useState, useEffect } from 'react';
import { Camera, Play, Square, Activity, Brain } from 'lucide-react';
import { motion } from 'motion/react';
import { analyzeGameFrame, AIAction } from '../services/geminiService';

interface VisionPanelProps {
  onActionUpdate: (action: AIAction) => void;
  isAutoMode: boolean;
  missionGoal: string;
  personality: string;
}

export const VisionPanel: React.FC<VisionPanelProps> = ({ onActionUpdate, isAutoMode, missionGoal, personality }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [captureError, setCaptureError] = useState<string | null>(null);

  const drawDetections = (detections: any[]) => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    detections.forEach(det => {
      const [ymin, xmin, ymax, xmax] = det.box_2d;
      const x = (xmin / 1000) * canvas.width;
      const y = (ymin / 1000) * canvas.height;
      const w = ((xmax - xmin) / 1000) * canvas.width;
      const h = ((ymax - ymin) / 1000) * canvas.height;

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);

      ctx.fillStyle = '#10b981';
      ctx.font = '10px monospace';
      ctx.fillText(det.label.toUpperCase(), x, y > 15 ? y - 5 : y + 15);
    });
  };

  const startCapture = async () => {
    setCaptureError(null);
    try {
      // Use standard getDisplayMedia without strict browser surface constraint for better compatibility
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (err: any) {
      console.error("Error starting screen capture:", err);
      if (err.name === 'NotAllowedError') {
        setCaptureError("Permission denied. Please click 'Initialize Stream' again and select the Xbox Cloud Gaming window/tab.");
      } else {
        setCaptureError(`Capture error: ${err.message || 'Unknown error'}`);
      }
    }
  };

  const stopCapture = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setIsCapturing(false);
      setCaptureError(null);
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current || isAnalyzing) return;

    setIsAnalyzing(true);
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    if (overlayCanvasRef.current) {
      overlayCanvasRef.current.width = video.videoWidth;
      overlayCanvasRef.current.height = video.videoHeight;
    }

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL('image/jpeg', 0.8);
      
      const action = await analyzeGameFrame(base64Image, missionGoal, personality);
      setLastAnalysis(action.explanation);
      if (action.detections) {
        drawDetections(action.detections);
      }
      onActionUpdate(action);
    }
    setIsAnalyzing(false);
  };

  useEffect(() => {
    let interval: any;
    if (isAutoMode && isCapturing) {
      interval = setInterval(captureAndAnalyze, 3000); // Analyze every 3 seconds in auto mode
    }
    return () => clearInterval(interval);
  }, [isAutoMode, isCapturing]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="relative flex-1 bg-black rounded-2xl border border-zinc-800 overflow-hidden group">
        {!isCapturing ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-zinc-950">
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
              <Camera className="text-zinc-500" size={32} />
            </div>
            <div className="text-center px-6">
              <h3 className="text-zinc-300 font-medium">No Source Connected</h3>
              <p className="text-zinc-500 text-sm mb-4">Select the Xbox Cloud Gaming tab to start</p>
              
              {captureError && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 max-w-[320px] mx-auto"
                >
                  <p className="text-red-400 text-xs font-mono mb-2 leading-tight">
                    {captureError}
                  </p>
                  <div className="text-[10px] text-zinc-500 text-left space-y-1">
                    <p>• Ensure you haven't blocked screen sharing for this site.</p>
                    <p>• Click 'Initialize Stream' and select a window or tab.</p>
                    <p>• If the picker doesn't appear, refresh the page.</p>
                    <p className="mt-2 pt-2 border-t border-red-500/10">
                      <span className="text-red-400 font-bold">Note:</span> You must select a window or tab in the browser's screen share dialog.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
            <button
              onClick={startCapture}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Play size={18} fill="currentColor" />
              {captureError ? 'Retry Connection' : 'Initialize Stream'}
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <canvas 
              ref={overlayCanvasRef} 
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] text-white font-mono uppercase tracking-wider">Live Feed</span>
              </div>
            </div>
            <button
              onClick={stopCapture}
              className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-red-500/20 transition-colors"
            >
              <Square size={16} />
            </button>
          </>
        )}
        
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain size={16} className="text-emerald-500" />
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">AI Vision Reasoning</span>
        </div>
        <div className="min-h-[60px] text-sm text-zinc-300 font-light leading-relaxed italic">
          {isAnalyzing ? (
            <span className="animate-pulse text-zinc-500">Processing frame...</span>
          ) : lastAnalysis || "Waiting for first frame analysis..."}
        </div>
      </div>
    </div>
  );
};
