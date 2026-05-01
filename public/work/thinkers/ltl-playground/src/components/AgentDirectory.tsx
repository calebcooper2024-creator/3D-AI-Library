import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  Filter, 
  ChevronRight, 
  Zap, 
  Brain, 
  Target, 
  History,
  Star,
  Shield,
  Cpu,
  Activity,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Lock,
  ArrowUpRight,
  TrendingDown,
  Clock,
  Database,
  Terminal,
  AlertTriangle,
  Fingerprint,
  Link2,
  Layers,
  Wrench,
  Settings,
  ShieldAlert,
  Phone,
  Video,
  MessageSquare,
  MessageCircle,
  Smartphone,
  X,
  Send,
  Paperclip
} from 'lucide-react';
import { NetworkGraph } from './AgentDiagnostics/NetworkGraph';
import { BrainTerminal } from './AgentDiagnostics/BrainTerminal';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

interface Agent {
  id: string;
  name: string;
  humanName: string;
  level: number;
  role?: string;
  department?: string;
  status: 'active' | 'awaiting' | 'offline';
  isExecuting?: boolean;
}

interface AgentDirectoryProps {
  agents: Agent[];
  isDarkMode: boolean;
  selectedAgentId?: string | null;
  onAgentSelect?: (id: string | null) => void;
  isSystemHalted?: boolean;
  onClose?: () => void;
  isCompact?: boolean;
}

