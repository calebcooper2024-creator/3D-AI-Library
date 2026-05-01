import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Loader2, Globe, Undo2, CheckCircle2 } from 'lucide-react';

interface VisualEditorProps {
  previewId: string;
  onClose: () => void;
  hostname?: string;
}

interface EditRecord {
  boonkId: string;
  originalHtml: string;
  newHtml: string;
  selector: string;
  filePath: string;
}

export function VisualEditor({ previewId, onClose, hostname }: VisualEditorProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [selectedElement, setSelectedElement] = useState<{
    html: string;
    selector: string;
    rect: DOMRect;
    path: string;
    boonkId: string;
  } | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isGlobal, setIsGlobal] = useState(false);
  const [currentPath, setCurrentPath] = useState('index.html');
  // Undo history stack
  const [history, setHistory] = useState<EditRecord[]>([]);
  const [lastApplied, setLastApplied] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'ELEMENT_CLICKED') {
        const { html, rect, path, selector, boonkId } = event.data;
        setSelectedElement({ html, selector, rect, path, boonkId });
      } else if (event.data?.type === 'NAVIGATE') {
        setCurrentPath(event.data.path);
        setSelectedElement(null);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleIframeLoad = () => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    // Inject styles for highlighting
    const style = doc.createElement('style');
    style.textContent = `
      .boonk-hover-highlight {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px !important;
        cursor: pointer !important;
        transition: outline 0.1s ease-in-out;
      }
      .boonk-selected-highlight {
        outline: 3px solid #10b981 !important;
        outline-offset: 2px !important;
      }
    `;
    doc.head.appendChild(style);

    // Inject script for interaction
    const script = doc.createElement('script');
    script.textContent = `
      let currentHover = null;
      let currentSelected = null;
      let idCounter = 0;

      function getCssSelector(el) {
        if (!(el instanceof Element)) return '';
        var path = [];
        while (el.nodeType === Node.ELEMENT_NODE) {
          var selector = el.nodeName.toLowerCase();
          if (el.id) {
            selector += '#' + CSS.escape(el.id);
            path.unshift(selector);
            break;
          } else {
            var sib = el, nth = 1;
            while (sib = sib.previousElementSibling) {
              if (sib.nodeName.toLowerCase() == el.nodeName.toLowerCase()) nth++;
            }
            if (nth != 1) selector += ':nth-of-type(' + nth + ')';
          }
          path.unshift(selector);
          el = el.parentNode;
        }
        return path.join(' > ');
      }

      document.addEventListener('mouseover', (e) => {
        if (currentSelected && currentSelected.contains(e.target)) return;
        if (currentHover) currentHover.classList.remove('boonk-hover-highlight');
        currentHover = e.target;
        if (currentHover !== currentSelected) {
          currentHover.classList.add('boonk-hover-highlight');
        }
      });

      document.addEventListener('mouseout', (e) => {
        if (currentHover && currentHover !== currentSelected) {
          currentHover.classList.remove('boonk-hover-highlight');
          currentHover = null;
        }
      });

      document.addEventListener('click', (e) => {
        // Shift+click = normal navigation
        if (e.shiftKey) return;

        e.preventDefault();
        e.stopPropagation();

        if (currentSelected) {
          currentSelected.classList.remove('boonk-selected-highlight');
        }

        currentSelected = e.target;
        if (currentHover) currentHover.classList.remove('boonk-hover-highlight');
        currentSelected.classList.add('boonk-selected-highlight');

        const boonkId = 'boonk-' + (++idCounter);
        currentSelected.setAttribute('data-boonk-id', boonkId);

        const rect = currentSelected.getBoundingClientRect();
        const selector = getCssSelector(currentSelected);

        // Clean the HTML snapshot before sending
        const clone = currentSelected.cloneNode(true);
        clone.classList.remove('boonk-selected-highlight', 'boonk-hover-highlight');
        clone.removeAttribute('data-boonk-id');

        window.parent.postMessage({
          type: 'ELEMENT_CLICKED',
          html: clone.outerHTML,
          selector: selector,
          rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
          boonkId,
          path: window.location.pathname.split('/').pop() || 'index.html'
        }, '*');
      }, true);
    `;
    doc.body.appendChild(script);
  };

  /**
   * Safely replace an element in the iframe by its boonkId attribute.
   * Returns the new node so callers can update references.
   */
  const replaceNodeInIframe = (boonkId: string, newHtml: string): HTMLElement | null => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument) return null;
    const doc = iframe.contentDocument;

    const target = doc.querySelector(`[data-boonk-id="${boonkId}"]`) as HTMLElement | null;
    if (!target || !target.parentNode) return null;

    // Use a template element for safe, context-aware HTML parsing
    const template = doc.createElement('template');
    template.innerHTML = newHtml.trim();
    const newNode = template.content.firstElementChild as HTMLElement | null;
    if (!newNode) return null;

    target.parentNode.replaceChild(newNode, target);
    return newNode;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedElement || !prompt) return;

    setIsEditing(true);
    setLastApplied(null);
    try {
      const response = await fetch('/api/edit-element', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          previewId,
          filePath: currentPath,
          elementHtml: selectedElement.html,
          selector: selectedElement.selector,
          prompt,
          isGlobal
        })
      });

      if (!response.ok) throw new Error('Failed to edit element');
      const data = await response.json();

      if (data.isGlobal) {
        // Global change — reload iframe so all instances update
        if (iframeRef.current) {
          iframeRef.current.src = iframeRef.current.src;
        }
        setSelectedElement(null);
      } else {
        // Replace the node in the live DOM safely
        const newNode = replaceNodeInIframe(selectedElement.boonkId, data.updatedHtml);
        if (!newNode && iframeRef.current) {
          // Fallback: reload if we can't find the node
          iframeRef.current.src = iframeRef.current.src;
        }

        // Push to undo history
        setHistory(prev => [
          ...prev,
          {
            boonkId: selectedElement.boonkId,
            originalHtml: selectedElement.html,
            newHtml: data.updatedHtml,
            selector: selectedElement.selector,
            filePath: currentPath,
          }
        ]);
        setLastApplied(prompt);
        setSelectedElement(null);
      }

      setPrompt('');
    } catch (error) {
      console.error('Edit error:', error);
      alert('Failed to apply edit. Please try again.');
    } finally {
      setIsEditing(false);
    }
  };

  const handleUndo = async () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];

    // Revert in the live DOM first
    const iframe = iframeRef.current;
    if (iframe?.contentDocument) {
      const doc = iframe.contentDocument;
      // Try to find the node that was placed by the last edit (it won't have the old boonkId)
      // so we fall back to a server-side revert and reload
    }

    // Revert on the server
    try {
      const response = await fetch('/api/edit-element', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          previewId,
          filePath: last.filePath,
          elementHtml: last.newHtml,        // current (wrong) html
          selector: last.selector,
          prompt: '__UNDO__',               // special sentinel
          isGlobal: false,
          undoHtml: last.originalHtml       // what to restore
        })
      });

      if (response.ok) {
        // Reload iframe to reflect server-side revert
        if (iframeRef.current) {
          iframeRef.current.src = iframeRef.current.src;
        }
        setHistory(prev => prev.slice(0, -1));
        setLastApplied(null);
      }
    } catch (err) {
      console.error('Undo failed:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-obsidian-900 flex flex-col"
    >
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-12 shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-label text-white">Live Edit Mode</span>
          <div className="w-px h-3 bg-white/10" />
          <span className="text-label opacity-40">{hostname}</span>
          <div className="w-px h-3 bg-white/10" />
          <span className="text-label text-emerald-400">1. Click any element</span>
          <div className="w-px h-3 bg-white/10" />
          <span className="text-label text-emerald-400">2. Describe the change</span>
          <div className="w-px h-3 bg-white/10" />
          <span className="text-label text-emerald-400">3. Click Apply</span>
          <span className="text-label opacity-40 ml-4">(Shift+Click to navigate links)</span>
        </div>
        <div className="flex items-center gap-4">
          {history.length > 0 && (
            <button
              onClick={handleUndo}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors text-sm"
              title="Undo last edit"
            >
              <Undo2 className="w-4 h-4" />
              Undo ({history.length})
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex-1 bg-[#fff] relative overflow-hidden">
        <iframe
          ref={iframeRef}
          src={`/previews/${previewId}/index.html`}
          className="w-full h-full border-none"
          title="Site Preview"
          onLoad={handleIframeLoad}
        />

        {/* "Change applied" toast */}
        <AnimatePresence>
          {lastApplied && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-emerald-900/90 border border-emerald-500/30 text-emerald-300 px-5 py-3 rounded-xl shadow-xl backdrop-blur-xl text-sm"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Applied: <span className="opacity-70 italic">"{lastApplied}"</span></span>
              <button
                onClick={handleUndo}
                className="ml-2 underline text-emerald-200 hover:text-white transition-colors"
              >
                Undo
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit panel — appears when an element is selected */}
        <AnimatePresence>
          {selectedElement && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-obsidian-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
            >
              <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-white/40 truncate max-w-[400px]">
                    {selectedElement.selector}
                  </span>
                  <button
                    onClick={() => setSelectedElement(null)}
                    className="text-white/40 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-sm text-white/80 max-h-24 overflow-y-auto font-mono text-xs opacity-70 leading-relaxed">
                  {selectedElement.html.length > 300
                    ? selectedElement.html.slice(0, 300) + '…'
                    : selectedElement.html}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. 'Change this heading to say Contact Us in bold' or 'Replace with a landscape photo of mountains'"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30"
                    disabled={isEditing}
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={isEditing || !prompt}
                    className="bg-white text-black px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-white/90 disabled:opacity-50 transition-colors"
                  >
                    {isEditing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {isEditing ? 'Applying…' : 'Apply'}
                  </button>
                </div>

                <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer w-fit select-none">
                  <input
                    type="checkbox"
                    checked={isGlobal}
                    onChange={(e) => setIsGlobal(e.target.checked)}
                    className="rounded border-white/20 bg-white/5 text-white focus:ring-white/30"
                  />
                  <Globe className="w-4 h-4" />
                  Apply globally across all pages (nav, footer, repeated components)
                </label>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}