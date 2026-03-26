// Database schema types for SafeZone Alert

export interface User {
  id: string;
  email: string;
  name: string;
  emergency_contacts: string[];
  location_sharing_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface DangerZone {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  radius_meters: number;
  danger_level: 'low' | 'medium' | 'high' | 'critical';
  reported_by_user_id: string;
  report_count: number;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocationHistory {
  id: string;
  user_id: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
}

export interface EmergencyAlert {
  id: string;
  user_id: string;
  alert_type: 'sos' | 'danger_zone_warning' | 'threat_assessment';
  latitude: number;
  longitude: number;
  description: string;
  status: 'active' | 'resolved' | 'false_alarm';
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
