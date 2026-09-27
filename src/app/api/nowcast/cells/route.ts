import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeStr = searchParams.get('time');
  const time = timeStr ? parseInt(timeStr, 10) : 0; // offset in minutes

  const baseCells = [
    { id: 'C-928', lat: 39.5, lon: -98.0, speedLat: 0.05, speedLon: 0.1, maxDbz: 65, vil: 45, cloudTop: 45000, cape: 3200 },
    { id: 'C-411', lat: 41.0, lon: -95.5, speedLat: 0.02, speedLon: 0.08, maxDbz: 50, vil: 20, cloudTop: 30000, cape: 1500 },
    { id: 'C-882', lat: 38.0, lon: -94.0, speedLat: -0.01, speedLon: 0.12, maxDbz: 70, vil: 60, cloudTop: 55000, cape: 4500 },
  ];

  const cells = baseCells.map(c => {
    const currentLat = c.lat + (c.speedLat * time * 0.1);
    const currentLon = c.lon + (c.speedLon * time * 0.1);
    
    // Predicted track for the next 3 hours (180 mins), 15 min intervals
    const track = [];
    for(let t = 15; t <= 180; t += 15) {
        track.push({
            lat: currentLat + (c.speedLat * t * 0.1),
            lon: currentLon + (c.speedLon * t * 0.1),
            timeOffset: t
        });
    }

    return {
      id: c.id,
      lat: currentLat,
      lon: currentLon,
      maxDbz: c.maxDbz,
      vil: c.vil,
      cloudTop: c.cloudTop,
      cape: c.cape,
      predictedTrack: track,
      severity: c.maxDbz >= 60 ? 'Severe' : c.maxDbz >= 50 ? 'Strong' : 'General'
    };
  });

  return NextResponse.json({ time, cells });
}
