'use client';
import dynamic from 'next/dynamic';

const MapCanvasInner = dynamic(() => import('./MapCanvasInner'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-950 flex items-center justify-center text-slate-500 font-mono text-sm">Initializing Map Canvas...</div>
});

export default function MapCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <MapCanvasInner />
    </div>
  );
}