export const AgentDirectory: React.FC<AgentDirectoryProps> = ({ 
  agents, 
  isDarkMode, 
  selectedAgentId, 
  onAgentSelect, 
  isSystemHalted,
  onClose,
  isCompact = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [activeComm, setActiveComm] = useState<string | null>(null);
  const [showVoiceOptions, setShowVoiceOptions] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  React.useEffect(() => {
    if (selectedAgentId) {
      const agent = agents.find(a => a.id === selectedAgentId);
      if (agent) {
        setSelectedAgent(agent);
      }
    }
  }, [selectedAgentId, agents]);

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    onAgentSelect?.(agent.id);
  };

  const departments = Array.from(new Set(agents.map(a => a.department).filter(Boolean))) as string[];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      agent.humanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = !selectedDept || agent.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="flex h-full overflow-hidden bg-[#FCFCFC] dark:bg-[#0A0A0A]">
      {/* List Section */}
      <AnimatePresence mode="wait">
        {(!isCompact || !selectedAgent) && (
          <motion.div 
            initial={isCompact ? { x: -20, opacity: 0 } : false}
            animate={{ x: 0, opacity: 1 }}
            exit={isCompact ? { x: -20, opacity: 0 } : false}
            className={`${isCompact ? 'w-full' : 'w-1/3'} border-r border-slate-200 dark:border-white/10 flex flex-col h-full`}
          >
            <div className="p-6 border-b border-slate-200 dark:border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isCompact && onClose && (
                    <button 
                      onClick={onClose}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-all"
                    >
                      <X size={18} />
                    </button>
                  )}
                  <h2 className="text-xl font-bold tracking-tight">Agent Roster</h2>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/5 opacity-50">
                  {agents.length} AGENTS
                </span>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={16} />
                <input 
                  type="text" 
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                <button 
                  onClick={() => setSelectedDept(null)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${!selectedDept ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-white/5 opacity-50 hover:opacity-100'}`}
                >
                  All
                </button>
                {departments.map(dept => (
                  <button 
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${selectedDept === dept ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-white/5 opacity-50 hover:opacity-100'}`}
                  >
                    {dept.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {filteredAgents.map(agent => (
                <motion.button
                  key={agent.id}
                  onClick={() => handleAgentClick(agent)}
                  whileHover={{ x: 4 }}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    selectedAgent?.id === agent.id 
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                      : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-blue-500/50'
                  }`}
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden border ${
                      selectedAgent?.id === agent.id ? 'border-white/20' : 'border-slate-200 dark:border-white/10'
                    }`}>
                      <img 
                        src={`https://picsum.photos/seed/${agent.id}/100/100`} 
                        alt={agent.humanName} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{agent.humanName}</p>
                      <div className="flex items-center gap-2">
                        <p className={`text-[10px] uppercase tracking-widest font-medium ${selectedAgent?.id === agent.id ? 'opacity-70' : 'opacity-40'}`}>
                          {agent.role || agent.name}
                        </p>
                        {isSystemHalted && (
                          <span className="text-[8px] font-bold text-rose-500 uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-rose-500/10">Inactive</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} className={selectedAgent?.id === agent.id ? 'opacity-100' : 'opacity-20'} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Section */}
      <AnimatePresence mode="wait">
        {selectedAgent && (
          <motion.div 
            initial={isCompact ? { x: 20, opacity: 0 } : { opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={isCompact ? { x: 20, opacity: 0 } : { opacity: 0 }}
            className={`flex-1 overflow-y-auto ${isCompact ? 'p-6' : 'p-12'} custom-scrollbar bg-[#F8F9FB] dark:bg-[#0A0A0A]`}
          >
            <div className="max-w-6xl mx-auto space-y-8">
              {isCompact && (
                <button 
                  onClick={() => {
                    setSelectedAgent(null);
                    onAgentSelect?.(null);
                  }}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity mb-4"
                >
                  <X size={14} />
                  Collapse Profile
                </button>
              )}
              {/* 1. The Header: Identity & Orchestration Node */}
              <div className={`flex ${isCompact ? 'flex-col gap-6' : 'items-start justify-between'} bg-white dark:bg-white/5 ${isCompact ? 'p-6' : 'p-8'} rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-sm`}>
                <div className={`flex ${isCompact ? 'flex-col text-center' : 'items-center gap-10'}`}>
                  <div className="relative group mx-auto">
                    <div className={`${isCompact ? 'w-24 h-24' : 'w-32 h-32'} rounded-[2rem] bg-slate-100 dark:bg-white/5 flex items-center justify-center overflow-hidden shadow-2xl shadow-blue-500/20 border border-slate-200 dark:border-white/10 transition-transform group-hover:scale-105`}>
                      <img 
                        src={`https://picsum.photos/seed/${selectedAgent.id}/300/300`} 
                        alt={selectedAgent.humanName} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className={`absolute -bottom-2 -right-2 ${isCompact ? 'w-8 h-8' : 'w-10 h-10'} rounded-2xl border-4 border-white dark:border-[#0A0A0A] flex items-center justify-center shadow-lg transition-all duration-1000 ${
                      isSystemHalted ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}>
                      <Activity size={isCompact ? 14 : 18} className={`text-white ${isSystemHalted ? '' : 'animate-pulse'}`} />
                    </div>
                  </div>
                  
                  <div className={`space-y-4 ${isCompact ? 'w-full' : ''}`}>
                    <div className={`flex items-center ${isCompact ? 'justify-center' : 'gap-4'}`}>
                      <div className="space-y-1">
                        <div className={`flex items-center ${isCompact ? 'flex-col gap-2' : 'gap-3'}`}>
                          <h1 className={`${isCompact ? 'text-2xl' : 'text-4xl'} font-bold tracking-tight`}>{selectedAgent.humanName}</h1>
                          <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 uppercase tracking-widest">
                            {selectedAgent.id}
                          </span>
                        </div>
                        <p className={`text-sm opacity-50 font-medium flex items-center ${isCompact ? 'justify-center' : 'gap-2'}`}>
                          {selectedAgent.role || selectedAgent.name}
                        </p>
                      </div>
                    </div>

                    <div className={`grid ${isCompact ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-8'} pt-4 border-t border-slate-100 dark:border-white/5`}>
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-1">Hierarchy Level</p>
                        <p className="text-xs font-bold">Level {selectedAgent.level}</p>
                      </div>
                      {!isCompact && (
                        <>
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-1">Reports To</p>
                            <p className="text-xs font-bold text-blue-500">A03_SUP_DISNEY</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-1">ADK Wrapper</p>
                            <p className="text-xs font-bold text-purple-500">ParallelAgent</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`${isCompact ? 'w-full' : 'text-right'} space-y-4`}>
                  <div className={`px-4 py-2 rounded-2xl border transition-all duration-1000 ${
                    isSystemHalted 
                      ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' 
                      : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                  }`}>
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5">Current State</p>
                    <p className="text-xs font-black tracking-tighter">
                      {isSystemHalted ? '🔴 BLOCKED' : '🟢 ACTIVE'}
                    </p>
                  </div>

                  <div className={`flex items-center ${isCompact ? 'justify-center' : 'justify-end'} gap-2 pt-2 relative`}>
                    {[
                      { icon: MessageSquare, label: 'Chat', color: 'hover:text-blue-500 hover:bg-blue-500/10' },
                      { icon: Phone, label: 'Voice', color: 'hover:text-emerald-500 hover:bg-emerald-500/10' },
                    ].map((btn) => (
                      <motion.button
                        key={btn.label}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          if (btn.label === 'Voice') {
                            setShowVoiceOptions(!showVoiceOptions);
                            setShowChatOptions(false);
                          } else if (btn.label === 'Chat') {
                            setShowChatOptions(!showChatOptions);
                            setShowVoiceOptions(false);
                          }
                        }}
                        className={`p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 transition-all group relative ${btn.color} 
                          ${btn.label === 'Voice' && showVoiceOptions ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-500' : ''}
                          ${btn.label === 'Chat' && showChatOptions ? 'bg-blue-500/20 border-blue-500/50 text-blue-500' : ''}
                        `}
                      >
                        <btn.icon size={18} />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bento Box Grid - Simplified for compact */}
              <div className={`grid ${isCompact ? 'grid-cols-2' : 'grid-cols-4'} gap-6`}>
                <div className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-1">Cost Per Task</p>
                  <p className="text-xl font-bold">$0.042</p>
                </div>
                <div className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-1">Quality Score</p>
                  <p className="text-xl font-bold">9.6</p>
                </div>
                {!isCompact && (
                  <>
                    <div className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                      <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-1">Latency</p>
                      <p className="text-xl font-bold">45ms</p>
                    </div>
                    <div className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                      <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-1">Context</p>
                      <p className="text-xl font-bold">1.2M</p>
                    </div>
                  </>
                )}
              </div>

              {/* Brain Terminal - Simplified for compact */}
              <div className={`${isCompact ? 'h-[300px]' : 'h-[400px]'}`}>
                <BrainTerminal agent={selectedAgent} isSystemHalted={isSystemHalted} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Box Overlay */}
      <AnimatePresence>
        {isChatOpen && selectedAgent && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-8 right-8 w-96 h-[500px] bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl z-[100] flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
                  <img 
                    src={`https://picsum.photos/seed/${selectedAgent.id}/100/100`} 
                    alt="" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold">{selectedAgent.humanName}</h3>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-2xl rounded-tl-none bg-slate-100 dark:bg-white/5 text-xs">
                  Hello! I'm {selectedAgent.humanName}. How can I assist you today?
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 p-2 rounded-2xl border border-slate-200 dark:border-white/10">
                <button className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl transition-all opacity-50">
                  <Paperclip size={18} />
                </button>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1 bg-transparent border-none focus:ring-0 text-xs"
                />
                <button className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
