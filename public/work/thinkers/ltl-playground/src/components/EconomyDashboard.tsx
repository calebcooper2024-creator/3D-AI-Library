import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  PieChart, 
  Wallet, 
  Briefcase, 
  BarChart3,
  ArrowRight,
  Target,
  Zap
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart as RePieChart,
  Pie
} from 'recharts';

interface Agent {
  id: string;
  name: string;
  humanName: string;
  level: number;
  department?: string;
}

interface EconomyDashboardProps {
  agents: Agent[];
  isDarkMode: boolean;
  isSystemHalted?: boolean;
}

const DEPT_COLORS: Record<string, string> = {
  'Executive': '#3b82f6',
  'Brand Identity & Strategy': '#6366f1',
  'Creative & Visual Production': '#ec4899',
  'Marketing & Advertising': '#f59e0b',
  'Supply Chain, Finance & Operations': '#10b981',
  'Customer Support & UI Generation': '#8b5cf6',
  'Engineering, Software & QA': '#06b6d4',
};

export const EconomyDashboard: React.FC<EconomyDashboardProps> = ({ agents, isDarkMode, isSystemHalted }) => {
  // Mock financial data
  const financialTrend = [
    { date: 'Mar 15', revenue: 42000, cost: 12000 },
    { date: 'Mar 16', revenue: 48000, cost: 12500 },
    { date: 'Mar 17', revenue: 45000, cost: 11800 },
    { date: 'Mar 18', revenue: 52000, cost: 13200 },
    { date: 'Mar 19', revenue: 61000, cost: 14000 },
    { date: 'Mar 20', revenue: 58000, cost: 13500 },
    { date: 'Mar 21', revenue: 65000, cost: 14200 },
  ];

  const deptROI = [
    { name: 'Marketing', roi: 4.2, budget: 25000, color: DEPT_COLORS['Marketing & Advertising'] },
    { name: 'Creative', roi: 3.8, budget: 18000, color: DEPT_COLORS['Creative & Visual Production'] },
    { name: 'Engineering', roi: 2.5, budget: 35000, color: DEPT_COLORS['Engineering, Software & QA'] },
    { name: 'Support', roi: 1.9, budget: 12000, color: DEPT_COLORS['Customer Support & UI Generation'] },
    { name: 'Strategy', roi: 5.1, budget: 15000, color: DEPT_COLORS['Brand Identity & Strategy'] },
  ];

  const tokenEfficiency = [
    { name: 'GPT-4o', efficiency: 92, cost: 0.03 },
    { name: 'Claude 3.5', efficiency: 95, cost: 0.04 },
    { name: 'Gemini 1.5', efficiency: 88, cost: 0.02 },
    { name: 'Llama 3', efficiency: 82, cost: 0.01 },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-[#FCFCFC] dark:bg-[#0A0A0A]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Autonomous Economy & ROI</h2>
          <p className="text-sm opacity-50">Financial oversight of the 44-agent corporate engine.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl border border-emerald-500/20 text-xs font-bold uppercase tracking-widest">
            Net Profit: +$50,800
          </div>
          <button className="p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
            <Briefcase className="w-5 h-5 opacity-50" />
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$65,000', trend: '+12.5%', icon: DollarSign, color: 'text-emerald-500' },
          { label: 'Operating Cost', value: '$14,200', trend: '+2.1%', icon: Wallet, color: 'text-rose-500' },
          { label: 'Avg. ROI', value: '3.4x', trend: '+0.4x', icon: TrendingUp, color: 'text-blue-500' },
          { label: 'Token Burn', value: '1.2M', trend: '-5.2%', icon: Zap, color: 'text-amber-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl bg-slate-100 dark:bg-white/5`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue vs Cost Trend */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold tracking-tight">Financial Performance</h3>
              <p className="text-xs opacity-50">Revenue vs. Operating Costs (7-day window).</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Cost</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financialTrend}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#ffffff0a" : "#0000000a"} vertical={false} />
                <XAxis 
                  dataKey="date" 
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
                  tickFormatter={(value) => `$${value/1000}k`}
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
                  dataKey="revenue" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                  strokeWidth={3}
                />
                <Area 
                  type="monotone" 
                  dataKey="cost" 
                  stroke="#f43f5e" 
                  fillOpacity={1} 
                  fill="url(#colorCost)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Department ROI Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm"
        >
          <h3 className="text-lg font-bold tracking-tight mb-6">ROI by Department</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptROI} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#ffffff0a" : "#0000000a"} horizontal={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke={isDarkMode ? "#ffffff40" : "#00000060"} 
                  fontSize={10} 
                  width={70}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#0f172a' : '#ffffff', 
                    border: 'none', 
                    borderRadius: '12px'
                  }}
                />
                <Bar dataKey="roi" radius={[0, 4, 4, 0]} barSize={20}>
                  {deptROI.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {deptROI.map((dept) => (
              <div key={dept.name} className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                <span className="opacity-40">{dept.name}</span>
                <span>{dept.roi}x ROI</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Section: Token Efficiency & Budget Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Token Efficiency */}
        <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold tracking-tight">Token Efficiency Matrix</h3>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Zap size={16} />
            </div>
          </div>
          <div className="space-y-6">
            {tokenEfficiency.map((model) => (
              <div key={model.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{model.name}</span>
                  <span className="text-xs opacity-50">${model.cost} / 1k tokens</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${model.efficiency}%` }}
                      className="h-full bg-blue-500" 
                    />
                  </div>
                  <span className="text-xs font-bold">{model.efficiency}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Distribution */}
        <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold tracking-tight">Budget Allocation</h3>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
              <PieChart size={16} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 items-center">
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={deptROI}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="budget"
                  >
                    {deptROI.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {deptROI.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dept.color }} />
                    <span className="text-xs font-medium opacity-70">{dept.name}</span>
                  </div>
                  <span className="text-xs font-bold">${(dept.budget/1000).toFixed(1)}k</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full mt-6 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2">
            Optimize Budget
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
