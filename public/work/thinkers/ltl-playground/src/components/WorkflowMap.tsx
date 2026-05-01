import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { motion } from 'motion/react';

interface Node extends d3.HierarchyNode<any> {
  x: number;
  y: number;
}

interface WorkflowMapProps {
  agents: any[];
  isDarkMode: boolean;
  logs: any[];
}

export const WorkflowMap = React.memo(({ agents, isDarkMode, logs }: WorkflowMapProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const logsRef = useRef(logs);

  // Update logs ref whenever logs change without triggering re-renders of the effect
  useEffect(() => {
    logsRef.current = logs;
  }, [logs]);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    const width = 3000;
    const height = 4000;
    const margin = { top: 100, right: 600, bottom: 100, left: 200 };

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create hierarchy
    const rootAgent = agents.find(a => a.level === 1);
    const supervisors = agents.filter(a => a.level === 2);
    const specialists = agents.filter(a => a.level === 3);

    const data = {
      name: rootAgent.name,
      id: rootAgent.id,
      children: supervisors.map(s => ({
        name: s.name,
        id: s.id,
        children: specialists
          .filter(sp => sp.department === s.name || sp.department?.includes(s.name.split(' ')[0]))
          .slice(0, 4) // Limit for visualization clarity
          .map(sp => ({
            name: sp.name,
            id: sp.id
          }))
      }))
    };

    const treeLayout = d3.tree()
      .size([height - margin.top - margin.bottom, width - margin.left - margin.right])
      .separation((a, b) => (a.parent === b.parent ? 1.5 : 2.5));
    const root = d3.hierarchy(data);
    treeLayout(root);

    // Links
    svg.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal()
        .x((d: any) => d.y)
        .y((d: any) => d.x) as any)
      .attr('fill', 'none')
      .attr('stroke', isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)')
      .attr('stroke-width', 2);

    // Nodes
    const node = svg.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`)
      .style('cursor', 'pointer')
      .on('mouseover', (event, d: any) => {
        const agentId = d.data.id;
        const agent = agents.find(a => a.id === agentId);
        // Use logsRef to get the latest logs without re-running the effect
        const lastLog = [...logsRef.current].reverse().find(l => l.agentId === agentId);
        
        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = '1';
          tooltipRef.current.innerHTML = `
            <div class="space-y-1">
              <div class="flex items-center justify-between gap-4">
                <span class="text-[10px] font-bold uppercase tracking-widest text-blue-500">${agentId}</span>
                <span class="text-[9px] opacity-40 font-mono">${lastLog?.timestamp || 'N/A'}</span>
              </div>
              <div class="text-sm font-bold tracking-tight">${agent?.name || d.data.name}</div>
              <div class="text-[10px] opacity-60 italic font-medium">
                ${lastLog ? `Last Action: ${lastLog.message}` : 'No recent activity recorded.'}
              </div>
              ${lastLog?.data ? `
                <div class="mt-2 p-2 rounded bg-black/20 border border-white/5 text-[9px] font-mono opacity-40 truncate max-w-[200px]">
                  ${JSON.stringify(lastLog.data)}
                </div>
              ` : ''}
            </div>
          `;
          
          const [x, y] = d3.pointer(event, svgRef.current?.parentElement);
          tooltipRef.current.style.left = `${x + 20}px`;
          tooltipRef.current.style.top = `${y - 20}px`;
        }

        d3.select(event.currentTarget).select('circle')
          .transition()
          .duration(200)
          .attr('r', 55)
          .attr('stroke-width', 6);
      })
      .on('mousemove', (event) => {
        if (tooltipRef.current) {
          const [x, y] = d3.pointer(event, svgRef.current?.parentElement);
          tooltipRef.current.style.left = `${x + 20}px`;
          tooltipRef.current.style.top = `${y - 20}px`;
        }
      })
      .on('mouseout', (event) => {
        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = '0';
        }
        
        d3.select(event.currentTarget).select('circle')
          .transition()
          .duration(200)
          .attr('r', 45)
          .attr('stroke-width', 4);
      });

    // Node circles
    node.append('circle')
      .attr('r', 45)
      .attr('fill', (d: any) => {
        if (d.depth === 0) return '#3b82f6'; // Root
        if (d.depth === 1) return '#8b5cf6'; // Supervisor
        return '#10b981'; // Specialist
      })
      .attr('stroke', isDarkMode ? '#000' : '#fff')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.5))');

    // Node labels
    node.append('text')
      .attr('dy', '.31em')
      .attr('x', (d: any) => d.children ? -55 : 55)
      .attr('text-anchor', (d: any) => d.children ? 'end' : 'start')
      .text((d: any) => d.data.name)
      .attr('fill', isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)')
      .style('font-size', '14px')
      .style('font-weight', '600')
      .style('font-family', 'Inter, sans-serif')
      .style('pointer-events', 'none');

    // Add ID labels
    node.append('text')
      .attr('dy', '1.4em')
      .attr('x', (d: any) => d.children ? -55 : 55)
      .attr('text-anchor', (d: any) => d.children ? 'end' : 'start')
      .text((d: any) => d.data.id)
      .attr('fill', isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)')
      .style('font-size', '10px')
      .style('font-family', 'JetBrains Mono, monospace')
      .style('pointer-events', 'none');

    // --- Simulation Logic ---
    const simulatePulse = () => {
      const links = root.links();
      if (links.length === 0) return;

      // Pick a random link to start from (usually from root or supervisor)
      const randomLink = links[Math.floor(Math.random() * links.length)];
      
      const pulse = svg.append('circle')
        .attr('r', 20)
        .attr('fill', '#3b82f6')
        .attr('filter', 'blur(4px)')
        .style('opacity', 0.5)
        .style('pointer-events', 'none');

      // Create a path for the pulse to follow
      const pathGenerator = d3.linkHorizontal()
        .x((d: any) => d.y)
        .y((d: any) => d.x);

      const path = svg.append('path')
        .attr('d', pathGenerator(randomLink as any) as any)
        .attr('fill', 'none')
        .attr('stroke', 'none');

      const pathNode = path.node() as SVGPathElement;
      const length = pathNode.getTotalLength();

      pulse.transition()
        .duration(1500)
        .ease(d3.easeCubicInOut)
        .attrTween('transform', () => {
          return (t: number) => {
            const point = pathNode.getPointAtLength(t * length);
            return `translate(${point.x},${point.y})`;
          };
        })
        .on('end', () => {
          pulse.remove();
          path.remove();
          
          // Briefly highlight the target node
          svg.selectAll('.node')
            .filter((d: any) => d.data.id === randomLink.target.data.id)
            .select('circle')
            .transition()
            .duration(300)
            .attr('r', 55)
            .attr('fill', '#3b82f6')
            .transition()
            .duration(300)
            .attr('r', 45)
            .attr('fill', (d: any) => {
              if (d.depth === 0) return '#3b82f6';
              if (d.depth === 1) return '#8b5cf6';
              return '#10b981';
            });
        });
    };

    const interval = setInterval(() => {
      // Multiple pulses for more activity
      simulatePulse();
    }, 4000); // Reduced pulse frequency from 2s to 4s

    const handleBurst = () => {
      for (let i = 0; i < 15; i++) {
        setTimeout(simulatePulse, i * 100);
      }
    };

    window.addEventListener('system-burst', handleBurst);

    return () => {
      clearInterval(interval);
      window.removeEventListener('system-burst', handleBurst);
    };
  }, [agents, isDarkMode]);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <svg ref={svgRef} className="max-w-full max-h-full"></svg>
      </motion.div>

      {/* Dynamic Tooltip */}
      <div 
        ref={tooltipRef}
        className="absolute pointer-events-none opacity-0 transition-opacity duration-200 z-[100] p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-2xl min-w-[240px]"
        style={{ left: 0, top: 0 }}
      />
    </div>
  );
}, (prevProps, nextProps) => {
  // Ignore logs for re-rendering the whole map, as we use logsRef for tooltips
  return prevProps.agents === nextProps.agents && prevProps.isDarkMode === nextProps.isDarkMode;
});
