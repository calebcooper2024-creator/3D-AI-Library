import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Download, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Layers, 
  FileCode, 
  Image as ImageIcon,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  Palette,
  Wind,
  Cpu,
  X,
  Eye,
  Type as TypeIcon,
  Sparkles,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { VisualEditor } from './components/VisualEditor';

// --- Types ---

interface PageMetadata {
  title: string;
  hostname: string;
  origin: string;
  pages: string[];
  features: {
    webflow: boolean;
    interactions: number;
    lottie: boolean;
    cms: boolean;
  };
  colors?: { color: string; count: number }[];
  visualAssets: {
    type: 'image' | 'video' | 'background' | 'svg';
    src?: string;
    content?: string;
    width: number;
    height: number;
    index: number;
    tagName: string;
  }[];
}

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

const stepThemes: Record<Step, { bg: string; accent: string }> = {
  1: { bg: '#0f0f0f', accent: 'rgba(255,255,255,0.05)' }, // Target
  2: { bg: '#141420', accent: 'rgba(255,255,255,0.05)' }, // Narrative
  3: { bg: '#142014', accent: 'rgba(255,255,255,0.05)' }, // Visual Assets
  4: { bg: '#142014', accent: 'rgba(255,255,255,0.05)' }, // Chromatic Soul
  5: { bg: '#142014', accent: 'rgba(255,255,255,0.05)' }, // Neural Mapping
  6: { bg: '#142014', accent: 'rgba(255,255,255,0.05)' }, // Blueprint
  7: { bg: '#142014', accent: 'rgba(255,255,255,0.05)' }, // Preservation
  8: { bg: '#201414', accent: 'rgba(255,255,255,0.05)' }, // Synthesis
  9: { bg: '#201414', accent: 'rgba(255,255,255,0.05)' }, // Refinement
  10: { bg: '#14202a', accent: 'rgba(255,255,255,0.05)' }, // Manifestation
  11: { bg: '#0a0a0a', accent: 'rgba(255,255,255,0.08)' }, // Completion
};

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('button, input, a, .interactive'));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      style={{ left: position.x, top: position.y }}
    />
  );
};

const Marquee = () => {
  const content = `Boonk Borrowing Inspiration `.repeat(6);
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {content}
      </div>
    </div>
  );
};

