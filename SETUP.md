# SafeZone Alert - Setup Guide

## Project Structure

```
safezone-alert/
├── app/                      # Next.js frontend (React)
│   ├── page.tsx             # Homepage
│   ├── dashboard/           # Main dashboard with map
│   ├── emergency/           # SOS and emergency features
│   ├── danger-zones/        # Browse danger zones
│   ├── chatbot/             # AI safety guide
│   ├── profile/             # User profile management
│   └── layout.tsx           # Root layout with AppProvider
├── components/
│   ├── navigation.tsx       # Main navigation bar
│   ├── map-display.tsx      # Interactive safety map
│   └── chat-interface.tsx   # AI chatbot interface
├── lib/
│   ├── types.ts             # TypeScript interfaces
│   ├── mockData.ts          # Mock database data
│   ├── api.ts               # API client functions
│   └── context.tsx          # App-wide state context
└── backend/                 # Express.js server
    ├── server.js            # Main backend server
    ├── package.json         # Backend dependencies
    └── .env.example         # Environment template

```

## Features

✅ **Real-time Location Tracking** - Monitor your position and nearby dangers
✅ **Danger Zone Alerts** - Get notified about high-risk areas
✅ **Emergency SOS** - One-click emergency alerts with contact notifications
✅ **AI Safety Guide** - Context-aware safety advice via ChatGPT
✅ **Community Reports** - See verified danger zones reported by other users
✅ **User Profile** - Manage emergency contacts and safety settings
✅ **Interactive Map** - Visual danger zone representation

## Frontend Setup (Next.js)

### Prerequisites
- Node.js 18+ installed
- pnpm, npm, or yarn

### Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set environment variables** (optional):
   Create `.env.local` in the root directory:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

3. **Run development server:**
   ```bash
   pnpm dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000`

## Backend Setup (Express.js)

### Prerequisites
- Node.js 18+ installed
- Express.js (will be installed via package.json)

### Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (optional):
   - `PORT`: Backend server port (default: 3001)
   - `OPENAI_API_KEY`: Your OpenAI API key for real AI responses
   - `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:3000)

5. **Start backend server:**
   ```bash
   npm start
   # For development with auto-reload:
   npm run dev
   ```

Backend will run on `http://localhost:3001`

## Integration with Real Services

### Supabase Integration (Database)
When ready to use real database:

1. **Create Supabase project** at supabase.com
2. **Run SQL migrations** from the database schema in `lib/types.ts`
3. **Update backend** to connect to Supabase instead of mock data
4. **Set environment variables:**
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   ```

### OpenAI Integration (AI Chatbot)
For real AI responses:

1. **Get OpenAI API key** from openai.com
2. **Add to backend `.env`:**
   ```
   OPENAI_API_KEY=your_api_key
   ```
3. Backend will automatically use real OpenAI instead of mock responses

### Mapbox Integration (Advanced Maps)
For production-grade maps:

1. **Create Mapbox account** at mapbox.com
2. **Get access token** from dashboard
3. **Install Mapbox GL:**
   ```bash
   pnpm add mapbox-gl
   ```
4. **Replace map-display.tsx** with Mapbox implementation
5. **Add environment variable:**
   ```
   NEXT_PUBLIC_MAPBOX_TOKEN=your_token
   ```

## Frontend Pages

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Welcome & features overview |
| Dashboard | `/dashboard` | Main hub with map and stats |
| Emergency | `/emergency` | SOS button and safety tips |
| Danger Zones | `/danger-zones` | Browse and filter danger zones |
| AI Chatbot | `/chatbot` | Chat with safety AI guide |
| Profile | `/profile` | Manage account & emergency contacts |

## API Endpoints

**Base URL:** `http://localhost:3001/api`

### User Management
- `GET /user/:id` - Get user profile
- `PUT /user/:id` - Update user profile

### Danger Zones
- `GET /danger-zones` - Get all danger zones
- `GET /danger-zones/:id` - Get specific zone
- `POST /danger-zones` - Create new danger zone
- `PUT /danger-zones/:id` - Update danger zone

### Emergency Alerts
- `POST /emergency-alerts` - Trigger emergency alert
- `GET /emergency-alerts` - Get all alerts

### Chat
- `POST /chat` - Send chat message
- `GET /chat/history/:user_id` - Get chat history

## Mock vs Real Data

Currently, the application uses **mock data** for demonstration. This means:

✅ All features work immediately with sample data
✅ Changes are stored in memory (not persistent)
✅ Perfect for demos and testing

To use real data:

1. Connect to Supabase (see integration guide above)
2. Update API calls in `lib/api.ts` to use real backend
3. Update `lib/context.tsx` to fetch from real database
4. Remove mock data usage from `lib/mockData.ts`

## Deployment

### Frontend (Vercel)
```bash
# Push to GitHub first
git push

# Then deploy to Vercel
vercel
```

### Backend (Railway, Render, or Heroku)

**Railway Example:**
```bash
railway link
railway up
```

**Environment variables on hosting:**
- Set all `.env` variables in your hosting platform's dashboard

## Troubleshooting

### "Cannot find module" errors
```bash
pnpm install
```

### Backend not responding
- Check port 3001 is not in use
- Ensure backend server is running: `npm start` in `/backend`
- Verify FRONTEND_URL in backend `.env` matches your frontend URL

### Map not showing
- Mock map will display in demo mode
- For real Mapbox: add access token and replace map component

### Chat not working
- Mock responses will display automatically
- For real OpenAI: add OPENAI_API_KEY to backend `.env`

## Features Coming Soon

🚀 Real-time WebSocket updates
🚀 Mobile app (React Native)
🚀 Community verification system
🚀 Predictive danger zone modeling
🚀 Integration with local police departments
🚀 Multi-language support

## Support

For issues or questions:
1. Check this setup guide
2. Review API documentation
3. Check backend logs: `npm start` shows all API activity

## License

SafeZone Alert © 2025. All rights reserved.
