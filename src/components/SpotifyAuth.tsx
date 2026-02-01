'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { LogIn, LogOut } from 'lucide-react';
import { GlassButton } from '@/components/ui';

export function SpotifyAuth() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-white/80 font-medium text-sm">
          {session.user?.name || session.user?.email}
        </span>
        <GlassButton
          variant="glass"
          size="md"
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </GlassButton>
      </div>
    );
  }

  return (
    <GlassButton
      variant="spotify"
      size="lg"
      onClick={() => signIn('spotify')}
      className="glow-spotify"
    >
      <LogIn className="w-5 h-5" />
      <span>Connect Spotify</span>
    </GlassButton>
  );
}
