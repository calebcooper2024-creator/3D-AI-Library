import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Share2, 
  Activity, 
  Zap, 
  Shield, 
  Cpu, 
  Search,
  Filter,
  Maximize2,
  Minimize2,
  Info
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  humanName: string;
  level: number;
  department?: string;
  role?: string;
}

interface NetworkMeshProps {
  agents: Agent[];
  isDarkMode: boolean;
  isSystemHalted?: boolean;
  selectedAgentId?: string | null;
  onAgentSelect?: (id: string | null) => void;
}

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  humanName: string;
  level: number;
  department: string;
  color: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  value: number;
  pulse?: boolean;
}

const DEPT_COLORS: Record<string, string> = {
  'Executive': '#3b82f6', // Blue
  'Brand Identity & Strategy': '#6366f1', // Indigo
  'Creative & Visual Production': '#ec4899', // Pink
  'Marketing & Advertising': '#f59e0b', // Amber
  'Supply Chain, Finance & Operations': '#10b981', // Emerald
  'Customer Support & UI Generation': '#8b5cf6', // Violet
  'Engineering, Software & QA': '#06b6d4', // Cyan
};

export const NetworkMesh: React.FC<NetworkMeshProps> = ({ agents, isDarkMode, isSystemHalted, selectedAgentId, onAgentSelect }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sync internal selectedNode with external selectedAgentId
  useEffect(() => {
    if (selectedAgentId) {
      const agent = agents.find(a => a.id === selectedAgentId);
      if (agent) {
        // We need to find the node in the simulation, but for now we just set the selectedNode state
        // The simulation effect will handle the visual highlight if we use selectedAgentId directly in the drawing logic
      }
    } else {
      setSelectedNode(null);
    }
  }, [selectedAgentId, agents]);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || dimensions.width === 0) return;

    const { width, height } = dimensions;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height);

    const g = svg.append("g");

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Prepare data
    const nodes: Node[] = agents.map(a => {
      let dept = a.department || 'Executive';
      
      // Map Level 2 agents to their respective departments for color alignment
      if (a.level === 2) {
        if (a.id === 'A02') dept = 'Brand Identity & Strategy';
        if (a.id === 'A03') dept = 'Creative & Visual Production';
        if (a.id === 'A04') dept = 'Marketing & Advertising';
        if (a.id === 'A05') dept = 'Supply Chain, Finance & Operations';
        if (a.id === 'A06') dept = 'Customer Support & UI Generation';
        if (a.id === 'A07') dept = 'Engineering, Software & QA';
      }

      const baseColor = DEPT_COLORS[dept] || '#94a3b8';
      let finalColor = baseColor;

      // Make Level 2 (Supervisors) darker than their team
      if (a.level === 2) {
        finalColor = d3.color(baseColor)?.darker(1.2).toString() || baseColor;
      }
      
      // Level 1 (Steve Jobs) - Deep, authoritative blue
      if (a.level === 1) {
        finalColor = '#1e40af'; 
      }

      return {
        id: a.id,
        name: a.name,
        humanName: a.humanName,
        level: a.level,
        department: dept,
        color: finalColor
      };
    });

    // Create links based on hierarchy and some random "handshakes"
    const links: Link[] = [];
    
    // 1. Hierarchical links (Level 1 to Level 2, Level 2 to Level 3)
    const level1 = nodes.filter(n => n.level === 1);
    const level2 = nodes.filter(n => n.level === 2);
    const level3 = nodes.filter(n => n.level === 3);

    level2.forEach(l2 => {
      links.push({ source: level1[0].id, target: l2.id, value: 2 });
    });

    level3.forEach(l3 => {
      // Find its supervisor (Level 2) based on department or just random for visual density
      const supervisor = level2.find(l2 => {
        if (l3.department === 'Brand Identity & Strategy') return l2.id === 'A02';
        if (l3.department === 'Creative & Visual Production') return l2.id === 'A03';
        if (l3.department === 'Marketing & Advertising') return l2.id === 'A04';
        if (l3.department === 'Supply Chain, Finance & Operations') return l2.id === 'A05';
        if (l3.department === 'Customer Support & UI Generation') return l2.id === 'A06';
        if (l3.department === 'Engineering, Software & QA') return l2.id === 'A07';
        return false;
      }) || level2[Math.floor(Math.random() * level2.length)];
      
      links.push({ source: supervisor.id, target: l3.id, value: 1 });
    });

    // 2. Cross-departmental "handshakes" (Random links to show the mesh)
    for (let i = 0; i < 20; i++) {
      const source = nodes[Math.floor(Math.random() * nodes.length)];
      const target = nodes[Math.floor(Math.random() * nodes.length)];
      if (source.id !== target.id) {
        links.push({ source: source.id, target: target.id, value: 0.5, pulse: Math.random() > 0.7 });
      }
    }

    // Simulation
    const simulation = d3.forceSimulation<Node>(nodes)
      .alphaDecay(0.01) // Slower decay for more gradual settling (default is ~0.0228)
      .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40));

    if (isSystemHalted) {
      simulation.stop();
      // Tick once to position nodes if halted on start
      for (let i = 0; i < 100; ++i) simulation.tick();
    }

    // Draw links
    const link = g.append("g")
      .attr("stroke", isDarkMode ? "#ffffff10" : "#00000010")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value) * 2)
      .attr("opacity", isSystemHalted ? 1 : 0);

    if (!isSystemHalted) {
      link.transition()
        .duration(3000) // Slow fade in for links
        .attr("opacity", 1);
    }

    // Pulse effects (moving circles along lines)
    const pulses = g.append("g")
      .selectAll("circle.pulse")
      .data(links.filter(l => l.pulse))
      .join("circle")
      .attr("class", "pulse")
      .attr("r", 2)
      .attr("fill", "#3b82f6")
      .attr("filter", "blur(1px)")
      .attr("opacity", 0);

    function animatePulses() {
      pulses.each(function(d) {
        const circle = d3.select(this);
        const source = d.source as Node;
        const target = d.target as Node;
        
        // Ensure coordinates exist before starting transition
        if (source.x === undefined || source.y === undefined || target.x === undefined || target.y === undefined) {
          return;
        }

        circle.interrupt(); // Stop any existing transitions
        
        circle.attr("cx", source.x)
              .attr("cy", source.y)
              .attr("opacity", 1)
              .transition()
              .duration(4000 + Math.random() * 4000) // Slower pulses
              .ease(d3.easeLinear)
              .attr("cx", target.x)
              .attr("cy", target.y)
              .on("end", function() {
                d3.select(this).attr("opacity", 0);
                setTimeout(() => animatePulses(), Math.random() * 3000);
              });
      });
    }

    // Draw nodes
    const node = g.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("cursor", "pointer")
      .attr("opacity", isSystemHalted ? 1 : 0)
      .on("click", (event, d) => {
        setSelectedNode(d);
        onAgentSelect?.(d.id);
        event.stopPropagation();
      })
      .call(d3.drag<SVGGElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    if (!isSystemHalted) {
      node.transition()
        .duration(2500)
        .delay((d, i) => i * 20)
        .attr("opacity", 1);
    }

    // Node circles
    const circles = node.append("circle")
      .attr("r", d => d.level === 1 ? 15 : d.level === 2 ? 10 : 6)
      .attr("fill", d => d.color)
      .attr("stroke", d => d.id === selectedAgentId ? "#3b82f6" : (isDarkMode ? "#000" : "#fff"))
      .attr("stroke-width", d => d.id === selectedAgentId ? 4 : 2)
      .attr("filter", d => d.id === selectedAgentId ? `drop-shadow(0 0 10px #3b82f6)` : `drop-shadow(0 0 5px ${d.color}60)`);

    // Node labels (only for Level 1 and 2 by default, or if selected)
    node.append("text")
      .attr("dy", d => d.level === 1 ? 25 : 20)
      .attr("text-anchor", "middle")
      .attr("font-size", d => d.level === 1 ? "12px" : "10px")
      .attr("font-weight", "bold")
      .attr("fill", d => d.id === selectedAgentId ? "#3b82f6" : (isDarkMode ? "#ffffff80" : "#00000080"))
      .text(d => d.humanName)
      .attr("opacity", d => (d.level <= 2 || d.id === selectedAgentId) ? 1 : 0);

    // Tick function to update positions
    const ticked = () => {
      link
        .attr("x1", d => (d.source as Node).x!)
        .attr("y1", d => (d.source as Node).y!)
        .attr("x2", d => (d.target as Node).x!)
        .attr("y2", d => (d.target as Node).y!);

      node
        .attr("transform", d => `translate(${d.x},${d.y})`);
        
      pulses
        .attr("cx", function(d) { return (d.source as Node).x!; })
        .attr("cy", function(d) { return (d.source as Node).y!; });
    };

    simulation.on("tick", ticked);

    if (isSystemHalted) {
      ticked();
      // Ensure visibility if halted
      link.attr("opacity", 1);
      node.attr("opacity", 1);
    } else {
      animatePulses();
    }

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [agents, isDarkMode, isSystemHalted, selectedAgentId, dimensions]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      className={`w-full h-full flex flex-col bg-white dark:bg-[#0A0A0A] overflow-hidden transition-colors duration-500`}
    >
      {/* Mesh Header Overlay */}
      <div className="absolute top-8 left-8 z-30 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-3 bg-white/80 dark:bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-white/10 pointer-events-auto shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Share2 size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight">Network Mesh</h2>
            <p className="text-[10px] uppercase tracking-widest opacity-50 font-medium">Real-time A2A Handshakes</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/80 dark:bg-black/40 backdrop-blur-md p-2 rounded-xl border border-slate-200 dark:border-white/10 pointer-events-auto shadow-lg">
          <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-[9px] font-bold uppercase tracking-widest">
            <Activity size={10} />
            Active
          </div>
          <div className="w-px h-4 bg-slate-200 dark:bg-white/10 mx-1" />
          <div className="text-[10px] font-medium opacity-60 px-2">
            44 Nodes Connected
          </div>
        </div>
      </div>

      {/* Search & Controls Overlay */}
      <div className="absolute top-8 right-8 z-30 flex items-center gap-3 pointer-events-auto">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30 group-focus-within:opacity-100 transition-opacity" />
          <input 
            type="text"
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white/80 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-48 transition-all"
          />
        </div>
        <button 
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="w-10 h-10 rounded-xl bg-white/80 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/10 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
        >
          {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>

      {/* Legend Overlay */}
      <div className="absolute bottom-8 left-8 z-30 bg-white/80 dark:bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-white/10 pointer-events-auto shadow-xl">
        <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-3">Department Mesh</h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {Object.entries(DEPT_COLORS).map(([dept, color]) => (
            <div key={dept} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[9px] font-medium opacity-70 whitespace-nowrap">{dept}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Mesh Container */}
      <div ref={containerRef} className="flex-1 relative cursor-grab active:cursor-grabbing">
        <svg ref={svgRef} className="w-full h-full" />
      </div>

      {/* Bottom Status Bar */}
      <div className="h-12 border-t border-slate-200 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-md px-8 flex items-center justify-between z-30">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Mesh Synchronized</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Latency: 12ms</span>
          </div>
        </div>
        <div className="flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity cursor-help">
          <Info size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Force-Directed Layout v1.0</span>
        </div>
      </div>
    </motion.div>
  );
};
