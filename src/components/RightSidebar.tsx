'use client';
import StormCellsTable from './StormCellsTable';
import ModelPerformance from './ModelPerformance';

export default function RightSidebar() {
  return (
    <aside className="w-[340px] bg-[#0a0a0a] border-l border-[#1f1f1f] flex flex-col h-full flex-shrink-0 z-40">
      <StormCellsTable />
      <ModelPerformance />
    </aside>
  );
}
