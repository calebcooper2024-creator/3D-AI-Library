'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon, Plus, ChevronRight, ChevronLeft, Download, CheckCircle2, AlertCircle, Zap, Activity, Database, Cpu, Layers, MessageSquare, Share2, ShieldCheck, Search, Home, Sun, Moon, Menu, X, FileText, Clock } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// --- Types ---

type StageResult = {
  id: number;
  name: string;
  summary: string;
  color: string;
  lightColor: string;
};

type SessionState = {
  originalInput: string;
  originalTokenCount: number;
  stageResults: StageResult[];
  selectedModel: string;
};

// --- Constants ---

const MODELS = [
  { name: 'GPT-4o', price: 0.000005 },
  { name: 'Claude 3.5 Sonnet', price: 0.000003 },
  { name: 'Claude 3 Opus', price: 0.000015 },
  { name: 'Gemini 1.5 Pro', price: 0.0000035 },
];

const STAGES: StageResult[] = [
  { id: 1, name: 'Structural Analysis', summary: 'Resolved query into essential subtasks and constraints.', color: '#131829', lightColor: '#E0E7FF' },
  { id: 2, name: 'Network Design', summary: 'Pruned redundant communication paths between agents.', color: '#0F2027', lightColor: '#E0F2FE' },
  { id: 3, name: 'Budget Setting', summary: 'Enforced token caps per agent role.', color: '#1A0A12', lightColor: '#FCE7F3' },
  { id: 4, name: 'Language Compression', summary: 'Translated natural language to machine shorthand.', color: '#1C1206', lightColor: '#FEF3C7' },
  { id: 5, name: 'Deduplication', summary: 'Merged overlapping insights into single messages.', color: '#0E0E1F', lightColor: '#EDE9FE' },
  { id: 6, name: 'Memory Indexing', summary: 'Indexed shared state to prevent repetition.', color: '#071A0F', lightColor: '#D1FAE5' },
  { id: 7, name: 'Network Pruning', summary: 'Silenced inactive agents from future rounds.', color: '#12101C', lightColor: '#F3E8FF' },
  { id: 8, name: 'Anomalies Check', summary: 'Verified integrity of compressed payloads.', color: '#111111', lightColor: '#F3F4F6' },
  { id: 9, name: 'Brokie Protocol', summary: 'Final address-based payload generation.', color: '#051810', lightColor: '#ECFDF5' },
];

const COMPRESSION_RATIOS = [1, 1, 0.85, 0.75, 0.65, 0.50, 0.40, 0.30, 0.22, 0.15, 0.09, 0.06];

const TECHNICAL_DETAILS: Record<number, { methodology: string, latency: string, throughput: string, paperTitle: string, description: string }> = {
  1: { methodology: "Directed Acyclic Graph (DAG) extraction via AST-like semantic parsing.", latency: "12ms", throughput: "45k tokens/sec", paperTitle: "Semantic Topology Extraction in LLM Swarms", description: "Utilizes a lightweight encoder to map natural language prompts into a strict DAG, identifying critical path dependencies before execution." },
  2: { methodology: "Kruskal's algorithm variant for Minimum Spanning Tree communication.", latency: "8ms", throughput: "120k edges/sec", paperTitle: "Optimal Routing in Multi-Agent Networks", description: "Calculates the minimum necessary communication edges required to maintain context coherence across the swarm, dropping redundant broadcast channels." },
  3: { methodology: "Dynamic Token Allocation (DTA) using multi-armed bandit optimization.", latency: "4ms", throughput: "O(1) per agent", paperTitle: "Predictive Budgeting for Autonomous Agents", description: "Assigns hard token limits based on historical agent contribution scores, preventing runaway generation loops." },
  4: { methodology: "Lossless semantic tokenization using custom Huffman coding on latent space.", latency: "22ms", throughput: "85k tokens/sec", paperTitle: "A2A: Agent-to-Agent Shorthand Encodings", description: "Bypasses standard BPE tokenizers to encode meaning directly into a dense, non-human-readable byte format." },
  5: { methodology: "Locality-Sensitive Hashing (LSH) for O(1) semantic collision detection.", latency: "15ms", throughput: "90k messages/sec", paperTitle: "O(1) Deduplication in High-Volume Agent Streams", description: "Hashes incoming messages into semantic buckets. If two agents generate >95% similar insights, the latter is dropped." },
  6: { methodology: "Distributed Hash Table (DHT) with Merkle tree verification.", latency: "18ms", throughput: "50k writes/sec", paperTitle: "WorldState: Shared Memory for LLM Swarms", description: "Instead of passing context in prompts, agents read/write to a shared DHT. Prompts only contain 64-bit memory pointers." },
  7: { methodology: "Eigenvector centrality thresholding for inactive node hibernation.", latency: "6ms", throughput: "200k nodes/sec", paperTitle: "Dynamic Hibernation in Neural Swarms", description: "Continuously scores agent relevance to the current subtask. Agents falling below the threshold are temporarily frozen to save compute." },
  8: { methodology: "Zero-knowledge proofs (zk-SNARKs) for payload integrity.", latency: "45ms", throughput: "12k proofs/sec", paperTitle: "Trustless Verification of Compressed Context", description: "Ensures that the highly compressed A2A payload has not suffered semantic degradation or hallucination during the pipeline." },
  9: { methodology: "Binary serialization format optimized for A2A (Agent-to-Agent) RPC.", latency: "2ms", throughput: "500k payloads/sec", paperTitle: "The Brokie Protocol Specification v1.0", description: "The final step. Wraps the compressed, verified, and deduplicated data into a lightweight binary protocol ready for transmission." }
};

