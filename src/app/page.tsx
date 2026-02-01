'use client';

import { PomodoroTimer } from '@/components/PomodoroTimer';
import { SpotifyPlaylists } from '@/components/SpotifyPlaylists';
import { SpotifyAuth } from '@/components/SpotifyAuth';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen relative">
        {/* Glass Navigation Bar */}
        <nav className="glass-navbar sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold bg-gradient-to-r from-spotify-green-light to-spotify-green bg-clip-text text-transparent">
                  PomorAI
                </div>
                <div className="text-sm text-white/60 font-medium">Focus Timer</div>
              </div>
              <SpotifyAuth />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-start py-16 px-4">
          <PomodoroTimer />
          <SpotifyPlaylists />
        </main>

        {/* Footer */}
        <footer className="mt-auto py-8 text-center">
          <p className="text-white/40 text-sm font-medium">
            Focus better with the Pomodoro Technique and curated music
          </p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
