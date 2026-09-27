'use client';
import { Clock, CheckSquare } from 'lucide-react';

export default function ModelPerformance() {
  return (
    <div className="flex-shrink-0 bg-[#0a0a0a] border-t border-[#1f1f1f] p-4">
      <div className="text-[10px] font-bold text-[#666] uppercase tracking-[0.1em] mb-3">Model Insights</div>
      
      <div className="border border-[#1f1f1f] p-3 mb-4 bg-[#111]">
        <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[#888] uppercase">Ensemble</span>
            <span className="text-[11px] font-mono font-bold text-[#ededed] flex items-center gap-1">
                <CheckSquare className="w-3 h-3 text-[#10b981]" />
                DEEPCAST-V4.2
            </span>
        </div>
        <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#888] uppercase">Latency</span>
            <span className="text-[11px] font-mono font-bold text-[#ededed] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#3b82f6]" /> 42MS
            </span>
        </div>
      </div>

      <div className="text-[9px] font-bold text-[#666] uppercase tracking-[0.1em] mb-2">Feature Weight</div>
      <div className="space-y-2.5 mb-5">
        {[
            { label: 'RADAR DBZ', val: 40, color: 'bg-[#3b82f6]' },
            { label: 'FLASH RATE', val: 25, color: 'bg-[#eab308]' },
            { label: 'CAPE', val: 20, color: 'bg-[#ef4444]' },
            { label: 'SAT IR', val: 15, color: 'bg-[#94a3b8]' },
        ].map(feat => (
            <div key={feat.label} className="flex flex-col gap-1">
                <div className="flex justify-between text-[9px] text-[#888] font-bold">
                    <span>{feat.label}</span>
                    <span className="font-mono text-[#ededed]">{feat.val}%</span>
                </div>
                <div className="h-1 w-full bg-[#1f1f1f] overflow-hidden">
                    <div className={`h-full ${feat.color}`} style={{ width: `${feat.val}%` }}></div>
                </div>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-px bg-[#1f1f1f] border border-[#1f1f1f]">
        <div className="bg-[#0a0a0a] p-2 flex flex-col items-center justify-center">
            <span className="text-[9px] font-bold text-[#666] mb-1">CSI</span>
            <span className="text-[13px] font-mono font-bold text-[#ededed]">0.78</span>
        </div>
        <div className="bg-[#0a0a0a] p-2 flex flex-col items-center justify-center">
            <span className="text-[9px] font-bold text-[#666] mb-1">POD</span>
            <span className="text-[13px] font-mono font-bold text-[#10b981]">0.89</span>
        </div>
        <div className="bg-[#0a0a0a] p-2 flex flex-col items-center justify-center">
            <span className="text-[9px] font-bold text-[#666] mb-1">FAR</span>
            <span className="text-[13px] font-mono font-bold text-[#ef4444]">0.12</span>
        </div>
      </div>
    </div>
  );
}
