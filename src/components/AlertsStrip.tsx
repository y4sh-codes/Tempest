'use client';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface Alert {
  id: string;
  type: string;
  severity: string;
  description: string;
  arrivalEstimate: string;
}

export default function AlertsStrip() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [hiddenAlerts, setHiddenAlerts] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/nowcast/alerts')
      .then(res => res.json())
      .then(data => setAlerts(data.alerts || []))
      .catch(console.error);
  }, []);

  const visibleAlerts = alerts.filter(a => !hiddenAlerts.has(a.id));

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="absolute top-0 left-0 right-0 z-40 px-5 py-4 flex overflow-x-auto gap-3 pointer-events-none custom-scrollbar">
      {visibleAlerts.map(alert => {
        const isCritical = alert.severity === 'Critical';
        const isSevere = alert.severity === 'Severe';
        const borderColor = isCritical ? 'border-[#ef4444]' : isSevere ? 'border-[#f97316]' : 'border-[#eab308]';
        const textColor = isCritical ? 'text-[#ef4444]' : isSevere ? 'text-[#f97316]' : 'text-[#eab308]';

        return (
          <div 
            key={alert.id} 
            className="pointer-events-auto flex-shrink-0 bg-[#0a0a0a] border border-[#1f1f1f] p-3 min-w-[300px] hover:bg-[#111] transition-none flex gap-3 items-start relative group"
          >
            <div className={clsx("w-1 h-full absolute left-0 top-0", isCritical ? "bg-[#ef4444]" : isSevere ? "bg-[#f97316]" : "bg-[#eab308]")}></div>
            
            <div className="flex-1 pl-2 pr-4">
              <div className="flex items-start justify-between mb-1">
                <span className={clsx("text-[10px] font-bold uppercase tracking-[0.05em]", textColor)}>
                  {alert.type}
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 border border-[#333] text-[#888] uppercase">
                  {alert.arrivalEstimate}
                </span>
              </div>
              <p className="text-[12px] text-[#ededed] leading-snug font-medium mt-1">{alert.description}</p>
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); setHiddenAlerts(new Set(hiddenAlerts).add(alert.id)); }}
              className="absolute top-2 right-2 text-[#666] hover:text-[#ededed] p-0.5 transition-none opacity-0 group-hover:opacity-100"
            >
                <X className="w-3 h-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
