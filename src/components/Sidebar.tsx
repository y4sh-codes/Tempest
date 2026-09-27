'use client';
import { Activity, Map, Navigation, ShieldAlert, Cpu, Settings, Zap } from 'lucide-react';
import { useNowcastStore } from '@/lib/store';
import clsx from 'clsx';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Activity },
  { id: 'live-map', label: 'Live Map', icon: Map },
  { id: 'storm-cells', label: 'Storm Cells', icon: Navigation },
  { id: 'alerts', label: 'Alerts', icon: ShieldAlert },
  { id: 'model-insights', label: 'Model Insights', icon: Cpu },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { activePage, setActivePage } = useNowcastStore();

  return (
    <aside className="w-[240px] bg-[#0a0a0a] border-r border-[#1f1f1f] flex flex-col h-full flex-shrink-0 z-50">
      <div className="h-14 px-5 flex items-center gap-3 border-b border-[#1f1f1f]">
        <div className="w-6 h-6 rounded bg-[#111] border border-[#333] flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-[#ededed]" />
        </div>
        <div className="font-bold text-[13px] tracking-tight text-[#ededed]">TEMPEST</div>
      </div>
      
      <div className="px-5 py-4 text-[10px] font-bold text-[#666] uppercase tracking-[0.1em]">
        Platform Modules
      </div>
      
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={clsx(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-none",
                isActive 
                  ? "bg-[#1a1a1a] text-[#ededed]" 
                  : "text-[#888] hover:bg-[#111] hover:text-[#ccc]"
              )}
            >
              <item.icon className={clsx("w-4 h-4", isActive ? "text-[#ededed]" : "text-[#666]")} />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-[#1f1f1f] bg-[#0a0a0a] flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-[10px] font-bold text-[#ededed]">
            OP
        </div>
        <div className="flex flex-col text-left">
            <span className="text-[12px] font-bold text-[#ededed] leading-tight">Operator Alpha</span>
            <span className="text-[10px] text-[#666] font-medium uppercase tracking-[0.05em]">Met-Ops Unit</span>
        </div>
      </div>
    </aside>
  );
}
