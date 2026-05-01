import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Sun, 
  Moon, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Activity, 
  Zap, 
  Shield, 
  Cpu, 
  Terminal,
  Send,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  LayoutDashboard,
  Users,
  Settings,
  BarChart3, 
  PieChart, 
  Bell,
  Gauge,
  Share2,
  TrendingUp,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen,
  Power,
  FileCode,
  Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { PerformanceDashboard } from './components/PerformanceDashboard';
import { NetworkMesh } from './components/NetworkMesh';
import { EconomyDashboard } from './components/EconomyDashboard';
import { GovernanceDashboard } from './components/GovernanceDashboard';
import { GlobalCommand } from './components/GlobalCommand';
import { AgentDirectory } from './components/AgentDirectory';
import { PromptRegistry } from './components/PromptRegistry';
import { KnowledgeBase } from './components/KnowledgeBase';
import { Database } from 'lucide-react';

// --- Types ---

interface Agent {
  id: string;
  name: string;
  humanName: string;
  level: 1 | 2 | 3 | 4;
  status: 'active' | 'awaiting' | 'offline'; // Legacy status for initial data
  isExecuting?: boolean;
  lastUsedAt?: number; // Timestamp
  role?: string;
  department?: string;
}

interface LogEntry {
  id: string;
  timestamp: string;
  tag: string;
  message: string;
  data: any;
  latency: string;
  agentId?: string; // Track which agent produced the log
}

// --- Mock Data ---

