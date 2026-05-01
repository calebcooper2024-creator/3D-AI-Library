import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface EmbeddingPoint {
  id: string;
  x: number;
  y: number;
  type: 'query' | 'document';
  content: string;
  cluster: number;
}

interface EmbeddingsVisualizerProps {
  isDarkMode?: boolean;
}

export const EmbeddingsVisualizer = React.memo(({ isDarkMode = false }: EmbeddingsVisualizerProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<EmbeddingPoint | null>(null);

  // Generate mock embedding data
  const generateMockData = (): EmbeddingPoint[] => {
    const points: EmbeddingPoint[] = [];
    const clusters = 5;
    
    // Create document chunks in clusters
    for (let c = 0; c < clusters; c++) {
      const centerX = Math.random() * 800 + 100;
      const centerY = Math.random() * 400 + 50;
      
      for (let i = 0; i < 15; i++) {
        points.push({
          id: `doc-${c}-${i}`,
          x: centerX + (Math.random() - 0.5) * 120,
          y: centerY + (Math.random() - 0.5) * 120,
          type: 'document',
          content: `Document chunk related to topic ${c + 1}: ${['Retrieval logic', 'Vector scaling', 'Semantic mapping', 'Agent memory', 'Context window'][c]} details...`,
          cluster: c
        });
      }
      
      // Add a query near each cluster
      points.push({
        id: `query-${c}`,
        x: centerX + (Math.random() - 0.5) * 40,
        y: centerY + (Math.random() - 0.5) * 40,
        type: 'query',
        content: `User Query: How does ${['retrieval', 'scaling', 'semantics', 'memory', 'context'][c]} work in this system?`,
        cluster: c
      });
    }
    
    return points;
  };

  const [data] = useState(generateMockData());

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 1000;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const x = d3.scaleLinear()
      .domain([0, 1000])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, 500])
      .range([height - margin.bottom, margin.top]);

    // Draw cluster boundaries (subtle circles)
    const clusters = d3.group(data, (d: EmbeddingPoint) => d.cluster);
    clusters.forEach((points, clusterId) => {
      const centerX = d3.mean(points, (d: EmbeddingPoint) => d.x) || 0;
      const centerY = d3.mean(points, (d: EmbeddingPoint) => d.y) || 0;
      
      svg.append('circle')
        .attr('cx', x(centerX))
        .attr('cy', y(centerY))
        .attr('r', 80)
        .attr('fill', isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)')
        .attr('stroke', isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)')
        .attr('stroke-dasharray', '4,4');
        
      svg.append('text')
        .attr('x', x(centerX))
        .attr('y', y(centerY) - 90)
        .attr('text-anchor', 'middle')
        .text(`Topic Cluster ${clusterId + 1}`)
        .attr('fill', isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)')
        .style('font-size', '10px')
        .style('font-family', 'JetBrains Mono, monospace')
        .style('text-transform', 'uppercase');
    });

    // Draw retrieval links (lines from queries to their cluster docs)
    data.filter(d => d.type === 'query').forEach(query => {
      const clusterDocs = data.filter(d => d.type === 'document' && d.cluster === query.cluster);
      clusterDocs.slice(0, 3).forEach(doc => {
        svg.append('line')
          .attr('x1', x(query.x))
          .attr('y1', y(query.y))
          .attr('x2', x(doc.x))
          .attr('y2', y(doc.y))
          .attr('stroke', '#3b82f6')
          .attr('stroke-width', 1)
          .attr('stroke-opacity', 0.2)
          .attr('stroke-dasharray', '2,2');
      });
    });

    // Draw points
    const points = svg.selectAll('.point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', (d: EmbeddingPoint) => x(d.x))
      .attr('cy', (d: EmbeddingPoint) => y(d.y))
      .attr('r', (d: EmbeddingPoint) => d.type === 'query' ? 6 : 4)
      .attr('fill', (d: EmbeddingPoint) => d.type === 'query' ? '#3b82f6' : '#10b981')
      .attr('stroke', isDarkMode ? '#000' : '#fff')
      .attr('stroke-width', 1.5)
      .style('cursor', 'pointer')
      .style('transition', 'all 0.2s ease');

    points.on('mouseenter', (event: any, d: EmbeddingPoint) => {
      setHoveredPoint(d);
      d3.select(event.currentTarget)
        .attr('r', d.type === 'query' ? 10 : 7)
        .attr('filter', 'drop-shadow(0 0 8px rgba(59,130,246,0.5))');
        
      // Highlight related links
      svg.selectAll('line')
        .filter((l: any) => l?.queryId === d.id || l?.docId === d.id)
        .attr('stroke-opacity', 0.8)
        .attr('stroke-width', 2);
    });

    points.on('mouseleave', (event: any, d: EmbeddingPoint) => {
      setHoveredPoint(null);
      d3.select(event.currentTarget)
        .attr('r', d.type === 'query' ? 6 : 4)
        .attr('filter', 'none');
    });

  }, [data, isDarkMode]);

  return (
    <div className="relative w-full h-full min-h-[500px] bg-slate-50/50 dark:bg-black/20 rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden">
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Queries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Document Chunks</span>
          </div>
        </div>
        <p className="text-xs opacity-40 max-w-xs">
          2D Projection of high-dimensional semantic embeddings. Proximity indicates semantic similarity.
        </p>
      </div>

      <svg
        ref={svgRef}
        viewBox="0 0 1000 500"
        className="w-full h-full"
      />

      {hoveredPoint && (
        <div className="absolute bottom-6 right-6 p-4 max-w-sm bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
              hoveredPoint.type === 'query' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'
            }`}>
              {hoveredPoint.type}
            </span>
            <span className="text-[10px] font-mono opacity-30">{hoveredPoint.id}</span>
          </div>
          <p className="text-sm leading-relaxed font-medium">
            {hoveredPoint.content}
          </p>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Cluster Confidence</span>
            <span className="text-[10px] font-mono font-bold text-emerald-500">0.982</span>
          </div>
        </div>
      )}
    </div>
  );
});
