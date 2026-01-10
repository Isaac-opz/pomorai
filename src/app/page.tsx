'use client';

import { PomodoroTimer } from '@/components/PomodoroTimer';
import { SpotifyPlaylists } from '@/components/SpotifyPlaylists';
import { SpotifyAuth } from '@/components/SpotifyAuth';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <nav className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-white">PomorAI</div>
              <div className="text-sm text-gray-400">Focus Timer</div>
            </div>
            <SpotifyAuth />
          </div>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-start py-16 px-4">
        <PomodoroTimer />
        <SpotifyPlaylists />
      </main>

      <footer className="mt-auto py-8 text-center text-gray-500 text-sm">
        <p>Focus better with the Pomodoro Technique and curated music</p>
      </footer>
    </div>
  );
}