const AGENTS: Agent[] = [
  // Level 1
  { id: 'A01', name: 'Executive Orchestrator', humanName: 'Steve Jobs', level: 1, status: 'active', role: 'Root Brand Coordinator', isExecuting: true, lastUsedAt: Date.now() },
  
  // Level 2
  { id: 'A02', name: 'Brand & Strategy Supervisor', humanName: 'Phil Knight', level: 2, status: 'active', role: 'SequentialAgent', lastUsedAt: Date.now() - 1000 * 60 * 5 },
  { id: 'A03', name: 'Creative Production Supervisor', humanName: 'Walt Disney', level: 2, status: 'active', role: 'ParallelAgent', lastUsedAt: Date.now() - 1000 * 60 * 15 },
  { id: 'A04', name: 'Marketing & Growth Supervisor', humanName: 'David Ogilvy', level: 2, status: 'active', role: 'LoopAgent', lastUsedAt: Date.now() - 1000 * 60 * 45 },
  { id: 'A05', name: 'Supply Chain & Finance Supervisor', humanName: 'Tim Cook', level: 2, status: 'active', role: 'ParallelAgent', lastUsedAt: Date.now() - 1000 * 60 * 70 },
  { id: 'A06', name: 'Customer Experience Supervisor', humanName: 'Tony Hsieh', level: 2, status: 'active', role: 'SequentialAgent', lastUsedAt: Date.now() - 1000 * 60 * 120 },
  { id: 'A07', name: 'Software Engineering Supervisor', humanName: 'Mark Zuckerberg', level: 2, status: 'active', role: 'ParallelAgent', lastUsedAt: Date.now() - 1000 * 60 * 10 },

  // Level 3 & 4 - Dept A
  { id: 'A08', name: 'Market Researcher', humanName: 'Ray Dalio', level: 3, status: 'active', department: 'Brand Identity & Strategy', role: 'Market Researcher', lastUsedAt: Date.now() - 1000 * 60 * 5 },
  { id: 'A09', name: 'Brand Inception', humanName: 'Estée Lauder', level: 3, status: 'active', department: 'Brand Identity & Strategy', role: 'Brand Inception', lastUsedAt: Date.now() - 1000 * 60 * 15 },
  { id: 'A10', name: 'Product Formulator', humanName: 'George Washington Carver', level: 3, status: 'active', department: 'Brand Identity & Strategy', role: 'Product Formulator', lastUsedAt: Date.now() - 1000 * 60 * 45 },
  { id: 'A11', name: 'Compliance & Legal', humanName: 'Ruth Bader Ginsburg', level: 3, status: 'active', department: 'Brand Identity & Strategy', role: 'Compliance & Legal', lastUsedAt: Date.now() - 1000 * 60 * 70 },

  // Dept B
  { id: 'A12', name: 'Creative Director', humanName: 'Karl Lagerfeld', level: 3, status: 'active', department: 'Creative & Visual Production', role: 'Creative Director', lastUsedAt: Date.now() - 1000 * 60 * 5 },
  { id: 'A13', name: 'Storefront Designer', humanName: 'Jony Ive', level: 3, status: 'active', department: 'Creative & Visual Production', role: 'Storefront Designer', lastUsedAt: Date.now() - 1000 * 60 * 15 },
  { id: 'A14', name: 'Lifestyle Imagery', humanName: 'Annie Leibovitz', level: 3, status: 'active', department: 'Creative & Visual Production', role: 'Lifestyle Imagery', lastUsedAt: Date.now() - 1000 * 60 * 45 },
  { id: 'A15', name: 'Product Recontextualization', humanName: 'Andy Warhol', level: 3, status: 'active', department: 'Creative & Visual Production', role: 'Product Recontextualization', lastUsedAt: Date.now() - 1000 * 60 * 70 },
  { id: 'A16', name: 'Video Production', humanName: 'Steven Spielberg', level: 3, status: 'active', department: 'Creative & Visual Production', role: 'Video Production', lastUsedAt: Date.now() - 1000 * 60 * 5 },
  { id: 'A17', name: 'Cinematic Editor', humanName: 'Thelma Schoonmaker', level: 3, status: 'active', department: 'Creative & Visual Production', role: 'Cinematic Editor', lastUsedAt: Date.now() - 1000 * 60 * 15 },
  { id: 'A18', name: 'Native Audio', humanName: 'Hans Zimmer', level: 3, status: 'active', department: 'Creative & Visual Production', role: 'Native Audio', lastUsedAt: Date.now() - 1000 * 60 * 45 },
  { id: 'A19', name: 'Content Critic', humanName: 'Anna Wintour', level: 3, status: 'active', department: 'Creative & Visual Production', role: 'Content Critic', lastUsedAt: Date.now() - 1000 * 60 * 70 },

  // Dept C
  { id: 'A20', name: 'Marketing Strategist', humanName: 'Edward Bernays', level: 3, status: 'active', department: 'Marketing & Advertising', role: 'Marketing Strategist', lastUsedAt: Date.now() - 1000 * 60 * 5 },
  { id: 'A21', name: 'Copywriter', humanName: 'Leo Burnett', level: 3, status: 'awaiting', department: 'Marketing & Advertising', role: 'Copywriter', isExecuting: true, lastUsedAt: Date.now() },
  { id: 'A22', name: 'Social Media Content', humanName: 'Jimmy Donaldson', level: 3, status: 'active', department: 'Marketing & Advertising', role: 'Social Media Content', lastUsedAt: Date.now() - 1000 * 60 * 45 },
  { id: 'A23', name: 'Ads Optimization', humanName: 'Jim Simons', level: 3, status: 'active', department: 'Marketing & Advertising', role: 'Ads Optimization', lastUsedAt: Date.now() - 1000 * 60 * 70 },
  { id: 'A24', name: 'Demand Gen', humanName: 'P.T. Barnum', level: 3, status: 'active', department: 'Marketing & Advertising', role: 'Demand Gen', lastUsedAt: Date.now() - 1000 * 60 * 5 },
  { id: 'A25', name: 'Dynamic Search Ads', humanName: 'Larry Page', level: 3, status: 'active', department: 'Marketing & Advertising', role: 'Dynamic Search Ads', lastUsedAt: Date.now() - 1000 * 60 * 15 },
  { id: 'A26', name: 'Feed Management', humanName: 'Sam Walton', level: 3, status: 'active', department: 'Marketing & Advertising', role: 'Feed Management', lastUsedAt: Date.now() - 1000 * 60 * 45 },
  { id: 'A27', name: 'Campaign Operations', humanName: 'Sheryl Sandberg', level: 3, status: 'active', department: 'Marketing & Advertising', role: 'Campaign Operations', lastUsedAt: Date.now() - 1000 * 60 * 70 },

  // Dept D
  { id: 'A28', name: 'Inventory & Stock Manager', humanName: 'Henry Ford', level: 3, status: 'active', department: 'Supply Chain, Finance & Operations', role: 'Inventory Manager', lastUsedAt: Date.now() - 1000 * 60 * 5 },
  { id: 'A29', name: 'Supplier Discovery', humanName: 'Marco Polo', level: 3, status: 'active', department: 'Supply Chain, Finance & Operations', role: 'Supplier Discovery', lastUsedAt: Date.now() - 1000 * 60 * 15 },
  { id: 'A30', name: 'Purchasing', humanName: 'Warren Buffett', level: 3, status: 'active', department: 'Supply Chain, Finance & Operations', role: 'Purchasing', lastUsedAt: Date.now() - 1000 * 60 * 45 },
  { id: 'A31', name: 'Financial Controller', humanName: 'John D. Rockefeller', level: 3, status: 'active', department: 'Supply Chain, Finance & Operations', role: 'Financial Controller', lastUsedAt: Date.now() - 1000 * 60 * 70 },
  { id: 'A32', name: 'Pricing', humanName: 'Michael Bloomberg', level: 3, status: 'active', department: 'Supply Chain, Finance & Operations', role: 'Pricing', lastUsedAt: Date.now() - 1000 * 60 * 5 },
  { id: 'A33', name: 'Logistics & Shipping', humanName: 'Fred Smith', level: 3, status: 'active', department: 'Supply Chain, Finance & Operations', role: 'Logistics & Shipping', lastUsedAt: Date.now() - 1000 * 60 * 15 },

  // Dept E
  { id: 'A34', name: 'Support Coordinator', humanName: 'Dolly Parton', level: 3, status: 'active', department: 'Customer Support & UI Generation', role: 'Support Coordinator', lastUsedAt: Date.now() - 1000 * 60 * 45 },
  { id: 'A35', name: 'Intake & Sentiment', humanName: 'Maya Angelou', level: 3, status: 'active', department: 'Customer Support & UI Generation', role: 'Intake & Sentiment', lastUsedAt: Date.now() - 1000 * 60 * 70 },
  { id: 'A36', name: 'Resolution (RAG)', humanName: 'Marie Curie', level: 3, status: 'active', department: 'Customer Support & UI Generation', role: 'Resolution (RAG)', lastUsedAt: Date.now() - 1000 * 60 * 5 },
  { id: 'A37', name: 'Escalation', humanName: 'Oprah Winfrey', level: 3, status: 'active', department: 'Customer Support & UI Generation', role: 'Escalation', lastUsedAt: Date.now() - 1000 * 60 * 15 },
  { id: 'A38', name: 'Interactive UI (A2UI)', humanName: 'Reed Hastings', level: 3, status: 'active', department: 'Customer Support & UI Generation', role: 'Interactive UI', lastUsedAt: Date.now() - 1000 * 60 * 45 },

  // Dept F
  { id: 'A39', name: 'Antigravity Lead', humanName: 'Grace Hopper', level: 3, status: 'active', department: 'Engineering, Software & QA', role: 'Antigravity Lead', lastUsedAt: Date.now() - 1000 * 60 * 70 },
  { id: 'A40', name: 'Frontend Builder', humanName: 'Brendan Eich', level: 3, status: 'active', department: 'Engineering, Software & QA', role: 'Frontend Builder', lastUsedAt: Date.now() - 1000 * 60 * 5 },
  { id: 'A41', name: 'Backend Integration', humanName: 'Vint Cerf', level: 3, status: 'active', department: 'Engineering, Software & QA', role: 'Backend Integration', lastUsedAt: Date.now() - 1000 * 60 * 15 },
  { id: 'A42', name: 'Nerd QA', humanName: 'Margaret Hamilton', level: 3, status: 'active', department: 'Engineering, Software & QA', role: 'Nerd QA', lastUsedAt: Date.now() - 1000 * 60 * 45 },
  { id: 'A43', name: 'Stax Evaluator', humanName: 'Gordon Ramsay', level: 3, status: 'active', department: 'Engineering, Software & QA', role: 'Stax Evaluator', lastUsedAt: Date.now() - 1000 * 60 * 70 },
  { id: 'A44', name: 'Telemetry & Trace', humanName: 'Katherine Johnson', level: 3, status: 'active', department: 'Engineering, Software & QA', role: 'Telemetry & Trace', isExecuting: true, lastUsedAt: Date.now() },
];

