import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeStr = searchParams.get('time');
  const time = timeStr ? parseInt(timeStr, 10) : 0; // offset in minutes

  // Generate synthetic blobs moving based on the time offset
  const baseBlobs = [
    { id: 'b1', lat: 39.5, lon: -98.0, speedLat: 0.05, speedLon: 0.1, radius: 40, maxDbz: 65, irTemp: -70, lightningProb: 90 },
    { id: 'b2', lat: 41.0, lon: -95.5, speedLat: 0.02, speedLon: 0.08, radius: 60, maxDbz: 50, irTemp: -50, lightningProb: 40 },
    { id: 'b3', lat: 38.0, lon: -94.0, speedLat: -0.01, speedLon: 0.12, radius: 35, maxDbz: 70, irTemp: -80, lightningProb: 99 },
  ];

  const gridData = baseBlobs.map(blob => ({
    id: blob.id,
    lat: blob.lat + (blob.speedLat * time * 0.1),
    lon: blob.lon + (blob.speedLon * time * 0.1),
    radius: blob.radius,
    maxDbz: blob.maxDbz,
    irTemp: blob.irTemp,
    lightningProb: blob.lightningProb,
  }));

  return NextResponse.json({ time, gridData });
}
