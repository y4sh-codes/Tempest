'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
      cells: 142,
      alerts: 12,
      strikes: 8432,
      load: 42
  });

  const [chartData, setChartData] = useState(() => 
      Array.from({ length: 24 }).map((_, i) => ({
          time: `${i}:00`,
          cells: Math.floor(Math.random() * 50) + 10,
          strikes: Math.floor(Math.random() * 500) + 50,
      }))
  );

  useEffect(() => {
      const interval = setInterval(() => {
          // Randomly fluctuate metrics every 5 seconds
          setMetrics(prev => ({
              cells: Math.max(0, prev.cells + Math.floor(Math.random() * 11) - 5),
              alerts: Math.max(0, prev.alerts + Math.floor(Math.random() * 3) - 1),
              strikes: prev.strikes + Math.floor(Math.random() * 100) - 20,
              load: Math.max(10, Math.min(100, prev.load + Math.floor(Math.random() * 9) - 4))
          }));

          // Shift chart data
          setChartData(prev => {
              const newData = [...prev.slice(1)];
              const lastTime = parseInt(newData[newData.length - 1].time.split(':')[0]);
              const nextTime = (lastTime + 1) % 24;
              newData.push({
                  time: `${nextTime}:00`,
                  cells: Math.floor(Math.random() * 50) + 10,
                  strikes: Math.floor(Math.random() * 500) + 50,
              });
              return newData;
          });
      }, 5000);

      return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-[#0a0a0a]">
        <h1 className="text-xl font-bold tracking-[0.2em] mb-6 border-b border-[#1f1f1f] pb-4">SYSTEM DASHBOARD</h1>
        <div className="grid grid-cols-4 gap-4 mb-6">
            {[
                { label: 'ACTIVE CELLS', value: metrics.cells.toString(), color: 'text-[#3b82f6]' },
                { label: 'SEVERE ALERTS', value: metrics.alerts.toString(), color: 'text-[#ef4444]' },
                { label: 'TOTAL STRIKES', value: metrics.strikes.toLocaleString(), color: 'text-[#eab308]' },
                { label: 'SYSTEM LOAD', value: `${metrics.load}%`, color: 'text-[#10b981]' },
            ].map((stat, i) => (
                <div key={i} className="border border-[#1f1f1f] bg-[#111] p-5 transition-colors duration-500">
                    <div className="text-[10px] text-[#888] font-bold tracking-[0.1em] mb-2">{stat.label}</div>
                    <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                </div>
            ))}
        </div>
        <div className="grid grid-cols-2 gap-4 h-[300px]">
            <div className="border border-[#1f1f1f] bg-[#111] p-4 flex flex-col">
                <div className="text-[10px] text-[#888] font-bold tracking-[0.1em] mb-4">GLOBAL CELL COUNT (24H)</div>
                <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
                            <XAxis dataKey="time" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                            <Line type="stepAfter" dataKey="cells" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1000} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="border border-[#1f1f1f] bg-[#111] p-4 flex flex-col">
                <div className="text-[10px] text-[#888] font-bold tracking-[0.1em] mb-4">LIGHTNING STRIKE DENSITY (24H)</div>
                <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
                            <XAxis dataKey="time" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                            <Bar dataKey="strikes" fill="#eab308" isAnimationActive={true} animationDuration={1000} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    </div>
  );
}
