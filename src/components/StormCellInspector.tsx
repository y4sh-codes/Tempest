'use client';
import { useNowcastStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { FileDown, CheckSquare, Activity, CloudLightning, Wind, Thermometer } from 'lucide-react';

export default function StormCellInspector() {
  const { selectedCellId, setSelectedCellId } = useNowcastStore();
  const [lightningData, setLightningData] = useState<any[]>([]);
  const [soundingData, setSoundingData] = useState<any[]>([]);
  const [cellData, setCellData] = useState<any>(null);

  useEffect(() => {
    if (selectedCellId) {
      // Create a deterministic random based on string sum
      let seed = 0;
      for (let i = 0; i < selectedCellId.length; i++) {
          seed += selectedCellId.charCodeAt(i);
      }
      
      const pseudoRand = () => {
          seed = (seed * 9301 + 49297) % 233280;
          return seed / 233280;
      };

      setCellData({
          id: selectedCellId,
          lat: (39 + pseudoRand()*2).toFixed(2),
          lon: (-98 + pseudoRand()*5).toFixed(2),
          maxDbz: Math.floor(40 + pseudoRand()*35),
          speed: Math.floor(20 + pseudoRand()*30),
          direction: ['NE', 'E', 'SE'][Math.floor(pseudoRand()*3)],
          cape: Math.floor(1000 + pseudoRand()*3000)
      });

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

  if (!selectedCellId || !cellData) {
      return (
        <div className="flex-1 p-10 flex flex-col items-center justify-center bg-[#111]">
            <div className="text-5xl mb-4">🌪️</div>
            <div className="text-[#888] font-bold text-lg uppercase tracking-[0.2em] mb-2">Cell Inspector</div>
            <div className="text-[#666] text-sm text-center max-w-md">Select a specific storm cell from the left registry to run a deep-dive volumetric analysis and track generation.</div>
        </div>
      );
  }

  return (
    <div className="flex-1 bg-[#0a0a0a] flex flex-col h-full overflow-hidden">
        <div className="p-8 border-b border-[#1f1f1f] bg-[#111] flex items-center justify-between flex-shrink-0">
            <div>
                <div className="text-[10px] text-[#666] font-bold uppercase tracking-[0.2em] mb-1">Volumetric Analysis</div>
                <div className="text-3xl font-bold text-[#ededed]">{cellData.id}</div>
            </div>
            <div className="flex gap-4">
                <div className="border border-[#1f1f1f] bg-[#0a0a0a] p-3 text-right">
                    <div className="text-[9px] text-[#666] font-bold uppercase tracking-widest mb-1">Coordinates</div>
                    <div className="text-sm font-bold text-[#3b82f6]">{cellData.lat}, {cellData.lon}</div>
                </div>
                <div className="border border-[#1f1f1f] bg-[#0a0a0a] p-3 text-right">
                    <div className="text-[9px] text-[#666] font-bold uppercase tracking-widest mb-1">Vector</div>
                    <div className="text-sm font-bold text-[#eab308]">{cellData.speed} KTS {cellData.direction}</div>
                </div>
            </div>
        </div>

        <div className="flex-1 p-8 overflow-y-auto grid grid-cols-2 gap-8">
            <div className="space-y-8">
                <div>
                    <h3 className="text-[11px] text-[#888] font-bold uppercase tracking-[0.1em] mb-4 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#ef4444]" /> Critical Telemetry
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#111] border border-[#1f1f1f] p-4">
                            <div className="text-[9px] text-[#666] font-bold uppercase tracking-widest mb-1">Max Reflectivity</div>
                            <div className={`text-2xl font-bold ${cellData.maxDbz >= 60 ? 'text-[#ef4444]' : 'text-[#f97316]'}`}>{cellData.maxDbz} dBZ</div>
                        </div>
                        <div className="bg-[#111] border border-[#1f1f1f] p-4">
                            <div className="text-[9px] text-[#666] font-bold uppercase tracking-widest mb-1">Surface CAPE</div>
                            <div className="text-2xl font-bold text-[#eab308]">{cellData.cape} J/kg</div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-[11px] text-[#888] font-bold uppercase tracking-[0.1em] mb-4 flex items-center gap-2">
                        <CloudLightning className="w-4 h-4 text-[#3b82f6]" /> Lightning Probability (180M)
                    </h3>
                    <div className="h-[250px] border border-[#1f1f1f] p-4 bg-[#111]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={lightningData}>
                                <CartesianGrid strokeDasharray="2 2" stroke="#1f1f1f" vertical={false} />
                                <XAxis dataKey="time" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis domain={[0, 100]} stroke="#666" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                                <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#1f1f1f', borderRadius: 0, fontSize: '11px' }} />
                                <Area type="monotone" dataKey="prob" stroke="#eab308" strokeWidth={2} fill="#eab308" fillOpacity={0.1} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div>
                    <h3 className="text-[11px] text-[#888] font-bold uppercase tracking-[0.1em] mb-4 flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-[#10b981]" /> Vertical Sounding
                    </h3>
                    <div className="h-[415px] border border-[#1f1f1f] p-4 bg-[#111]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={soundingData} layout="vertical" margin={{ left: -20 }}>
                                <CartesianGrid strokeDasharray="2 2" stroke="#1f1f1f" horizontal={false} />
                                <XAxis type="number" domain={[-80, 40]} stroke="#666" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}°`} />
                                <YAxis dataKey="altitude" type="number" stroke="#666" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}K`} />
                                <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#1f1f1f', borderRadius: 0, fontSize: '11px' }} />
                                <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="dew" stroke="#3b82f6" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>

        <div className="p-6 border-t border-[#1f1f1f] bg-[#111] flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#ededed] text-[#0a0a0a] hover:bg-white text-xs font-bold py-3 transition-none">
                <FileDown className="w-4 h-4" /> EXPORT FULL DOSSIER
            </button>
            <button className="flex items-center justify-center gap-2 border border-[#333] text-[#ededed] hover:bg-[#1a1a1a] text-xs font-bold py-3 px-8 transition-none" onClick={() => setSelectedCellId(null)}>
                <CheckSquare className="w-4 h-4 text-[#888]" /> CLOSE
            </button>
        </div>
    </div>
  );
}
