'use client';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import MapCanvas from '@/components/MapCanvas';
import LayerDrawer from '@/components/LayerDrawer';
import PlaybackSlider from '@/components/PlaybackSlider';
import RightSidebar from '@/components/RightSidebar';
import AlertsStrip from '@/components/AlertsStrip';
import PointInspectionDrawer from '@/components/PointInspectionDrawer';
import Dashboard from '@/components/Dashboard';
import StormCellInspector from '@/components/StormCellInspector';
import { useNowcastStore } from '@/lib/store';
import { Settings, Save } from 'lucide-react';

export default function Home() {
  const { activePage } = useNowcastStore();

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] overflow-hidden text-[#ededed]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 relative">
        <Topbar />
        
        <main className="flex-1 relative flex">
            {activePage === 'live-map' && (
                <>
                    <div className="flex-1 relative">
                        <MapCanvas />
                        <LayerDrawer />
                        <PlaybackSlider />
                        <AlertsStrip />
                    </div>
                    <PointInspectionDrawer />
                </>
            )}
            
            {activePage === 'dashboard' && (
                <Dashboard />
            )}
            
            {activePage === 'storm-cells' && (
                <div className="flex-1 flex bg-[#0a0a0a]">
                    <div className="w-[340px] border-r border-[#1f1f1f] flex flex-col">
                        <RightSidebar />
                    </div>
                    <StormCellInspector />
                </div>
            )}

            {activePage === 'alerts' && (
                <div className="flex-1 p-8 overflow-y-auto bg-[#0a0a0a]">
                    <h1 className="text-xl font-bold tracking-[0.2em] mb-6 border-b border-[#1f1f1f] pb-4">ACTIVE WARNINGS</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border border-[#ef4444] bg-[#111] p-5">
                            <div className="text-[10px] text-[#ef4444] font-bold tracking-[0.1em] mb-2">CRITICAL - TORNADO WARNING</div>
                            <div className="text-lg font-bold mb-2">Cell ID: C-882 (38.10, -93.80)</div>
                            <div className="text-[#888] text-sm">Radar indicated rotation detected. High probability of tornadic activity within 15 minutes.</div>
                        </div>
                        <div className="border border-[#f97316] bg-[#111] p-5">
                            <div className="text-[10px] text-[#f97316] font-bold tracking-[0.1em] mb-2">SEVERE - THUNDERSTORM</div>
                            <div className="text-lg font-bold mb-2">Cell ID: C-928 (39.70, -97.50)</div>
                            <div className="text-[#888] text-sm">Severe thunderstorm with 60mph wind gusts and quarter size hail moving east at 45 knots.</div>
                        </div>
                        <div className="border border-[#eab308] bg-[#111] p-5">
                            <div className="text-[10px] text-[#eab308] font-bold tracking-[0.1em] mb-2">WARNING - FLASH FLOOD</div>
                            <div className="text-lg font-bold mb-2">Cell ID: C-411 (41.20, -95.00)</div>
                            <div className="text-[#888] text-sm">Life threatening flash flooding expected due to stationary heavy rainfall over urban areas.</div>
                        </div>
                    </div>
                </div>
            )}

            {activePage === 'model-insights' && (
                <div className="flex-1 p-8 bg-[#0a0a0a]">
                     <h1 className="text-xl font-bold tracking-[0.2em] mb-6 border-b border-[#1f1f1f] pb-4">MODEL DIAGNOSTICS (DEEPCAST-V4.2)</h1>
                     <div className="border border-[#1f1f1f] p-6 bg-[#111] max-w-4xl">
                         <pre className="text-[11px] text-[#3b82f6] mb-4">
                            {`> INIT MODEL INFERENCE ENGINE... [OK]
> LOADING WEIGHTS (CONV-3D)... [OK]
> ESTABLISHING SENSOR FEED... [OK]
> RUNNING SPATIOTEMPORAL PREDICTION...`}
                         </pre>
                         <div className="grid grid-cols-4 gap-px bg-[#1f1f1f] border border-[#1f1f1f] mb-6">
                            {[
                                { k: 'MSE', v: '0.042' },
                                { k: 'MAE', v: '0.12' },
                                { k: 'RMSE', v: '0.20' },
                                { k: 'R2', v: '0.88' },
                            ].map(x => (
                                <div key={x.k} className="bg-[#0a0a0a] p-3 text-center">
                                    <div className="text-[9px] text-[#666] font-bold tracking-widest">{x.k}</div>
                                    <div className="text-lg font-bold">{x.v}</div>
                                </div>
                            ))}
                         </div>
                     </div>
                </div>
            )}

            {activePage === 'settings' && (
                <div className="flex-1 p-8 bg-[#0a0a0a] overflow-y-auto">
                    <h1 className="text-xl font-bold tracking-[0.2em] mb-6 border-b border-[#1f1f1f] pb-4 flex items-center gap-3">
                        <Settings className="w-5 h-5 text-[#666]" />
                        SYSTEM PREFERENCES
                    </h1>
                    <div className="max-w-2xl space-y-6">
                        <div className="space-y-4 border border-[#1f1f1f] bg-[#111] p-6">
                            <h2 className="text-[11px] text-[#3b82f6] font-bold tracking-[0.1em] uppercase mb-4">Data Ingestion Settings</h2>
                            
                            <div>
                                <label className="block text-[10px] text-[#888] font-bold uppercase mb-2">Radar Source API</label>
                                <input type="text" defaultValue="wss://nexrad.api.weather.gov/stream" className="w-full bg-[#0a0a0a] border border-[#1f1f1f] p-2 text-sm text-[#ededed] focus:outline-none focus:border-[#333]" />
                            </div>
                            
                            <div>
                                <label className="block text-[10px] text-[#888] font-bold uppercase mb-2">Inference Interval (MS)</label>
                                <input type="number" defaultValue={250} className="w-full bg-[#0a0a0a] border border-[#1f1f1f] p-2 text-sm text-[#ededed] focus:outline-none focus:border-[#333]" />
                            </div>
                        </div>

                        <button className="flex items-center gap-2 bg-[#ededed] text-[#0a0a0a] px-5 py-2.5 text-xs font-bold hover:bg-white transition-none">
                            <Save className="w-4 h-4" />
                            APPLY CONFIGURATION
                        </button>
                    </div>
                </div>
            )}
        </main>
      </div>
    </div>
  );
}
