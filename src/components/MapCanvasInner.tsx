'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup, Polyline } from 'react-leaflet';
import { useNowcastStore } from '@/lib/store';

export default function MapCanvasInner() {
  const { timeOffset, layers, selectedCellId, setSelectedCellId } = useNowcastStore();
  const [gridData, setGridData] = useState<any[]>([]);
  const [cellsData, setCellsData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/nowcast/grid?time=${timeOffset}`)
      .then(res => res.json())
      .then(data => setGridData(data.gridData || []))
      .catch(console.error);

    fetch(`/api/nowcast/cells?time=${timeOffset}`)
      .then(res => res.json())
      .then(data => setCellsData(data.cells || []))
      .catch(console.error);
  }, [timeOffset]);

  const getRadarColor = (dbz: number) => {
    if (dbz >= 60) return '#ef4444'; 
    if (dbz >= 50) return '#f97316'; 
    if (dbz >= 40) return '#eab308'; 
    if (dbz >= 30) return '#22c55e'; 
    return '#3b82f6'; 
  };

  return (
    <div style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}>
      <MapContainer 
        center={[39.8283, -98.5795]} 
        zoom={5} 
        style={{ height: '100%', width: '100%', backgroundColor: '#0a0a0a' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          className="map-tiles"
        />
      
      {layers.radar && gridData.map(grid => (
        <Circle 
          key={`radar-${grid.id}`}
          center={[grid.lat, grid.lon]} 
          radius={grid.radius * 1000}
          pathOptions={{ 
            color: getRadarColor(grid.maxDbz), 
            fillColor: getRadarColor(grid.maxDbz), 
            fillOpacity: 0.35,
            weight: 0 
          }}
        />
      ))}

      {layers.lightning && gridData.map(grid => (
         <Circle 
         key={`light-${grid.id}`}
         center={[grid.lat + 0.1, grid.lon - 0.1]} 
         radius={grid.radius * 1000 * (grid.lightningProb / 100)}
         pathOptions={{ 
           color: '#3b82f6', 
           fillColor: '#3b82f6', 
           fillOpacity: 0.25,
           weight: 1,
           dashArray: '2, 4'
         }}
       />
      ))}

      {layers.ir && gridData.map(grid => (
         <Circle 
         key={`ir-${grid.id}`}
         center={[grid.lat, grid.lon]} 
         radius={grid.radius * 1500}
         pathOptions={{ 
           color: '#475569', 
           fillColor: '#94a3b8', 
           fillOpacity: 0.15,
           weight: 0
         }}
       />
      ))}

      {/* Cells and Tracks */}
      {cellsData.map(cell => {
          const isSelected = selectedCellId === cell.id;
          const trackPositions = cell.predictedTrack.map((p: any) => [p.lat, p.lon] as [number, number]);

          return (
            <div key={`cell-group-${cell.id}`}>
              {/* Predicted Track */}
              {trackPositions.length > 0 && (
                 <Polyline 
                   positions={[[cell.lat, cell.lon], ...trackPositions]} 
                   pathOptions={{ 
                     color: isSelected ? '#ededed' : '#666', 
                     weight: isSelected ? 3 : 1.5, 
                     dashArray: '4, 8' 
                   }} 
                 />
              )}
              
              {/* Cell Marker */}
              <Circle 
                center={[cell.lat, cell.lon]} 
                radius={8000}
                pathOptions={{ 
                    color: isSelected ? '#ededed' : getRadarColor(cell.maxDbz), 
                    weight: isSelected ? 3 : 1,
                    fillColor: getRadarColor(cell.maxDbz),
                    fillOpacity: isSelected ? 1 : 0.8
                }}
                eventHandlers={{
                    click: () => setSelectedCellId(cell.id)
                }}
              >
                  <Popup className="custom-popup">
                      <div className="text-[11px] font-bold tracking-widest">{cell.id}</div>
                      <div className="text-[10px] text-[#888]">MAX DBZ: <span className="text-[#ededed]">{cell.maxDbz}</span></div>
                  </Popup>
              </Circle>
            </div>
          );
      })}
    </MapContainer>
    </div>
  );
}
