import { User, DangerZone, LocationHistory, EmergencyAlert, ChatMessage } from './types';

// Mock current user
export const mockCurrentUser: User = {
  id: 'user-1',
  email: 'alex@safezone.com',
  name: 'Alex Johnson',
  emergency_contacts: ['mom@email.com', 'best-friend@email.com'],
  location_sharing_enabled: true,
  created_at: '2024-01-15',
  updated_at: '2025-03-26',
};

// Mock danger zones
export const mockDangerZones: DangerZone[] = [
  {
    id: 'dz-1',
    name: 'Downtown Park Late Night',
    description: 'Multiple theft incidents reported after 10 PM',
    latitude: 40.7128,
    longitude: -74.006,
    radius_meters: 500,
    danger_level: 'medium',
    reported_by_user_id: 'user-2',
    report_count: 8,
    verified: true,
    created_at: '2025-03-10',
    updated_at: '2025-03-25',
  },
  {
    id: 'dz-2',
    name: 'Industrial Area - Abandoned Building',
    description: 'Suspicious activity and trespassing warnings',
    latitude: 40.7489,
    longitude: -73.968,
    radius_meters: 300,
    danger_level: 'high',
    reported_by_user_id: 'user-3',
    report_count: 15,
    verified: true,
    created_at: '2025-02-20',
    updated_at: '2025-03-24',
  },
  {
    id: 'dz-3',
    name: 'Highway 9 - Traffic Accidents',
    description: 'High accident rate during rush hours',
    latitude: 40.758,
    longitude: -73.9855,
    radius_meters: 800,
    danger_level: 'low',
    reported_by_user_id: 'user-4',
    report_count: 12,
    verified: true,
    created_at: '2025-01-05',
    updated_at: '2025-03-20',
  },
  {
    id: 'dz-4',
    name: 'Riverside District - Gang Activity',
    description: 'Increased gang-related incidents reported',
    latitude: 40.7505,
    longitude: -74.0066,
    radius_meters: 1000,
    danger_level: 'critical',
    reported_by_user_id: 'user-5',
    report_count: 25,
    verified: true,
    created_at: '2025-01-20',
    updated_at: '2025-03-22',
  },
];

// Mock location history
export const mockLocationHistory: LocationHistory[] = [
  {
    id: 'loc-1',
    user_id: 'user-1',
    latitude: 40.7128,
    longitude: -74.006,
    accuracy: 10,
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: 'loc-2',
    user_id: 'user-1',
    latitude: 40.7138,
    longitude: -74.008,
    accuracy: 12,
    timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
  },
  {
    id: 'loc-3',
    user_id: 'user-1',
    latitude: 40.7148,
    longitude: -74.01,
    accuracy: 8,
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
  },
];

// Mock emergency alerts
export const mockEmergencyAlerts: EmergencyAlert[] = [
  {
    id: 'alert-1',
    user_id: 'user-2',
    alert_type: 'sos',
    latitude: 40.7489,
    longitude: -73.968,
    description: 'Requesting immediate assistance',
    status: 'resolved',
    created_at: '2025-03-24T14:30:00Z',
    updated_at: '2025-03-24T14:45:00Z',
  },
  {
    id: 'alert-2',
    user_id: 'user-3',
    alert_type: 'danger_zone_warning',
    latitude: 40.7505,
    longitude: -74.0066,
    description: 'User entering high-risk area',
    status: 'active',
    created_at: '2025-03-26T09:15:00Z',
    updated_at: '2025-03-26T09:20:00Z',
  },
];

// Mock chat messages
export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    user_id: 'user-1',
    role: 'user',
    content: 'How do I stay safe while walking home at night?',
    created_at: '2025-03-25T18:00:00Z',
  },
  {
    id: 'msg-2',
    user_id: 'user-1',
    role: 'assistant',
    content:
      'Here are key safety tips for walking at night:\n\n1. **Stay Alert** - Keep aware of your surroundings, avoid distractions like headphones\n2. **Travel in Groups** - When possible, walk with others\n3. **Use Well-Lit Routes** - Stick to main streets and well-lit areas\n4. **Trust Your Instincts** - If something feels unsafe, take a different route\n5. **Share Location** - Let trusted contacts know your route and ETA\n6. **Keep Phone Charged** - Ensure your device has battery for emergencies\n7. **Vary Your Routine** - Don\'t follow the same pattern every day\n\nWould you like more specific advice for your area?',
    created_at: '2025-03-25T18:01:00Z',
  },
  {
    id: 'msg-3',
    user_id: 'user-1',
    role: 'user',
    content: 'What should I do if I feel threatened?',
    created_at: '2025-03-25T18:05:00Z',
  },
  {
    id: 'msg-4',
    user_id: 'user-1',
    role: 'assistant',
    content:
      'If you feel threatened, take these immediate actions:\n\n**Immediate Response:**\n1. **Trust Your Gut** - Your intuition is often right\n2. **Move to Safety** - Go to a well-lit, populated area\n3. **Contact Help** - Call 911 or use our SOS feature\n4. **Stay Calm** - Keep your breathing steady and think clearly\n5. **Make Yourself Visible** - Get to where others can see you\n\n**If Confronted:**\n- Create distance between yourself and the threat\n- Speak firmly but calmly\n- Don\'t escalate the situation\n- If escape is possible, prioritize it\n\n**After the Incident:**\n- Report to local authorities\n- Reach out to emergency contacts\n- Seek support from friends or professionals\n\nRemember: Your safety is the priority. Do you need help contacting emergency services right now?',
    created_at: '2025-03-25T18:06:00Z',
  },
];