const getTheme = (theme: 'dark' | 'light') => ({
  text: theme === 'dark' ? 'text-white' : 'text-slate-900',
  muted: theme === 'dark' ? 'text-white/60' : 'text-slate-600',
  faint: theme === 'dark' ? 'text-white/40' : 'text-slate-500',
  border: theme === 'dark' ? 'border-white/10' : 'border-slate-900/10',
  borderStrong: theme === 'dark' ? 'border-white/20' : 'border-slate-900/20',
  bgPanel: theme === 'dark' ? 'bg-black/40' : 'bg-white/60',
  bgGlass: theme === 'dark' ? 'bg-white/5' : 'bg-slate-900/5',
  buttonBg: theme === 'dark' ? 'bg-white' : 'bg-slate-900',
  buttonText: theme === 'dark' ? 'text-black' : 'text-white',
  buttonHover: theme === 'dark' ? 'hover:bg-amber-500 hover:text-black' : 'hover:bg-amber-500 hover:text-white',
  navBg: theme === 'dark' ? 'bg-black/80' : 'bg-white/80',
});

// --- Components ---

const NavBar = ({ page, theme, onThemeToggle, onHome, onPrev, onNext }: { page: number, theme: 'dark'|'light', onThemeToggle: ()=>void, onHome: ()=>void, onPrev: ()=>void, onNext: ()=>void }) => {
  const t = getTheme(theme);
  return (
    <div className={`fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 ${t.text}`}>
      <button onClick={onHome} className="flex items-center gap-2 font-serif tracking-widest uppercase text-sm hover:opacity-70 transition-opacity">
        <Home size={16} /> Brokie Home
      </button>
      <div className="flex items-center gap-4">
         <button onClick={onPrev} disabled={page === 0} className={`p-2 rounded-full border ${t.borderStrong} ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-slate-900/10'} disabled:opacity-30 disabled:hover:bg-transparent transition-colors`}>
           <ChevronLeft size={16} />
         </button>
         <button onClick={onNext} disabled={page === 11} className={`p-2 rounded-full border ${t.borderStrong} ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-slate-900/10'} disabled:opacity-30 disabled:hover:bg-transparent transition-colors`}>
           <ChevronRight size={16} />
         </button>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={onThemeToggle} className="p-2 hover:opacity-70 transition-opacity">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="p-2 hover:opacity-70 transition-opacity">
          <Menu size={18} />
        </button>
      </div>
    </div>
  );
};

const ProgressRibbon = ({ currentStage, totalStages }: { currentStage: number; totalStages: number }) => {
  const progress = (currentStage / totalStages) * 100;
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 overflow-hidden">
      <motion.div 
        className="h-full bg-linear-to-r from-blue-500 via-amber-500 to-emerald-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </div>
  );
};

