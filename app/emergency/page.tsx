'use client';

import { Navigation } from '@/components/navigation';
import { useApp } from '@/lib/context';
import { useState } from 'react';
import { AlertTriangle, CheckCircle, Phone, Loader } from 'lucide-react';
import { emergencyAPI } from '@/lib/api';

export default function Emergency() {
  const { currentUser, userLocation } = useApp();
  const [sosState, setSOSState] = useState<'idle' | 'triggered' | 'confirming'>('idle');
  const [emergencyTriggered, setEmergencyTriggered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmTimeout, setConfirmTimeout] = useState<NodeJS.Timeout | null>(null);

  const safetyTips = [
    {
      title: 'If You Feel Threatened',
      tips: [
        'Trust your instincts - they are often right',
        'Move to a well-lit, crowded area immediately',
        'Call 911 or use our SOS feature if in danger',
        'Keep your phone charged and accessible',
        'Share your location with trusted contacts',
      ],
    },
    {
      title: 'Personal Safety Basics',
      tips: [
        'Stay aware of your surroundings at all times',
        'Avoid isolated routes, especially at night',
        'Keep your headphones out and stay alert',
        'Walk with purpose and confidence',
        'Vary your routine to avoid predictability',
      ],
    },
    {
      title: 'Home Safety',
      tips: [
        'Always lock doors and windows',
        'Install motion-sensor lighting outside',
        'Know your neighbors and watch their homes',
        'Use security cameras if possible',
        'Have an emergency kit prepared',
      ],
    },
    {
      title: 'Travel Safety',
      tips: [
        'Plan your route in advance',
        'Tell someone where you are going',
        'Keep your phone in an accessible pocket',
        'Avoid displaying expensive items',
        'Trust your gut about people and situations',
      ],
    },
    {
      title: 'Digital Safety',
      tips: [
        'Disable location services when not needed',
        'Use strong, unique passwords',
        'Enable two-factor authentication',
        'Be cautious about sharing personal info',
        'Report suspicious activity immediately',
      ],
    },
    {
      title: 'If You Witness a Crime',
      tips: [
        'Move to a safe location if possible',
        'Call 911 and provide your location',
        'Be a good witness - note details',
        'Do not intervene if it puts you at risk',
        'Cooperate with law enforcement',
      ],
    },
  ];

  const handleSOSClick = () => {
    setSOSState('confirming');

    // Auto-reset if not confirmed within 5 seconds
    const timeout = setTimeout(() => {
      setSOSState('idle');
      setConfirmTimeout(null);
    }, 5000);

    setConfirmTimeout(timeout);
  };

  const handleConfirmSOS = async () => {
    if (confirmTimeout) clearTimeout(confirmTimeout);
    setSOSState('triggered');
    setLoading(true);

    try {
      await emergencyAPI.create({
        user_id: currentUser?.id,
        alert_type: 'sos',
        latitude: userLocation?.lat,
        longitude: userLocation?.lng,
        description: 'Emergency SOS activated',
      });

      setEmergencyTriggered(true);

      // Reset after 10 seconds
      setTimeout(() => {
        setSOSState('idle');
        setEmergencyTriggered(false);
        setLoading(false);
      }, 10000);
    } catch (error) {
      console.error('Failed to trigger SOS:', error);
      setLoading(false);
      setSOSState('idle');
    }
  };

  const handleCancelSOS = () => {
    if (confirmTimeout) clearTimeout(confirmTimeout);
    setSOSState('idle');
    setConfirmTimeout(null);
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-100">
        {/* Emergency SOS Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Emergency Features</h1>
            <p className="text-lg text-red-100 mb-8">
              Quickly alert emergency services and your trusted contacts
            </p>

            {/* SOS Button */}
            <div className="bg-red-800 rounded-lg p-8 mb-6">
              {!emergencyTriggered ? (
                <>
                  {sosState === 'idle' && (
                    <button
                      onClick={handleSOSClick}
                      className="w-full max-w-xs mx-auto flex flex-col items-center gap-4 py-12 px-8 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all transform hover:scale-105 shadow-2xl"
                    >
                      <AlertTriangle className="w-16 h-16" />
                      <span className="text-2xl font-bold">SOS EMERGENCY</span>
                      <span className="text-sm text-red-100">Tap to trigger emergency alert</span>
                    </button>
                  )}

                  {sosState === 'confirming' && (
                    <div className="max-w-xs mx-auto">
                      <p className="text-xl font-bold mb-6 animate-pulse">⚠️ CONFIRM EMERGENCY?</p>
                      <div className="flex gap-4">
                        <button
                          onClick={handleConfirmSOS}
                          disabled={loading}
                          className="flex-1 bg-white text-red-600 py-4 rounded-lg font-bold hover:bg-red-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <>
                              <Loader className="w-5 h-5 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              YES, HELP ME
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleCancelSOS}
                          disabled={loading}
                          className="flex-1 bg-red-400 text-white py-4 rounded-lg font-bold hover:bg-red-500 transition-colors disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center animate-bounce">
                  <CheckCircle className="w-20 h-20 mx-auto mb-4 text-white" />
                  <h2 className="text-3xl font-bold mb-2">Emergency Alert Sent!</h2>
                  <p className="text-lg text-red-100 mb-4">
                    ✅ Emergency services and your contacts have been notified
                  </p>
                  <div className="text-sm text-red-200">
                    <p>📍 Your location has been shared</p>
                    <p>📞 Your emergency contacts are being contacted</p>
                    <p>🚑 Emergency services are being notified</p>
                  </div>
                </div>
              )}
            </div>

            {/* Emergency Contacts */}
            <div className="bg-red-800 rounded-lg p-6 text-left">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Emergency Contacts
              </h3>
              <div className="space-y-2 text-sm">
                {currentUser?.emergency_contacts.map((contact, idx) => (
                  <p key={idx} className="text-red-100">
                    • {contact}
                  </p>
                ))}
                {(!currentUser?.emergency_contacts || currentUser.emergency_contacts.length === 0) && (
                  <p className="text-red-200">No emergency contacts set. Update in your profile.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Safety Tips Grid */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8">Safety Tips & Guidelines</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyTips.map((section, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-red-600 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="flex gap-3 text-sm text-gray-700">
                      <span className="text-red-500 font-bold">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-white border-t-4 border-red-600 py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
            <p className="text-gray-600 mb-6">
              Talk to our AI Safety Guide for personalized advice based on your situation
            </p>
            <a
              href="/chatbot"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Chat with AI Safety Guide
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
