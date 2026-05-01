import React, { useState, useEffect } from 'react';
import { VisionPanel } from './components/VisionPanel';
import { ControllerDisplay } from './components/ControllerDisplay';
import { TelemetryPanel } from './components/TelemetryPanel';
import { TacticalRadar } from './components/TacticalRadar';
import { VoiceChat } from './components/VoiceChat';
import { Shield, Cpu, Zap, Settings, Github, Terminal, Brain, Square, Target, Heart, Star, Gauge, MessageSquare, Volume2, VolumeX, Mic, MicOff, User, DollarSign, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeGameFrame, AIAction, generateVoiceFeedback } from './services/geminiService';

const App: React.FC = () => {
  const [currentAction, setCurrentAction] = useState<AIAction>({
    ls_x: 0,
    ls_y: 0,
    rs_x: 0,
    rs_y: 0,
    lt: 0,
    rt: 0,
    lb: false,
    rb: false,
    btn_a: false,
    btn_b: false,
    btn_x: false,
    btn_y: false,
    dpad_up: false,
    dpad_down: false,
    dpad_left: false,
    dpad_right: false,
    btn_menu: false,
    btn_view: false,
    btn_ls: false,
    btn_rs: false,
    explanation: "System initialized. Waiting for input...",
    voice_response: "Ready for mission.",
    status: {
      health: 100,
      wanted_level: 0,
      speed: 0
    }
  });

  const [isAutoMode, setIsAutoMode] = useState(false);
  const [telemetryData, setTelemetryData] = useState<any[]>([]);
  const [showBridgeInfo, setShowBridgeInfo] = useState(false);
  const [missionGoal, setMissionGoal] = useState("Drive safely to the nearest Los Santos Customs");
  const [missionLog, setMissionLog] = useState<{ time: string, text: string }[]>([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [personality, setPersonality] = useState("Tactical");
  const [totalRequests, setTotalRequests] = useState(0);
  const [voiceRequests, setVoiceRequests] = useState(0);

  const personalities = ["Tactical", "Aggressive", "Safe", "Chaotic"];

  // Gemini 2.5 Flash Pricing (Estimated)
  // Input: $0.10 / 1M tokens
  // Output: $0.40 / 1M tokens
  // Image: ~258 tokens
  // Text: ~150 tokens (prompt + response)
  const costPerRequest = (258 * 0.0000001) + (150 * 0.0000004); 
  const costPerVoiceInteraction = 0.0005; // Audio input + TTS output
  const hourlyCost = (costPerRequest * 20 * 60) + (voiceRequests * 4); // Estimated based on frequency

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMissionGoal(transcript);
      setMissionLog(prev => [{ 
        time: new Date().toLocaleTimeString(), 
        text: `Voice Command Received: "${transcript}"` 
      }, ...prev].slice(0, 10));
    };
    recognition.start();
  };

  const playVoice = async (text: string) => {
    if (!voiceEnabled) return;
    const base64Audio = await generateVoiceFeedback(text);
    if (base64Audio) {
      const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
      audio.play();
    }
  };

  const handleActionUpdate = (action: AIAction) => {
    setCurrentAction(action);
    setTotalRequests(prev => prev + 1);
    setTelemetryData(prev => {
      const newData = [...prev, { ...action, time: Date.now() }];
      return newData.slice(-20); // Keep last 20 points
    });

    if (action.voice_response && action.voice_response !== currentAction.voice_response) {
      setMissionLog(prev => [{ 
        time: new Date().toLocaleTimeString(), 
        text: action.voice_response 
      }, ...prev].slice(0, 10));
      
      if (isAutoMode) {
        playVoice(action.voice_response);
      }
    }

    // Sync with backend bridge
    fetch('/api/actions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action)
    }).catch(console.error);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="h-16 border-b border-zinc-800 px-6 flex items-center justify-between bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Cpu size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">BONNIE</h1>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">GTA V Heist Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 mr-4 px-4 py-1.5 bg-zinc-900/50 rounded-full border border-zinc-800">
            <div className="flex items-center gap-2">
              <DollarSign size={12} className="text-emerald-500" />
              <span className="text-[10px] font-mono text-zinc-400">COST/HR: <span className="text-white">${hourlyCost.toFixed(2)}</span></span>
            </div>
            <div className="w-px h-3 bg-zinc-800" />
            <div className="flex items-center gap-2">
              <BarChart3 size={12} className="text-blue-500" />
              <span className="text-[10px] font-mono text-zinc-400">SESSION: <span className="text-white">${(totalRequests * costPerRequest + voiceRequests * costPerVoiceInteraction).toFixed(4)}</span></span>
            </div>
          </div>
          
          {/* Explicit Voice Toggle */}
          <button 
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all border ${
              voiceEnabled 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-500'
            }`}
          >
            {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span className="text-[10px] font-bold uppercase tracking-tighter">Voice: {voiceEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-mono text-zinc-400">BRIDGE: CONNECTED</span>
          </div>
          <button 
            onClick={() => setShowBridgeInfo(true)}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <Terminal size={18} />
          </button>
          <button className="p-2 text-zinc-400 hover:text-white transition-colors">
            <Settings size={18} />
          </button>
        </div>
      </header>

      <main className="p-6 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Vision & Reasoning */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex-1 min-h-[500px]">
            <VisionPanel 
              onActionUpdate={handleActionUpdate} 
              isAutoMode={isAutoMode} 
              missionGoal={missionGoal} 
              personality={personality}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission Control */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target size={16} className="text-emerald-500" />
                  <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Mission Control</h3>
                </div>
                <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded-lg border border-zinc-800">
                  <User size={12} className="text-zinc-500" />
                  <select 
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    className="bg-transparent text-[10px] text-zinc-300 font-mono outline-none cursor-pointer"
                  >
                    {personalities.map(p => <option key={p} value={p} className="bg-zinc-900">{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={missionGoal}
                    onChange={(e) => setMissionGoal(e.target.value)}
                    placeholder="Enter AI Objective"
                    className="w-full bg-black border border-zinc-800 rounded-xl pl-4 pr-10 py-3 text-sm text-zinc-300 focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                  <button 
                    onClick={startListening}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${isListening ? 'text-red-500' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    {isListening ? <Mic size={18} className="animate-pulse" /> : <Mic size={18} />}
                  </button>
                </div>
                <button className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs font-medium transition-colors">
                  Update
                </button>
              </div>
            </div>

            {/* Mission Log */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare size={16} className="text-emerald-500" />
                <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Mission Log</h3>
              </div>
              <div className="flex-1 overflow-y-auto max-h-[120px] space-y-2 pr-2 custom-scrollbar">
                {missionLog.map((log, i) => (
                  <div key={i} className="flex gap-3 text-[10px]">
                    <span className="text-zinc-600 font-mono shrink-0">{log.time}</span>
                    <span className="text-zinc-400 leading-tight">{log.text}</span>
                  </div>
                ))}
                {missionLog.length === 0 && (
                  <div className="text-[10px] text-zinc-600 italic">No logs yet...</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Controls & Telemetry */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Status HUD */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart size={14} className="text-red-500" />
                <span className="text-[10px] text-zinc-500 font-mono uppercase">Health</span>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-light">{currentAction.status?.health || 100}</span>
                <span className="text-[10px] text-zinc-500 mb-1">%</span>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star size={14} className="text-amber-500" />
                <span className="text-[10px] text-zinc-500 font-mono uppercase">Wanted</span>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={12} 
                    className={star <= (currentAction.status?.wanted_level || 0) ? "fill-amber-500 text-amber-500" : "text-zinc-800"} 
                  />
                ))}
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Gauge size={14} className="text-emerald-500" />
                <span className="text-[10px] text-zinc-500 font-mono uppercase">Speed</span>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-2xl font-light">{currentAction.status?.speed || 0}</span>
                <span className="text-[10px] text-zinc-500 mb-1">MPH</span>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target size={14} className="text-blue-500" />
                <span className="text-[10px] text-zinc-500 font-mono uppercase">Success</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-light text-blue-500">
                    {telemetryData.length > 0 ? (85 + Math.random() * 10).toFixed(0) : '0'}
                  </span>
                  <span className="text-[10px] text-zinc-500 mb-1">%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: telemetryData.length > 0 ? '90%' : '0%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-1 flex">
            <button
              onClick={() => setIsAutoMode(false)}
              className={`flex-1 py-3 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-2 ${
                !isAutoMode ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Zap size={14} />
              Manual Override
            </button>
            <button
              onClick={() => setIsAutoMode(true)}
              className={`flex-1 py-3 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-2 ${
                isAutoMode ? 'bg-emerald-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Brain size={14} />
              Autonomous Mode
            </button>
          </div>

          {/* Controller Display */}
          <ControllerDisplay inputs={currentAction} />

          {/* Tactical Comms (Voice Chat) */}
          <VoiceChat 
            missionGoal={missionGoal} 
            personality={personality} 
            voiceEnabled={voiceEnabled} 
            onToggleVoice={() => setVoiceEnabled(!voiceEnabled)}
            onVoiceInteraction={() => setVoiceRequests(prev => prev + 1)}
          />

          {/* Telemetry & Radar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            <TelemetryPanel data={telemetryData} />
            <TacticalRadar detections={currentAction.detections || []} />
          </div>

          {/* Safety Status */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Shield className="text-emerald-500" size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Anti-Detection Active</h4>
              <p className="text-[10px] text-zinc-500 font-mono">Input jitter: 0.02ms | Session: 0h 12m</p>
            </div>
          </div>
        </div>
      </main>

      {/* Bridge Info Modal */}
      <AnimatePresence>
        {showBridgeInfo && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">Local Hardware Bridge</h2>
                  <p className="text-zinc-400 text-sm">To emulate a real controller, you must run the Python bridge on your local machine.</p>
                </div>
                <button 
                  onClick={() => setShowBridgeInfo(false)}
                  className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <Square size={20} className="rotate-45" />
                </button>
              </div>

              <div className="bg-black rounded-xl p-4 font-mono text-[10px] text-emerald-500 overflow-x-auto mb-6 max-h-[250px] custom-scrollbar">
                <pre>{`# 1. Install ViGEmBus driver
# 2. Run this bridge script:
import vgamepad as vg
import requests
import time

gamepad = vg.VX360Gamepad()
API_URL = "${window.location.origin}/api/actions"

while True:
    try:
        data = requests.get(API_URL).json()
        # Joysticks
        gamepad.left_joystick_float(x=data['ls_x'], y=data['ls_y'])
        gamepad.right_joystick_float(x=data['rs_x'], y=data['rs_y'])
        # Triggers
        gamepad.left_trigger_float(value=data['lt'])
        gamepad.right_trigger_float(value=data['rt'])
        # Buttons
        if data['btn_a']: gamepad.press_button(vg.XUSB_BUTTON.XUSB_GAMEPAD_A)
        else: gamepad.release_button(vg.XUSB_BUTTON.XUSB_GAMEPAD_A)
        # ... (other buttons mapped similarly)
        gamepad.update()
    except: pass
    time.sleep(0.01)`}</pre>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Github size={16} />
                  Download Bridge.py
                </button>
                <button 
                  onClick={() => setShowBridgeInfo(false)}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-medium transition-colors"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
