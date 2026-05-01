import React, { useState, useMemo, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Info, Zap, Target } from 'lucide-react';

// --- Data Simulation ---

const DEPARTMENTS = [
  { id: 'A', name: 'Operations', color: '#6366f1' },
  { id: 'B', name: 'Strategy', color: '#ec4899' },
  { id: 'C', name: 'Marketing', color: '#f59e0b' },
  { id: 'D', name: 'Logistics', color: '#10b981' },
  { id: 'E', name: 'Engineering', color: '#3b82f6' },
  { id: 'F', name: 'Security', color: '#ef4444' },
];

const AGENTS_BY_DEPT: Record<string, { id: string, name: string }[]> = {
  'C': [
    { id: 'C1', name: 'Bernays' },
    { id: 'C2', name: 'MrBeast' },
    { id: 'C3', name: 'Burnett' },
    { id: 'C4', name: 'Ogilvy' },
    { id: 'C5', name: 'Draper' },
    { id: 'C6', name: 'Godin' },
    { id: 'C7', name: 'Vaynerchuk' },
    { id: 'C8', name: 'Holiday' },
  ],
  // ... other depts can be added if needed
};

// Generate 50 points of historical data
const generateInitialData = () => {
  const data = [];
  for (let i = 0; i < 50; i++) {
    const point: any = { time: i };
    DEPARTMENTS.forEach(dept => {
      point[dept.id] = Math.floor(Math.random() * 500) + 200;
    });
    data.push(point);
  }
  return data;
};

const generateInitialDeptData = (deptId: string) => {
  const agents = AGENTS_BY_DEPT[deptId] || [];
  const data = [];
  for (let i = 0; i < 50; i++) {
    const point: any = { time: i };
    agents.forEach(agent => {
      point[agent.id] = Math.floor(Math.random() * 100) + 50;
    });
    data.push(point);
  }
  return data;
};

const generateInitialAgentData = (agentId: string) => {
  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      time: i,
      tokens: Math.floor(Math.random() * 80) + 40,
      successRate: Math.floor(Math.random() * 20) + 80,
    });
  }
  return data;
};

// --- Components ---

interface LiveTokenUsageTraceProps {
  isDarkMode?: boolean;
  isSystemHalted?: boolean;
}

