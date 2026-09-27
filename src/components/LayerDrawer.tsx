'use client';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { useNowcastStore } from '@/lib/store';
import { useState } from 'react';
import clsx from 'clsx';

export default function LayerDrawer() {
  const { layers, toggleLayer } = useNowcastStore();
  const [isOpen, setIsOpen] = useState(false);

  const layerOptions = [
    { id: 'radar', label: 'RADAR (DBZ)', color: 'bg-[#3b82f6]' },
    { id: 'lightning', label: 'LIGHTNING', color: 'bg-[#eab308]' },
    { id: 'ir', label: 'SATELLITE IR', color: 'bg-[#94a3b8]' },
    { id: 'cape', label: 'CAPE', color: 'bg-[#ef4444]' },
  ];

  return (
    <div className="absolute top-4 left-4 z-[1000] pointer-events-auto flex flex-col items-start gap-2">
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-[#0a0a0a] border border-[#1f1f1f] px-3 py-2 hover:bg-[#111] transition-none shadow-xl"
        >
            <Layers className="w-4 h-4 text-[#ededed]" />
            <span className="text-[11px] font-bold text-[#ededed] uppercase tracking-[0.1em]">Layers</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-[#666] ml-2" /> : <ChevronDown className="w-3.5 h-3.5 text-[#666] ml-2" />}
        </button>

        {isOpen && (
            <div className="bg-[#0a0a0a] border border-[#1f1f1f] p-3 w-56 shadow-2xl">
                <div className="space-y-1">
                    {layerOptions.map(opt => {
                    const isActive = layers[opt.id as keyof typeof layers];
                    return (
                        <button 
                        key={opt.id}
                        onClick={() => toggleLayer(opt.id as keyof typeof layers)}
                        className="w-full flex items-center justify-between px-2 py-2 rounded-sm hover:bg-[#111] transition-none group"
                        >
                        <div className="flex items-center gap-2">
                            <div className={clsx(
                                "w-2 h-2",
                                isActive ? opt.color : "bg-[#333]"
                            )}></div>
                            <span className={clsx(
                                "text-[11px] font-bold tracking-[0.05em]",
                                isActive ? "text-[#ededed]" : "text-[#666]"
                            )}>
                            {opt.label}
                            </span>
                        </div>
                        
                        <div className={clsx(
                            "relative inline-flex h-3 w-6 items-center transition-none border",
                            isActive ? "bg-[#ededed] border-[#ededed]" : "bg-transparent border-[#333]"
                        )}>
                            <span className={clsx(
                                "inline-block h-2 w-2 transform bg-[#0a0a0a] transition-none",
                                isActive ? "translate-x-3.5" : "translate-x-0.5 bg-[#333]"
                            )} />
                        </div>
                        </button>
                    )
                    })}
                </div>
            </div>
        )}
    </div>
  );
}
