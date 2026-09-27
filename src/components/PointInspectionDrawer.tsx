'use client';
import { useNowcastStore } from '@/lib/store';
import { X, FileDown, CheckSquare } from 'lucide-react';
import clsx from 'clsx';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { useEffect, useState } from 'react';

export default function PointInspectionDrawer() {
  const { selectedCellId, setSelectedCellId } = useNowcastStore();
  const [lightningData, setLightningData] = useState<any[]>([]);
  const [soundingData, setSoundingData] = useState<any[]>([]);

  useEffect(() => {
    if (selectedCellId) {
      let seed = 0;
      for (let i = 0; i < selectedCellId.length; i++) {
          seed += selectedCellId.charCodeAt(i);
      }
      const pseudoRand = () => {
          seed = (seed * 9301 + 49297) % 233280;
          return seed / 233280;
      };

      const ld = [];
      const baseProb = pseudoRand() * 60;
      const phase = pseudoRand() * Math.PI * 2;
      for(let i=0; i<=180; i+=15) {
        ld.push({ time: `+${i}m`, prob: Math.max(0, Math.min(100, baseProb + Math.sin(i/30 + phase)*40 + (pseudoRand()*10 - 5))) });
      }
      setLightningData(ld);

      const sd = [];
      const baseTemp = 25 + pseudoRand() * 10;
      const baseDew = baseTemp - pseudoRand() * 5 - 2;
      for(let alt=0; alt<=15; alt+=1) {
        sd.push({ altitude: alt, temp: baseTemp - (alt * 6.5) + (pseudoRand()*2), dew: baseDew - (alt * 7) + (pseudoRand()*2) });
      }
      setSoundingData(sd);
    }
  }, [selectedCellId]);

  return (
    <div className={clsx(
      "absolute top-0 bottom-0 right-0 w-[400px] bg-[#0a0a0a] border-l border-[#1f1f1f] z-40 transition-transform duration-200 flex flex-col",
      selectedCellId ? "translate-x-0" : "translate-x-full"
    )}>
      <div className="p-5 border-b border-[#1f1f1f] flex items-start justify-between bg-[#0a0a0a]">
        <div>
            <div className="text-[9px] font-bold text-[#666] uppercase tracking-[0.1em] mb-1">Point Inspection</div>
            <div className="font-mono text-xl font-bold text-[#ededed]">{selectedCellId || 'None'}</div>
        </div>
        <button 
            onClick={() => setSelectedCellId(null)} 
            className="text-[#666] hover:text-[#ededed] transition-none p-1"
        >
            <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div>
            <div className="text-[10px] font-bold text-[#666] uppercase tracking-[0.1em] mb-3">
                Sounding Profile
            </div>
            <div className="h-[240px] border border-[#1f1f1f] p-2 bg-[#111]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={soundingData} layout="vertical" margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="2 2" stroke="#1f1f1f" horizontal={false} />
                        <XAxis type="number" domain={[-80, 40]} stroke="#666" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}°`} />
                        <YAxis dataKey="altitude" type="number" stroke="#666" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}K`} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#1f1f1f', fontSize: '10px', borderRadius: '0' }} 
                            itemStyle={{ fontWeight: 'bold', fontFamily: 'monospace' }}
                        />
                        <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} dot={false} name="Temp" />
                        <Line type="monotone" dataKey="dew" stroke="#3b82f6" strokeWidth={2} dot={false} name="Dew" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div>
            <div className="text-[10px] font-bold text-[#666] uppercase tracking-[0.1em] mb-3">
                0-180m Lightning Prob
            </div>
            <div className="h-[180px] border border-[#1f1f1f] p-2 bg-[#111]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={lightningData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="2 2" stroke="#1f1f1f" vertical={false} />
                        <XAxis dataKey="time" stroke="#666" fontSize={9} tickLine={false} axisLine={false} />
                        <YAxis domain={[0, 100]} stroke="#666" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#1f1f1f', fontSize: '10px', borderRadius: '0' }} 
                        />
                        <Area type="monotone" dataKey="prob" stroke="#eab308" strokeWidth={2} fill="#eab308" fillOpacity={0.1} name="Prob" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      <div className="p-5 border-t border-[#1f1f1f] bg-[#0a0a0a] flex gap-2">
          <button 
              className="flex-1 flex items-center justify-center gap-2 bg-[#ededed] hover:bg-white text-[#0a0a0a] text-[11px] font-bold py-2.5 px-4 transition-none"
              onClick={() => alert('Report Exported!')}
          >
              <FileDown className="w-3.5 h-3.5" />
              EXPORT
          </button>
          <button 
              className="flex items-center justify-center gap-2 border border-[#333] text-[#ededed] hover:bg-[#111] text-[11px] font-bold py-2.5 px-4 transition-none"
              onClick={() => { setSelectedCellId(null); }}
          >
              <CheckSquare className="w-3.5 h-3.5 text-[#888]" />
              ACKNOWLEDGE
          </button>
      </div>
    </div>
  );
}
