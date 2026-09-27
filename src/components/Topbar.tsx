'use client';
import { Search, Bell, Settings2 } from 'lucide-react';
import { useState } from 'react';

export default function Topbar() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="h-14 bg-[#0a0a0a] border-b border-[#1f1f1f] flex items-center justify-between px-5 z-40 flex-shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
            </span>
            <span className="text-[10px] font-bold text-[#888] tracking-[0.1em] uppercase">System Live</span>
        </div>
        <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75" style={{ animationDuration: '2s' }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b82f6]"></span>
            </span>
            <span className="text-[10px] font-bold text-[#888] tracking-[0.1em] uppercase">AI Inference: Active</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative group">
            <Search className="w-3.5 h-3.5 text-[#666] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder="Search cell ID..."
              className="bg-[#111] border border-[#1f1f1f] rounded-md py-1.5 pl-9 pr-4 text-[13px] font-medium text-[#ededed] placeholder-[#666] focus:outline-none focus:border-[#333] w-[260px] transition-none"
            />
        </div>
        <button className="relative p-1.5 rounded-md hover:bg-[#1a1a1a] text-[#888] hover:text-[#ededed] transition-none">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#ef4444]"></span>
        </button>
      </div>
    </header>
  );
}
