'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, DangerZone } from './types';
import { mockCurrentUser, mockDangerZones, mockLocationHistory } from './mockData';

interface AppContextType {
  currentUser: User | null;
  dangerZones: DangerZone[];
  userLocation: { lat: number; lng: number } | null;
  nearbyDangerZones: DangerZone[];
  setCurrentUser: (user: User | null) => void;
  setDangerZones: (zones: DangerZone[]) => void;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [dangerZones, setDangerZones] = useState<DangerZone[]>(mockDangerZones);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Initialize user and location on mount
  useEffect(() => {
    setCurrentUser(mockCurrentUser);

    // Simulate getting current location
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log('Location access denied, using default:', error);
          // Use default location (New York City)
          setUserLocation({ lat: 40.7128, lng: -74.006 });
        }
      );
    } else {
      setUserLocation({ lat: 40.7128, lng: -74.006 });
    }
  }, []);

  // Calculate nearby danger zones
  const nearbyDangerZones = userLocation
    ? dangerZones.filter((zone) => {
        const distance = Math.sqrt(
          Math.pow(zone.latitude - userLocation.lat, 2) +
            Math.pow(zone.longitude - userLocation.lng, 2)
        );
        return distance < 0.05; // Within ~5km
      })
    : [];

  return (
    <AppContext.Provider
      value={{
        currentUser,
        dangerZones,
        userLocation,
        nearbyDangerZones,
        setCurrentUser,
        setDangerZones,
        setUserLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
