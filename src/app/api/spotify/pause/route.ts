import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function PUT() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok && response.status !== 204) {
        const error = await response.text();
        console.error('Spotify API error:', error);
        return NextResponse.json(
          { error: 'Failed to pause' },
          { status: response.status }
        );
      }

      return NextResponse.json({ success: true });
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Spotify API request timed out' },
          { status: 504 }
        );
      }
      console.error('Error pausing:', error);
      return NextResponse.json(
        { error: 'Failed to pause' },
        { status: 500 }
      );
    }
}
