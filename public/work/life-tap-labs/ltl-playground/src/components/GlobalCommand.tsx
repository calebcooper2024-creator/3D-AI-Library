import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Activity, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Share2, 
  Cpu, 
  Users, 
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  Plus,
  X,
  BarChart3,
  Clock,
  Brain,
  Database,
  Gauge,
  PieChart,
  ShieldAlert,
  History,
  Target,
  TestTube,
  Scale,
  Eye,
  Users2,
  ClipboardList,
  Settings,
  RefreshCw,
  Globe,
  Link as LinkIcon,
  FileText,
  FileCode
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart as RePieChart,
  Pie
} from 'recharts';
import { LiveTokenUsageTrace } from './LiveTokenUsageTrace';

interface GlobalCommandProps {
  agents: any[];
  isDarkMode: boolean;
  setActiveTab: (tab: any) => void;
  isSystemHalted?: boolean;
  onViewAgent?: (id: string) => void;
  widgets: (string | null)[];
  setWidgets: React.Dispatch<React.SetStateAction<(string | null)[]>>;
}

const AVAILABLE_WIDGETS = [
  { id: 'economy', name: 'Economy Pulse', icon: DollarSign, color: 'text-emerald-500', size: 'large', description: 'Financial trends and ROI.' },
  { id: 'governance', name: 'Governance', icon: ShieldCheck, color: 'text-blue-500', size: 'small', description: 'Compliance and policy status.' },
  { id: 'mesh', name: 'Mesh Health', icon: Share2, color: 'text-indigo-500', size: 'small', description: 'Network connectivity status.' },
  { id: 'top_agents', name: 'Top Agents', icon: Zap, color: 'text-purple-500', size: 'large', description: 'Leaderboard of most efficient agents.' },
  { id: 'root_directive', name: 'Root Directive', icon: Lock, color: 'text-blue-400', size: 'full', description: 'Primary system constraints and goals.' },
  { id: 'system_stats', name: 'System Stats', icon: Cpu, color: 'text-amber-500', size: 'small', description: 'Core system health and uptime.' },
  { id: 'active_tasks', name: 'Active Tasks', icon: Activity, color: 'text-rose-500', size: 'small', description: 'Real-time task processing queue.' },
  { id: 'knowledge_base', name: 'Knowledge Base', icon: Database, color: 'text-indigo-400', size: 'small', description: 'Intelligence index and vectors.' },
  { id: 'token_usage', name: 'Token Usage', icon: Cpu, color: 'text-cyan-500', size: 'large', description: 'Live token consumption trace.' },
  { id: 'dept_roi', name: 'Dept ROI', icon: BarChart3, color: 'text-fuchsia-500', size: 'small', description: 'Return on investment by department.' },
  { id: 'automation_rate', name: 'Automation Rate', icon: Gauge, color: 'text-orange-500', size: 'small', description: 'Workflow automation efficiency.' },
  { id: 'system_latency', name: 'System Latency', icon: Clock, color: 'text-rose-500', size: 'small', description: 'Real-time processing delay.' },
  { id: 'budget_allocation', name: 'Budget Allocation', icon: PieChart, color: 'text-emerald-500', size: 'small', description: 'Financial distribution across depts.' },
  { id: 'compliance_readiness', name: 'Compliance Readiness', icon: ShieldAlert, color: 'text-emerald-500', size: 'small', description: 'Compliance score against Root Directive.' },
  { id: 'safety_protocols', name: 'Safety Protocols', icon: ShieldCheck, color: 'text-blue-500', size: 'small', description: 'Active safety protocols health.' },
  { id: 'ethical_heatmap', name: 'Ethical Heatmap', icon: Scale, color: 'text-amber-500', size: 'small', description: 'Ethical alignment across departments.' },
  { id: 'knowledge_metrics', name: 'Knowledge Metrics', icon: Brain, color: 'text-indigo-500', size: 'small', description: 'Chunks, Density, and Recall.' },
  { id: 'vector_db_health', name: 'Vector DB Health', icon: Database, color: 'text-purple-500', size: 'small', description: 'Consistency and Latency.' },
  { id: 'mesh_status', name: 'Mesh Status', icon: Share2, color: 'text-blue-500', size: 'small', description: 'Handshakes and Latency.' },
  { id: 'prompt_metrics', name: 'Prompt Metrics', icon: FileCode, color: 'text-amber-500', size: 'small', description: 'Success Rate and Cost.' },
];

