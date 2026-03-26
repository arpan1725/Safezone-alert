'use client';

import { Navigation } from '@/components/navigation';
import { MapDisplay } from '@/components/map-display';
import { useApp } from '@/lib/context';
import { AlertTriangle, TrendingUp, Users, Map } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { currentUser, dangerZones, userLocation, nearbyDangerZones } = useApp();
  const [stats, setStats] = useState({
    totalZones: 0,
    nearbyZones: 0,
    highRiskZones: 0,
    communityAlerts: 0,
  });

  useEffect(() => {
    setStats({
      totalZones: dangerZones.length,
      nearbyZones: nearbyDangerZones.length,
      highRiskZones: dangerZones.filter((z) => z.danger_level === 'critical' || z.danger_level === 'high').length,
      communityAlerts: dangerZones.reduce((sum, z) => sum + z.report_count, 0),
    });
  }, [dangerZones, nearbyDangerZones]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-100">
        {/* Welcome Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Welcome, {currentUser?.name || 'User'}!</h1>
            <p className="text-red-100 text-lg">
              {nearbyDangerZones.length > 0
                ? `⚠️ You are near ${nearbyDangerZones.length} reported danger zone(s). Stay alert!`
                : '✅ No danger zones nearby. Stay safe!'}
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Danger Zones</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalZones}</p>
                </div>
                <Map className="w-10 h-10 text-red-600 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Nearby Zones</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.nearbyZones}</p>
                </div>
                <AlertTriangle className="w-10 h-10 text-yellow-500 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">High Risk Areas</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.highRiskZones}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-red-700 opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Community Reports</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.communityAlerts}</p>
                </div>
                <Users className="w-10 h-10 text-blue-600 opacity-20" />
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Link
              href="/emergency"
              className="bg-red-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-3 shadow-lg"
            >
              <AlertTriangle className="w-5 h-5" />
              Emergency SOS
            </Link>
            <Link
              href="/danger-zones"
              className="bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-3 shadow-lg"
            >
              <Map className="w-5 h-5" />
              View All Danger Zones
            </Link>
            <Link
              href="/chatbot"
              className="bg-purple-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-3 shadow-lg"
            >
              💬 AI Safety Guide
            </Link>
          </div>

          {/* Main Map */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Live Safety Map</h2>
            <MapDisplay userLocation={userLocation} dangerZones={dangerZones} />
          </div>

          {/* Nearby Danger Zones */}
          {nearbyDangerZones.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                Nearby Danger Zones - ALERT!
              </h2>
              <div className="space-y-4">
                {nearbyDangerZones.map((zone) => (
                  <div
                    key={zone.id}
                    className="border-l-4 border-red-600 bg-red-50 p-4 rounded"
                  >
                    <h3 className="font-bold text-lg text-red-900">{zone.name}</h3>
                    <p className="text-red-800 mb-2">{zone.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-red-700">
                      <span>📍 Risk Level: <strong>{zone.danger_level.toUpperCase()}</strong></span>
                      <span>👥 Reports: {zone.report_count}</span>
                      <span>📏 Radius: {zone.radius_meters}m</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="w-2 h-2 bg-red-600 rounded-full" />
                <div>
                  <p className="font-semibold">Emergency Alert in Riverside District</p>
                  <p className="text-sm text-gray-600">High-risk area - 25 verified reports</p>
                  <p className="text-xs text-gray-500">Updated 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                <div>
                  <p className="font-semibold">Downtown Park Late Night Zone Added</p>
                  <p className="text-sm text-gray-600">Medium-risk area - 8 reports</p>
                  <p className="text-xs text-gray-500">Updated 1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div>
                  <p className="font-semibold">Location Sharing Enabled</p>
                  <p className="text-sm text-gray-600">Share your safety status with trusted contacts</p>
                  <p className="text-xs text-gray-500">Updated 3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