const NumbersPanel = ({ state, currentTokenCount, modelPrice, theme }: { state: SessionState; currentTokenCount: number; modelPrice: number; theme: 'dark'|'light' }) => {
  const t = getTheme(theme);
  const savings = state.originalTokenCount - currentTokenCount;
  const currentCost = currentTokenCount * modelPrice;

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className={`fixed bottom-0 left-0 w-full ${t.navBg} backdrop-blur-md border-t ${t.border} px-8 py-4 z-40 flex justify-between items-center`}
    >
      <div className="flex gap-12">
        <div className="flex flex-col">
          <span className={`font-mono text-[10px] ${t.faint} uppercase tracking-widest`}>Original Monthly Tokens</span>
          <span className={`font-mono text-xl ${t.text}`}>{state.originalTokenCount.toLocaleString()}</span>
        </div>
        <div className="flex flex-col">
          <span className={`font-mono text-[10px] text-amber-500/80 uppercase tracking-widest`}>Current Monthly Tokens</span>
          <span className="font-mono text-xl text-amber-500">{currentTokenCount.toLocaleString()}</span>
        </div>
        <div className="flex flex-col">
          <span className={`font-mono text-[10px] text-emerald-500/80 uppercase tracking-widest`}>Monthly Savings So Far</span>
          <span className="font-mono text-xl text-emerald-500">{savings.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className={`font-mono text-[10px] ${t.faint} uppercase tracking-widest`}>Current Monthly Cost</span>
        <span className={`font-mono text-xl ${t.text}`}>${currentCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
      </div>
    </motion.div>
  );
};

const InkWashTransition = ({ active, theme, onComplete }: { active: boolean; theme: 'dark'|'light'; onComplete: () => void }) => {
  return (
    <div 
      className={`ink-wash-overlay ${theme === 'light' ? 'light' : ''} ${active ? 'ink-wash-active' : ''}`}
      onAnimationEnd={onComplete}
    />
  );
};

const TechnicalPanel = ({ stageId, theme, onClose }: { stageId: number, theme: 'dark'|'light', onClose: () => void }) => {
  const t = getTheme(theme);
  const details = TECHNICAL_DETAILS[stageId];
  if (!details) return null;

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className={`fixed bottom-0 left-0 w-full h-[50vh] ${t.navBg} backdrop-blur-2xl border-t ${t.borderStrong} z-[60] p-8 shadow-2xl flex flex-col`}
    >
      <div className="max-w-5xl mx-auto w-full h-full flex flex-col">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className={`font-serif text-3xl mb-2 ${t.text}`}>Deep Dive: Stage {stageId}</h3>
            <p className={`font-mono text-xs uppercase tracking-widest ${t.faint}`}>Technical Specification & Methodology</p>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full border ${t.border} ${theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-slate-900/10'} transition-colors ${t.text}`}>
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 flex-1 overflow-y-auto scrollbar-thin pr-4">
          <div className="col-span-2 space-y-8">
            <div>
              <h4 className={`font-mono text-[10px] uppercase tracking-widest ${t.faint} mb-3 flex items-center gap-2`}><Cpu size={12}/> Core Algorithm</h4>
              <p className={`text-lg ${t.text} leading-relaxed`}>{details.methodology}</p>
            </div>
            <div>
              <h4 className={`font-mono text-[10px] uppercase tracking-widest ${t.faint} mb-3 flex items-center gap-2`}><Layers size={12}/> Architecture Description</h4>
              <p className={`text-sm ${t.muted} leading-relaxed`}>{details.description}</p>
            </div>
            <div>
              <h4 className={`font-mono text-[10px] uppercase tracking-widest ${t.faint} mb-3 flex items-center gap-2`}><FileText size={12}/> Reference Implementation</h4>
              <a href="#" className={`text-sm text-amber-500 hover:text-amber-400 underline underline-offset-4 transition-colors`}>{details.paperTitle} ↗</a>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`p-5 rounded-xl border ${t.border} ${t.bgGlass}`}>
              <h4 className={`font-mono text-[10px] uppercase tracking-widest ${t.faint} mb-2 flex items-center gap-2`}><Clock size={12}/> P99 Latency</h4>
              <p className={`font-mono text-2xl ${t.text}`}>{details.latency}</p>
            </div>
            <div className={`p-5 rounded-xl border ${t.border} ${t.bgGlass}`}>
              <h4 className={`font-mono text-[10px] uppercase tracking-widest ${t.faint} mb-2 flex items-center gap-2`}><Activity size={12}/> Max Throughput</h4>
              <p className={`font-mono text-2xl ${t.text}`}>{details.throughput}</p>
            </div>
            <div className={`p-5 rounded-xl border ${t.border} ${t.bgGlass}`}>
              <h4 className={`font-mono text-[10px] uppercase tracking-widest ${t.faint} mb-2 flex items-center gap-2`}><ShieldCheck size={12}/> Status</h4>
              <p className={`font-mono text-sm text-emerald-500 flex items-center gap-2`}><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Production Ready</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Pages ---

const Page0 = ({ onNext, theme }: { onNext: () => void, theme: 'dark'|'light' }) => {
  const t = getTheme(theme);
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex flex-col items-center justify-center h-full text-center px-6 ${t.text}`}
    >
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-6xl md:text-8xl font-serif tracking-widest mb-8"
      >
        BROKIE
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className={`text-lg md:text-xl ${t.muted} mb-12 max-w-md`}
      >
        Intelligence should not cost a fortune.
      </motion.p>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={onNext}
        className={`px-12 py-4 border ${t.borderStrong} ${t.buttonHover} transition-all duration-300 tracking-widest uppercase text-sm`}
      >
        Begin
      </motion.button>
    </motion.div>
  );
};

const CASE_STUDIES = [
  "Global Logistics Optimization: A network of 12 agents managing real-time freight tracking, customs documentation, warehouse capacity, and last-mile delivery across 4 continents. Requires synchronization of IoT sensor data, legal compliance checks, and dynamic route re-calculation based on weather anomalies.",
  "Personalized Genomic Medicine Pipeline: 8 specialized agents analyzing raw DNA sequencing data, cross-referencing with 40+ medical research databases, identifying potential hereditary risks, and drafting a 50-page personalized health optimization plan. Involves high-density data processing and complex reasoning over conflicting clinical studies.",
  "Autonomous Financial Audit: A swarm of 20 agents performing a deep-dive audit of a multinational corporation's quarterly transactions. Agents must reconcile 50,000+ invoices, detect fraudulent patterns using multi-modal analysis, verify tax compliance across 15 jurisdictions, and generate a comprehensive risk assessment report."
];

const extractAgentCount = (text: string) => {
  const regex1 = /(?:^|\s)([\d,]+)\s+(?:[a-zA-Z-]+\s+){0,3}agents?/gi;
  const regex2 = /agents?(?:\s+[a-zA-Z-]+){0,2}:?\s+([\d,]+)/gi;
  
  let maxAgents = 0;
  let match;
  
  while ((match = regex1.exec(text)) !== null) {
    const num = parseInt(match[1].replace(/,/g, ''), 10);
    if (!isNaN(num) && num > maxAgents) maxAgents = num;
  }
  
  while ((match = regex2.exec(text)) !== null) {
    const num = parseInt(match[1].replace(/,/g, ''), 10);
    if (!isNaN(num) && num > maxAgents) maxAgents = num;
  }

  if (maxAgents === 0) {
    if (/\b(?:two)\b.*agents?/i.test(text)) return 2;
    if (/\b(?:three)\b.*agents?/i.test(text)) return 3;
    if (/\b(?:four)\b.*agents?/i.test(text)) return 4;
    if (/\b(?:five)\b.*agents?/i.test(text)) return 5;
    if (/\b(?:ten)\b.*agents?/i.test(text)) return 10;
    if (/agents?/i.test(text)) return 5;
    return 2;
  }
  return maxAgents;
};

const Page1 = ({ state, setState, onNext, theme }: { state: SessionState; setState: React.Dispatch<React.SetStateAction<SessionState>>; onNext: () => void; theme: 'dark'|'light' }) => {
  const t = getTheme(theme);
  const [input, setInput] = useState(state.originalInput);
  
  // Scale up to represent a large AI company's monthly usage
  const agentCount = extractAgentCount(input);
  const baseTokenCount = input.trim() ? Math.ceil(input.trim().split(/\s+/).length * 1.3) : 0;
  const MESSAGES_PER_TURN = Math.max(1, Math.floor(agentCount * 1.5));
  const TURNS_PER_TASK = 40;
  const TASKS_PER_MONTH = 100000;
  const tokenCount = baseTokenCount * MESSAGES_PER_TURN * TURNS_PER_TASK * TASKS_PER_MONTH;

  const selectedModel = MODELS.find(m => m.name === state.selectedModel) || MODELS[0];

  const handleGenerateCaseStudy = () => {
    const randomStudy = CASE_STUDIES[Math.floor(Math.random() * CASE_STUDIES.length)];
    setInput(randomStudy);
  };

  const handleAnalyze = () => {
    setState(prev => ({
      ...prev,
      originalInput: input,
      originalTokenCount: tokenCount,
    }));
    onNext();
  };

  return (
    <motion.div className={`flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-6 ${t.text}`}>
      <h2 className="text-4xl md:text-5xl font-serif mb-4 text-center">What should your agents work on?</h2>
      <p className={`font-mono text-xs ${t.faint} mb-12 text-center uppercase tracking-widest`}>
        Paste a complex multi-agent task, workflow description, or long prompt.
      </p>

      <div className="w-full relative mb-6">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`w-full h-64 bg-transparent border-b ${t.border} focus:border-[#B8963E] outline-none font-serif text-xl md:text-2xl py-4 resize-none transition-colors duration-500`}
          placeholder="Describe a task for your AI agent network. The more complex, the better."
        />
      </div>

      <div className="w-full flex justify-center mb-12">
        <button 
          onClick={handleGenerateCaseStudy}
          className={`flex items-center gap-2 font-mono text-[10px] ${t.faint} hover:text-amber-500 uppercase tracking-widest transition-colors`}
        >
          <Zap size={12} /> Generate AI Case Study
        </button>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <div className="flex flex-col items-center md:items-start">
          <span className={`font-mono text-[10px] ${t.faint} uppercase tracking-widest mb-1`}>Estimated Monthly Tokens</span>
          <span className="font-mono text-3xl">{tokenCount.toLocaleString()}</span>
          <span className={`font-mono text-[8px] ${t.faint} uppercase tracking-widest mt-1`}>Based on {agentCount.toLocaleString()} agents, 100k tasks & 40 turns</span>
        </div>

        <div className="flex flex-col items-center">
          <span className={`font-mono text-[10px] ${t.faint} uppercase tracking-widest mb-1`}>Model Pricing</span>
          <select 
            value={state.selectedModel}
            onChange={(e) => setState(prev => ({ ...prev, selectedModel: e.target.value }))}
            className="bg-transparent border-none font-mono text-sm text-amber-500 outline-none cursor-pointer"
          >
            {MODELS.map(m => <option key={m.name} value={m.name} className={theme === 'dark' ? 'bg-[#0D1B2A]' : 'bg-white'}>{m.name}</option>)}
          </select>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <span className={`font-mono text-[10px] ${t.faint} uppercase tracking-widest mb-1`}>Estimated Monthly Cost</span>
          <span className="font-mono text-3xl text-amber-500">${(tokenCount * selectedModel.price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
      </div>

      <AnimatePresence>
        {input.length >= 100 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={handleAnalyze}
            className={`px-16 py-4 ${t.buttonBg} ${t.buttonText} ${t.buttonHover} transition-colors duration-300 tracking-widest uppercase text-sm font-medium`}
          >
            Analyze
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const getTransformedText = (input: string, stageId: number) => {
  const words = input.split(/\s+/);
  if (stageId === 1) return words.map(w => w.length > 6 && Math.random() > 0.5 ? `[${w.toUpperCase()}]` : w).join(' ');
  if (stageId === 2) return input.replace(/\b(agent|network|communication|agents|task|workflow)\b/gi, '◆ $1 ◆');
  if (stageId === 3) return input.split('. ').map(s => s + " {limit: 0.05}").join('. ');
  if (stageId === 4) return words.map(w => w.length > 3 ? w[0] + (w.length - 2) + w[w.length - 1] : w).join(' ');
  if (stageId === 5) return input.split('. ').slice(0, Math.ceil(input.split('. ').length / 2)).join('. ') + " [MERGED_CONTEXT]";
  if (stageId === 6) return `@ptr:0x${Math.random().toString(16).slice(2, 8)} -> ${input.substring(0, 40)}...`;
  if (stageId === 7) return input.split('. ').map((s, i) => i % 2 === 0 ? s : `// SILENCED //`).join('. ');
  if (stageId === 8) return `[VERIFIED] ${input.substring(0, 60)}... [CRC: ${Math.random().toString(36).slice(2, 6).toUpperCase()}]`;
  if (stageId === 9) return `{\n  "id": "brk_${Math.random().toString(36).slice(2, 8)}",\n  "v": 1.0,\n  "payload": "0x${Math.random().toString(16).slice(2, 12)}"\n}`;
  return input;
};

const getCodeSnippet = (stageId: number) => {
  const snippets: Record<number, string> = {
    1: `import brokie\n\n# Semantic Parsing Engine\nstructure = brokie.parse(\n    input_data,\n    mode="DEEP_STRUCTURAL",\n    extract=["goals", "tasks", "constraints"]\n)\n\nprint(f"Resolved {len(structure.tasks)} subtasks.")`,
    2: `from brokie.topology import AgentGraph\n\n# Topology Optimization\ngraph = AgentGraph(agents)\noptimized = graph.prune(\n    redundancy_threshold=0.85,\n    preserve_critical_paths=True\n)\n\nreturn optimized.export()`,
    3: `# Token Budget Enforcement\nagents = network.get_agents()\nfor agent in agents:\n    agent.set_limit(50, metric="TOKENS_PER_ROUND")\n    agent.on_limit_exceeded(action="COMPRESS")`,
    4: `# A2A Shorthand Encoding\nmessage = agent.get_outbound()\ncompressed = brokie.encode(\n    message,\n    dictionary="GLOBAL_AGENT_V1",\n    lossless=True\n)\n\nreturn compressed`,
    5: `# Contextual Deduplication\nbuffer = network.get_message_buffer()\nunique_context = buffer.merge_similar(\n    semantic_similarity=0.92,\n    strategy="CONTEXT_AWARE_MERGE"\n)`,
    6: `# WorldState Indexing\nstate = world_state.capture()\nindex = memory.index(state)\n\n# Replace content with memory pointers\nreturn index.to_address()`,
    7: `# Dynamic Network Pruning\ninactive = [\n    a for a in agents\n    if a.contribution_score < 0.1 and not a.is_critical_path\n]\n\nfor a in inactive:\n    a.hibernate()`,
    8: `# Integrity Verification\npayload = protocol.get_payload()\nis_valid = await brokie.verify(\n    payload,\n    checksum="CRC32",\n    schema="BROKIE_V1"\n)\n\nif not is_valid:\n    rollback()`,
    9: `# Brokie Protocol Serialization\nfinal_state = pipeline.finalize()\nreturn brokie.serialize(\n    final_state,\n    protocol="BROKIE_A2A_V1",\n    compression="MAX"\n)`
  };
  return snippets[stageId] || '';
};

const AnimatedPythonBlock = ({ code }: { code: string }) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedCode('');
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < code.length) {
        setDisplayedCode(prev => prev + code.charAt(i));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 15); // Fast typing speed
    return () => clearInterval(interval);
  }, [code]);

  return (
    <div className="rounded-xl overflow-hidden border border-[#30363d] bg-[#1e1e1e] shadow-2xl w-full">
      <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-[#1e1e1e]">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="mx-auto text-[#858585] text-xs font-mono">Brokie.py</div>
      </div>
      <div className="p-4 text-sm font-mono overflow-auto h-48 scrollbar-thin relative">
        <SyntaxHighlighter 
          language="python" 
          style={vscDarkPlus} 
          customStyle={{ background: 'transparent', padding: 0, margin: 0, fontSize: '0.75rem' }}
          wrapLines={true}
        >
          {displayedCode + (isTyping ? '█' : '')}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const StagePage = ({ stage, state, onNext, theme }: { stage: typeof STAGES[0]; state: SessionState; onNext: () => void; theme: 'dark'|'light' }) => {
  const t = getTheme(theme);
  const [isProcessing, setIsProcessing] = useState(true);
  const [optimization] = useState(() => Math.floor(Math.random() * 20) + 10);
  const transformedText = React.useMemo(() => getTransformedText(state.originalInput, stage.id), [state.originalInput, stage.id]);
  const codeSnippet = React.useMemo(() => getCodeSnippet(stage.id), [stage.id]);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsProcessing(false), 3000);
    return () => clearTimeout(timer);
  }, [stage.id]);

  return (
    <motion.div className={`flex flex-col items-center justify-center h-full max-w-7xl mx-auto px-6 ${t.text}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">{stage.name}</h2>
            <p className={`text-lg ${t.muted} max-w-xl`}>{stage.summary}</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {/* Data Transformation Box */}
            <div className={`${t.bgPanel} border ${t.border} p-5 rounded-xl font-mono text-[10px] leading-relaxed overflow-hidden relative`}>
              <div className={`flex justify-between items-center mb-3 ${t.faint}`}>
                <span className="uppercase tracking-widest">Payload Transformation</span>
                <span className="uppercase tracking-widest">Data</span>
              </div>
              <div className="h-32 overflow-y-auto pr-2 scrollbar-thin">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`whitespace-pre-wrap ${t.text}`}
                  >
                    {transformedText}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Code Execution Box */}
            <AnimatedPythonBlock code={codeSnippet} />
          </div>
        </div>

        <div className="w-full h-96 relative flex items-center justify-center">
          {isProcessing ? (
            <div className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 border-t-2 border-amber-500 rounded-full animate-spin" />
              <span className="font-mono text-xs text-amber-500 uppercase tracking-widest animate-pulse">Processing Stage {stage.id}...</span>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`${t.bgGlass} border ${t.border} p-12 rounded-2xl backdrop-blur-sm w-full text-center`}
            >
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-emerald-500 w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif mb-2">Stage Complete</h3>
              <p className={`${t.faint} text-sm mb-8`}>Compression optimized by {optimization}%</p>
              <button
                onClick={onNext}
                className={`w-full py-4 border ${t.borderStrong} ${t.buttonHover} transition-all duration-300 tracking-widest uppercase text-xs`}
              >
                Continue
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Page11 = ({ state, currentTokenCount, theme }: { state: SessionState; currentTokenCount: number; theme: 'dark'|'light' }) => {
  const selectedModel = MODELS.find(m => m.name === state.selectedModel) || MODELS[0];
  const originalCost = state.originalTokenCount * selectedModel.price;
  const finalCost = currentTokenCount * selectedModel.price;
  const savings = originalCost - finalCost;
  const ratio = (state.originalTokenCount / currentTokenCount).toFixed(1);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center justify-center min-h-full py-20 px-6 ${theme === 'dark' ? 'bg-[#0A0A0F] text-white' : 'bg-white text-black'}`}
    >
      <h2 className="text-5xl md:text-6xl font-serif mb-4 text-center">Your answer, preserved.</h2>
      <p className={`text-lg ${theme === 'dark' ? 'text-white/60' : 'text-black/60'} mb-16 text-center max-w-2xl`}>
        Every agent understood perfectly. The output is identical. The cost was not.
      </p>

      <div className={`w-full max-w-2xl ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'} border p-12 shadow-2xl mb-16`}>
        <div className="flex justify-between items-start mb-12">
          <div>
            <h3 className="font-serif text-2xl uppercase tracking-tighter">Brokie Compression Receipt</h3>
            <p className={`font-mono text-[10px] ${theme === 'dark' ? 'text-white/40' : 'text-black/40'} uppercase tracking-widest`}>Task Completed: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <p className={`font-mono text-[10px] ${theme === 'dark' ? 'text-white/40' : 'text-black/40'} uppercase tracking-widest`}>Model</p>
            <p className="font-mono text-sm font-bold">{state.selectedModel}</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <p className={`font-mono text-[10px] ${theme === 'dark' ? 'text-white/40' : 'text-black/40'} uppercase tracking-widest mb-4`}>Original Monthly Cost</p>
            <div className={`flex justify-between items-center border-b ${theme === 'dark' ? 'border-white/10' : 'border-black/5'} pb-2`}>
              <span className="font-serif">Unoptimized Agent Network</span>
              <span className="font-mono">${originalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] text-emerald-600 uppercase tracking-widest mb-4">Brokie Monthly Cost</p>
            <div className={`flex justify-between items-center border-b ${theme === 'dark' ? 'border-white/10' : 'border-black/5'} pb-2`}>
              <span className="font-serif">Brokie Protocol Network</span>
              <span className="font-mono">${finalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
          </div>

          <div className="pt-8 flex justify-between items-end">
            <div>
              <p className={`font-mono text-[10px] ${theme === 'dark' ? 'text-white/40' : 'text-black/40'} uppercase tracking-widest`}>Compression Ratio</p>
              <p className="text-4xl font-serif">{ratio}×</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] text-emerald-600 uppercase tracking-widest font-bold">Monthly Savings</p>
              <p className="text-5xl font-serif text-emerald-600">${savings.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            </div>
          </div>
        </div>

        <div className={`mt-16 pt-8 border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} flex justify-between items-center`}>
          <button className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest hover:text-emerald-600 transition-colors`}>
            <Download size={14} /> Download Receipt
          </button>
          <span className={`font-mono text-[10px] ${theme === 'dark' ? 'text-white/20' : 'text-black/20'} uppercase tracking-widest`}>Brokie Protocol v1.0</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-2xl font-serif mb-8">At this rate, you&apos;d save <span className="text-emerald-600 font-bold">${(savings * 12).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span> per year.</p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button className={`px-12 py-4 ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} hover:bg-emerald-600 hover:text-white transition-colors duration-300 tracking-widest uppercase text-sm font-medium`}>
            Start Your Free Trial
          </button>
          <button className={`px-12 py-4 border ${theme === 'dark' ? 'border-white/20 hover:bg-white hover:text-black' : 'border-black/20 hover:bg-black hover:text-white'} transition-colors duration-300 tracking-widest uppercase text-sm font-medium`}>
            View Pricing
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Flow ---

export default function BrokieOnboarding() {
  const [page, setPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'next' | 'prev' | 'home'>('next');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [state, setState] = useState<SessionState>({
    originalInput: '',
    originalTokenCount: 0,
    stageResults: [],
    selectedModel: 'GPT-4o',
  });

  const handleNext = () => {
    if (page < 11) {
      setIsPanelOpen(false);
      setTransitionDirection('next');
      setIsTransitioning(true);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setIsPanelOpen(false);
      setTransitionDirection('prev');
      setIsTransitioning(true);
    }
  };

  const handleHome = () => {
    if (page !== 0) {
      setIsPanelOpen(false);
      setTransitionDirection('home');
      setIsTransitioning(true);
    }
  };

  const completeTransition = () => {
    if (transitionDirection === 'next') setPage(prev => prev + 1);
    else if (transitionDirection === 'prev') setPage(prev => prev - 1);
    else if (transitionDirection === 'home') setPage(0);
    
    setIsTransitioning(false);
  };

  const selectedModel = MODELS.find(m => m.name === state.selectedModel) || MODELS[0];
  const rawTokenCount = Math.floor(state.originalTokenCount * COMPRESSION_RATIOS[page]);
  const minTokensAllowed = Math.floor(state.originalTokenCount / 18);
  const currentTokenCount = Math.max(20, minTokensAllowed, rawTokenCount);

  const renderPage = () => {
    if (page === 0) return <Page0 onNext={handleNext} theme={theme} />;
    if (page === 1) return <Page1 state={state} setState={setState} onNext={handleNext} theme={theme} />;
    
    if (page >= 2 && page <= 10) {
      const stage = STAGES[page - 2];
      return <StagePage key={stage.id} stage={stage} state={state} onNext={handleNext} theme={theme} />;
    }

    if (page === 11) return <Page11 state={state} currentTokenCount={currentTokenCount} theme={theme} />;
    
    return null;
  };

  const getBgColor = () => {
    if (page === 0) return theme === 'dark' ? '#0A0A0F' : '#F8FAFC';
    if (page === 1) return theme === 'dark' ? '#0D1B2A' : '#F1F5F9';
    if (page >= 2 && page <= 10) return theme === 'dark' ? STAGES[page - 2].color : STAGES[page - 2].lightColor;
    if (page === 11) return theme === 'dark' ? '#0A0A0F' : '#FFFFFF';
    return theme === 'dark' ? '#0A0A0F' : '#F8FAFC';
  };

  return (
    <main 
      className="relative w-full h-screen overflow-hidden transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: getBgColor() }}
    >
      <NavBar 
        page={page} 
        theme={theme} 
        onThemeToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} 
        onHome={handleHome} 
        onPrev={handlePrev} 
        onNext={handleNext} 
      />

      {page >= 1 && page <= 10 && <ProgressRibbon currentStage={page} totalStages={11} />}
      
      <div className="h-full">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </div>

      {page >= 2 && page <= 10 && <NumbersPanel state={state} currentTokenCount={currentTokenCount} modelPrice={selectedModel.price} theme={theme} />}

      <InkWashTransition active={isTransitioning} theme={theme} onComplete={completeTransition} />

      {/* Expand Button */}
      {page >= 2 && page <= 10 && (
        <button 
          onClick={() => setIsPanelOpen(true)}
          className={`fixed bottom-24 right-8 w-10 h-10 rounded-full border ${theme === 'dark' ? 'border-white/20 hover:bg-white/10 text-white' : 'border-slate-900/20 hover:bg-slate-900/10 text-slate-900'} flex items-center justify-center transition-colors z-50`}
        >
          <Plus size={20} />
        </button>
      )}

      <AnimatePresence>
        {isPanelOpen && page >= 2 && page <= 10 && (
          <TechnicalPanel stageId={STAGES[page - 2].id} theme={theme} onClose={() => setIsPanelOpen(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
