'use client';

import { DangerZone } from '@/lib/types';
import { AlertTriangle, MapPin } from 'lucide-react';

interface MapDisplayProps {
  userLocation?: { lat: number; lng: number } | null;
  dangerZones: DangerZone[];
}

export function MapDisplay({ userLocation, dangerZones }: MapDisplayProps) {
  const getDangerColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-600';
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDangerBorder = (level: string) => {
    switch (level) {
      case 'critical':
        return 'border-red-600';
      case 'high':
        return 'border-red-500';
      case 'medium':
        return 'border-yellow-500';
      case 'low':
        return 'border-blue-500';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-50 rounded-lg overflow-hidden shadow-lg border-4 border-blue-200 min-h-96 flex flex-col relative">
      {/* Map Header */}
      <div className="bg-blue-600 text-white px-4 py-3 flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        <span className="font-semibold">Live Safety Map</span>
        {userLocation && (
          <span className="text-xs bg-blue-700 px-2 py-1 rounded-full ml-auto">
            Lat: {userLocation.lat.toFixed(4)}, Lng: {userLocation.lng.toFixed(4)}
          </span>
        )}
      </div>

      {/* Map Canvas */}
      <div className="flex-1 relative p-8 flex items-center justify-center">
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(0deg, #000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative w-full h-full">
          {/* Map Center Marker */}
          {userLocation && (
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                left: '50%',
                top: '50%',
              }}
            >
              <div className="relative">
                <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                <div className="absolute inset-0 w-4 h-4 border-2 border-green-500 rounded-full animate-ping opacity-75" />
              </div>
            </div>
          )}

          {/* Danger Zone Markers */}
          {dangerZones.map((zone, index) => {
            // Simple positioning relative to center (mock positioning)
            const offsetX = (index % 3 - 1) * 120 + 10;
            const offsetY = Math.floor(index / 3) * 100 - 50;

            return (
              <div
                key={zone.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `calc(50% + ${offsetX}px)`,
                  top: `calc(50% + ${offsetY}px)`,
                }}
                title={`${zone.name}: ${zone.description}`}
              >
                <div
                  className={`w-8 h-8 ${getDangerColor(zone.danger_level)} rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform flex items-center justify-center relative group`}
                >
                  <AlertTriangle className="w-4 h-4 text-white" />

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                    {zone.name}
                  </div>
                </div>

                {/* Danger Zone Circle (outer ring) */}
                <div
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 ${getDangerBorder(zone.danger_level)} rounded-full opacity-30 animate-pulse`}
                  style={{
                    width: '60px',
                    height: '60px',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Map Legend */}
      <div className="bg-white px-4 py-3 border-t border-blue-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full border border-green-700" />
            <span>Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full border border-red-700" />
            <span>Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full border border-red-600" />
            <span>High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full border border-yellow-600" />
            <span>Medium</span>
          </div>
        </div>
      </div>
    </div>
  );
}
