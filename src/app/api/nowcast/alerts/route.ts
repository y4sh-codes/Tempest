import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const alerts = [
    {
      id: 'WARN-1001',
      type: 'Severe Thunderstorm Warning',
      severity: 'Severe',
      description: 'Severe thunderstorm with 60mph wind gusts and quarter size hail.',
      arrivalEstimate: '30 min arrival',
      lat: 39.7,
      lon: -97.5,
    },
    {
      id: 'WARN-1002',
      type: 'Tornado Warning',
      severity: 'Critical',
      description: 'Radar indicated rotation. Take cover immediately.',
      arrivalEstimate: '15 min arrival',
      lat: 38.1,
      lon: -93.8,
    },
    {
      id: 'WARN-1003',
      type: 'Flash Flood Warning',
      severity: 'Warning',
      description: 'Life threatening flash flooding expected.',
      arrivalEstimate: '45 min arrival',
      lat: 41.2,
      lon: -95.0,
    }
  ];

  return NextResponse.json({ alerts });
}
