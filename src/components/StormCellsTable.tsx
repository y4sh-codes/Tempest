'use client';
import { useEffect, useState } from 'react';
import { useNowcastStore } from '@/lib/store';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';

interface Cell {
  id: string;
  lat: number;
  lon: number;
  maxDbz: number;
  vil: number;
  cloudTop: number;
  cape: number;
  severity: string;
}

export default function StormCellsTable() {
  const { timeOffset, selectedCellId, setSelectedCellId } = useNowcastStore();
  const [cells, setCells] = useState<Cell[]>([]);

  useEffect(() => {
    fetch(`/api/nowcast/cells?time=${timeOffset}`)
      .then(res => res.json())
      .then(data => setCells(data.cells || []))
      .catch(console.error);
  }, [timeOffset]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0a0a0a]">
      <div className="px-4 py-3 flex items-center justify-between flex-shrink-0 border-b border-[#1f1f1f]">
        <div className="text-[10px] font-bold text-[#666] uppercase tracking-[0.1em]">Live Feed</div>
        <div className="text-[10px] font-bold text-[#888] px-1.5 py-0.5 border border-[#333]">
            {cells.length} CELLS
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-0">
        <div className="divide-y divide-[#1f1f1f]">
            {cells.map(cell => {
                const isSelected = selectedCellId === cell.id;
                const isSevere = cell.severity === 'Severe';
                const isStrong = cell.severity === 'Strong';

                return (
                    <button
                        key={cell.id} 
                        onClick={() => setSelectedCellId(cell.id)}
                        className={clsx(
                            "w-full text-left p-3 transition-none group relative flex flex-col gap-2",
                            isSelected 
                                ? "bg-[#111] border-l-2 border-l-[#ededed]" 
                                : "bg-[#0a0a0a] hover:bg-[#111] border-l-2 border-l-transparent"
                        )}
                    >
                        <div className="flex justify-between items-start w-full">
                            <div>
                                <div className={clsx(
                                    "font-mono text-[13px] font-bold",
                                    isSelected ? "text-[#ededed]" : "text-[#888] group-hover:text-[#ededed]"
                                )}>
                                    {cell.id}
                                </div>
                                <div className="font-mono text-[10px] text-[#666] mt-0.5">
                                    {cell.lat.toFixed(2)}, {cell.lon.toFixed(2)}
                                </div>
                            </div>
                            <span className={clsx(
                                "text-[9px] font-bold uppercase tracking-widest",
                                isSevere ? "text-[#ef4444]" :
                                isStrong ? "text-[#f97316]" :
                                "text-[#888]"
                            )}>
                                {cell.severity}
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-1">
                            <div className="flex flex-col">
                                <span className="text-[9px] text-[#666] uppercase font-bold tracking-wider">MAX DBZ</span>
                                <span className={clsx(
                                    "font-mono text-[11px] font-bold",
                                    cell.maxDbz >= 60 ? "text-[#ef4444]" : cell.maxDbz >= 50 ? "text-[#f97316]" : "text-[#eab308]"
                                )}>{cell.maxDbz}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] text-[#666] uppercase font-bold tracking-wider">VIL</span>
                                <span className="font-mono text-[11px] text-[#ccc]">{cell.vil}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] text-[#666] uppercase font-bold tracking-wider">TOP</span>
                                <span className="font-mono text-[11px] text-[#ccc]">{(cell.cloudTop/1000).toFixed(0)}K</span>
                            </div>
                        </div>

                        {isSelected && (
                            <div className="absolute top-1/2 -translate-y-1/2 right-2 text-[#666]">
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
      </div>
    </div>
  );
}
