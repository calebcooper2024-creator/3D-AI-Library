import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, MessageSquare, Volume2, VolumeX, Loader2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { processVoiceInput } from '../services/geminiService';

interface VoiceChatProps {
  missionGoal: string;
  personality: string;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  onVoiceInteraction?: () => void;
}

export const VoiceChat: React.FC<VoiceChatProps> = ({ missionGoal, personality, voiceEnabled, onToggleVoice, onVoiceInteraction }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAutoListening, setIsAutoListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [micLevel, setMicLevel] = useState(0);
  const isAutoListeningRef = useRef(false);
  const isPlayingRef = useRef(false);
  const [history, setHistory] = useState<{ role: 'user' | 'agent', text: string }[]>([]);
  const [lastTranscript, setLastTranscript] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isSpeakingRef = useRef(false);

  // VAD Thresholds
  const VAD_THRESHOLD = 0.01; // Energy threshold
  const SILENCE_DURATION = 1500; // ms of silence before stopping
  const MIN_SPEECH_DURATION = 500; // ms of speech before considering it a command
  const speechStartRef = useRef<number>(0);

  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    if (voiceEnabled) {
      startAutoListen();
    } else {
      stopAutoListen();
      cancelRecordingInternal();
      // Stop any ongoing playback
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
        audioSourceRef.current = null;
      }
      setIsPlaying(false);
      isPlayingRef.current = false;
    }
    return () => stopAutoListen();
  }, [voiceEnabled]);

  const startAutoListen = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const context = audioContextRef.current;
      if (context.state === 'suspended') {
        await context.resume();
      }

      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      isAutoListeningRef.current = true;
      setIsAutoListening(true);
      monitorAudio();
    } catch (err) {
      console.error("VAD initialization failed:", err);
      setError("Microphone access required for VAD.");
    }
  };

  const stopAutoListen = () => {
    isAutoListeningRef.current = false;
    setIsAutoListening(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
    isSpeakingRef.current = false;
  };

  const monitorAudio = () => {
    if (!analyserRef.current || !isAutoListeningRef.current || isProcessing || isPlayingRef.current) {
      if (isAutoListeningRef.current) requestAnimationFrame(monitorAudio);
      return;
    }

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    analyser.getFloatTimeDomainData(dataArray);

    // Calculate RMS (Root Mean Square) for energy level
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i] * dataArray[i];
    }
    const rms = Math.sqrt(sum / bufferLength);
    setMicLevel(rms);

    if (rms > VAD_THRESHOLD) {
      if (!isSpeakingRef.current) {
        // Speech started
        isSpeakingRef.current = true;
        speechStartRef.current = Date.now();
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        
        // Start recording if not already
        if (!isRecording) {
          startRecordingInternal();
        }
      } else {
        // Still speaking, reset silence timer
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }
      }
    } else if (isSpeakingRef.current) {
      // Silence detected while speaking
      if (!silenceTimerRef.current) {
        silenceTimerRef.current = setTimeout(() => {
          const speechDuration = Date.now() - speechStartRef.current;
          if (speechDuration > MIN_SPEECH_DURATION) {
            stopRecordingInternal();
          } else {
            // Too short, ignore
            cancelRecordingInternal();
          }
          isSpeakingRef.current = false;
          silenceTimerRef.current = null;
        }, SILENCE_DURATION);
      }
    }

    requestAnimationFrame(monitorAudio);
  };

  const startRecordingInternal = () => {
    if (!streamRef.current || isRecording) return;
    
    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      if (chunksRef.current.length === 0) return;
      const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        await handleVoiceInput(base64Audio);
      };
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecordingInternal = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const cancelRecordingInternal = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      chunksRef.current = []; // Clear chunks so onstop does nothing
    }
  };

  const startRecording = async () => {
    // Manual override removed - VAD only
  };

  const stopRecording = () => {
    // Manual override removed - VAD only
  };

  const playRawAudio = async (base64Data: string) => {
    if (!voiceEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const context = audioContextRef.current;
      
      if (context.state === 'suspended') {
        await context.resume();
      }

      const binaryString = window.atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Gemini TTS returns 16-bit PCM, 24kHz, Mono
      // Ensure we have an even number of bytes for Int16Array
      const pcmData = new Int16Array(bytes.buffer, 0, Math.floor(len / 2));
      const floatData = new Float32Array(pcmData.length);
      for (let i = 0; i < pcmData.length; i++) {
        floatData[i] = pcmData[i] / 32768.0;
      }

      const audioBuffer = context.createBuffer(1, floatData.length, 24000);
      audioBuffer.getChannelData(0).set(floatData);

      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);
      source.onended = () => {
        setIsPlaying(false);
        isPlayingRef.current = false;
        audioSourceRef.current = null;
      };
      
      audioSourceRef.current = source;
      setIsPlaying(true);
      isPlayingRef.current = true;
      source.start();
    } catch (err) {
      console.error("Audio playback failed:", err);
      setIsPlaying(false);
      isPlayingRef.current = false;
      audioSourceRef.current = null;
    }
  };

  const handleVoiceInput = async (base64Audio: string) => {
    setIsProcessing(true);
    onVoiceInteraction?.();
    try {
      const result = await processVoiceInput(base64Audio, missionGoal, personality);
      setLastTranscript(result.transcript);
      setLastResponse(result.text);
      
      setHistory(prev => [
        ...prev,
        { role: 'user', text: result.transcript || "..." },
        { role: 'agent', text: result.text }
      ].slice(-10)); // Keep last 10 messages
      
      if (result.audio && voiceEnabled) {
        await playRawAudio(result.audio);
      }
    } catch (err) {
      console.error("Failed to process voice input:", err);
      setError("Failed to process signal.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-emerald-500" />
          <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Bonnie Comms</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 mr-2">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`w-0.5 rounded-full ${i <= 3 ? 'bg-emerald-500' : 'bg-zinc-800'}`} 
                style={{ height: `${i * 2 + 2}px` }}
              />
            ))}
          </div>
          
          {/* Voice Master Switch */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleVoice}
              className={`relative flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none ${
                voiceEnabled ? 'bg-emerald-600' : 'bg-zinc-700'
              }`}
            >
              <motion.div
                animate={{ x: voiceEnabled ? 22 : 2 }}
                className="w-4 h-4 bg-white rounded-full shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${voiceEnabled ? 'text-emerald-500' : 'text-zinc-500'}`}>
              Voice {voiceEnabled ? 'Active' : 'Disabled'}
            </span>
            {voiceEnabled && (
              <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden ml-2">
                <motion.div 
                  className="h-full bg-emerald-500"
                  animate={{ width: `${Math.min(100, micLevel * 500)}%` }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                />
              </div>
            )}
          </div>

          <button 
            onClick={() => setHistory([])}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-300 transition-colors mr-2"
            title="Clear History"
          >
            <VolumeX size={14} />
          </button>
          {!voiceEnabled && (
            <div className="flex items-center gap-1 text-amber-500/50 mr-2">
              <VolumeX size={10} />
              <span className="text-[8px] font-mono uppercase">Muted</span>
            </div>
          )}
          {voiceEnabled && isRecording && (
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-2 h-2 rounded-full bg-red-500"
            />
          )}
          <span className="text-[10px] font-mono text-zinc-500 uppercase">
            {!voiceEnabled ? "Offline" : isRecording ? "Transmitting" : isProcessing ? "Processing..." : isAutoListening ? "Listening (VAD)" : "Standby"}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-[120px] max-h-[200px] space-y-3 custom-scrollbar pr-2 my-2">
        {history.length === 0 && !isProcessing && (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 opacity-40">
            <MessageSquare size={24} className="text-zinc-600 mb-2" />
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Comms Silent</p>
            <p className="text-[10px] text-zinc-600 mt-1">{voiceEnabled ? "Speak to Bonnie" : "Enable voice to communicate"}</p>
          </div>
        )}

        {history.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: msg.role === 'user' ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex flex-col ${msg.role === 'user' ? 'items-start' : 'items-end'}`}
          >
            <span className={`text-[8px] font-bold uppercase tracking-tighter mb-0.5 ${msg.role === 'user' ? 'text-zinc-500' : 'text-emerald-500'}`}>
              {msg.role === 'user' ? 'Operator' : 'AI Agent'}
            </span>
            <div className={`px-3 py-2 rounded-xl text-[11px] max-w-[85%] ${
              msg.role === 'user' 
                ? 'bg-zinc-800 text-zinc-300 rounded-tl-none' 
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-tr-none'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}

        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-end"
          >
            <span className="text-[8px] font-bold uppercase tracking-tighter mb-0.5 text-emerald-500">
              AI Agent
            </span>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl rounded-tr-none px-3 py-2 flex items-center gap-2">
              <Loader2 size={12} className="animate-spin text-emerald-500" />
              <span className="text-[10px] text-emerald-500/70 font-mono italic">Thinking...</span>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-red-500/80 justify-center p-2"
          >
            <ShieldAlert size={12} />
            <span className="text-[10px] font-mono uppercase tracking-tighter">{error}</span>
          </motion.div>
        )}
      </div>

      <div className="flex justify-center">
        <div
          className={`
            relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
            ${isRecording 
              ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-110' 
              : isProcessing
                ? 'bg-zinc-800'
                : isAutoListening
                  ? 'bg-emerald-600 shadow-lg shadow-emerald-600/20'
                  : 'bg-zinc-800 opacity-50'
            }
          `}
        >
          {isProcessing ? (
            <Loader2 className="text-white animate-spin" size={24} />
          ) : isPlaying ? (
            <Volume2 className="text-white animate-pulse" size={24} />
          ) : isRecording ? (
            <Mic className="text-white" size={24} />
          ) : isAutoListening ? (
            <Mic className="text-white" size={24} />
          ) : (
            <MicOff className="text-zinc-500" size={24} />
          )}
          
          {/* Pulsing ring when active */}
          {voiceEnabled && (isRecording || isAutoListening) && !isProcessing && !isPlaying && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: isRecording ? 1.8 : 1.4, opacity: 0 }}
              transition={{ repeat: Infinity, duration: isRecording ? 1 : 2 }}
              className={`absolute inset-0 rounded-full border-2 ${isRecording ? 'border-red-500' : 'border-emerald-500/30'}`}
            />
          )}
        </div>
      </div>
      
      <div className="text-center">
        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
          {!voiceEnabled 
            ? "Voice Comms Offline"
            : isProcessing 
              ? "Analyzing Signal..." 
              : isPlaying 
                ? "Receiving Comms..." 
                : isRecording 
                  ? "Transmitting..." 
                  : isAutoListening 
                    ? "Always Listening" 
                    : "Standby"}
        </span>
      </div>
    </div>
  );
};
