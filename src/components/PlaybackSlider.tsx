'use client';
import { Play, Pause, FastForward } from 'lucide-react';
import { useNowcastStore } from '@/lib/store';
import { useEffect, useRef } from 'react';
import clsx from 'clsx';

export default function PlaybackSlider() {
  const { timeOffset, setTimeOffset, isPlaying, setIsPlaying, playbackSpeed, setPlaybackSpeed } = useNowcastStore();
  const playInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      playInterval.current = setInterval(() => {
        const current = useNowcastStore.getState().timeOffset;
        const next = current + 15;
        if (next > 180) {
          setIsPlaying(false);
          setTimeOffset(180);
        } else {
          setTimeOffset(next);
        }
      }, 1000 / playbackSpeed);
    } else {
      if (playInterval.current) clearInterval(playInterval.current);
    }
    return () => {
      if (playInterval.current) clearInterval(playInterval.current);
    };
  }, [isPlaying, playbackSpeed, setTimeOffset, setIsPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const cycleSpeed = () => {
    if (playbackSpeed === 1) setPlaybackSpeed(2);
    else if (playbackSpeed === 2) setPlaybackSpeed(4);
    else setPlaybackSpeed(1);
  };

  const getLabel = (t: number) => {
    if (t < 0) return `-${Math.abs(t)}M (OBS)`;
    if (t === 0) return 'NOW';
    return `+${t}M (PRED)`;
  };

  const progressPercent = ((timeOffset + 120) / 300) * 100;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-[#0a0a0a] border border-[#1f1f1f] p-4 min-w-[500px] pointer-events-auto shadow-2xl">
      <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.1em] text-[#666] mb-3 px-1">
        <span>Past 2hrs Observed</span>
        <span className="text-[#3b82f6] px-2 py-0.5 border border-[#3b82f6] bg-[#3b82f6]/10">{getLabel(timeOffset)}</span>
        <span>Next 3hrs Predicted</span>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={togglePlay} 
          className="flex-shrink-0 w-8 h-8 bg-[#ededed] text-[#0a0a0a] hover:bg-white flex items-center justify-center transition-none"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>
        
        <div className="flex-1 relative flex items-center h-8 cursor-pointer">
            <div className="absolute w-full h-1 bg-[#1f1f1f] overflow-hidden">
                <div className="h-full bg-[#3b82f6]" style={{ width: `${progressPercent}%` }}></div>
            </div>
            
            <div 
              className="absolute w-2 h-4 bg-[#ededed] pointer-events-none transition-none"
              style={{ left: `calc(${progressPercent}% - 4px)` }}
            ></div>
            
            <div className="absolute w-full flex justify-between px-[1px] pointer-events-none top-6">
                {[-120, -60, 0, 60, 120, 180].map(m => (
                    <div key={m} className="flex flex-col items-center">
                        <div className={clsx("h-1 w-[1px] mb-0.5", m === 0 ? "bg-[#3b82f6] h-1.5" : "bg-[#333]")}></div>
                        <span className={clsx("text-[8px] font-mono", m === 0 ? "text-[#3b82f6] font-bold" : "text-[#666]")}>
                            {m === 0 ? '0' : m > 0 ? `+${m}` : m}
                        </span>
                    </div>
                ))}
            </div>

            <input 
              type="range" 
              min="-120" 
              max="180" 
              step="15" 
              value={timeOffset}
              onChange={(e) => setTimeOffset(Number(e.target.value))}
              className="absolute w-full h-12 opacity-0 cursor-pointer z-50"
            />
        </div>

        <button 
          onClick={cycleSpeed} 
          className="flex-shrink-0 flex items-center gap-1.5 px-2 py-1.5 border border-[#333] hover:bg-[#111] text-[10px] font-bold text-[#ededed] transition-none"
        >
          <FastForward className="w-3 h-3 text-[#666]" />
          {playbackSpeed}X
        </button>
      </div>
    </div>
  );
}
