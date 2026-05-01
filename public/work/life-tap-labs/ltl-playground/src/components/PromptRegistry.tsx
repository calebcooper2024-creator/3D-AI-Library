import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileCode, 
  History, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  RotateCcw, 
  Tag, 
  ToggleLeft, 
  ToggleRight, 
  Search,
  Filter,
  Plus,
  MoreVertical,
  Shield,
  Zap,
  Eye,
  Copy,
  Save,
  Trash2,
  Lock,
  Globe,
  FlaskConical,
  Rocket,
  Settings,
  ArrowLeftRight,
  ChevronRight,
  Activity,
  Cpu
} from 'lucide-react';

interface PromptVersion {
  id: string;
  version: string;
  content: string;
  author: string;
  timestamp: string;
  status: 'production' | 'staging' | 'experiment' | 'archived';
  isLive: boolean;
  tags: string[];
  commitMessage: string;
  config: {
    modelId: string;
    temperature: number;
    topP: number;
    frequencyPenalty: number;
    maxTokens: number;
  };
  inputSchema?: string;
  tools?: string[];
  metrics?: {
    successRate: number;
    latency: number;
    cost: number;
  };
}

interface PromptArtifact {
  id: string;
  name: string;
  description: string;
  category: 'System' | 'Persona' | 'Tool' | 'Governance';
  versions: PromptVersion[];
}

const MOCK_PROMPTS: PromptArtifact[] = [
  {
    id: 'root-directive',
    name: 'Root Directive v2',
    description: 'The foundational ethical and operational mandate for the entire 44-agent mesh.',
    category: 'Governance',
    versions: [
      {
        id: 'v2.4.1',
        version: '2.4.1',
        content: 'You are the primary orchestrator of the Life Tap Labs ecosystem. Your core mandate is to maximize enterprise value while maintaining 100% adherence to the ethical constraints defined in the Human-in-the-Loop protocol. All downstream agents must inherit this context: {{context}}',
        author: 'C. Cooper',
        timestamp: '2026-03-20 14:20',
        status: 'production',
        isLive: true,
        tags: ['stable', 'high-priority'],
        commitMessage: 'Finalized ethical guardrails for Q1 release.',
        config: {
          modelId: 'gemini-1.5-pro',
          temperature: 0.7,
          topP: 0.95,
          frequencyPenalty: 0.0,
          maxTokens: 2048
        },
        inputSchema: '{\n  "context": "string"\n}',
        tools: ['get_agent_status', 'halt_system'],
        metrics: { successRate: 99.8, latency: 12, cost: 0.002 }
      },
      {
        id: 'v2.4.0',
        version: '2.4.0',
        content: 'You are the primary orchestrator of the Life Tap Labs ecosystem. Your core mandate is to maximize enterprise value. (Legacy ethical constraints omitted)...',
        author: 'C. Cooper',
        timestamp: '2026-03-15 09:10',
        status: 'archived',
        isLive: false,
        tags: ['legacy'],
        commitMessage: 'Initial draft of root directive.',
        config: {
          modelId: 'gemini-1.5-flash',
          temperature: 0.8,
          topP: 1.0,
          frequencyPenalty: 0.1,
          maxTokens: 1024
        },
        metrics: { successRate: 98.2, latency: 15, cost: 0.002 }
      },
      {
        id: 'v2.5.0-beta',
        version: '2.5.0-beta',
        content: 'You are the primary orchestrator of the Life Tap Labs ecosystem. [EXPERIMENTAL] Optimized for Gemini 3.1 Pro context caching. Your core mandate is to maximize enterprise value while maintaining 100% adherence: {{context}}',
        author: 'C. Cooper',
        timestamp: '2026-03-22 11:45',
        status: 'experiment',
        isLive: false,
        tags: ['experiment-A', 'cached'],
        commitMessage: 'Testing context caching performance gains.',
        config: {
          modelId: 'gemini-3.1-pro-preview',
          temperature: 0.6,
          topP: 0.9,
          frequencyPenalty: 0.0,
          maxTokens: 4096
        },
        inputSchema: '{\n  "context": "string"\n}',
        tools: ['get_agent_status', 'halt_system', 'query_knowledge_base'],
        metrics: { successRate: 99.9, latency: 8, cost: 0.001 }
      }
    ]
  },
  {
    id: 'lagerfeld-creative',
    name: 'Lagerfeld Creative Persona',
    description: 'The creative director persona for A12_CD_LAGERFELD.',
    category: 'Persona',
    versions: [
      {
        id: 'v1.2.0',
        version: '1.2.0',
        content: 'You are Karl Lagerfeld, the Creative Director of Dept B. Your voice is authoritative, uncompromising, and deeply rooted in high-fashion aesthetics. You value minimalism, contrast, and radical innovation. Current Project: {{project_name}}',
        author: 'A. Wintour',
        timestamp: '2026-03-18 16:30',
        status: 'production',
        isLive: true,
        tags: ['brand-aligned'],
        commitMessage: 'Initial persona baseline.',
        config: {
          modelId: 'gemini-1.5-pro',
          temperature: 0.9,
          topP: 1.0,
          frequencyPenalty: 0.2,
          maxTokens: 512
        },
        inputSchema: '{\n  "project_name": "string"\n}',
        metrics: { successRate: 94.5, latency: 45, cost: 0.042 }
      },
      {
        id: 'v1.3.0-staging',
        version: '1.3.0-staging',
        content: 'You are Karl Lagerfeld, the Creative Director of Dept B. [UPDATED] Added specific instructions for mobile-first UI constraints and WCAG AAA compliance. Current Project: {{project_name}}',
        author: 'A. Wintour',
        timestamp: '2026-03-21 10:00',
        status: 'staging',
        isLive: false,
        tags: ['staging', 'accessibility-fix'],
        commitMessage: 'Added accessibility guardrails to creative output.',
        config: {
          modelId: 'gemini-1.5-pro',
          temperature: 0.85,
          topP: 0.95,
          frequencyPenalty: 0.1,
          maxTokens: 1024
        },
        inputSchema: '{\n  "project_name": "string"\n}',
        metrics: { successRate: 96.2, latency: 42, cost: 0.045 }
      }
    ]
  }
];

