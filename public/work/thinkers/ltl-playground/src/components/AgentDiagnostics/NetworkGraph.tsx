import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  color: string;
  isCurrent?: boolean;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
}

interface NetworkGraphProps {
  agent: any;
  agents: any[];
  isSystemHalted?: boolean;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({ agent, agents, isSystemHalted }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !agent) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    if (isSystemHalted) {
      // Just draw a static version or nothing
      const svg = d3.select(svgRef.current)
        .attr("viewBox", [0, 0, width, height]);
      
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "currentColor")
        .attr("class", "opacity-20 text-[10px] font-bold uppercase tracking-widest")
        .text("System Halted - Telemetry Offline");
      return;
    }

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    // Define nodes and links based on hierarchy
    const nodes: Node[] = [
      { id: agent.id, name: agent.humanName, color: '#3b82f6', isCurrent: true }
    ];
    const links: Link[] = [];

    // Find "Reports To" (Upstream)
    let upstream: any = null;
    if (agent.level === 2) {
      upstream = agents.find(a => a.id === 'A01');
    } else if (agent.level > 2) {
      // Find supervisor of the same department or general supervisor
      upstream = agents.find(a => a.level === 2 && (a.department === agent.department || !agent.department));
    }

    if (upstream) {
      nodes.push({ id: upstream.id, name: upstream.humanName, color: '#6366f1' });
      links.push({ source: agent.id, target: upstream.id });
    }

    // Find "Delegates To" (Downstream)
    const downstream = agents.filter(a => {
      if (agent.level === 1) return a.level === 2;
      if (agent.level === 2) return a.level > 2 && a.department === agent.department;
      return false;
    }).slice(0, 4);

    downstream.forEach(d => {
      nodes.push({ id: d.id, name: d.humanName, color: '#8b5cf6' });
      links.push({ source: agent.id, target: d.id });
    });

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(80))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .attr("stroke", "#94a3b8")
      .attr("stroke-opacity", 0.3)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "4,4");

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("circle")
      .attr("r", (d: any) => d.isCurrent ? 12 : 8)
      .attr("fill", (d: any) => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("class", (d: any) => (d.isCurrent && !isSystemHalted) ? "animate-pulse" : "");

    node.append("text")
      .attr("dx", 15)
      .attr("dy", 4)
      .text((d: any) => d.id)
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .attr("fill", "currentColor")
      .attr("class", "opacity-50");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => simulation.stop();
  }, [agent, agents, isSystemHalted]);

  return (
    <div className="w-full h-full min-h-[200px] relative overflow-hidden">
      <svg ref={svgRef} className="w-full h-full" />
      <div className="absolute top-0 left-0 p-4">
        <p className="text-[8px] font-bold uppercase tracking-widest opacity-30">Orchestration Graph</p>
      </div>
    </div>
  );
};
