import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Target, 
  Cpu, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  ArrowUpRight,
  Gauge
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

interface Agent {
  id: string;
  name: string;
  humanName: string;
  level: number;
  department?: string;
}

interface PerformanceDashboardProps {
  agents: Agent[];
  isDarkMode: boolean;
  isSystemHalted?: boolean;
  onViewAgent?: (id: string) => void;
}

export const PerformanceDashboard = React.memo(({ agents, isDarkMode, isSystemHalted, onViewAgent }: PerformanceDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  
  // Simulated performance data
  const [agentMetrics, setAgentMetrics] = useState<any[]>([]);

  useEffect(() => {
    if (isSystemHalted) return;
    
    // Generate mock performance data for each agent
    const metrics = agents.map(agent => ({
      ...agent,
      efficiency: Math.floor(Math.random() * 15) + 85, // 85-100%
      throughput: Math.floor(Math.random() * 500) + 1000, // 1000-1500 tokens/sec
      errorRate: (Math.random() * 2).toFixed(2), // 0-2%
      uptime: (99 + Math.random()).toFixed(2), // 99-100%
      costPerTask: (Math.random() * 0.05 + 0.01).toFixed(3), // $0.01-0.06
      tasksCompleted: Math.floor(Math.random() * 10000) + 5000,
    }));
    setAgentMetrics(metrics);
  }, [agents, isSystemHalted]);

  const departments = ['All', ...Array.from(new Set(agents.map(a => a.department).filter(Boolean)))];

  const filteredAgents = agentMetrics.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         agent.humanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || agent.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  // Top performers (by efficiency)
  const topPerformers = [...filteredAgents].sort((a, b) => b.efficiency - a.efficiency).slice(0, 4);

  // Efficiency Trend Data
  const trendData = [
    { time: '00:00', efficiency: 94, throughput: 1200 },
    { time: '04:00', efficiency: 96, throughput: 1150 },
    { time: '08:00', efficiency: 92, throughput: 1400 },
    { time: '12:00', efficiency: 95, throughput: 1350 },
    { time: '16:00', efficiency: 97, throughput: 1280 },
    { time: '20:00', efficiency: 93, throughput: 1320 },
    { time: '23:59', efficiency: 95, throughput: 1250 },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-[#FCFCFC] dark:bg-[#0A0A0A]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Agent Performance Engine</h2>
          <p className="text-sm opacity-50">Granular efficiency tracking and resource optimization.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
            <input 
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
            />
          </div>
          <select 
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg. Efficiency', value: '94.8%', icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-500/10', trend: '+1.2%' },
          { label: 'Total Throughput', value: '1.4M', sub: 'Tokens/min', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-500/10', trend: '+5.4%' },
          { label: 'Active Compute', value: '842', sub: 'Nodes', icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-500/10', trend: '-2.1%' },
          { label: 'Avg. Error Rate', value: '0.12%', icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-500/10', trend: '-0.05%' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
              {stat.sub && <span className="text-xs opacity-40">{stat.sub}</span>}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Efficiency Over Time */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold tracking-tight">System Efficiency Trend</h3>
              <p className="text-xs opacity-50">24-hour performance oscillation.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Efficiency</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Throughput</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorThr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#ffffff0a" : "#0000000a"} vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke={isDarkMode ? "#ffffff20" : "#00000040"} 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke={isDarkMode ? "#ffffff20" : "#00000040"} 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#0f172a' : '#ffffff', 
                    border: 'none', 
                    borderRadius: '16px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorEff)" 
                  strokeWidth={3}
                />
                <Area 
                  type="monotone" 
                  dataKey="throughput" 
                  stroke="#a855f7" 
                  fillOpacity={1} 
                  fill="url(#colorThr)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Performers List */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm"
        >
          <h3 className="text-lg font-bold tracking-tight mb-6">Top Performers</h3>
          <div className="space-y-6">
            {topPerformers.map((agent, i) => (
              <button 
                key={agent.id} 
                onClick={() => onViewAgent?.(agent.id)}
                className="w-full flex items-center gap-4 group text-left hover:bg-slate-50 dark:hover:bg-white/[0.02] p-2 -m-2 rounded-2xl transition-colors"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center overflow-hidden">
                    <img src={`https://picsum.photos/seed/${agent.id}/100/100`} alt={agent.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-[#121212] flex items-center justify-center transition-all duration-1000 ${
                    isSystemHalted ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}>
                    {isSystemHalted ? <AlertTriangle className="w-3 h-3 text-white" /> : <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold truncate group-hover:text-blue-500 transition-colors">{agent.humanName}</h4>
                  <p className="text-[10px] opacity-50 uppercase tracking-tighter truncate">{agent.name}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold transition-colors duration-1000 ${isSystemHalted ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {isSystemHalted ? '0' : agent.efficiency}%
                  </p>
                  <p className="text-[9px] opacity-40 uppercase tracking-widest">Efficiency</p>
                </div>
              </button>
            ))}
          </div>
          
          <button className="w-full mt-8 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest transition-all">
            View All Leaderboards
          </button>
        </motion.div>
      </div>

      {/* Detailed Agent Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold tracking-tight">Agent Performance Matrix</h3>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-40">
            <Filter className="w-3 h-3" />
            Showing {filteredAgents.length} Agents
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAgents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              onClick={() => onViewAgent?.(agent.id)}
              className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 relative">
                    <img src={`https://picsum.photos/seed/${agent.id}/100/100`} alt={agent.name} className="w-full h-full object-cover rounded-xl" referrerPolicy="no-referrer" />
                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-[#121212] transition-all duration-1000 ${
                      isSystemHalted ? 'bg-rose-500' : 'bg-emerald-500'
                    }`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold truncate">{agent.humanName}</h4>
                    <p className="text-[10px] opacity-40 uppercase tracking-tighter">{agent.id} • {agent.department || 'Executive'}</p>
                    {isSystemHalted && (
                      <p className="text-[8px] font-bold text-rose-500 uppercase tracking-widest mt-0.5">Inactive</p>
                    )}
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${
                  agent.level === 1 ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                  agent.level === 2 ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                  agent.level === 3 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                  'bg-slate-500/10 text-slate-500 border-slate-500/20'
                }`}>
                  Level {agent.level}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-1">Efficiency</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${agent.efficiency}%` }} />
                    </div>
                    <span className="text-xs font-bold">{agent.efficiency}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-1">Throughput</p>
                  <p className="text-xs font-bold">{agent.throughput.toLocaleString()} <span className="text-[9px] opacity-40">t/s</span></p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-1">Error Rate</p>
                  <p className="text-xs font-bold text-rose-500">{agent.errorRate}%</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-1">Uptime</p>
                  <p className="text-xs font-bold text-emerald-500">{agent.uptime}%</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-30">Cost / Task</p>
                  <p className="text-xs font-bold">${agent.costPerTask}</p>
                </div>
                <button 
                  onClick={() => onViewAgent?.(agent.id)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-blue-500 hover:text-white transition-all"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});
