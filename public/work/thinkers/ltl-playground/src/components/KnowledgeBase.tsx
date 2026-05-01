import React, { useState } from 'react';
import { 
  Database, 
  Upload, 
  Search, 
  FileText, 
  Globe, 
  Link as LinkIcon, 
  CheckCircle2, 
  AlertCircle, 
  MoreVertical,
  Activity,
  Cpu,
  Zap,
  Trash2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface KnowledgeSource {
  id: string;
  name: string;
  type: 'pdf' | 'web' | 'notion' | 'slack';
  status: 'indexed' | 'indexing' | 'error';
  lastUpdated: string;
  chunks: number;
  tokens: string;
  relevance: number;
}

const MOCK_SOURCES: KnowledgeSource[] = [
  { id: 'S01', name: 'Q2 Strategic Brand Guidelines.pdf', type: 'pdf', status: 'indexed', lastUpdated: '2026-03-20 14:30', chunks: 1240, tokens: '45.2k', relevance: 0.98 },
  { id: 'S02', name: 'Dept B Creative Workflow.notion', type: 'notion', status: 'indexed', lastUpdated: '2026-03-21 09:15', chunks: 850, tokens: '32.1k', relevance: 0.95 },
  { id: 'S03', name: 'https://competitor-analysis.com/report', type: 'web', status: 'indexing', lastUpdated: '2026-03-23 10:00', chunks: 0, tokens: '0', relevance: 0.0 },
  { id: 'S04', name: 'Executive Slack Archive - #strategy', type: 'slack', status: 'error', lastUpdated: '2026-03-18 16:45', chunks: 3200, tokens: '120.5k', relevance: 0.88 },
];

export const KnowledgeBase: React.FC<{ isDarkMode: boolean; isSystemHalted: boolean }> = ({ isDarkMode, isSystemHalted }) => {
  const [sources, setSources] = useState<KnowledgeSource[]>(MOCK_SOURCES);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const filteredSources = sources.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Knowledge Base & RAG Context</h2>
            <p className="text-sm opacity-50 max-w-2xl">
              Manage the long-term memory and shared context for the agent mesh. Upload documents, crawl URLs, and monitor vector database health.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsUploading(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20"
            >
              <Upload size={16} />
              Ingest Data
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Chunks', value: '5,290', icon: Database, color: 'text-blue-500' },
            { label: 'Token Density', value: '197.8k', icon: Zap, color: 'text-amber-500' },
            { label: 'Vector Recall', value: '94.2%', icon: Activity, color: 'text-emerald-500' },
            { label: 'Storage Used', value: '1.2 GB', icon: Cpu, color: 'text-purple-500' },
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-sm">
              <stat.icon size={20} className={`${stat.color} opacity-50 mb-4`} />
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sources List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-blue-500" />
                  <h3 className="text-xs font-bold uppercase tracking-widest opacity-40">Knowledge Sources</h3>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={14} />
                  <input 
                    type="text"
                    placeholder="Search sources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {filteredSources.map(source => (
                  <div 
                    key={source.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex items-center justify-between group hover:border-blue-500/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        source.type === 'pdf' ? 'bg-rose-500/10 text-rose-500' :
                        source.type === 'web' ? 'bg-blue-500/10 text-blue-500' :
                        source.type === 'notion' ? 'bg-slate-500/10 text-slate-500' :
                        'bg-purple-500/10 text-purple-500'
                      }`}>
                        {source.type === 'pdf' ? <FileText size={20} /> :
                         source.type === 'web' ? <Globe size={20} /> :
                         source.type === 'notion' ? <LinkIcon size={20} /> :
                         <Database size={20} />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold flex items-center gap-2">
                          {source.name}
                          {source.type === 'web' && <ExternalLink size={12} className="opacity-30" />}
                        </h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] opacity-40">{source.lastUpdated}</span>
                          <span className="text-[10px] opacity-40">•</span>
                          <span className="text-[10px] opacity-40">{source.chunks} chunks</span>
                          <span className="text-[10px] opacity-40">•</span>
                          <span className="text-[10px] opacity-40">{source.tokens} tokens</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-1">Relevance</p>
                        <div className="w-24 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500" 
                            style={{ width: `${source.relevance * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${
                        source.status === 'indexed' ? 'bg-emerald-500/10 text-emerald-500' :
                        source.status === 'indexing' ? 'bg-blue-500/10 text-blue-500 animate-pulse' :
                        'bg-rose-500/10 text-rose-500'
                      }`}>
                        {source.status === 'indexed' ? <CheckCircle2 size={10} /> :
                         source.status === 'indexing' ? <RefreshCw size={10} className="animate-spin" /> :
                         <AlertCircle size={10} />}
                        {source.status}
                      </div>
                      <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100">
                        <MoreVertical size={16} className="opacity-40" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Health & Search */}
          <div className="space-y-6">
            <div className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">Vector Database Health</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold">Index Consistency</span>
                    <span className="text-xs font-bold text-emerald-500">99.8%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[99.8%]" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold">Latency (P95)</span>
                    <span className="text-xs font-bold">12ms</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[12%]" />
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest opacity-40">
                    <span>Last Optimization</span>
                    <span>2h ago</span>
                  </div>
                  <button className="w-full mt-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                    <RefreshCw size={14} />
                    Re-index Database
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-slate-900 text-white shadow-xl shadow-blue-900/10">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">Semantic Search Test</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={14} />
                  <input 
                    type="text"
                    placeholder="Ask the knowledge base..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest transition-all">
                  Query Context
                </button>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 min-h-[100px] flex flex-col items-center justify-center opacity-20">
                  <Database size={24} className="mb-2" />
                  <p className="text-[9px] uppercase tracking-widest">Awaiting Query</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal Overlay */}
      <AnimatePresence>
        {isUploading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-white dark:bg-[#0A0A0A] rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-xl font-bold mb-2">Ingest New Knowledge</h3>
                <p className="text-xs opacity-50">Select a source type to begin the ingestion process.</p>
              </div>
              <div className="p-8 grid grid-cols-2 gap-4">
                {[
                  { label: 'PDF / Doc', icon: FileText, color: 'text-rose-500' },
                  { label: 'Web Crawler', icon: Globe, color: 'text-blue-500' },
                  { label: 'Notion Sync', icon: LinkIcon, color: 'text-slate-500' },
                  { label: 'Slack Archive', icon: Database, color: 'text-purple-500' },
                ].map((type) => (
                  <button key={type.label} className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-all flex flex-col items-center gap-3 group">
                    <type.icon size={24} className={`${type.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{type.label}</span>
                  </button>
                ))}
              </div>
              <div className="p-8 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-200 dark:border-white/10 flex items-center justify-end gap-3">
                <button 
                  onClick={() => setIsUploading(false)}
                  className="px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-all"
                >
                  Cancel
                </button>
                <button className="px-6 py-3 rounded-xl bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-500/20">
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
