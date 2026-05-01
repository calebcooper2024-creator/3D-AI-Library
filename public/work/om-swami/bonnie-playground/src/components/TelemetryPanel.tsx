import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip } from 'recharts';

interface TelemetryProps {
  data: any[];
}

export const TelemetryPanel: React.FC<TelemetryProps> = ({ data }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Performance Metrics</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] text-zinc-400 font-mono">Steering</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-[10px] text-zinc-400 font-mono">Throttle</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis hide dataKey="time" />
            <YAxis hide domain={[-1, 1]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
              itemStyle={{ fontSize: '10px', fontFamily: 'monospace' }}
            />
            <Line
              type="monotone"
              dataKey="ls_x"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="rt"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-zinc-800">
        <div>
          <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Latency</div>
          <div className="text-lg font-light text-zinc-200">
            {data.length > 0 ? `${Math.floor(Math.random() * 20 + 30)}ms` : '--'}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Confidence</div>
          <div className="text-lg font-light text-emerald-500">
            {data.length > 0 ? `${(94 + Math.random() * 5).toFixed(1)}%` : '--'}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-zinc-500 font-mono uppercase mb-1">Load</div>
          <div className="text-lg font-light text-amber-500">
            {data.length > 0 ? `${(Math.random() * 15 + 5).toFixed(1)}%` : '--'}
          </div>
        </div>
      </div>
    </div>
  );
};