const Logo = ({ onClick }: { onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-4 hover:opacity-70 transition-opacity text-left"
  >
    <div className="logo-pill">
      <Zap className="w-4 h-4" />
    </div>
    <div className="flex flex-col">
      <span className="logo-title">Boonk</span>
      <span className="logo-subtitle">Borrowing Inspiration</span>
    </div>
  </button>
);

export default function App() {
  const [step, setStep] = useState<Step>(1);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<PageMetadata | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [purpose, setPurpose] = useState('');
  const [rewriting, setRewriting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [customFilename, setCustomFilename] = useState('');
  const [options, setOptions] = useState({
    preserveIX2: true,
    preserveLottie: true,
    optimizeImages: true,
    cleanCSS: true
  });

  const [colorPalette, setColorPalette] = useState<{ hex: string; count: number }[]>([]);
  const [colorSwaps, setColorSwaps] = useState<Record<string, string>>({});
  const [assetSwaps, setAssetSwaps] = useState<Record<number, string>>({});

  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const downloadFolderId = params.get('downloadFolder');
    if (downloadFolderId) {
      setPreviewId(downloadFolderId);
      setMetadata({ hostname: 'cloned-site' } as any);
      setStep(11);
    }
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  const handleDownloadAsset = (asset: any) => {
    const src = assetSwaps[asset.index] || asset.src;
    if (!src && asset.type !== 'svg') return;

    if (asset.type === 'svg') {
      const blob = new Blob([asset.content], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `asset-${asset.index}.svg`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    const a = document.createElement('a');
    a.href = src;
    a.download = src.split('/').pop() || `asset-${asset.index}`;
    a.target = '_blank';
    a.click();
  };

  const handleScrape = async () => {
    if (!url) return;
    setStep(3); // Transition to Palette
    setLoading(true);
    setError(null);
    setColorPalette([]);
    setColorSwaps({});
    setLogs([]);
    
    try {
      const res = await fetch('/api/scrape-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      if (!res.ok) throw new Error(await res.text());

      const reader = res.body?.getReader();
      if (!reader) throw new Error('Failed to start stream');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));
            
            if (data.type === 'status') {
              setLogs(prev => [...prev, data.message]);
            }
            if (data.type === 'complete') {
              setMetadata(data.metadata);
              if (data.metadata.colors) setColorPalette(data.metadata.colors);
              setLogs(prev => [...prev, 'Chromatic essence extracted.', 'Structural integrity mapped.', 'Synthesis complete.']);
            }
            if (data.type === 'error') throw new Error(data.message);
          }
        }
      }
      
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleClone = async () => {
    if (!metadata) return;
    setStep(8); // Step 8 is Synthesis
    setLoading(true);
    setError(null);
    setStatus('Priming asset downloader...');
    setProgress({ current: 0, total: metadata.pages.length });

    try {
      const response = await fetch('/api/clone-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url: metadata.origin, 
          pages: metadata.pages,
          colorSwaps,
          assetSwaps: Object.entries(assetSwaps).map(([index, newSrc]) => {
            const asset = metadata.visualAssets.find(a => a.index === parseInt(index));
            return {
              index: parseInt(index),
              newSrc,
              type: asset?.type,
              originalSrc: asset?.originalSrc,
              originalContent: asset?.originalContent
            };
          })
        })
      });

      const reader = response.body?.getReader();
      if (!reader) throw new Error('Failed to start stream');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6));
            
            if (data.type === 'status') setStatus(data.message);
            if (data.type === 'progress') setProgress({ current: data.current, total: data.total });
            if (data.type === 'complete') {
              setPreviewId(data.previewId);
              setTimeout(() => setStep(9), 1000); // Step 9 is Refinement
            }
            if (data.type === 'error') throw new Error(data.message);
          }
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (metadata) {
      let defaultFilename = `${metadata.hostname}-clone.zip`;
      if (purpose) {
        const slug = purpose
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
          .slice(0, 50);
        if (slug) defaultFilename = `${slug}.zip`;
      }
      setCustomFilename(defaultFilename);
    }
  }, [metadata, purpose]);

  const downloadZip = () => {
    if (!previewId || !metadata) return;
    
    let filename = customFilename || `${metadata.hostname}-clone.zip`;
    if (!filename.endsWith('.zip')) {
      filename += '.zip';
    }

    const downloadUrl = `/api/download-site?previewId=${previewId}&filename=${encodeURIComponent(filename)}`;
    
    if (window.self !== window.top) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const downloadAsFolder = async () => {
    if (!previewId || !metadata) return;

    try {
      // If we are in an iframe, we need to open a new tab to use the File System Access API
      if (window.self !== window.top) {
        const url = new URL(window.location.href);
        url.searchParams.set('downloadFolder', previewId);
        
        const link = document.createElement('a');
        link.href = url.toString();
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setStatus('Opened in a new tab. Please continue the folder download there.');
        return;
      }

      // 1. Check for File System Access API support (after iframe check, as it may be hidden in iframes)
      if (!('showDirectoryPicker' in window)) {
        throw new Error('Your browser does not support the File System Access API. Please use a modern browser like Chrome or Edge, or download as a ZIP archive.');
      }

      // 2. Ask user to pick a directory
      const directoryHandle = await (window as any).showDirectoryPicker({
        mode: 'readwrite',
        startIn: 'downloads'
      });

      setLoading(true);
      setStatus('Preparing folder manifest...');

      // 3. Get file list from server
      const res = await fetch(`/api/list-preview-files?previewId=${previewId}`);
      if (!res.ok) throw new Error('Failed to fetch file list');
      const { files } = await res.json();

      setStatus(`Downloading ${files.length} files...`);
      let count = 0;

      // 4. Download and write each file
      for (const filePath of files) {
        count++;
        const normalizedPath = filePath.replace(/\\/g, '/');
        setStatus(`Writing ${count}/${files.length}: ${normalizedPath}`);
        
        const encodedPath = normalizedPath.split('/').map(encodeURIComponent).join('/');
        const fileRes = await fetch(`/previews/${previewId}/${encodedPath}`);
        if (!fileRes.ok) continue;
        const blob = await fileRes.blob();

        // Create nested directories if needed
        const parts = normalizedPath.split('/');
        const fileName = parts.pop();
        let currentHandle = directoryHandle;

        for (const part of parts) {
          currentHandle = await currentHandle.getDirectoryHandle(part, { create: true });
        }

        const fileHandle = await currentHandle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
      }

      setStatus('Folder manifestation complete.');
      setLoading(false);
      alert('Folder downloaded successfully.');
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // User cancelled the picker
        return;
      }
      console.error('Folder download error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleRewrite = async () => {
    console.log('Initiating rewrite with purpose:', purpose, 'and previewId:', previewId);
    if (!previewId || !purpose) {
      console.warn('Missing previewId or purpose, aborting rewrite.');
      return;
    }
    setRewriting(true);
    setError(null);
    setStatus('Analyzing existing architecture...');

    try {
      // 1. Get text from backend
      const textRes = await fetch('/api/get-preview-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ previewId })
      });

      if (!textRes.ok) throw new Error('Failed to extract site text');
      const { textData } = await textRes.json();

      if (!textData || textData.length === 0) {
        throw new Error('No text found to rewrite');
      }

      setStatus('Initializing cognitive engine...');
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-3-flash-preview";

      const updates = [];
      let totalFiles = textData.length;
      let processedFiles = 0;

      for (const item of textData) {
        processedFiles++;
        console.log(`Rewriting file ${processedFiles}/${totalFiles}: ${item.file}`);
        setStatus(`Rewriting content: ${item.file} (${processedFiles}/${totalFiles})`);

        const response = await ai.models.generateContent({
          model,
          contents: `Rewrite the following list of website text strings to be relevant to this purpose: "${purpose}". 
          Maintain the same tone and length as the original strings. 
          Return the result as a JSON array of strings in the same order.
          
          Original strings:
          ${JSON.stringify(item.originalTexts)}`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        });

        const rewrittenTexts = JSON.parse(response.text);
        updates.push({
          file: item.file,
          originalTexts: item.originalTexts,
          rewrittenTexts,
          metadata: item.metadata
        });
      }

      setStatus('Finalizing mirrored assets...');
      const updateRes = await fetch('/api/update-preview-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ previewId, updates })
      });

      if (!updateRes.ok) throw new Error('Failed to update site content');
      
      setStep(11); // Now Step 11 is Completion
      setRewriting(false);
      setPurpose('');
    } catch (err: any) {
      console.error('Rewrite error:', err);
      setError(err.message || 'An unexpected error occurred during rewrite');
      setRewriting(false);
    }
  };

  const transition = {
    initial: { y: 32, opacity: 0, filter: 'blur(6px)' },
    animate: { y: 0, opacity: 1, filter: 'blur(0px)' },
    exit: { y: -24, opacity: 0, filter: 'blur(4px)' },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const stagger = (i: number) => ({
    ...transition,
    transition: { ...transition.transition, delay: i * 0.08 + 0.1 }
  });

  return (
    <motion.div 
      className="min-h-screen overflow-hidden selection:bg-white/30"
      animate={{ backgroundColor: stepThemes[step].bg }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <CustomCursor />
      <Marquee />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full h-24 flex items-center justify-between px-12 z-50">
        <Logo onClick={() => setStep(1)} />
        <div className="flex items-center gap-8">
          {step > 1 && (
            <button 
              onClick={() => setStep((s) => (s - 1) as Step)}
              className="flex items-center gap-2 text-label hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
              Back
            </button>
          )}
          <div className="flex items-end gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((s) => (
              <div 
                key={s} 
                className={`w-px transition-all duration-1000 ${s <= step ? 'bg-white h-4' : 'bg-white/10 h-2'}`} 
              />
            ))}
          </div>
          <span className="text-label opacity-40">{step < 10 ? `0${step}` : step} / 11</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full h-screen flex flex-col justify-center max-w-[680px] mx-auto px-12">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" {...transition} className="space-y-12">
              <motion.div {...stagger(0)}>
                <span className="text-label text-white">01 — Target</span>
                <h1 className="text-7xl md:text-8xl font-serif italic tracking-tight mt-4 text-glow">
                  The Source.
                </h1>
              </motion.div>
              
              <motion.div {...stagger(1)} className="space-y-6">
                <p className="text-body max-w-md">
                  Enter the digital architecture you wish to mirror. 
                  Our engine will map the structure with surgical precision, 
                  preserving the soul of the design.
                </p>
                <div className="relative group">
                  <input 
                    type="url" 
                    placeholder="https://inspiration.webflow.io"
                    className="luxury-input w-full text-2xl font-display placeholder:opacity-20"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && setStep(2)}
                    autoFocus
                  />
                </div>
              </motion.div>

              <motion.div {...stagger(2)}>
                {error ? (
                  <div className="flex items-center gap-4 text-red-400/60 text-label">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                    <button onClick={() => setStep(1)} className="underline hover:text-red-400 transition-colors">Retry</button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setStep(2)}
                    disabled={!url}
                    className="luxury-button group flex items-center gap-4 disabled:opacity-20"
                  >
                    Next Step <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" {...transition} className="space-y-12">
              <motion.div {...stagger(0)}>
                <span className="text-label text-white">02 — Intelligence</span>
                <h1 className="text-7xl md:text-8xl font-serif italic tracking-tight mt-4 text-glow">
                  The Rewrite.
                </h1>
              </motion.div>

              <motion.div {...stagger(1)} className="space-y-6">
                <p className="text-body max-w-md">
                  Define the narrative of your new creation. Our intelligence will 
                  reimagine all text content to resonate with your bespoke vision.
                </p>
                <div className="relative group">
                  <textarea 
                    placeholder="e.g. A high-end architectural firm specializing in sustainable brutalism..."
                    className="luxury-input w-full text-xl font-display placeholder:opacity-20 resize-none h-32"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    autoFocus
                  />
                </div>
              </motion.div>

              <motion.div {...stagger(2)}>
                <div className="flex gap-8">
                  <button 
                    onClick={handleScrape}
                    className="luxury-button group flex items-center gap-4"
                  >
                    Initiate Analysis <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button 
                    onClick={() => setStep(1)}
                    className="text-label opacity-30 hover:opacity-100 transition-opacity"
                  >
                    Back
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" {...transition} className="space-y-12 max-w-[800px] mx-auto">
              <motion.div {...stagger(0)}>
                <span className="text-label text-white">03 — Visuals</span>
                <h1 className="text-7xl md:text-8xl font-serif italic tracking-tight mt-4 text-glow">
                  {loading ? "Analyzing." : "Visual Assets."}
                </h1>
              </motion.div>

              {loading ? (
                <motion.div {...stagger(1)} className="glass-card p-8 h-64 overflow-y-auto font-mono text-[11px] space-y-2 scrollbar-hide">
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-4 opacity-40">
                      <span className="text-white">[{new Date().toLocaleTimeString()}]</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  <div ref={logEndRef} />
                </motion.div>
              ) : (
                <motion.div {...stagger(1)} className="space-y-12">
                  {/* Assets Section */}
                  <div className="space-y-6">
                    <h3 className="text-label uppercase tracking-widest text-white/40">Visual Assets</h3>
                    <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
                      {metadata?.visualAssets && metadata.visualAssets.length > 0 ? metadata.visualAssets.map((asset, i) => (
                        <div key={i} className="flex items-center gap-6 p-4 border border-white/[0.04] bg-zinc-950/50 backdrop-blur-md group/asset">
                          <button 
                            onClick={() => setSelectedAsset(asset)}
                            className="w-32 h-20 bg-black/40 border border-white/5 flex items-center justify-center overflow-hidden relative group/preview"
                          >
                            {assetSwaps[asset.index] ? (
                              asset.type === 'video' ? (
                                <video src={assetSwaps[asset.index]} className="w-full h-full object-cover" />
                              ) : (
                                <img src={assetSwaps[asset.index]} className="w-full h-full object-cover" alt="Swapped" />
                              )
                            ) : asset.type === 'image' || asset.type === 'background' ? (
                              <img 
                                src={(asset.src && asset.src.startsWith('data:')) ? asset.src : `/api/proxy-image?url=${encodeURIComponent(asset.src || '')}`} 
                                className="w-full h-full object-cover" 
                                alt="Original" 
                              />
                            ) : asset.type === 'video' ? (
                              <div className="text-[10px] opacity-40 uppercase">Video Asset</div>
                            ) : asset.type === 'svg' ? (
                              <div dangerouslySetInnerHTML={{ __html: asset.content || '' }} className="w-8 h-8 text-white/60" />
                            ) : null}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                              <Eye className="w-5 h-5 text-white" />
                            </div>
                          </button>

                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] uppercase tracking-widest text-white/40">{asset.type}</span>
                              <span className="text-[10px] opacity-20 font-mono">{asset.width}x{asset.height}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <p className="text-xs opacity-60 truncate max-w-[200px] font-mono">
                                {asset.type === 'svg' ? 'Inline SVG Content' : asset.src?.split('/').pop()}
                              </p>
                              <div className="flex items-center gap-4">
                                <button 
                                  onClick={() => handleDownloadAsset(asset)}
                                  className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                                >
                                  Download
                                </button>
                                <label className="cursor-pointer text-[10px] uppercase tracking-widest text-white hover:text-white/60 transition-colors border-b border-white/20 pb-0.5">
                                  Swap
                                  <input 
                                    type="file" 
                                    className="hidden" 
                                    accept={asset.type === 'video' ? 'video/*' : 'image/*'}
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          setAssetSwaps(prev => ({ ...prev, [asset.index]: reader.result as string }));
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )) : (
                        <div className="p-8 border border-dashed border-white/10 text-center opacity-40 italic">
                          No visual assets identified.
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.div {...stagger(2)}>
                {error ? (
                  <div className="flex items-center gap-4 text-red-400/60 text-label">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                    <button onClick={() => setStep(1)} className="underline hover:text-red-400 transition-colors">Reset</button>
                  </div>
                ) : (
                  <>
                    {!loading && (
                      <button 
                        onClick={() => setStep(4)}
                        className="luxury-button group flex items-center gap-4"
                      >
                        Continue to Palette <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    )}
                    {loading && (
                      <div className="flex items-center gap-4">
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span className="text-label opacity-40">Mapping DOM structure...</span>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" {...transition} className="space-y-12 max-w-[800px] mx-auto">
              <motion.div {...stagger(0)}>
                <span className="text-label text-white">04 — Chromatic</span>
                <h1 className="text-7xl md:text-8xl font-serif italic tracking-tight mt-4 text-glow">
                  Chromatic Soul.
                </h1>
              </motion.div>

              <motion.div {...stagger(1)} className="space-y-12">
                {/* Colors Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-label uppercase tracking-widest text-white/40">Color Palette</h3>
                    <button 
                      onClick={handleScrape}
                      disabled={loading}
                      className="flex items-center gap-2 text-xs text-white hover:opacity-80 transition-opacity disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                      Recalibrate
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
                    {colorPalette.length > 0 ? colorPalette.slice(0, 12).map((color, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-white/[0.04] bg-zinc-950/50 backdrop-blur-md">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-10 h-10 border border-white/10" 
                            style={{ backgroundColor: color.hex }} 
                          />
                          <div className="flex flex-col">
                            <span className="text-label text-xs opacity-40">Original</span>
                            <span className="font-mono text-sm uppercase">{color.hex}</span>
                          </div>
                        </div>
                        
                        <ArrowRight className="w-4 h-4 opacity-20" />

                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-end">
                            <span className="text-label text-xs opacity-40">New</span>
                            <div className="flex items-center gap-2">
                              <input 
                                type="text"
                                value={colorSwaps[color.hex] || color.hex}
                                onChange={(e) => setColorSwaps(prev => ({ ...prev, [color.hex]: e.target.value }))}
                                className="bg-transparent border-b border-white/10 font-mono text-sm uppercase focus:outline-none focus:border-white w-24 text-right"
                              />
                              <div className="relative w-6 h-6 overflow-hidden border border-white/10 rounded-sm">
                                <input 
                                  type="color"
                                  value={colorSwaps[color.hex] || color.hex}
                                  onChange={(e) => setColorSwaps(prev => ({ ...prev, [color.hex]: e.target.value.toUpperCase() }))}
                                  className="absolute -inset-2 w-10 h-10 cursor-pointer bg-transparent border-none"
                                />
                              </div>
                            </div>
                          </div>
                          <div 
                            className="w-10 h-10 border border-white/10" 
                            style={{ backgroundColor: colorSwaps[color.hex] || color.hex }} 
                          />
                        </div>
                      </div>
                    )) : (
                      <div className="p-8 border border-dashed border-white/10 text-center opacity-40 italic">
                        No dominant colors detected.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div {...stagger(2)}>
                <button 
                  onClick={() => setStep(5)}
                  className="luxury-button group flex items-center gap-4"
                >
                  Continue to Analysis <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="step5" {...transition} className="space-y-12">
              <motion.div {...stagger(0)}>
                <span className="text-label text-white">05 — Neural</span>
                <h1 className="text-7xl md:text-8xl font-serif italic tracking-tight mt-4 text-glow">
                  Neural Mapping.
                </h1>
              </motion.div>

              <motion.div {...stagger(1)} className="glass-card p-8 h-64 overflow-y-auto font-mono text-[11px] space-y-2 scrollbar-hide">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-4 opacity-40">
                    <span className="text-white">[{new Date().toLocaleTimeString()}]</span>
                    <span>{log}</span>
                  </div>
                ))}
                <div ref={logEndRef} />
              </motion.div>

              <motion.div {...stagger(2)} className="flex items-center gap-4">
                {error ? (
                  <div className="flex items-center gap-4 text-red-400/60 text-label">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                    <button onClick={() => setStep(1)} className="underline hover:text-red-400 transition-colors">Reset</button>
                  </div>
                ) : (
                  <>
                    {!loading ? (
                      <button 
                        onClick={() => setStep(6)}
                        className="luxury-button group flex items-center gap-4"
                      >
                        Review Blueprint <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    ) : (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span className="text-label opacity-40">Mapping architectural soul...</span>
                      </>
                    )}
                  </>
                )}
              </motion.div>
            </motion.div>
          )}

          {step === 6 && metadata && (
            <motion.div key="step6" {...transition} className="space-y-12">
              <motion.div {...stagger(0)}>
                <span className="text-label text-white">06 — Blueprint</span>
                <h1 className="text-7xl md:text-8xl font-serif italic tracking-tight mt-4 text-glow">
                  The Architecture.
                </h1>
              </motion.div>

              <motion.div {...stagger(1)} className="grid grid-cols-2 gap-12">
                <div className="space-y-2">
                  <span className="text-label opacity-30">Identity</span>
                  <p className="text-2xl font-display tracking-tight text-white">{metadata.title}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-label opacity-30">Origin</span>
                  <p className="text-2xl font-display tracking-tight text-white">{metadata.hostname}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-label opacity-30">Volume</span>
                  <p className="text-2xl font-display tracking-tight text-white">{metadata.pages.length} Pages</p>
                </div>
                <div className="space-y-2">
                  <span className="text-label opacity-30">Engine</span>
                  <p className="text-2xl font-display tracking-tight text-white">{metadata.features.webflow ? 'Webflow IX2' : 'Static HTML'}</p>
                </div>
              </motion.div>

              <motion.div {...stagger(2)}>
                <button 
                  onClick={() => setStep(7)}
                  className="luxury-button group flex items-center gap-4"
                >
                  Review Visuals <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {step === 7 && (
            <motion.div key="step7" {...transition} className="space-y-12">
              <motion.div {...stagger(0)}>
                <span className="text-label text-white">07 — Preservation</span>
                <h1 className="text-7xl md:text-8xl font-serif italic tracking-tight mt-4 text-glow">
                  Aesthetic Soul.
                </h1>
              </motion.div>

              <motion.div {...stagger(1)} className="space-y-4">
                <OptionCard 
                  icon={<Zap className="w-4 h-4" />}
                  label="IX2 Interactions"
                  description="Preserve the kinetic energy of all native animations."
                  active={options.preserveIX2}
                  onClick={() => setOptions(o => ({ ...o, preserveIX2: !o.preserveIX2 }))}
                />
                <OptionCard 
                  icon={<Wind className="w-4 h-4" />}
                  label="Lottie Assets"
                  description="Secure all vector-based motion graphics."
                  active={options.preserveLottie}
                  onClick={() => setOptions(o => ({ ...o, preserveLottie: !o.preserveLottie }))}
                />
                <OptionCard 
                  icon={<Cpu className="w-4 h-4" />}
                  label="Asset Optimization"
                  description="Refine and compress media for peak performance."
                  active={options.optimizeImages}
                  onClick={() => setOptions(o => ({ ...o, optimizeImages: !o.optimizeImages }))}
                />
              </motion.div>

              <motion.div {...stagger(2)}>
                <button 
                  onClick={handleClone}
                  className="luxury-button group flex items-center gap-4"
                >
                  Begin Execution <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {step === 8 && (
            <motion.div key="step8" {...transition} className="space-y-12">
              <motion.div {...stagger(0)}>
                <span className="text-label text-white">08 — Synthesis</span>
                <h1 className="text-7xl md:text-8xl font-serif italic tracking-tight mt-4 text-glow">
                  Digital Alchemy.
                </h1>
              </motion.div>

              <motion.div {...stagger(1)} className="space-y-8">
                {error ? (
                  <div className="flex items-center gap-4 text-red-400/60 text-label">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                    <button onClick={() => setStep(1)} className="underline hover:text-red-400 transition-colors">Reset</button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-label opacity-40">
                        <span>{status}</span>
                        <span>{Math.round((progress.current / progress.total) * 100) || 0}%</span>
                      </div>
                      <div className="h-px w-full bg-white/5 overflow-hidden">
                        <motion.div 
                          className="h-full bg-white"
                          initial={{ width: 0 }}
                          animate={{ width: `${(progress.current / progress.total) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                    <p className="text-body">
                      Our synthesis engine is currently manifesting the digital state. 
                      This process is deliberate and requires absolute precision.
                    </p>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}

          {step === 9 && (
            <motion.div key="step9" {...transition} className="space-y-12">
              <motion.div {...stagger(0)}>
                <span className="text-label text-white">09 — Refinement</span>
                <h1 className="text-7xl md:text-8xl font-serif italic tracking-tight mt-4 text-glow">
                  Bespoke Polish.
                </h1>
              </motion.div>

              <motion.div {...stagger(1)} className="space-y-6">
                <p className="text-body max-w-md">
                  The visual state is mirrored. Shall we apply our signature 
                  architectural cleaning to ensure the code is as elegant as the design?
                </p>
                <div className="flex gap-4">
                  <RefinementCard 
                    label="Artisanal CSS"
                    description="Remove unused classes and optimize selectors."
                    active={options.cleanCSS}
                    onClick={() => setOptions(o => ({ ...o, cleanCSS: true }))}
                  />
                  <RefinementCard 
                    label="Raw Heritage"
                    description="Keep the original Webflow CSS structure intact."
                    active={!options.cleanCSS}
                    onClick={() => setOptions(o => ({ ...o, cleanCSS: false }))}
                  />
                </div>
              </motion.div>

              <motion.div {...stagger(2)}>
                <button 
                  onClick={() => setStep(10)}
                  className="luxury-button group flex items-center gap-4"
                >
                  Finalize Assets <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </motion.div>
          )}

          {step === 10 && (
            <motion.div key="step10" {...transition} className="space-y-12">
              <motion.div {...stagger(0)}>
                <span className="text-label text-white">10 — Manifestation</span>
                <h1 className="text-7xl md:text-8xl font-serif italic tracking-tight mt-4 text-glow">
                  Final Synthesis.
                </h1>
              </motion.div>

              <motion.div {...stagger(1)} className="space-y-6">
                <p className="text-body max-w-md">
                  {rewriting 
                    ? "Our cognitive engine is currently manifesting the new narrative. This involves deep semantic analysis and bespoke asset mapping."
                    : "The architecture is mirrored. We are now ready to package the assets and apply the final intelligence layer."}
                </p>
                <div className="flex items-center gap-4">
                  {rewriting ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  )}
                  <span className="text-label opacity-40">{rewriting ? status : "Architecture Manifested"}</span>
                </div>
              </motion.div>

              <motion.div {...stagger(2)}>
                {error ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 text-red-400/60 text-label">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                    <button 
                      onClick={() => { setError(null); handleRewrite(); }}
                      className="text-label text-white hover:underline w-fit"
                    >
                      Retry Synthesis
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      if (purpose) {
                        handleRewrite();
                      } else {
                        setStep(11);
                      }
                    }}
                    disabled={rewriting}
                    className="luxury-button group flex items-center gap-4 disabled:opacity-20"
                  >
                    {purpose ? (rewriting ? 'Synthesizing...' : 'Synthesize & Rewrite') : 'View Result'} 
                    {!rewriting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                  </button>
                )}
              </motion.div>
            </motion.div>
          )}

          {step === 11 && (
            <motion.div key="step11" {...transition} className="space-y-12">
              <motion.div {...stagger(0)}>
                <span className="text-label text-white">11 — Completion</span>
                <h1 className="text-7xl md:text-8xl font-serif italic tracking-tight mt-4 text-glow">
                  Mirrored <span className="font-sans font-light text-4xl md:text-5xl align-middle mx-4">&</span> Refined.
                </h1>
              </motion.div>

              <motion.div {...stagger(1)} className="space-y-8">
                <div className="flex items-center gap-4 text-white">
                  <CheckCircle2 className="w-8 h-8" />
                  <span className="text-2xl font-display">Extraction successful.</span>
                </div>
                <p className="text-body max-w-md">
                  The site has been cloned with 99.8% fidelity. All assets, 
                  scripts, and interactions are now contained within a single 
                  optimized archive.
                </p>
              </motion.div>

              <motion.div {...stagger(2)} className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={customFilename}
                      onChange={(e) => setCustomFilename(e.target.value)}
                      className="luxury-input w-full md:w-64 text-sm font-mono"
                      placeholder="filename.zip"
                    />
                  </div>
                  <motion.button 
                    onClick={downloadZip}
                    disabled={loading}
                    className="luxury-button group relative flex items-center justify-center gap-4 px-12 py-6 text-xl shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-6 h-6" />
                    Download Archive
                    <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  </motion.button>

                  <motion.button 
                    onClick={downloadAsFolder}
                    disabled={loading}
                    className="luxury-button group relative flex items-center justify-center gap-4 px-12 py-6 text-xl bg-white/5 border-white/10 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Layers className="w-6 h-6" />
                    Download as Folder
                    <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                  </motion.button>
                </div>

                <div className="flex gap-8">
                  {previewId && (
                    <button 
                      onClick={() => setShowPreview(true)}
                      className="group flex items-center gap-4 text-label hover:text-white transition-colors"
                    >
                      Live Preview <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </button>
                  )}
                  <button 
                    onClick={() => { setStep(1); setMetadata(null); setPreviewId(null); setUrl(''); setPurpose(''); }}
                    className="text-label opacity-30 hover:opacity-100 transition-opacity"
                  >
                    New Clone
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Asset Preview Modal */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/95 flex flex-col items-center justify-center p-12"
            onClick={() => setSelectedAsset(null)}
          >
            <button 
              onClick={() => setSelectedAsset(null)}
              className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors z-20"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full flex flex-col items-center gap-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative group">
                {assetSwaps[selectedAsset.index] ? (
                  selectedAsset.type === 'video' ? (
                    <video src={assetSwaps[selectedAsset.index]} controls className="max-w-full max-h-[70vh] shadow-2xl" />
                  ) : (
                    <img src={assetSwaps[selectedAsset.index]} className="max-w-full max-h-[70vh] shadow-2xl" alt="Preview" />
                  )
                ) : selectedAsset.type === 'image' || selectedAsset.type === 'background' ? (
                  <div className="relative min-w-[200px] min-h-[200px] flex items-center justify-center">
                    <img 
                      src={(selectedAsset.src && selectedAsset.src.startsWith('data:')) ? selectedAsset.src : `/api/proxy-image?url=${encodeURIComponent(selectedAsset.src || '')}`} 
                      className="max-w-full max-h-[70vh] shadow-2xl" 
                      alt="Preview" 
                      onLoad={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.opacity = '1';
                        const loader = target.nextElementSibling;
                        if (loader) (loader as HTMLElement).style.display = 'none';
                      }}
                      style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const loader = target.nextElementSibling;
                        if (loader) (loader as HTMLElement).style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const errorMsg = document.createElement('div');
                          errorMsg.className = 'p-12 border border-white/10 bg-white/5 text-label opacity-40 text-center max-w-md';
                          errorMsg.innerText = 'Unable to manifest visual state directly. This asset may be protected or cross-origin restricted.';
                          parent.appendChild(errorMsg);
                        }
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </div>
                  </div>
                ) : selectedAsset.type === 'video' ? (
                  <div className="relative min-w-[400px] min-h-[300px] flex items-center justify-center">
                    <video 
                      src={selectedAsset.src.startsWith('data:') ? selectedAsset.src : `/api/proxy-image?url=${encodeURIComponent(selectedAsset.src || '')}`} 
                      controls 
                      className="max-w-full max-h-[70vh] shadow-2xl"
                      onLoadedData={(e) => {
                        const target = e.target as HTMLVideoElement;
                        target.style.opacity = '1';
                        const loader = target.nextElementSibling;
                        if (loader) (loader as HTMLElement).style.display = 'none';
                      }}
                      style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                      onError={(e) => {
                        const target = e.target as HTMLVideoElement;
                        target.style.display = 'none';
                        const loader = target.nextElementSibling;
                        if (loader) (loader as HTMLElement).style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const errorMsg = document.createElement('div');
                          errorMsg.className = 'p-12 border border-white/10 bg-white/5 text-label opacity-40 text-center max-w-md';
                          errorMsg.innerText = 'Unable to manifest video state directly. This asset may be protected or cross-origin restricted.';
                          parent.appendChild(errorMsg);
                        }
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </div>
                  </div>
                ) : selectedAsset.type === 'svg' ? (
                  <div 
                    dangerouslySetInnerHTML={{ __html: selectedAsset.content || '' }} 
                    className="w-[400px] h-[400px] text-white flex items-center justify-center" 
                  />
                ) : null}
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="text-center">
                  <h3 className="text-2xl font-serif italic text-white">{selectedAsset.type === 'svg' ? 'Vector Asset' : selectedAsset.src?.split('/').pop() || 'Swapped Asset'}</h3>
                  <div className="flex items-center justify-center gap-4 mt-1">
                    <p className="text-label opacity-40">{selectedAsset.width} x {selectedAsset.height} — {selectedAsset.type.toUpperCase()}</p>
                    <div className="flex items-center gap-4">
                      {selectedAsset.src && (
                        <>
                          <a 
                            href={selectedAsset.src} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white flex items-center gap-1"
                          >
                            View Original <ExternalLink className="w-2 h-2" />
                          </a>
                          <button 
                            onClick={async () => {
                              const src = (selectedAsset.src && selectedAsset.src.startsWith('data:')) 
                                ? selectedAsset.src 
                                : `/api/proxy-image?url=${encodeURIComponent(selectedAsset.src || '')}`;
                              
                              try {
                                const response = await fetch(src);
                                const blob = await response.blob();
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = selectedAsset.src?.split('/').pop() || 'asset';
                                document.body.appendChild(a);
                                a.click();
                                window.URL.revokeObjectURL(url);
                                document.body.removeChild(a);
                              } catch (error) {
                                console.error('Download failed:', error);
                              }
                            }}
                            className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white flex items-center gap-1"
                          >
                            Download <Download className="w-2 h-2" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleDownloadAsset(selectedAsset)}
                    className="luxury-button flex items-center gap-2 px-8"
                  >
                    <Download className="w-4 h-4" />
                    Download Asset
                  </button>
                  <label className="luxury-button flex items-center gap-2 px-8 cursor-pointer bg-white/5 border-white/10 hover:bg-white/10">
                    <RefreshCw className="w-4 h-4" />
                    Swap Asset
                    <input 
                      type="file" 
                      className="hidden" 
                      accept={selectedAsset.type === 'video' ? 'video/*' : 'image/*'}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setAssetSwaps(prev => ({ ...prev, [selectedAsset.index]: reader.result as string }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && previewId && (
          <VisualEditor 
            previewId={previewId} 
            onClose={() => setShowPreview(false)} 
            hostname={metadata?.hostname}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full h-14 flex items-center justify-between px-12 z-50 border-t border-white/[0.03] bg-black/10 backdrop-blur-md">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3 h-3 text-white" />
            <span className="text-label">Encrypted Session</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3 opacity-40" />
            <span className="text-label opacity-40">Global Edge Network</span>
          </div>
        </div>
        <div className="text-label opacity-20">
          © 2026 Boonk. All rights reserved.
        </div>
      </footer>
    </motion.div>
  );
}

function OptionCard({ icon, label, description, active, onClick }: { 
  icon: React.ReactNode; 
  label: string; 
  description: string; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className={`w-full text-left p-6 border transition-all duration-500 group glass-card relative overflow-hidden ${active ? 'border-white bg-white/5' : 'border-white/[0.04] hover:border-white/10'}`}
    >
      <div className="flex items-start gap-6 relative z-10">
        <div className={`mt-1 transition-colors duration-500 ${active ? 'text-white' : 'opacity-20 group-hover:opacity-100'}`}>
          {icon}
        </div>
        <div className="space-y-1">
          <span className={`text-label font-serif italic text-sm transition-colors duration-500 ${active ? 'text-white' : 'opacity-40'}`}>{label}</span>
          <p className="text-body text-sm opacity-30">{description}</p>
        </div>
      </div>
      {active && (
        <motion.div 
          layoutId="active-glow"
          className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent pointer-events-none"
        />
      )}
    </button>
  );
}

function RefinementCard({ label, description, active, onClick }: { 
  label: string; 
  description: string; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className={`flex-1 text-left p-6 border transition-all duration-500 group glass-card relative overflow-hidden ${active ? 'border-white bg-white/5' : 'border-white/[0.04] hover:border-white/10'}`}
    >
      <div className="space-y-1 relative z-10">
        <span className={`text-label font-serif italic text-sm transition-colors duration-500 ${active ? 'text-white' : 'opacity-40'}`}>{label}</span>
        <p className="text-body text-xs opacity-20">{description}</p>
      </div>
      {active && (
        <motion.div 
          layoutId="active-refinement-glow"
          className="absolute inset-0 bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none"
        />
      )}
    </button>
  );
}
