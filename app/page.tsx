'use client';

import { Navigation } from '@/components/navigation';
import Link from 'next/link';
import { Shield, MapPin, AlertTriangle, MessageSquare, Zap, Users } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: MapPin,
      title: 'Real-time Location Tracking',
      description: 'Monitor your location and receive alerts when entering danger zones',
    },
    {
      icon: AlertTriangle,
      title: 'Danger Zone Alerts',
      description: 'Get notified about high-risk areas reported by other users',
    },
    {
      icon: Zap,
      title: 'Emergency SOS',
      description: 'Trigger emergency alerts with one click and notify your emergency contacts',
    },
    {
      icon: MessageSquare,
      title: 'AI Safety Guide',
      description: 'Get personalized safety advice and threat assessment from our AI chatbot',
    },
    {
      icon: Users,
      title: 'Community Reports',
      description: 'Help others by reporting danger zones and verifying safety information',
    },
    {
      icon: Shield,
      title: 'Personal Safety Hub',
      description: 'Manage emergency contacts, location sharing, and safety preferences',
    },
  ];

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Shield className="w-16 h-16" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Stay Safe, Stay Alert
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-red-100 text-balance">
              Real-time safety monitoring with danger zone alerts, emergency features, and AI-powered guidance
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/dashboard"
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/chatbot"
                className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800 transition-colors border-2 border-white"
              >
                Get Safety Tips
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control of Your Safety?</h2>
            <p className="text-lg mb-8 text-red-100">
              Join thousands of users who are already using SafeZone Alert to stay safe in their communities.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-white text-red-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-colors"
            >
              Start Now
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="text-white font-bold mb-4">SafeZone Alert</h4>
                <p className="text-sm">Making communities safer one alert at a time.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Features</h4>
                <ul className="text-sm space-y-2">
                  <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                  <li><Link href="/danger-zones" className="hover:text-white">Danger Zones</Link></li>
                  <li><Link href="/emergency" className="hover:text-white">Emergency</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Safety</h4>
                <ul className="text-sm space-y-2">
                  <li><Link href="/chatbot" className="hover:text-white">Safety Tips</Link></li>
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Support</h4>
                <ul className="text-sm space-y-2">
                  <li><a href="#" className="hover:text-white">Help Center</a></li>
                  <li><a href="#" className="hover:text-white">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white">Report Issue</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-sm">
              <p>&copy; 2025 SafeZone Alert. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