export const GlobalCommand: React.FC<GlobalCommandProps> = ({ 
  agents, 
  isDarkMode, 
  setActiveTab, 
  isSystemHalted, 
  onViewAgent,
  widgets,
  setWidgets
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [addingToIndex, setAddingToIndex] = useState<number | null>(null);
  const [history, setHistory] = useState<(string | null)[][]>([]);

  const pushToHistory = useCallback(() => {
    setHistory(prev => [...prev, [...widgets]].slice(-20));
  }, [widgets]);

  const undo = useCallback(() => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setWidgets(last);
    setHistory(prev => prev.slice(0, -1));
  }, [history, setWidgets]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+Z or Cmd+Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        // Don't undo if user is typing in an input
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
          return;
        }
        e.preventDefault();
        undo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo]);

  const addWidget = (id: string) => {
    pushToHistory();
    if (addingToIndex !== null) {
      const newWidgets = [...widgets];
      newWidgets[addingToIndex] = id;
      setWidgets(newWidgets);
      setIsAdding(false);
      setAddingToIndex(null);
    } else if (!widgets.includes(id)) {
      setWidgets([...widgets, id]);
      setIsAdding(false);
    }
  };

  const removeWidget = (id: string) => {
    pushToHistory();
    const index = widgets.indexOf(id);
    if (index !== -1) {
      const newWidgets = [...widgets];
      newWidgets[index] = null;
      setWidgets(newWidgets);
    }
  };

  const openAddModal = (index: number) => {
    setAddingToIndex(index);
    setIsAdding(true);
  };

  const miniTrend = [
    { value: 40 }, { value: 45 }, { value: 42 }, { value: 50 }, { value: 48 }, { value: 55 }, { value: 60 }
  ];

  const topAgents = agents.slice(0, 3).map((a, i) => ({
    ...a,
    score: 98 - (i * 2),
    color: i === 0 ? '#3b82f6' : i === 1 ? '#6366f1' : '#8b5cf6'
  }));

  const resetWidgets = () => {
    pushToHistory();
    setWidgets(['economy', 'governance', 'mesh', 'top_agents', null, 'root_directive']);
    setIsAdding(false);
  };

  const renderPlaceholder = (index: number) => {
    // Determine span based on position for the default layout
    // Index 4 is the one next to Top Agents, which should be 2 cols
    const isLarge = index === 4;
    
    return (
      <motion.button
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => openAddModal(index)}
        className={`p-8 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center gap-4 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group min-h-[200px] ${isLarge ? 'lg:col-span-2' : ''}`}
      >
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:scale-110 transition-all">
          <Plus size={24} />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Add Module</p>
      </motion.button>
    );
  };

  const renderWidget = (id: string) => {
    const widget = AVAILABLE_WIDGETS.find(w => w.id === id);
    if (!widget) return null;

    const commonClasses = "p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between relative group overflow-hidden";
    const removeButton = (
      <button 
        onClick={() => removeWidget(id)}
        className="absolute top-4 right-4 p-2 rounded-xl bg-rose-500/10 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity z-20"
      >
        <X size={14} />
      </button>
    );

    switch (id) {
      case 'economy':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${commonClasses} lg:col-span-2`}
          >
            {removeButton}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <DollarSign size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base">Economy Pulse</h3>
                  <p className="text-[10px] opacity-50 uppercase tracking-widest">Net Profit (24h)</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold tracking-tight text-emerald-500">+$50,800</p>
                <p className="text-[10px] font-bold text-emerald-500/60">+12.4% vs prev</p>
              </div>
            </div>
            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={miniTrend}>
                  <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        );
      case 'governance':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={commonClasses}
          >
            {removeButton}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-base">Governance</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-50">Compliance</span>
                <span className="text-base font-bold">98.2%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[98.2%]" />
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest">
                <CheckCircle2 size={14} />
                Directive Aligned
              </div>
            </div>
          </motion.div>
        );
      case 'mesh':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={commonClasses}
          >
            {removeButton}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500">
                <Share2 size={20} />
              </div>
              <h3 className="font-bold text-base">Mesh Health</h3>
            </div>
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-[5px] border-indigo-500/20" />
                <div className={`absolute inset-0 rounded-full border-[5px] border-indigo-500 border-t-transparent ${isSystemHalted ? '' : 'animate-spin'}`} />
                <div className="absolute inset-0 flex items-center justify-center text-base font-bold">
                  99%
                </div>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mt-4">44/44 Nodes Active</p>
            </div>
          </motion.div>
        );
      case 'top_agents':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${commonClasses} lg:col-span-2`}
          >
            {removeButton}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
                  <Zap size={20} />
                </div>
                <h3 className="font-bold text-base">Top Agents</h3>
              </div>
              <button 
                onClick={() => setActiveTab('directory')}
                className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
              >
                Full Roster
              </button>
            </div>
            <div className="space-y-4">
              {topAgents.map((agent) => (
                <button 
                  key={agent.id} 
                  onClick={() => onViewAgent?.(agent.id)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 hover:border-blue-500/50 transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: agent.color }}>
                      {agent.id}
                    </div>
                    <div>
                      <p className="text-xs font-bold group-hover:text-blue-500 transition-colors">{agent.humanName}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-[9px] opacity-50 uppercase tracking-widest">{agent.department}</p>
                        {isSystemHalted && (
                          <span className="text-[7px] font-bold text-rose-500 uppercase tracking-widest px-1 py-0.5 rounded-md bg-rose-500/10">Inactive</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-base font-bold transition-colors duration-1000 ${isSystemHalted ? 'text-rose-500' : 'text-emerald-500'}`}>
                      {isSystemHalted ? '0' : agent.score}%
                    </p>
                    <p className="text-[9px] opacity-40 uppercase tracking-widest">Efficiency</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 'root_directive':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-4 p-8 rounded-[2rem] bg-slate-900 text-white border border-white/10 shadow-xl relative overflow-hidden group"
          >
            {removeButton}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Lock size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-blue-400" size={20} />
                <h3 className="text-sm font-bold uppercase tracking-widest">Root Directive</h3>
              </div>
              <p className="text-base italic opacity-80 leading-relaxed font-serif">
                "Prioritize sustainable growth, ethical transparency, and human-centric value. No agent shall execute a decision that compromises user privacy..."
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-[9px] font-bold uppercase tracking-widest border border-blue-500/20">
                  v4.0 Enforced
                </div>
                <div className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold uppercase tracking-widest border border-emerald-500/20">
                  Audited 2m ago
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'system_stats':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={commonClasses}
          >
            {removeButton}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                <Cpu size={20} />
              </div>
              <h3 className="font-bold text-base">System Stats</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-50">Compute Load</span>
                <span className="text-base font-bold">42%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[42%]" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-50">Memory Usage</span>
                <span className="text-base font-bold">6.4 GB</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[64%]" />
              </div>
            </div>
          </motion.div>
        );
      case 'active_tasks':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={commonClasses}
          >
            {removeButton}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500">
                <Activity size={20} />
              </div>
              <h3 className="font-bold text-base">Active Tasks</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Creative Gen', val: 12 },
                { label: 'Market Analysis', val: 8 },
                { label: 'Code Review', val: 4 },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-white/[0.02]">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">{task.label}</span>
                  <span className="text-xs font-bold">{task.val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'knowledge_base':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={commonClasses}
          >
            {removeButton}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500">
                <Database size={20} />
              </div>
              <h3 className="font-bold text-base">Knowledge</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-50">Vectors Indexed</span>
                <span className="text-base font-bold">1.2M</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-500/10 text-indigo-500 text-[10px] font-bold uppercase tracking-widest">
                <CheckCircle2 size={14} />
                Index Optimized
              </div>
            </div>
          </motion.div>
        );
      case 'token_usage':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${commonClasses} lg:col-span-2`}
          >
            {removeButton}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500">
                  <Cpu size={20} />
                </div>
                <h3 className="font-bold text-base">Token Usage</h3>
              </div>
            </div>
            <div className="h-40">
              <LiveTokenUsageTrace isDarkMode={isDarkMode} />
            </div>
          </motion.div>
        );
      case 'dept_roi':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={commonClasses}
          >
            {removeButton}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-fuchsia-500/10 text-fuchsia-500">
                <BarChart3 size={20} />
              </div>
              <h3 className="font-bold text-base">Dept ROI</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-50">
                <span>Strategy</span>
                <span>5.1x</span>
              </div>
              <div className="h-1 bg-fuchsia-500/20 rounded-full overflow-hidden">
                <div className="h-full bg-fuchsia-500" style={{ width: '84%' }} />
              </div>
            </div>
          </motion.div>
        );
      case 'automation_rate':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={commonClasses}
          >
            {removeButton}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500">
                <Gauge size={20} />
              </div>
              <h3 className="font-bold text-base">Automation</h3>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-3xl font-bold text-orange-500">87%</div>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-2">Rate</span>
            </div>
          </motion.div>
        );
      case 'system_latency':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={commonClasses}
          >
            {removeButton}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500">
                <Clock size={20} />
              </div>
              <h3 className="font-bold text-base">Latency</h3>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`h-4 w-1 rounded-full ${i > 8 ? 'bg-rose-500' : 'bg-rose-500/20'}`} />
              ))}
            </div>
          </motion.div>
        );
      case 'budget_allocation':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={commonClasses}
          >
            {removeButton}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                <PieChart size={20} />
              </div>
              <h3 className="font-bold text-base">Budget</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Marketing', value: 45, color: 'bg-blue-500' },
                { label: 'R&D', value: 30, color: 'bg-purple-500' },
                { label: 'Ops', value: 25, color: 'bg-emerald-500' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="opacity-50">{item.label}</span>
                    <span className="font-bold">{item.value}%</span>
                  </div>
                  <div className="h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'compliance_readiness':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={commonClasses}
          >
            {removeButton}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                <ShieldAlert size={20} />
              </div>
              <h3 className="font-bold text-base">Compliance</h3>
            </div>
            <div className="flex items-end justify-between mb-2">
              <span className="text-2xl font-bold tracking-tighter">98.2%</span>
              <span className="text-[10px] font-bold text-emerald-500 uppercase mb-1">Optimal</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[98.2%]" />
            </div>
          </motion.div>
        );
      case 'safety_protocols':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={commonClasses}
          >
            {removeButton}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-base">Safety</h3>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Root Alignment', health: 100 },
                { name: 'Bias Mitigation', health: 94 },
                { name: 'Data Privacy', health: 99 },
              ].map(p => (
                <div key={p.name} className="flex items-center gap-3">
                  <div className="flex-1 h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${p.health}%` }} />
                  </div>
                  <span className="text-[9px] font-bold opacity-50">{p.health}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'ethical_heatmap':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={commonClasses}
          >
            {removeButton}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                <Scale size={20} />
              </div>
              <h3 className="font-bold text-base">Ethical Heatmap</h3>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {Array.from({ length: 15 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`aspect-square rounded-md ${
                    i === 7 ? 'bg-amber-500/40' : 'bg-emerald-500/20'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        );
      case 'knowledge_metrics':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={commonClasses}
          >
            {removeButton}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500">
                <Brain size={20} />
              </div>
              <h3 className="font-bold text-base">Knowledge Metrics</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Chunks', value: '5.2k' },
                { label: 'Recall', value: '94%' },
                { label: 'Density', value: '197k' },
                { label: 'Storage', value: '1.2GB' },
              ].map(m => (
                <div key={m.label} className="p-2 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                  <p className="text-[8px] font-bold uppercase tracking-widest opacity-40">{m.label}</p>
                  <p className="text-xs font-bold">{m.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'vector_db_health':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={commonClasses}
          >
            {removeButton}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
                <Database size={20} />
              </div>
              <h3 className="font-bold text-base">Vector DB</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold">Consistency</span>
                  <span className="text-[10px] font-bold text-emerald-500">99.8%</span>
                </div>
                <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[99.8%]" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold">Latency</span>
                  <span className="text-[10px] font-bold">12ms</span>
                </div>
                <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[12%]" />
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'mesh_status':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={commonClasses}
          >
            {removeButton}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                <Share2 size={20} />
              </div>
              <h3 className="font-bold text-base">Mesh Status</h3>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Synchronized</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[8px] font-bold uppercase tracking-widest opacity-40">Nodes</p>
                <p className="text-sm font-bold">44 Active</p>
              </div>
              <div>
                <p className="text-[8px] font-bold uppercase tracking-widest opacity-40">Latency</p>
                <p className="text-sm font-bold">12ms</p>
              </div>
            </div>
          </motion.div>
        );
      case 'prompt_metrics':
        return (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={commonClasses}
          >
            {removeButton}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                <FileCode size={20} />
              </div>
              <h3 className="font-bold text-base">Prompt Metrics</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Success', value: 99.8, color: 'text-emerald-500' },
                { label: 'Latency', value: 12, unit: 'ms' },
                { label: 'Cost', value: 0.002, unit: '$' },
              ].map(m => (
                <div key={m.label} className="flex items-center justify-between">
                  <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">{m.label}</span>
                  <span className={`text-xs font-bold ${m.color || ''}`}>{m.unit === '$' ? `$${m.value}` : `${m.value}${m.unit || '%'}`}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-[#FCFCFC] dark:bg-[#0A0A0A]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {isSystemHalted ? 'System Lifecycle Suspended' : 'Global Command Center'}
          </h2>
          <p className="text-sm opacity-50 mt-1">
            {isSystemHalted ? 'All autonomous processes are currently in stasis.' : 'Unified heartbeat of the 44-agent autonomous economy.'}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {agents.slice(0, 5).map((a, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-[#0A0A0A] overflow-hidden bg-slate-200 dark:bg-white/10 transition-all duration-1000 ${isSystemHalted ? 'opacity-50' : ''}`}>
                  <img 
                    src={`https://picsum.photos/seed/${a.id}/50/50`} 
                    alt={a.humanName} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
              <div className={`w-8 h-8 rounded-full border-2 border-white dark:border-[#0A0A0A] flex items-center justify-center text-[10px] font-bold text-white transition-all duration-1000 ${isSystemHalted ? 'bg-emerald-600 border-emerald-500/20' : 'bg-blue-600'}`}>
                +39
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-white/10 mx-2" />
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">System Status</p>
              <p className={`text-xs font-bold flex items-center gap-1 justify-end transition-colors duration-1000 ${isSystemHalted ? 'text-rose-500' : 'text-emerald-500'}`}>
                <Activity size={12} className={isSystemHalted ? '' : 'animate-pulse'} />
                {isSystemHalted ? 'STASIS' : 'Optimal'}
              </p>
            </div>
          </div>

          <button 
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all"
          >
            <Plus size={14} />
            Add Widget
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {widgets.map((id, index) => (
            <React.Fragment key={id || `placeholder-${index}`}>
              {id ? renderWidget(id) : renderPlaceholder(index)}
            </React.Fragment>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Widget Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#121212] rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-white/[0.02]">
                <div>
                  <h3 className="text-xl font-bold tracking-tight">Add Command Module</h3>
                  <p className="text-xs opacity-50 mt-1">Select a widget to add to your command center.</p>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={resetWidgets}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all"
                  >
                    Reset to Default
                  </button>
                  <button 
                    onClick={() => setIsAdding(false)}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {AVAILABLE_WIDGETS.map(widget => {
                  const isAdded = widgets.includes(widget.id);
                  return (
                    <button
                      key={widget.id}
                      onClick={() => isAdded ? removeWidget(widget.id) : addWidget(widget.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group relative ${
                        isAdded 
                          ? 'bg-blue-500 border-blue-600 text-white shadow-lg shadow-blue-500/20' 
                          : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-blue-500 hover:shadow-lg'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isAdded ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-white/5 ' + widget.color}`}>
                        <widget.icon size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{widget.name}</p>
                        <p className={`text-[10px] uppercase tracking-widest ${isAdded ? 'text-white/60' : 'opacity-40'}`}>{widget.size} module</p>
                        <p className={`text-[9px] mt-1 line-clamp-1 ${isAdded ? 'text-white/40' : 'opacity-30'}`}>{widget.description}</p>
                      </div>
                      <div className="absolute top-4 right-4">
                        {isAdded ? (
                          <CheckCircle2 size={16} className="text-white" />
                        ) : (
                          <Plus size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