export const LiveTokenUsageTrace = React.memo(({ isDarkMode = true, isSystemHalted }: LiveTokenUsageTraceProps) => {
  const [view, setView] = useState<'global' | 'dept' | 'agent'>('global');
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  
  const [globalData, setGlobalData] = useState(generateInitialData());
  const [deptData, setDeptData] = useState<any[]>([]);
  const [agentData, setAgentData] = useState<any[]>([]);

  // Update data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (isSystemHalted) return;
      
      if (view === 'global') {
        setGlobalData(prev => {
          const lastPoint = prev[prev.length - 1];
          const nextTime = lastPoint.time + 1;
          const newPoint: any = { time: nextTime };
          DEPARTMENTS.forEach(dept => {
            const prevVal = lastPoint[dept.id];
            const delta = (Math.random() * 40 - 20); // Smaller delta for smoother transition
            newPoint[dept.id] = Math.max(100, Math.min(1000, prevVal + delta));
          });
          return [...prev.slice(1), newPoint];
        });
      } else if (view === 'dept' && selectedDept) {
        setDeptData(prev => {
          const lastPoint = prev[prev.length - 1];
          const nextTime = lastPoint.time + 1;
          const newPoint: any = { time: nextTime };
          (AGENTS_BY_DEPT[selectedDept] || []).forEach(agent => {
            const prevVal = lastPoint[agent.id];
            const delta = (Math.random() * 10 - 5);
            newPoint[agent.id] = Math.max(20, Math.min(200, prevVal + delta));
          });
          return [...prev.slice(1), newPoint];
        });
      } else if (view === 'agent' && selectedAgent) {
        setAgentData(prev => {
          const lastPoint = prev[prev.length - 1];
          const nextTime = lastPoint.time + 1;
          const tokensDelta = (Math.random() * 10 - 5);
          const successDelta = (Math.random() * 2 - 1);
          const newPoint = {
            time: nextTime,
            tokens: Math.max(10, Math.min(150, lastPoint.tokens + tokensDelta)),
            successRate: Math.max(70, Math.min(100, lastPoint.successRate + successDelta)),
          };
          return [...prev.slice(1), newPoint];
        });
      }
    }, 2000); // Increased interval to 2000ms for maximum smoothness
    return () => clearInterval(interval);
  }, [view, selectedDept, selectedAgent, isSystemHalted]);

  const handleDeptClick = (deptId: string) => {
    setSelectedDept(deptId);
    setDeptData(generateInitialDeptData(deptId));
    setView('dept');
  };

  const handleAgentClick = (agentId: string) => {
    setSelectedAgent(agentId);
    setAgentData(generateInitialAgentData(agentId));
    setView('agent');
  };

  const handleBack = () => {
    if (view === 'agent') {
      setView('dept');
      setSelectedAgent(null);
    } else if (view === 'dept') {
      setView('global');
      setSelectedDept(null);
    }
  };

  const currentDept = DEPARTMENTS.find(d => d.id === selectedDept);
  const currentAgent = (AGENTS_BY_DEPT[selectedDept || ''] || []).find(a => a.id === selectedAgent);

  return (
    <div className="w-full h-full bg-white dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/10 p-8 flex flex-col gap-6 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {view !== 'global' && (
            <button 
              onClick={handleBack}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h3 className="text-xl font-bold tracking-tight">
              {view === 'global' && 'Live Token Usage Trace: Global Pulse'}
              {view === 'dept' && `Department Deep Dive: ${currentDept?.name}`}
              {view === 'agent' && `Agent Forensics: ${currentAgent?.name}`}
            </h3>
            <p className="text-sm opacity-40">
              {view === 'global' && 'Real-time hierarchical token consumption across all departments.'}
              {view === 'dept' && `Analyzing individual agent performance within ${currentDept?.name}.`}
              {view === 'agent' && `Detailed trace of ${currentAgent?.name}'s execution and validation success.`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <Zap className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-mono text-indigo-500 uppercase tracking-widest">Live Telemetry</span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 min-h-[280px] relative">
        <ResponsiveContainer width="100%" height="100%">
          {view === 'global' ? (
            <AreaChart data={globalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                {DEPARTMENTS.map(dept => (
                  <linearGradient key={dept.id} id={`color${dept.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={dept.color} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={dept.color} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#ffffff0a" : "#0000000a"} vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke={isDarkMode ? "#ffffff20" : "#00000040"} 
                fontSize={10}
                tickFormatter={(val, index) => {
                  const diff = ((globalData.length - 1 - index) * 0.2).toFixed(1);
                  return diff === '0.0' ? 'Now' : `-${diff}s`;
                }}
              />
              <YAxis 
                stroke={isDarkMode ? "#ffffff20" : "#00000040"} 
                fontSize={10} 
                tickFormatter={(val) => `${(val / 1000).toFixed(1)}k`}
              />
              {DEPARTMENTS.map(dept => (
                <Area
                  key={dept.id}
                  type="monotone"
                  dataKey={dept.id}
                  name={dept.name}
                  stroke={dept.color}
                  fillOpacity={0.1}
                  fill={`url(#color${dept.id})`}
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                  isAnimationActive={false}
                />
              ))}
            </AreaChart>
          ) : view === 'dept' ? (
            <AreaChart data={deptData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                {(AGENTS_BY_DEPT[selectedDept!] || []).map((agent, i) => (
                  <linearGradient key={agent.id} id={`color${agent.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={currentDept?.color} stopOpacity={0.3 - i * 0.03}/>
                    <stop offset="95%" stopColor={currentDept?.color} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#ffffff0a" : "#0000000a"} vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke={isDarkMode ? "#ffffff20" : "#00000040"} 
                fontSize={10}
                tickFormatter={(val, index) => {
                  const diff = ((deptData.length - 1 - index) * 0.2).toFixed(1);
                  return diff === '0.0' ? 'Now' : `-${diff}s`;
                }}
              />
              <YAxis stroke={isDarkMode ? "#ffffff20" : "#00000040"} fontSize={10} />
              {(AGENTS_BY_DEPT[selectedDept!] || []).map((agent, i) => (
                <Area
                  key={agent.id}
                  type="monotone"
                  dataKey={agent.id}
                  name={agent.name}
                  stroke={currentDept?.color}
                  strokeOpacity={1 - i * 0.1}
                  fillOpacity={0.1}
                  fill={`url(#color${agent.id})`}
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                  isAnimationActive={false}
                />
              ))}
            </AreaChart>
          ) : (
            <AreaChart data={agentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#ffffff0a" : "#0000000a"} vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke={isDarkMode ? "#ffffff20" : "#00000040"} 
                fontSize={10}
                tickFormatter={(val, index) => {
                  const diff = ((agentData.length - 1 - index) * 0.2).toFixed(1);
                  return diff === '0.0' ? 'Now' : `-${diff}s`;
                }}
              />
              <YAxis yAxisId="left" stroke={isDarkMode ? "#ffffff20" : "#00000040"} fontSize={10} name="Tokens" />
              <YAxis yAxisId="right" orientation="right" stroke={isDarkMode ? "#ffffff20" : "#00000040"} fontSize={10} name="Success Rate" domain={[0, 100]} />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="tokens"
                name="Token Usage"
                stroke="#3b82f6"
                fillOpacity={0.1}
                fill="url(#colorTokens)"
                strokeWidth={3}
                dot={false}
                activeDot={false}
                isAnimationActive={false}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="successRate"
                name="Validation Success (%)"
                stroke="#10b981"
                fill="transparent"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Footer Info */}
      <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5">
            <Target className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest opacity-40">Current Phase</p>
            <p className="text-sm font-bold">
              {view === 'global' ? 'System-Wide Monitoring' : view === 'dept' ? 'Departmental Analysis' : 'Granular Agent Trace'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5">
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest opacity-40">Active Nodes</p>
            <p className="text-sm font-bold">
              {view === 'global' ? '44 Agents' : view === 'dept' ? `${AGENTS_BY_DEPT[selectedDept!]?.length || 0} Specialists` : '1 Instance'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5">
            <Info className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest opacity-40">Telemetry Status</p>
            <p className="text-sm font-bold">Nominal (24ms Latency)</p>
          </div>
        </div>
      </div>
    </div>
  );
});