const INITIAL_LOGS: LogEntry[] = [
  { id: '1', timestamp: '15:21:00', tag: 'A01_ROOT', message: 'System Initialization Complete', data: { status: 'ready', kernel: 'v4.2.0' }, latency: '12ms', agentId: 'A01' },
  { id: '2', timestamp: '15:21:05', tag: 'A44_TELEMETRY', message: 'Payload Authorized', data: { auth_token: '0x7f...3a', scope: 'global' }, latency: '42ms', agentId: 'A44' },
  { id: '3', timestamp: '15:21:12', tag: 'A21_SUBMISSION', message: 'Draft Ad Copy Pending Review', data: { campaign: 'Luxury Pulse', version: '2.1' }, latency: '28ms', agentId: 'A21' },
];

// --- Components ---

const StatusDot = ({ agent, logs, isSystemHalted }: { agent: Agent, logs: LogEntry[], isSystemHalted?: boolean }) => {
  const isExecuting = agent.isExecuting;
  
  // Check if agent is in the last 10 sequences (logs)
  const last10AgentIds = logs.slice(-10).map(l => l.agentId);
  const isInLast10 = last10AgentIds.includes(agent.id);
  
  // Check if used in the last hour
  const oneHourAgo = Date.now() - (1000 * 60 * 60);
  const isRecent = agent.lastUsedAt && agent.lastUsedAt > oneHourAgo;

  let colorClass = 'bg-slate-400'; // Default Grey
  let shadowClass = '';

  if (isSystemHalted) {
    colorClass = 'bg-rose-500';
    shadowClass = 'shadow-[0_0_8px_rgba(244,63,94,0.6)]';
  } else if (isExecuting) {
    colorClass = 'bg-emerald-500';
    shadowClass = 'shadow-[0_0_8px_rgba(16,185,129,0.6)]';
  } else if (isInLast10 || isRecent) {
    colorClass = 'bg-amber-500';
    shadowClass = 'shadow-[0_0_8px_rgba(245,158,11,0.6)]';
  }

  return <div className={`w-2 h-2 rounded-full ${colorClass} ${shadowClass} transition-all duration-500`} />;
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'command' | 'operations' | 'mesh' | 'governance' | 'directory' | 'intelligence'>('command');
  const [commandSubTab, setCommandSubTab] = useState<'overview' | 'workbench'>('overview');
  const [operationsSubTab, setOperationsSubTab] = useState<'analytics' | 'performance' | 'economy'>('analytics');
  const [intelligenceSubTab, setIntelligenceSubTab] = useState<'prompts' | 'knowledge'>('prompts');
  const [overviewWidgets, setOverviewWidgets] = useState<(string | null)[]>(['economy', 'governance', 'mesh', 'top_agents', null, 'root_directive']);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSystemHalted, setIsSystemHalted] = useState(true);
  const [isRestarting, setIsRestarting] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [directive, setDirective] = useState('');
  const [draftText, setDraftText] = useState(
    "Experience the pinnacle of autonomous corporate management. Our Life Tap Labs Master Terminal offers unparalleled control over your 44-agent economy. Precision meets luxury in every interaction."
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  const agents = useMemo(() => AGENTS, []);

  useEffect(() => {
    console.log('Applying theme. isDarkMode:', isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // --- Background Activity Simulation ---
  useEffect(() => {
    const actions = [
      "received 'specific' doc", 
      "sent doc to supervisor", 
      "image generated", 
      "passing proposal", 
      "setting design instructions",
      "analyzing market trends",
      "optimizing ad spend",
      "validating supply chain",
      "resolving customer query",
      "deploying code patch"
    ];

    const interval = setInterval(() => {
      if (isSystemHalted) return;
      
      const randomAgent = AGENTS[Math.floor(Math.random() * AGENTS.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString([], { hour12: false }),
        tag: `${randomAgent.id}_ACTION`,
        message: randomAction,
        data: { 
          status: 'success', 
          agent: randomAgent.name,
          department: randomAgent.department || 'Executive'
        },
        latency: `${Math.floor(Math.random() * 100)}ms`,
        agentId: randomAgent.id
      };

      setLogs(prev => [...prev.slice(-49), newLog]); // Keep last 50 logs
    }, 8000); // Reduced frequency from 4s to 8s

    return () => clearInterval(interval);
  }, [isSystemHalted]);

  const handleViewAgent = (id: string) => {
    setSelectedAgentId(id);
    setActiveTab('directory');
  };

  const toggleTheme = () => {
    console.log('Toggling theme. Current:', isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  const handleDeploy = () => {
    if (!directive.trim()) return;
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour12: false }),
      tag: 'HUMAN_DIRECTIVE',
      message: 'New Root Directive Deployed',
      data: { directive },
      latency: '4ms',
      agentId: 'A01' // Human directives are routed through Root
    };
    setLogs(prev => [...prev, newLog]);
    setDirective('');
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#FCFCFC] dark:bg-[#0A0A0A] text-slate-900 dark:text-slate-100 transition-colors duration-500">
      
      {/* Global Halt Overlay - Removed at user request */}
      
      {/* Restarting Flash Overlay */}
      <AnimatePresence>
        {isRestarting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, times: [0, 0.2, 1] }}
            className="fixed inset-0 z-[70] bg-emerald-400/20 pointer-events-none backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Top Header Bar */}
      <header className="h-20 flex-shrink-0 flex items-center justify-between px-8 border-b border-slate-200/50 dark:border-white/5 bg-white/50 dark:bg-transparent backdrop-blur-md z-30">
        <div className="flex items-center gap-6 flex-1 max-w-2xl">
          <div className="flex-1">
            <h2 className="text-sm font-bold tracking-tight uppercase opacity-40 tracking-[0.2em]">Life Tap Labs</h2>
          </div>
          
          <div className="flex items-center bg-slate-100 dark:bg-white/5 p-1 rounded-2xl border border-slate-200 dark:border-white/10 ml-4">
            <button 
              onClick={() => setActiveTab('command')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'command' ? 'bg-white dark:bg-white/10 shadow-sm text-blue-600 dark:text-blue-400' : 'opacity-40 hover:opacity-100'}`}
            >
              <Terminal size={14} />
              Command
            </button>
            <button 
              onClick={() => setActiveTab('operations')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'operations' ? 'bg-white dark:bg-white/10 shadow-sm text-blue-600 dark:text-blue-400' : 'opacity-40 hover:opacity-100'}`}
            >
              <Activity size={14} />
              Operations
            </button>
            <button 
              onClick={() => setActiveTab('mesh')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'mesh' ? 'bg-white dark:bg-white/10 shadow-sm text-blue-600 dark:text-blue-400' : 'opacity-40 hover:opacity-100'}`}
            >
              <Share2 size={14} />
              Mesh
            </button>
            <button 
              onClick={() => setActiveTab('governance')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'governance' ? 'bg-white dark:bg-white/10 shadow-sm text-blue-600 dark:text-blue-400' : 'opacity-40 hover:opacity-100'}`}
            >
              <ShieldCheck size={14} />
              Governance
            </button>
            <button 
              onClick={() => setActiveTab('directory')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'directory' ? 'bg-white dark:bg-white/10 shadow-sm text-blue-600 dark:text-blue-400' : 'opacity-40 hover:opacity-100'}`}
            >
              <Users size={14} />
              Directory
            </button>
            <button 
              onClick={() => setActiveTab('intelligence')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'intelligence' ? 'bg-white dark:bg-white/10 shadow-sm text-blue-600 dark:text-blue-400' : 'opacity-40 hover:opacity-100'}`}
            >
              <Brain size={14} />
              Intelligence
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 ml-8">
          <motion.button 
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (isSystemHalted) {
                setIsRestarting(true);
                setTimeout(() => {
                  setIsSystemHalted(false);
                  setIsRestarting(false);
                }, 1500);
              } else {
                setIsSystemHalted(true);
              }
            }}
            className={`h-10 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center shadow-lg transition-all group relative overflow-hidden ${
              isSystemHalted 
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/40 ring-2 ring-blue-500/50 ring-offset-2 dark:ring-offset-[#0A0A0A]' 
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-500/20'
            }`}
          >
            <div className={`absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="flex items-center justify-center w-10 h-10 shrink-0">
              <Power size={14} className={`relative z-10 ${isSystemHalted ? '' : 'animate-spin-slow'}`} />
            </div>
            <motion.span 
              variants={{
                initial: { width: 0, opacity: 0, marginLeft: 0 },
                hover: { width: 'auto', opacity: 1, marginLeft: 0, marginRight: 16 }
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10 whitespace-nowrap overflow-hidden"
            >
              {isSystemHalted ? 'Initiate Life Sequence' : 'Emergency Halt'}
            </motion.span>
            {isSystemHalted && (
              <motion.div 
                layoutId="glow"
                className="absolute inset-0 bg-emerald-400/20 blur-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
          </motion.button>

          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center relative">
            <Bell size={18} />
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0A0A0A]" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* 1. Left Sidebar (Agent Registry Tree) */}
        {activeTab === 'command' && commandSubTab === 'workbench' && isSidebarOpen && (
          <aside className="w-[20%] h-full glass flex flex-col border-r border-slate-200/50 dark:border-white/5 z-20">
          <div className="p-6 border-bottom border-slate-200/50 dark:border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Shield size={20} />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight uppercase tracking-widest">Life Tap Labs</h1>
                <p className="text-[10px] uppercase tracking-widest opacity-50 font-medium">Workbench v4.2</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10 dark:bg-blue-500/5 border border-blue-500/20 group cursor-pointer">
                <div className="flex items-center gap-3">
                  <StatusDot agent={AGENTS[0]} logs={logs} isSystemHalted={isSystemHalted} />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent group-hover:hidden">
                      {AGENTS[0].id}: {AGENTS[0].name}
                    </span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 hidden group-hover:block animate-in fade-in slide-in-from-left-1">
                      {AGENTS[0].humanName}
                    </span>
                  </div>
                </div>
                <ChevronDown size={14} className="opacity-50" />
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            <div>
              <h2 className="px-3 text-[10px] font-bold uppercase tracking-widest opacity-40 mb-3">Level 2: Supervisors</h2>
              <div className="space-y-1">
                {AGENTS.filter(a => a.level === 2).map(agent => (
                  <motion.div 
                    whileHover={{ x: 4 }}
                    key={agent.id} 
                    className="flex items-center justify-between p-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <StatusDot agent={agent} logs={logs} />
                      <div className="flex flex-col">
                        <span className="text-xs font-medium opacity-80 group-hover:hidden">{agent.id}: {agent.name}</span>
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 hidden group-hover:block animate-in fade-in slide-in-from-left-1">{agent.humanName}</span>
                      </div>
                    </div>
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-30 transition-opacity" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="px-3 text-[10px] font-bold uppercase tracking-widest opacity-40 mb-3">Level 3: Specialists</h2>
              <div className="space-y-6">
                {Array.from(new Set(AGENTS.filter(a => a.level === 3).map(a => a.department))).map(dept => (
                  <div key={dept}>
                    <h3 className="px-3 text-[9px] font-semibold opacity-30 mb-2 border-l border-slate-200 dark:border-white/10 ml-1">{dept}</h3>
                    <div className="space-y-1">
                      {AGENTS.filter(a => a.level === 3 && a.department === dept).map(agent => (
                        <motion.div 
                          whileHover={{ x: 4 }}
                          key={agent.id} 
                          className="flex items-center justify-between p-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer transition-all duration-300 group"
                        >
                          <div className="flex items-center gap-3">
                            <StatusDot agent={agent} logs={logs} />
                            <div className="flex flex-col">
                              <span className="text-xs font-medium opacity-80 group-hover:hidden">{agent.id}: {agent.name}</span>
                              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 hidden group-hover:block animate-in fade-in slide-in-from-left-1">{agent.humanName}</span>
                            </div>
                          </div>
                          <ChevronRight size={12} className="opacity-0 group-hover:opacity-30 transition-opacity" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </nav>

          <div className="p-6 border-t border-slate-200/50 dark:border-white/5">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 dark:bg-white/5">
              <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden">
                <img src="https://picsum.photos/seed/ceo/100/100" alt="CEO" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">Caleb Cooper</p>
                <p className="text-[10px] opacity-50 uppercase tracking-tighter">Human CEO</p>
              </div>
              <Settings size={14} className="opacity-30 hover:opacity-100 cursor-pointer transition-opacity" />
            </div>
          </div>
        </aside>
      )}

        {/* 2. Center Canvas (Human-in-the-Loop Workbench) */}
        <main className="flex-1 h-full flex flex-col relative z-10 overflow-hidden">
          {/* Sub-navigation */}
          <AnimatePresence mode="wait">
            {activeTab === 'command' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-12 border-b border-slate-200/50 dark:border-white/5 bg-white/30 dark:bg-black/20 backdrop-blur-sm flex items-center px-8 gap-8 z-20"
              >
                <button 
                  onClick={() => setCommandSubTab('overview')} 
                  className={`text-[10px] font-bold uppercase tracking-widest transition-all ${commandSubTab === 'overview' ? 'text-blue-500' : 'opacity-40 hover:opacity-100'}`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setCommandSubTab('workbench')} 
                  className={`text-[10px] font-bold uppercase tracking-widest transition-all ${commandSubTab === 'workbench' ? 'text-blue-500' : 'opacity-40 hover:opacity-100'}`}
                >
                  Workbench
                </button>
              </motion.div>
            )}
            {activeTab === 'operations' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-12 border-b border-slate-200/50 dark:border-white/5 bg-white/30 dark:bg-black/20 backdrop-blur-sm flex items-center px-8 gap-8 z-20"
              >
                <button 
                  onClick={() => setOperationsSubTab('analytics')} 
                  className={`text-[10px] font-bold uppercase tracking-widest transition-all ${operationsSubTab === 'analytics' ? 'text-blue-500' : 'opacity-40 hover:opacity-100'}`}
                >
                  Analytics
                </button>
                <button 
                  onClick={() => setOperationsSubTab('performance')} 
                  className={`text-[10px] font-bold uppercase tracking-widest transition-all ${operationsSubTab === 'performance' ? 'text-blue-500' : 'opacity-40 hover:opacity-100'}`}
                >
                  Performance
                </button>
                <button 
                  onClick={() => setOperationsSubTab('economy')} 
                  className={`text-[10px] font-bold uppercase tracking-widest transition-all ${operationsSubTab === 'economy' ? 'text-blue-500' : 'opacity-40 hover:opacity-100'}`}
                >
                  Economy
                </button>
              </motion.div>
            )}
            {activeTab === 'intelligence' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-12 border-b border-slate-200/50 dark:border-white/5 bg-white/30 dark:bg-black/20 backdrop-blur-sm flex items-center px-8 gap-8 z-20"
              >
                <button 
                  onClick={() => setIntelligenceSubTab('prompts')} 
                  className={`text-[10px] font-bold uppercase tracking-widest transition-all ${intelligenceSubTab === 'prompts' ? 'text-blue-500' : 'opacity-40 hover:opacity-100'}`}
                >
                  Prompts
                </button>
                <button 
                  onClick={() => setIntelligenceSubTab('knowledge')} 
                  className={`text-[10px] font-bold uppercase tracking-widest transition-all ${intelligenceSubTab === 'knowledge' ? 'text-blue-500' : 'opacity-40 hover:opacity-100'}`}
                >
                  Knowledge
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              {activeTab === 'command' ? (
                <motion.div 
                  key={commandSubTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="h-full overflow-y-auto custom-scrollbar"
                >
                  {commandSubTab === 'overview' ? (
                    <GlobalCommand 
                      agents={agents} 
                      isDarkMode={isDarkMode} 
                      setActiveTab={(tab: any) => {
                        if (tab === 'workbench') setCommandSubTab('workbench');
                        else setActiveTab(tab);
                      }} 
                      isSystemHalted={isSystemHalted} 
                      onViewAgent={handleViewAgent}
                      widgets={overviewWidgets}
                      setWidgets={setOverviewWidgets}
                    />
                  ) : (
                    <div className="p-8">
                      <div className="max-w-5xl mx-auto space-y-8">
                        {/* Workbench Control Bar */}
                        <div className="flex items-center gap-4 p-4 bg-white dark:bg-[#121212] rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
                          <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/10 transition-all shrink-0"
                          >
                            {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
                          </button>
                          
                          <div className="relative flex-1 group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none opacity-30 group-focus-within:opacity-100 transition-opacity">
                              <Terminal size={18} />
                            </div>
                            <input 
                              type="text" 
                              value={directive}
                              onChange={(e) => setDirective(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleDeploy()}
                              placeholder="Enter Root Directive..."
                              className="w-full h-12 pl-12 pr-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                            />
                          </div>

                          <motion.button 
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleDeploy}
                            className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 shrink-0"
                          >
                            <Send size={16} />
                            Deploy
                          </motion.button>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-2xl font-bold tracking-tight">Active Workbench</h2>
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest border border-amber-500/20">
                            <AlertCircle size={12} />
                            Human-in-the-Loop Required
                          </div>
                        </div>

                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white dark:bg-[#121212] rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden"
                        >
                          <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.01]">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <Zap size={28} />
                              </div>
                              <div>
                                <h3 className="font-bold text-xl tracking-tight">A21: Leo Burnett</h3>
                                <p className="text-xs opacity-50 font-medium">Creative Specialist • Submission #842</p>
                              </div>
                            </div>
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                              <MoreVertical size={20} className="opacity-30" />
                            </button>
                          </div>

                          <div className="p-8 space-y-8">
                            <div className="space-y-3">
                              <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Ad Copy Draft (v2.1)</label>
                              <textarea 
                                value={draftText}
                                onChange={(e) => setDraftText(e.target.value)}
                                className="w-full h-64 p-6 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[1.5rem] text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all resize-none font-medium"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                              <div className="p-6 rounded-[1.5rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">Sentiment Score</p>
                                <p className="text-3xl font-bold text-emerald-500">98.4%</p>
                              </div>
                              <div className="p-6 rounded-[1.5rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">Target Audience</p>
                                <p className="text-3xl font-bold">Ultra-HNW</p>
                              </div>
                            </div>

                            <motion.button 
                              whileHover={{ scale: 1.01, y: -2 }}
                              whileTap={{ scale: 0.99 }}
                              className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-[1.5rem] text-lg font-bold shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-3"
                            >
                              <CheckCircle2 size={24} />
                              Override & Approve
                            </motion.button>
                          </div>
                        </motion.div>

                        <div className="grid grid-cols-3 gap-6">
                          {[
                            { label: 'Network Load', value: '24%', icon: Activity, color: 'text-blue-500' },
                            { label: 'Active Agents', value: `${AGENTS.filter(a => a.status === 'active').length}/${AGENTS.length}`, icon: Users, color: 'text-purple-500' },
                            { label: 'Compute Power', value: '1.2 PFlops', icon: Cpu, color: 'text-amber-500' },
                          ].map((stat, i) => (
                            <div key={i} className="p-6 bg-white dark:bg-[#121212] rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
                              <stat.icon size={20} className={`${stat.color} opacity-50 mb-4`} />
                              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">{stat.label}</p>
                              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : activeTab === 'operations' ? (
                <motion.div 
                  key={operationsSubTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="h-full overflow-y-auto custom-scrollbar"
                >
                  {operationsSubTab === 'analytics' ? (
                    <AnalyticsDashboard agents={agents} isDarkMode={isDarkMode} logs={logs} isSystemHalted={isSystemHalted} />
                  ) : operationsSubTab === 'performance' ? (
                    <PerformanceDashboard agents={agents} isDarkMode={isDarkMode} isSystemHalted={isSystemHalted} onViewAgent={handleViewAgent} />
                  ) : (
                    <EconomyDashboard agents={agents} isDarkMode={isDarkMode} isSystemHalted={isSystemHalted} />
                  )}
                </motion.div>
              ) : activeTab === 'mesh' ? (
          <NetworkMesh agents={agents} isDarkMode={isDarkMode} isSystemHalted={isSystemHalted} />
        ) : activeTab === 'governance' ? (
          <GovernanceDashboard agents={agents} isDarkMode={isDarkMode} isSystemHalted={isSystemHalted} />
        ) : activeTab === 'intelligence' ? (
          <motion.div 
            key={intelligenceSubTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="h-full overflow-y-auto custom-scrollbar"
          >
            {intelligenceSubTab === 'prompts' ? (
              <PromptRegistry />
            ) : (
              <KnowledgeBase isDarkMode={isDarkMode} isSystemHalted={isSystemHalted} />
            )}
          </motion.div>
        ) : (
          <AgentDirectory agents={agents} isDarkMode={isDarkMode} selectedAgentId={selectedAgentId} onAgentSelect={setSelectedAgentId} isSystemHalted={isSystemHalted} />
        )}
            </AnimatePresence>
          </div>
        </main>

        {/* 3. Right Sidebar (Telemetry & Handshakes) */}
        {activeTab === 'command' && commandSubTab === 'workbench' && (
          <aside className="w-[25%] h-full glass border-l border-slate-200/50 dark:border-white/5 flex flex-col z-20">
          <div className="p-8 border-b border-slate-200/50 dark:border-white/5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold tracking-tight">Live A2A Trace Log</h2>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Live</span>
              </div>
            </div>
            <p className="text-[10px] opacity-40 font-medium">Monitoring autonomous agent handshakes in real-time.</p>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar font-mono text-[11px]">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={log.id} 
                  className="p-4 rounded-xl bg-slate-100/50 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/5 space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                      log.tag === 'HUMAN_DIRECTIVE' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'bg-slate-500/10 text-slate-500'
                    }`}>
                      [{log.tag}]
                    </span>
                    <span className="opacity-30 group-hover:opacity-60 transition-opacity">{log.timestamp}</span>
                  </div>
                  <p className="font-medium opacity-80">{log.message}</p>
                  <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20 border border-slate-200/50 dark:border-white/5 overflow-hidden">
                    <pre className="text-slate-500 dark:text-slate-400 whitespace-pre-wrap break-all">
                      {JSON.stringify(log.data, null, 2)}
                    </pre>
                  </div>
                  <div className="flex items-center justify-end gap-2 opacity-30 text-[9px]">
                    <Activity size={10} />
                    <span>Latency: {log.latency}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="p-8 border-t border-slate-200/50 dark:border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">System Integrity</span>
              <span className="text-[10px] font-bold text-emerald-500">99.99%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '99.99%' }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-full bg-emerald-500" 
              />
            </div>
          </div>
        </aside>
      )}
    </div>

    <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.4);
        }
      `}} />

      {/* Floating Global Dark Mode Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="fixed bottom-8 right-8 z-[100] w-14 h-14 rounded-2xl bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 shadow-2xl flex items-center justify-center text-slate-900 dark:text-white transition-all group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={24} className="text-amber-500" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={24} className="text-blue-600" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
