'use client';

import { Navigation } from '@/components/navigation';
import { useApp } from '@/lib/context';
import { useState, useMemo } from 'react';
import {
  AlertTriangle,
  Search,
  TrendingUp,
  Users,
  MapPin,
  Filter,
} from 'lucide-react';

export default function DangerZones() {
  const { dangerZones } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>(
    'all'
  );
  const [sortBy, setSortBy] = useState<'name' | 'risk' | 'reports'>('risk');

  const filteredZones = useMemo(() => {
    let result = dangerZones;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (zone) =>
          zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          zone.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by danger level
    if (filterLevel !== 'all') {
      result = result.filter((zone) => zone.danger_level === filterLevel);
    }

    // Sort
    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'risk':
        const riskOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        result.sort(
          (a, b) => riskOrder[a.danger_level as keyof typeof riskOrder] - riskOrder[b.danger_level as keyof typeof riskOrder]
        );
        break;
      case 'reports':
        result.sort((a, b) => b.report_count - a.report_count);
        break;
    }

    return result;
  }, [dangerZones, searchTerm, filterLevel, sortBy]);

  const getDangerColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-600 text-white';
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getDangerBg = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-50 border-l-4 border-red-600';
      case 'high':
        return 'bg-red-50 border-l-4 border-red-500';
      case 'medium':
        return 'bg-yellow-50 border-l-4 border-yellow-500';
      case 'low':
        return 'bg-blue-50 border-l-4 border-blue-500';
      default:
        return 'bg-gray-50 border-l-4 border-gray-500';
    }
  };

  const getRiskDescription = (level: string) => {
    switch (level) {
      case 'critical':
        return '🔴 CRITICAL - Avoid this area';
      case 'high':
        return '🟠 HIGH - Exercise extreme caution';
      case 'medium':
        return '🟡 MEDIUM - Be aware and alert';
      case 'low':
        return '🔵 LOW - Minor concerns reported';
      default:
        return 'Unknown';
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-100">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8" />
              Danger Zones Map
            </h1>
            <p className="text-blue-100">
              Community-reported dangerous areas. {dangerZones.length} zones tracked
            </p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Search className="w-4 h-4 inline mr-2" />
                  Search Zones
                </label>
                <input
                  type="text"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Filter className="w-4 h-4 inline mr-2" />
                  Risk Level
                </label>
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Levels</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <TrendingUp className="w-4 h-4 inline mr-2" />
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="risk">Risk Level</option>
                  <option value="reports">Reports</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-gray-700">
            Showing <strong>{filteredZones.length}</strong> of <strong>{dangerZones.length}</strong>{' '}
            danger zones
          </div>

          {/* Zones Grid */}
          {filteredZones.length > 0 ? (
            <div className="space-y-4">
              {filteredZones.map((zone) => (
                <div key={zone.id} className={`rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow ${getDangerBg(zone.danger_level)}`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDangerColor(zone.danger_level)}`}>
                          {zone.danger_level.toUpperCase()}
                        </span>
                        {zone.verified && (
                          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{zone.name}</h3>
                      <p className="text-gray-700 mb-4">{zone.description}</p>

                      {/* Risk Description */}
                      <p className="text-sm font-semibold text-gray-600 mb-4">
                        {getRiskDescription(zone.danger_level)}
                      </p>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">📊 Reports</p>
                          <p className="font-bold text-lg">{zone.report_count}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">📏 Radius</p>
                          <p className="font-bold text-lg">{zone.radius_meters}m</p>
                        </div>
                        <div>
                          <p className="text-gray-600">📍 Latitude</p>
                          <p className="font-bold text-lg">{zone.latitude.toFixed(4)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">📍 Longitude</p>
                          <p className="font-bold text-lg">{zone.longitude.toFixed(4)}</p>
                        </div>
                      </div>

                      {/* Date */}
                      <p className="text-xs text-gray-500 mt-4">
                        Last updated: {new Date(zone.updated_at).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="md:w-32">
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <AlertTriangle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 text-lg">No danger zones found matching your criteria.</p>
            </div>
          )}
        </section>

        {/* Stats Section */}
        <section className="bg-white border-t py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Danger Zone Statistics</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  label: 'Critical Zones',
                  count: dangerZones.filter((z) => z.danger_level === 'critical').length,
                  color: 'bg-red-100 text-red-700',
                },
                {
                  label: 'High Risk Zones',
                  count: dangerZones.filter((z) => z.danger_level === 'high').length,
                  color: 'bg-orange-100 text-orange-700',
                },
                {
                  label: 'Medium Risk Zones',
                  count: dangerZones.filter((z) => z.danger_level === 'medium').length,
                  color: 'bg-yellow-100 text-yellow-700',
                },
                {
                  label: 'Total Reports',
                  count: dangerZones.reduce((sum, z) => sum + z.report_count, 0),
                  color: 'bg-blue-100 text-blue-700',
                },
              ].map((stat, idx) => (
                <div key={idx} className={`rounded-lg p-6 ${stat.color}`}>
                  <p className="text-sm font-semibold opacity-75">{stat.label}</p>
                  <p className="text-4xl font-bold">{stat.count}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
