# PomorAI - Pomodoro Timer with Spotify

A beautiful Pomodoro timer web application with Spotify integration that helps you focus better with curated focus playlists.

**Live Demo**: [pomorai.isaacs.dev](https://pomorai.isaacs.dev)

## Features

- **Pomodoro Timer**: Classic 25-minute work sessions with 5-minute short breaks and 15-minute long breaks
- **Spotify Integration**: Search and play trending focus playlists directly in your Spotify account
- **Beautiful UI**: Modern, responsive design with a clean interface
- **Session Tracking**: Keep track of completed Pomodoro sessions
- **Seamless Authentication**: Easy Spotify OAuth integration

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **NextAuth.js** for Spotify OAuth
- **Spotify Web API** for playlist search and playback control

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Spotify account (Premium required for playback control)
- Spotify Developer account

### 1. Create a Spotify Application

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create app"
3. Fill in the app details:
   - **App name**: PomorAI (or your preferred name)
   - **App description**: Pomodoro timer with Spotify
   - **Redirect URIs** (add BOTH):
     - `http://localhost:3000/api/auth/callback/spotify` (for local development)
     - `https://pomorai.isaacs.dev/api/auth/callback/spotify` (for production)
4. Save your **Client ID** and **Client Secret**

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your credentials:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
```

Generate a secret for `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

This project is deployed at [pomorai.isaacs.dev](https://pomorai.isaacs.dev).

### 1. Push to GitHub

Initialize a git repository and push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-github-repo-url
git push -u origin main
```

### 2. Deploy to Vercel with Custom Domain

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add environment variables:
   - `NEXTAUTH_URL`: `https://pomorai.isaacs.dev`
   - `NEXTAUTH_SECRET`: Use the same secret from your `.env.local` (run `openssl rand -base64 32` to generate)
   - `SPOTIFY_CLIENT_ID`: Your Spotify client ID
   - `SPOTIFY_CLIENT_SECRET`: Your Spotify client secret
6. Deploy!

### 3. Configure Custom Domain

1. In Vercel project settings, go to "Domains"
2. Add `pomorai.isaacs.dev`
3. Follow Vercel's instructions to configure DNS:
   - Add a CNAME record pointing to your Vercel deployment
   - Or use Vercel's nameservers

### 4. Verify Spotify Redirect URI

Make sure your Spotify app has this redirect URI:
- `https://pomorai.isaacs.dev/api/auth/callback/spotify`

## Usage

1. Click "Connect Spotify" to authenticate with your Spotify account
2. Select a timer mode (Work, Short Break, or Long Break)
3. Browse and click on a focus playlist to start playing music
4. Click the play button to start the timer
5. Focus on your work until the timer completes!

## How It Works

### Pomodoro Technique

The app implements the classic Pomodoro Technique:
- 25 minutes of focused work
- 5-minute short break after each session
- 15-minute long break after every 4 sessions

### Spotify Integration

The app uses the Spotify Web API to:
- Authenticate users via OAuth 2.0
- Search for trending focus playlists
- Control playback on the user's active Spotify device

**Note**: Spotify Premium is required for playback control features.

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/  # NextAuth API routes
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Main page
├── components/
│   ├── PomodoroTimer.tsx        # Timer component
│   ├── SpotifyPlaylists.tsx     # Playlist browser
│   ├── SpotifyAuth.tsx          # Login/logout button
│   └── Providers.tsx            # SessionProvider wrapper
├── hooks/
│   ├── usePomodoro.ts           # Timer logic hook
│   └── useSpotify.ts            # Spotify API hook
└── types/
    └── next-auth.d.ts           # NextAuth type extensions
```

## Customization

You can customize the Pomodoro timer durations in `src/hooks/usePomodoro.ts`:

```typescript
const DEFAULT_CONFIG: PomodoroConfig = {
  workDuration: 25,        // minutes
  shortBreakDuration: 5,   // minutes
  longBreakDuration: 15,   // minutes
  sessionsUntilLongBreak: 4,
};
```

## License

MIT

## Credits

Built with Next.js, NextAuth.js, and Spotify Web API.
