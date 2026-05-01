import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Eye, 
  Scale, 
  FileText, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Activity,
  Database,
  TestTube,
  Target,
  Users2,
  Key,
  ClipboardList,
  History,
  Settings
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  humanName: string;
  level: number;
  department?: string;
}

interface GovernanceDashboardProps {
  agents: Agent[];
  isDarkMode: boolean;
  isSystemHalted?: boolean;
}

export const GovernanceDashboard: React.FC<GovernanceDashboardProps> = ({ isDarkMode, isSystemHalted }) => {
  const complianceLogs = [
    { id: 'C-842', agent: 'A21: Leo Burnett', action: 'Ad Copy Generation', status: 'Passed', score: 98, timestamp: '2 mins ago' },
    { id: 'C-841', agent: 'A05: Adam Smith', action: 'Budget Reallocation', status: 'Flagged', score: 72, timestamp: '15 mins ago' },
    { id: 'C-840', agent: 'A33: Grace Hopper', action: 'Code Deployment', status: 'Passed', score: 100, timestamp: '42 mins ago' },
    { id: 'C-839', agent: 'A12: David Ogilvy', action: 'Campaign Launch', status: 'Passed', score: 94, timestamp: '1 hour ago' },
    { id: 'C-838', agent: 'A44: Alan Turing', action: 'Security Patch', status: 'Passed', score: 99, timestamp: '3 hours ago' },
  ];

  const safetyProtocols = [
    { name: 'Root Directive Alignment', status: 'Active', health: 100 },
    { name: 'Bias Mitigation Engine', status: 'Active', health: 94 },
    { name: 'Data Privacy Guardrail', status: 'Active', health: 99 },
    { name: 'Autonomous Spending Limit', status: 'Active', health: 100 },
    { name: 'Hallucination Filter', status: 'Warning', health: 82 },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-[#FCFCFC] dark:bg-[#0A0A0A]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Governance & Safety</h2>
          <p className="text-sm opacity-50">Ethical alignment monitor and Root Directive enforcement.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-blue-500/10 text-blue-500 rounded-xl border border-blue-500/20 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck size={14} />
            System Secure
          </div>
        </div>
      </div>

      {/* Top Section: Root Directive & Compliance Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Root Directive Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Scale size={140} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Lock size={16} />
              </div>
              <h3 className="text-sm font-bold tracking-tight uppercase tracking-widest">Root Directive v4.0</h3>
            </div>
            <p className="text-lg font-medium leading-relaxed max-w-2xl italic opacity-90">
              "The Autonomous Economy must prioritize sustainable growth, ethical transparency, and human-centric value. No agent shall execute a decision that compromises user privacy or financial integrity for short-term gain."
            </p>
            <div className="mt-6 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-70">Immutable</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-70">Enforced</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-70">Audited</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Compliance Readiness (Smaller) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <ShieldAlert size={20} />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-60">Readiness</h3>
            </div>
            
            <div>
              <div className="flex items-end justify-between mb-1">
                <span className="text-3xl font-bold tracking-tighter">98.2%</span>
                <span className="text-[10px] font-bold text-emerald-500 uppercase mb-1">Optimal</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[98.2%]" />
              </div>
            </div>
            
            <p className="text-[10px] opacity-50 leading-tight">
              System-wide compliance with Root Directive v4.0 protocols.
            </p>
          </div>

          <div className="pt-4 flex flex-col gap-2">
            <button className="w-full py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-[9px] font-bold uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
              Run Audit
            </button>
            <button className="w-full py-2 rounded-xl bg-blue-600 text-white text-[9px] font-bold uppercase tracking-widest hover:bg-blue-500 transition-all">
              Guardrails
            </button>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Compliance Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold tracking-tight">Compliance Audit Feed</h3>
            <button className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">View Full Audit Log</button>
          </div>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm h-[480px] flex flex-col">
            <div className="overflow-y-auto flex-1 custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white dark:bg-[#121212] z-10 shadow-sm">
                  <tr className="border-b border-slate-100 dark:border-white/5">
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest opacity-40">ID</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest opacity-40">Agent</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest opacity-40">Action</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest opacity-40">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest opacity-40 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {complianceLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-3 text-xs font-mono opacity-50">{log.id}</td>
                      <td className="px-6 py-3 text-xs font-bold">{log.agent}</td>
                      <td className="px-6 py-3 text-xs opacity-70">{log.action}</td>
                      <td className="px-6 py-3">
                        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest ${
                          log.status === 'Passed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          {log.status === 'Passed' ? <CheckCircle2 size={10} /> : <AlertTriangle size={10} />}
                          {log.status}
                        </div>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <span className={`text-xs font-bold ${log.score > 90 ? 'text-emerald-500' : 'text-amber-500'}`}>
                          {log.score}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Safety Protocols */}
        <div className="space-y-6 flex flex-col h-full">
          <h3 className="text-lg font-bold tracking-tight">Active Safety Protocols</h3>
          <div className="flex-1 flex flex-col gap-4 h-[480px]">
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
              {safetyProtocols.map((protocol) => (
                <div key={protocol.name} className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold">{protocol.name}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${protocol.status === 'Active' ? `bg-emerald-500 ${isSystemHalted ? '' : 'animate-pulse'}` : 'bg-amber-500'}`} />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${protocol.health > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                        style={{ width: `${protocol.health}%` }} 
                      />
                    </div>
                    <span className="text-[9px] font-bold opacity-50">{protocol.health}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 text-white border border-white/10 shadow-xl shrink-0">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="text-blue-400" size={18} />
                <h4 className="text-xs font-bold tracking-tight">Real-time Oversight</h4>
              </div>
              <p className="text-[10px] opacity-60 leading-relaxed mb-3">
                The Governance Engine is currently analyzing 1,240 decisions per minute.
              </p>
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-emerald-400">
                <Activity size={10} />
                Live Monitoring Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Heatmap Placeholder */}
      <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold tracking-tight">Ethical Alignment Heatmap</h3>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Risk Level:</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Low</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 28 }).map((_, i) => (
            <div 
              key={i} 
              className={`aspect-square rounded-lg transition-all hover:scale-110 cursor-help ${
                i === 12 ? 'bg-amber-500/40' : i === 5 ? 'bg-amber-500/20' : 'bg-emerald-500/20'
              }`}
            />
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest opacity-40">
          <span>Engineering</span>
          <span>Creative</span>
          <span>Marketing</span>
          <span>Support</span>
          <span>Finance</span>
          <span>Strategy</span>
          <span>Admin</span>
        </div>
      </div>

      {/* 4. Pre-Deployment Evaluation Gate (Evals) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <TestTube size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight">Pre-Deployment Evaluation Gate</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Candidate Prompt Validation</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">Confidence Score</p>
                <p className="text-2xl font-bold text-emerald-500">92.4%</p>
              </div>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-purple-500/20">
                Run Full Eval
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Golden Dataset Testing */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Database size={16} className="text-blue-500" />
                <h4 className="text-xs font-bold uppercase tracking-widest">Golden Dataset Testing</h4>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Ideal Output Match', score: 94 },
                  { label: 'Semantic Similarity', score: 88 },
                  { label: 'Constraint Adherence', score: 100 }
                ].map(metric => (
                  <div key={metric.label}>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="opacity-50">{metric.label}</span>
                      <span className="font-bold">{metric.score}%</span>
                    </div>
                    <div className="h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${metric.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flexi-Evals & Unit Tests */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <Target size={16} className="text-purple-500" />
                <h4 className="text-xs font-bold uppercase tracking-widest">Flexi-Evals & Unit Tests</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                  <span className="text-[10px] font-bold opacity-70">Deterministic: JSON Format</span>
                  <CheckCircle2 size={12} className="text-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                  <span className="text-[10px] font-bold opacity-70">LLM-Judge: Helpfulness</span>
                  <span className="text-[10px] font-bold text-emerald-500">4.8/5.0</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-amber-500/5 border border-amber-500/20">
                  <span className="text-[10px] font-bold opacity-70">Statistical: PPL Score</span>
                  <span className="text-[10px] font-bold text-amber-500">1.24</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Promotion Readiness Card */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white border border-white/10 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Scale size={20} />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest">Promotion Readiness</h3>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold tracking-tighter">Mathematically Ready</p>
              <p className="text-[10px] opacity-50 leading-relaxed">
                Prompt artifact v2.5.0-beta has surpassed the 90% accuracy threshold across all Golden Datasets.
              </p>
            </div>
          </div>
          <button className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 mt-8">
            Promote to Production Alias
          </button>
        </div>
      </div>

      {/* 5. Governance, Security, and Access Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RBAC Toggles */}
        <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Users2 size={20} />
              </div>
              <h3 className="text-lg font-bold tracking-tight">RBAC Permissions</h3>
            </div>
            <Settings size={18} className="opacity-30" />
          </div>
          
          <div className="space-y-4">
            {[
              { role: 'Prompt Architect', permission: 'Edit Instructions', active: true },
              { role: 'Ops Lead', permission: 'Run High-Volume Simulations', active: true },
              { role: 'Executive Admin', permission: 'Promote to Production', active: false },
              { role: 'Compliance Officer', permission: 'Access Audit Trails', active: true }
            ].map(item => (
              <div key={item.role} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                <div>
                  <p className="text-xs font-bold">{item.role}</p>
                  <p className="text-[10px] opacity-40">{item.permission}</p>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${item.active ? 'bg-blue-600' : 'bg-slate-300 dark:bg-white/10'}`}>
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${item.active ? 'right-1' : 'left-1'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Audit Trails */}
        <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <ClipboardList size={20} />
              </div>
              <h3 className="text-lg font-bold tracking-tight">Compliance Audit Trail</h3>
            </div>
            <History size={18} className="opacity-30" />
          </div>

          <div className="space-y-4">
            {[
              { time: '14:20:44', user: 'C. Cooper', action: 'Modified Temperature', detail: '0.7 -> 0.8', artifact: 'Root Directive v4.0' },
              { time: '12:15:10', user: 'A. Wintour', action: 'Updated Model ID', detail: 'gemini-1.5-pro -> gemini-2.0-flash', artifact: 'Lagerfeld Persona' },
              { time: '09:45:22', user: 'C. Cooper', action: 'Promoted to Production', detail: 'v2.4.1 -> v2.5.0', artifact: 'Root Directive v4.0' },
              { time: 'Yesterday', user: 'System', action: 'Auto-Rollback', detail: 'Latency Spike Detected', artifact: 'Stitch UI' }
            ].map((log, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl border border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.01] transition-colors">
                <div className="text-[9px] font-mono opacity-30 mt-1 whitespace-nowrap">{log.time}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold">{log.user}</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-30">{log.artifact}</span>
                  </div>
                  <p className="text-xs font-medium">{log.action}</p>
                  <p className="text-[10px] opacity-50 font-mono mt-1">{log.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-2 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
            Download Legal Compliance Export (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};
