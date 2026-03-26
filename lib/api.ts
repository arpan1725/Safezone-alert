import { User, DangerZone, EmergencyAlert, ChatMessage, ApiResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.error || 'API request failed' };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// User API
export const userAPI = {
  getProfile: (userId: string) => apiCall<User>(`/user/${userId}`),
  updateProfile: (userId: string, data: Partial<User>) =>
    apiCall<User>(`/user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Danger Zones API
export const dangerZonesAPI = {
  getAll: () => apiCall<DangerZone[]>('/danger-zones'),
  getById: (id: string) => apiCall<DangerZone>(`/danger-zones/${id}`),
  create: (data: Partial<DangerZone>) =>
    apiCall<DangerZone>('/danger-zones', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<DangerZone>) =>
    apiCall<DangerZone>(`/danger-zones/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Emergency Alerts API
export const emergencyAPI = {
  create: (data: Partial<EmergencyAlert>) =>
    apiCall<EmergencyAlert>('/emergency-alerts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getAll: () => apiCall<EmergencyAlert[]>('/emergency-alerts'),
};

// Chat API
export const chatAPI = {
  sendMessage: (userId: string, message: string) =>
    apiCall<ChatMessage>('/chat', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, message }),
    }),
  getHistory: (userId: string) => apiCall<ChatMessage[]>(`/chat/history/${userId}`),
};
