import React from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  Zap, 
  Shield, 
  Cpu, 
  TrendingUp, 
  Clock, 
  BarChart3, 
  PieChart, 
  Network 
} from 'lucide-react';
import { LiveTokenUsageTrace } from './LiveTokenUsageTrace';

interface AnalyticsDashboardProps {
  agents: any[];
  isDarkMode: boolean;
  logs: any[];
  isSystemHalted?: boolean;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ agents, isDarkMode, logs, isSystemHalted }) => {
  // Simulate Token Burn Rate & Cost Projections
  const [tokenBurn, setTokenBurn] = React.useState({ tokens: 124500, cost: 4.12, projected: 2840.50 });
  // Simulate Workflow Completion Rate
  const [automationRate, setAutomationRate] = React.useState(94.2);
  // Simulate System Latency & Execution Bottlenecks
  const [latencyMetrics, setLatencyMetrics] = React.useState({ endToEnd: 420, bottleneck: 'Agent-12' });

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (isSystemHalted) return;
      
      setTokenBurn(prev => {
        const delta = Math.floor(Math.random() * 500) - 100;
        const newTokens = Math.max(100000, prev.tokens + delta);
        const newCost = (newTokens / 30000).toFixed(2); 
        const newProjected = (parseFloat(newCost) * 4 * 24 * 30).toFixed(2);
        return { tokens: newTokens, cost: parseFloat(newCost), projected: parseFloat(newProjected) };
      });
      
      setAutomationRate(prev => {
        const delta = (Math.random() * 0.4) - 0.2;
        return parseFloat(Math.min(100, Math.max(85, prev + delta)).toFixed(1));
      });

      setLatencyMetrics(prev => {
        const latencyDelta = Math.floor(Math.random() * 20) - 10;
        const agents = ['Agent-12', 'Agent-4', 'Agent-28', 'Agent-44', 'Agent-7'];
        return {
          endToEnd: Math.max(300, prev.endToEnd + latencyDelta),
          bottleneck: agents[Math.floor(Math.random() * agents.length)]
        };
      });
    }, 10000); // Reduced frequency from 3s to 10s for better performance
    return () => clearInterval(interval);
  }, [isSystemHalted]);

  return React.useMemo(() => (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-sm opacity-50 mt-1">Real-time performance metrics and agent workflow maps.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">System Health: 99.9%</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: 'Workflow Automation', 
            value: `${automationRate}%`, 
            subValue: 'No human escalation',
            icon: Zap, 
            color: 'text-amber-500', 
            bg: 'bg-amber-500/10' 
          },
          { 
            label: 'Cost Projections', 
            value: `$${tokenBurn.projected.toLocaleString()}`, 
            subValue: `Est. monthly API & compute`,
            icon: BarChart3, 
            color: 'text-blue-500', 
            bg: 'bg-blue-500/10',
            isProjection: true 
          },
          { 
            label: 'System Latency', 
            value: `${latencyMetrics.endToEnd}ms`, 
            subValue: `Bottleneck: ${latencyMetrics.bottleneck}`,
            icon: Clock, 
            color: 'text-rose-500', 
            bg: 'bg-rose-500/10' 
          },
          { label: 'Security Score', value: '98/100', icon: Shield, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden"
          >
            {stat.isProjection && (
              <motion.div 
                animate={isSystemHalted ? { opacity: 0.1 } : { opacity: [0.05, 0.15, 0.05] }}
                transition={isSystemHalted ? {} : { duration: 3, repeat: Infinity }}
                className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-3xl -mr-12 -mt-12 rounded-full"
              />
            )}
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <TrendingUp className={`w-3 h-3 ${stat.isProjection ? 'text-blue-500' : 'text-emerald-500'}`} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-0.5">{stat.label}</p>
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
              {stat.subValue && <span className="text-[9px] font-mono opacity-40 mt-0.5">{stat.subValue}</span>}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Visualizations Section */}
      <div className="grid grid-cols-1 gap-6">
        {/* Live Token Usage Trace: The Electrocardiogram (Full Width Top) */}
        <div>
          <LiveTokenUsageTrace isDarkMode={isDarkMode} isSystemHalted={isSystemHalted} />
        </div>
      </div>

      {/* Bottom Panel: Performance & Resources */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <BarChart3 className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight">Agent Performance</h3>
                <p className="text-xs opacity-50">Success rate by department.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
              {[
                { dept: 'Brand Identity', score: 98, color: 'bg-blue-500' },
                { dept: 'Creative Production', score: 94, color: 'bg-purple-500' },
                { dept: 'Marketing & Ads', score: 91, color: 'bg-amber-500' },
                { dept: 'Supply Chain', score: 88, color: 'bg-emerald-500' },
                { dept: 'Customer Support', score: 96, color: 'bg-indigo-500' },
                { dept: 'Engineering', score: 99, color: 'bg-rose-500' },
              ].map((item, i) => (
                <div key={item.dept} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold opacity-60 uppercase tracking-tighter">{item.dept}</span>
                    <span className="font-mono font-bold">{item.score}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 1, delay: 0.7 + (i * 0.1) }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-64 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <PieChart className="w-4 h-4 text-blue-500" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-blue-500">Resources</h4>
            </div>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent ${isSystemHalted ? '' : 'animate-spin'}`} />
              <div>
                <p className="text-xs font-medium opacity-60 mb-1">Utilization</p>
                <p className="text-xl font-bold tracking-tight">74.2%</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  ), [agents, isDarkMode, logs, automationRate, tokenBurn, latencyMetrics]);
};