export const PromptRegistry: React.FC = () => {
  const [selectedArtifact, setSelectedArtifact] = useState<PromptArtifact>(MOCK_PROMPTS[0]);
  const [selectedVersion, setSelectedVersion] = useState<PromptVersion>(MOCK_PROMPTS[0].versions[0]);
  const [compareVersion, setCompareVersion] = useState<PromptVersion | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDiffMode, setIsDiffMode] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState<'prompt' | 'config' | 'playground'>('prompt');
  const [playgroundInputs, setPlaygroundInputs] = useState<Record<string, string>>({ context: 'Strategic Q2 Planning', project_name: 'Cyberpunk 2077 Redesign' });
  const [playgroundModel, setPlaygroundModel] = useState('gemini-1.5-pro');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationOutput, setSimulationOutput] = useState('');

  const handlePromote = (version: PromptVersion) => {
    // In a real app, this would call an API
    console.log(`Promoting ${version.id} to production`);
  };

  const handleRollback = (version: PromptVersion) => {
    console.log(`Rolling back to ${version.id}`);
  };

  return (
    <div className="h-full flex flex-col bg-[#F8F9FB] dark:bg-[#0A0A0A]">
      {/* Header */}
      <div className="p-8 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Prompt Registry</h1>
            <p className="text-sm opacity-50 font-medium">Manage prompts as immutable software artifacts with 1-click feature flags.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-500/25">
              <Plus size={16} />
              New Artifact
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
            <input 
              type="text" 
              placeholder="Search artifacts, versions, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-12 pr-4 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
            {['All', 'System', 'Persona', 'Governance'].map(cat => (
              <button key={cat} className="px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Artifact List */}
        <div className="w-80 border-r border-slate-200 dark:border-white/10 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {MOCK_PROMPTS.map(artifact => (
            <button
              key={artifact.id}
              onClick={() => {
                setSelectedArtifact(artifact);
                setSelectedVersion(artifact.versions.find(v => v.isLive) || artifact.versions[0]);
              }}
              className={`w-full p-4 rounded-2xl text-left transition-all border ${
                selectedArtifact.id === artifact.id 
                  ? 'bg-white dark:bg-white/10 border-blue-500/50 shadow-sm' 
                  : 'border-transparent hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                  artifact.category === 'Governance' ? 'bg-purple-500/10 text-purple-500' :
                  artifact.category === 'Persona' ? 'bg-blue-500/10 text-blue-500' :
                  'bg-slate-500/10 text-slate-500'
                }`}>
                  {artifact.category}
                </span>
                <span className="text-[10px] font-mono opacity-30">
                  {artifact.versions.length} versions
                </span>
              </div>
              <h3 className="font-bold text-sm mb-1">{artifact.name}</h3>
              <p className="text-[10px] opacity-50 line-clamp-2 leading-relaxed">{artifact.description}</p>
            </button>
          ))}
        </div>

        {/* Version Detail */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Artifact Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-2">{selectedArtifact.name}</h2>
                <p className="text-sm opacity-50 max-w-2xl">{selectedArtifact.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
                  <Settings size={18} className="opacity-50" />
                </button>
                <button className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
                  <MoreVertical size={18} className="opacity-50" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Version History & Controls */}
              <div className="lg:col-span-1 space-y-6">
                <div className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest opacity-40">Version History</h3>
                    <History size={16} className="opacity-30" />
                  </div>
                  <div className="space-y-3">
                    {selectedArtifact.versions.map(version => (
                      <button
                        key={version.id}
                        onClick={() => setSelectedVersion(version)}
                        className={`w-full p-4 rounded-xl text-left transition-all border ${
                          selectedVersion.id === version.id 
                            ? 'bg-blue-500/5 border-blue-500/30' 
                            : 'border-transparent hover:bg-slate-50 dark:hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold">v{version.version}</span>
                          {version.isLive && (
                            <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-emerald-500">
                              <CheckCircle2 size={10} />
                              Live
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md ${
                            version.status === 'production' ? 'bg-emerald-500/10 text-emerald-500' :
                            version.status === 'staging' ? 'bg-blue-500/10 text-blue-500' :
                            version.status === 'experiment' ? 'bg-amber-500/10 text-amber-500' :
                            'bg-slate-500/10 text-slate-500'
                          }`}>
                            {version.status}
                          </span>
                          {version.tags.map(tag => (
                            <span key={tag} className="text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 opacity-50">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-[9px] opacity-30">{version.timestamp} by {version.author}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feature Flag Toggles */}
                <div className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest opacity-40">Feature Flags</h3>
                    <Zap size={16} className="opacity-30" />
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                      <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-3">Promotion Pipeline</p>
                      <div className="flex items-center justify-between relative">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-white/10 -translate-y-1/2 z-0" />
                        {[
                          { label: 'Dev', status: 'complete', color: 'bg-blue-500' },
                          { label: 'Staging', status: 'active', color: 'bg-amber-500' },
                          { label: 'Prod', status: 'pending', color: 'bg-slate-300 dark:bg-white/20' }
                        ].map((step, i) => (
                          <div key={step.label} className="relative z-10 flex flex-col items-center gap-1">
                            <div className={`w-3 h-3 rounded-full ${step.color} shadow-sm`} />
                            <span className="text-[8px] font-bold uppercase tracking-widest opacity-50">{step.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold">A/B Experiment-A</p>
                        <p className="text-[10px] opacity-40">Route 10% traffic to v2.5.0</p>
                      </div>
                      <button className="text-slate-300 dark:text-white/20 hover:text-blue-500 transition-all">
                        <ToggleLeft size={24} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold">Context Caching</p>
                        <p className="text-[10px] opacity-40">Enable Gemini-native caching</p>
                      </div>
                      <button className="text-blue-500 transition-all">
                        <ToggleRight size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Content Preview & Metrics */}
              <div className="lg:col-span-2 space-y-6">
                {/* Metrics Bar */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-1">Success Rate</p>
                    <p className="text-xl font-bold text-emerald-500">{selectedVersion.metrics?.successRate}%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-1">Avg Latency</p>
                    <p className="text-xl font-bold">{selectedVersion.metrics?.latency}ms</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-1">Cost / 1k Tokens</p>
                    <p className="text-xl font-bold">${selectedVersion.metrics?.cost}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-1">Cognitive Load</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold text-blue-500">42%</p>
                      <Activity size={14} className="text-blue-500 opacity-50" />
                    </div>
                  </div>
                </div>

                {/* Content Editor/Preview */}
                <div className="rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden flex flex-col">
                  <div className="px-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
                    <div className="flex items-center gap-6">
                      {['prompt', 'config', 'playground'].map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveDetailTab(tab as any)}
                          className={`py-4 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all ${
                            activeDetailTab === tab 
                              ? 'border-blue-500 text-blue-500' 
                              : 'border-transparent opacity-40 hover:opacity-100'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          if (!isDiffMode) {
                            const prevVersion = selectedArtifact.versions.find(v => v.id !== selectedVersion.id);
                            if (prevVersion) setCompareVersion(prevVersion);
                          }
                          setIsDiffMode(!isDiffMode);
                          setActiveDetailTab('prompt');
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                          isDiffMode ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-white/5 opacity-50 hover:opacity-100'
                        }`}
                      >
                        <ArrowLeftRight size={14} />
                        {isDiffMode ? 'Exit Diff' : 'Compare'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-0 font-mono text-sm leading-relaxed min-h-[450px] flex flex-col">
                    {activeDetailTab === 'prompt' && (
                      <>
                        {isDiffMode && compareVersion ? (
                          <div className="flex-1 grid grid-cols-2 divide-x divide-slate-200 dark:divide-white/10">
                            <div className="flex flex-col">
                              <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-rose-500/[0.05] flex items-center justify-between">
                                <div className="text-[10px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-2">
                                  <History size={12} />
                                  v{compareVersion.version} (Base)
                                </div>
                                <div className="flex gap-4">
                                  <div className="text-center">
                                    <p className="text-[8px] uppercase opacity-40">Latency</p>
                                    <p className="text-[10px] font-bold">{compareVersion.metrics?.latency}ms</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-[8px] uppercase opacity-40">Success</p>
                                    <p className="text-[10px] font-bold text-rose-500">{compareVersion.metrics?.successRate}%</p>
                                  </div>
                                </div>
                              </div>
                              <div className="p-8 opacity-50 line-through decoration-rose-500/50 flex-1 overflow-y-auto custom-scrollbar">
                                {compareVersion.content}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-emerald-500/[0.05] flex items-center justify-between">
                                <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                                  <Rocket size={12} />
                                  v{selectedVersion.version} (Target)
                                </div>
                                <div className="flex gap-4">
                                  <div className="text-center">
                                    <p className="text-[8px] uppercase opacity-40">Latency</p>
                                    <p className="text-[10px] font-bold">{selectedVersion.metrics?.latency}ms</p>
                                  </div>
                                  <div className="text-center">
                                    <p className="text-[8px] uppercase opacity-40">Success</p>
                                    <p className="text-[10px] font-bold text-emerald-500">{selectedVersion.metrics?.successRate}%</p>
                                  </div>
                                </div>
                              </div>
                              <div className="p-8 text-emerald-500/90 flex-1 overflow-y-auto custom-scrollbar">
                                {selectedVersion.content}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-8 opacity-80 whitespace-pre-wrap">
                            {selectedVersion.content}
                          </div>
                        )}
                      </>
                    )}

                    {activeDetailTab === 'config' && (
                      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4">Model Configuration</h4>
                            <div className="space-y-3">
                              {Object.entries(selectedVersion.config).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                                  <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">{key}</span>
                                  <span className="text-xs font-mono font-bold">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4">Commit Metadata</h4>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                              <p className="text-xs italic opacity-70">"{selectedVersion.commitMessage}"</p>
                              <div className="mt-4 flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest opacity-40">
                                <span>Author: {selectedVersion.author}</span>
                                <span>Date: {selectedVersion.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4">Input Schema</h4>
                            <div className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto">
                              <pre>{selectedVersion.inputSchema || 'No schema defined'}</pre>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4">Available Tools</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedVersion.tools?.map(tool => (
                                <span key={tool} className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-widest border border-blue-500/20">
                                  {tool}
                                </span>
                              )) || <span className="text-xs opacity-30">No tools defined</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeDetailTab === 'playground' && (
                      <div className="flex-1 flex flex-col">
                        <div className="p-6 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40">Variable Injection</h4>
                            <div className="space-y-3">
                              {selectedVersion.id.includes('root') ? (
                                <div className="space-y-1">
                                  <label className="text-[9px] font-bold uppercase tracking-widest opacity-40">Context</label>
                                  <textarea 
                                    value={playgroundInputs.context}
                                    onChange={(e) => setPlaygroundInputs({...playgroundInputs, context: e.target.value})}
                                    className="w-full h-20 p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                  />
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  <label className="text-[9px] font-bold uppercase tracking-widest opacity-40">Project Name</label>
                                  <input 
                                    type="text"
                                    value={playgroundInputs.project_name}
                                    onChange={(e) => setPlaygroundInputs({...playgroundInputs, project_name: e.target.value})}
                                    className="w-full p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-40">Model Swapping</h4>
                            <div className="space-y-3">
                              <div className="relative">
                                <select 
                                  value={playgroundModel}
                                  onChange={(e) => setPlaygroundModel(e.target.value)}
                                  className="w-full p-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none"
                                >
                                  <option value="gemini-1.5-pro">Gemini 1.5 Pro (Balanced)</option>
                                  <option value="gemini-1.5-flash">Gemini 1.5 Flash (Fast/Cheap)</option>
                                  <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Experimental)</option>
                                  <option value="claude-3-opus">Claude 3 Opus (Reasoning)</option>
                                </select>
                                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 opacity-30" size={16} />
                              </div>
                              <button 
                                onClick={() => {
                                  setIsSimulating(true);
                                  setSimulationOutput('');
                                  setTimeout(() => {
                                    setSimulationOutput(`[SIMULATED OUTPUT FROM ${playgroundModel.toUpperCase()}]\n\nBased on the provided context "${playgroundInputs.context || playgroundInputs.project_name}", I have initialized the orchestration layer. All ethical guardrails are active. Cognitive load is within normal parameters.\n\nRecommendation: Proceed with the Q2 strategic alignment while monitoring tokenomics for potential spikes in Dept B.`);
                                    setIsSimulating(false);
                                  }, 1500);
                                }}
                                disabled={isSimulating}
                                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                              >
                                {isSimulating ? (
                                  <>
                                    <Activity size={14} className="animate-pulse" />
                                    Simulating...
                                  </>
                                ) : (
                                  <>
                                    <Rocket size={14} />
                                    Run Simulation
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 p-8 bg-slate-900 text-slate-300 font-mono text-sm overflow-y-auto custom-scrollbar">
                          {simulationOutput ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                              {simulationOutput}
                            </motion.div>
                          ) : (
                            <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-4">
                              <Cpu size={48} />
                              <p className="text-xs uppercase tracking-[0.2em]">Awaiting Simulation Input</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="px-6 py-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
                    <div className="flex items-center gap-4">
                      {selectedVersion.status !== 'production' && (
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePromote(selectedVersion)}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/25"
                        >
                          <Rocket size={14} />
                          Promote to Production
                        </motion.button>
                      )}
                      {selectedVersion.status === 'production' && (
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleRollback(selectedVersion)}
                          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-amber-500/25"
                        >
                          <RotateCcw size={14} />
                          Rollback Version
                        </motion.button>
                      )}
                      <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                        <FlaskConical size={14} />
                        Run Test Suite
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-30">
                      <Lock size={12} />
                      Immutable Artifact
                    </div>
                  </div>
                </div>

                {/* Semantic Tags Management */}
                <div className="p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest opacity-40">Semantic Tags</h3>
                    <Tag size={16} className="opacity-30" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedVersion.tags.map(tag => (
                      <div key={tag} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">{tag}</span>
                        <button className="opacity-30 hover:opacity-100 transition-all">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                    <button className="px-3 py-1.5 rounded-xl border border-dashed border-slate-300 dark:border-white/20 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all flex items-center gap-2">
                      <Plus size={12} />
                      Add Tag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
