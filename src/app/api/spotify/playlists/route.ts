import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { SpotifyPlaylist } from '@/hooks/useSpotify';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    try {
      const response = await fetch(
        'https://api.spotify.com/v1/search?q=focus&type=playlist&limit=10',
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }

      const data = await response.json();
      const playlists = data.playlists?.items || [];
      
      // Map to minimal interface to reduce payload size and filter invalid entries
      const validPlaylists = playlists
        .filter((playlist: SpotifyPlaylist) => playlist && playlist.id)
        .map((playlist: SpotifyPlaylist) => ({
          id: playlist.id,
          name: playlist.name,
          description: playlist.description,
          images: playlist.images,
          external_urls: playlist.external_urls,
        }));
      
      return NextResponse.json(validPlaylists);
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('Request timed out');
        return NextResponse.json(
          { error: 'Spotify API request timed out' },
          { status: 504 }
        );
      }
      console.error('Error fetching playlists:', error);
      return NextResponse.json(
        { error: 'Failed to fetch playlists' },
        { status: 500 }
      );
    }
}
