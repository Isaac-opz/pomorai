import { useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  external_urls: { spotify: string };
}

export function useSpotify() {
  const { data: session } = useSession();
  const [currentPlaylist, setCurrentPlaylist] = useState<SpotifyPlaylist | null>(null);

  const searchFocusPlaylists = useCallback(async () => {
    if (!session) return [];

    try {
      const response = await fetch('/api/spotify/playlists');

      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching playlists:', error);
      return [];
    }
  }, [session]);

  const playPlaylist = useCallback(async (playlistUri: string) => {
    if (!session) return;

    try {
      await fetch('/api/spotify/play', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contextUri: playlistUri,
        }),
      });
    } catch (error) {
      console.error('Error playing playlist:', error);
    }
  }, [session]);

  const pausePlayback = useCallback(async () => {
    if (!session) return;

    try {
      await fetch('/api/spotify/pause', {
        method: 'PUT',
      });
    } catch (error) {
      console.error('Error pausing playback:', error);
    }
  }, [session]);

  const resumePlayback = useCallback(async () => {
    if (!session) return;

    try {
      await fetch('/api/spotify/play', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
    } catch (error) {
      console.error('Error resuming playback:', error);
    }
  }, [session]);

  return {
    isAuthenticated: !!session,
    searchFocusPlaylists,
    playPlaylist,
    pausePlayback,
    resumePlayback,
    currentPlaylist,
    setCurrentPlaylist,
  };
}
