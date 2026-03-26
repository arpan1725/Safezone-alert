'use client';

import { Navigation } from '@/components/navigation';
import { useApp } from '@/lib/context';
import { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, Users, Settings } from 'lucide-react';

export default function Profile() {
  const { currentUser, setCurrentUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(currentUser || {});
  const [savedMessage, setSavedMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddEmergencyContact = () => {
    setFormData((prev) => ({
      ...prev,
      emergency_contacts: [...(prev.emergency_contacts || []), ''],
    }));
  };

  const handleRemoveEmergencyContact = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      emergency_contacts: prev.emergency_contacts?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleEmergencyContactChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      emergency_contacts: prev.emergency_contacts?.map((contact, i) => (i === index ? value : contact)) || [],
    }));
  };

  const handleSave = () => {
    if (currentUser?.id) {
      setCurrentUser(formData);
      setIsEditing(false);
      setSavedMessage('Profile updated successfully!');
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  if (!currentUser) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-100">
        {/* Header */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{formData.name || 'User Profile'}</h1>
                <p className="text-green-100">{formData.email}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          {savedMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
              ✓ {savedMessage}
            </div>
          )}

          {/* Profile Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Personal Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-green-600" />
                Personal Info
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Full Name</p>
                  <p className="font-semibold">{currentUser.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-semibold">{currentUser.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Member Since</p>
                  <p className="font-semibold">{new Date(currentUser.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Safety Settings Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Safety Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Location Sharing</span>
                  <div
                    className={`w-12 h-6 rounded-full transition-colors ${
                      currentUser.location_sharing_enabled ? 'bg-green-500' : 'bg-gray-300'
                    } flex items-center`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        currentUser.location_sharing_enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  {currentUser.location_sharing_enabled
                    ? '✓ Location sharing enabled'
                    : '✗ Location sharing disabled'}
                </p>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                Quick Stats
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Emergency Contacts</p>
                  <p className="font-semibold text-lg">{currentUser.emergency_contacts?.length || 0}</p>
                </div>
                <div>
                  <p className="text-gray-600">Account Status</p>
                  <p className="font-semibold text-green-600">✓ Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Settings className="w-6 h-6 text-green-600" />
                Account Settings
              </h2>
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  isEditing
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            {/* Personal Information Section */}
            <div className="mb-8 pb-8 border-b">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Safety Settings Section */}
            <div className="mb-8 pb-8 border-b">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Safety Settings
              </h3>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="location_sharing_enabled"
                  checked={formData.location_sharing_enabled || false}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className="text-gray-700">
                  Enable location sharing with emergency contacts
                </span>
              </label>
            </div>

            {/* Emergency Contacts Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Emergency Contacts
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                These contacts will be notified immediately when you trigger an emergency alert.
              </p>

              <div className="space-y-3 mb-4">
                {formData.emergency_contacts?.map((contact, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="email"
                      value={contact}
                      onChange={(e) => handleEmergencyContactChange(index, e.target.value)}
                      disabled={!isEditing}
                      placeholder="contact@email.com"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                    />
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveEmergencyContact(index)}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <button
                  onClick={handleAddEmergencyContact}
                  className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors font-semibold"
                >
                  + Add Emergency Contact
                </button>
              )}
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-3">Need Help?</h3>
            <p className="text-gray-700 mb-4">
              Have questions about your profile or safety settings? Check out our help center or contact support.
            </p>
            <button className="text-blue-600 font-semibold hover:text-blue-700">
              View Help Center →
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
