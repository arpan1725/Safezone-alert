import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data storage (in-memory for demo)
const mockUsers = {
  'user-1': {
    id: 'user-1',
    email: 'alex@safezone.com',
    name: 'Alex Johnson',
    emergency_contacts: ['mom@email.com', 'best-friend@email.com'],
    location_sharing_enabled: true,
  },
};

const mockDangerZones = [
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
  },
];

const mockEmergencyAlerts = [];
const mockChatMessages = [];

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SafeZone Backend is running' });
});

// User endpoints
app.get('/api/user/:id', (req, res) => {
  const user = mockUsers[req.params.id];
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }
  res.json({ success: true, data: user });
});

app.put('/api/user/:id', (req, res) => {
  const user = mockUsers[req.params.id];
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }
  const updated = { ...user, ...req.body };
  mockUsers[req.params.id] = updated;
  res.json({ success: true, data: updated });
});

// Danger zones endpoints
app.get('/api/danger-zones', (req, res) => {
  res.json({ success: true, data: mockDangerZones });
});

app.post('/api/danger-zones', (req, res) => {
  const newZone = {
    id: `dz-${Date.now()}`,
    ...req.body,
    created_at: new Date().toISOString(),
    report_count: 1,
    verified: false,
  };
  mockDangerZones.push(newZone);
  res.status(201).json({ success: true, data: newZone });
});

app.get('/api/danger-zones/:id', (req, res) => {
  const zone = mockDangerZones.find((z) => z.id === req.params.id);
  if (!zone) {
    return res.status(404).json({ success: false, error: 'Danger zone not found' });
  }
  res.json({ success: true, data: zone });
});

app.put('/api/danger-zones/:id', (req, res) => {
  const index = mockDangerZones.findIndex((z) => z.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Danger zone not found' });
  }
  const updated = { ...mockDangerZones[index], ...req.body, updated_at: new Date().toISOString() };
  mockDangerZones[index] = updated;
  res.json({ success: true, data: updated });
});

// Emergency alerts endpoints
app.post('/api/emergency-alerts', (req, res) => {
  const alert = {
    id: `alert-${Date.now()}`,
    user_id: req.body.user_id,
    alert_type: req.body.alert_type || 'sos',
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    description: req.body.description || 'Emergency alert',
    status: 'active',
    created_at: new Date().toISOString(),
  };
  mockEmergencyAlerts.push(alert);
  
  // In production, this would notify emergency services and contacts
  console.log('[EMERGENCY ALERT]', alert);
  
  res.status(201).json({ success: true, data: alert });
});

app.get('/api/emergency-alerts', (req, res) => {
  res.json({ success: true, data: mockEmergencyAlerts });
});

// Chat endpoints
app.post('/api/chat', async (req, res) => {
  const { user_id, message } = req.body;

  // Store user message
  const userMsg = {
    id: `msg-${Date.now()}`,
    user_id,
    role: 'user',
    content: message,
    created_at: new Date().toISOString(),
  };
  mockChatMessages.push(userMsg);

  // Generate AI response (mock or via OpenAI API)
  let assistantResponse;
  
  if (process.env.OPENAI_API_KEY) {
    // Use real OpenAI API if key is available
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are a safety expert AI for the SafeZone Alert app. Provide practical safety advice, emergency tips, and threat assessment. Be empathetic but practical.',
            },
            { role: 'user', content: message },
          ],
          max_tokens: 500,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      assistantResponse = response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API error:', error.message);
      assistantResponse = getMockAIResponse(message);
    }
  } else {
    // Use mock responses
    assistantResponse = getMockAIResponse(message);
  }

  const assistantMsg = {
    id: `msg-${Date.now() + 1}`,
    user_id,
    role: 'assistant',
    content: assistantResponse,
    created_at: new Date().toISOString(),
  };
  mockChatMessages.push(assistantMsg);

  res.json({ success: true, data: assistantMsg });
});

app.get('/api/chat/history/:user_id', (req, res) => {
  const messages = mockChatMessages.filter((m) => m.user_id === req.params.user_id);
  res.json({ success: true, data: messages });
});

// Mock AI response generator
function getMockAIResponse(userMessage) {
  const lowerMsg = userMessage.toLowerCase();

  if (lowerMsg.includes('threat') || lowerMsg.includes('danger')) {
    return 'Trust your instincts. If you feel threatened:\n1. Move to a well-lit, populated area\n2. Call 911 or use our SOS feature\n3. Stay calm and assess the situation\n4. Create distance between yourself and any potential threat\n\nYour safety is the priority. Would you like to activate emergency mode?';
  } else if (lowerMsg.includes('safe') || lowerMsg.includes('walk')) {
    return 'Here are key safety tips:\n1. Stay aware of your surroundings\n2. Keep your phone charged\n3. Travel with others when possible\n4. Stick to well-lit, populated routes\n5. Share your location with trusted contacts\n6. Trust your intuition\n\nIs there a specific area you\'re concerned about?';
  } else if (lowerMsg.includes('emergency') || lowerMsg.includes('help')) {
    return 'In an emergency:\n\n🚨 IMMEDIATE ACTIONS:\n- Call 911 if in immediate danger\n- Use our SOS button for quick alerts\n- Share your location with emergency contacts\n- Stay on the line with authorities\n\nWould you like to activate the SOS alert now?';
  } else if (lowerMsg.includes('contact') || lowerMsg.includes('family')) {
    return 'You can set up emergency contacts in your profile. Make sure to add:\n- Family members\n- Close friends\n- Trusted colleagues\n\nThey\'ll be notified immediately if you trigger an emergency alert. Would you like to update your emergency contacts?';
  }

  return 'I\'m here to help you stay safe. Whether you need safety tips, threat assessment, or emergency guidance, feel free to ask. How can I assist you today?';
}

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SafeZone Alert Backend running on port ${PORT}`);
});
