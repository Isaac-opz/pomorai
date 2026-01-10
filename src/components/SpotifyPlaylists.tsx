'use client';

import { useSpotify, SpotifyPlaylist } from '@/hooks/useSpotify';
import { useEffect, useState } from 'react';
import { Music, Play } from 'lucide-react';

export function SpotifyPlaylists() {
  const { isAuthenticated, searchFocusPlaylists, playPlaylist, setCurrentPlaylist } = useSpotify();
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPlaylists = async () => {
    setLoading(true);
    const results = await searchFocusPlaylists();
    setPlaylists(results);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadPlaylists();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handlePlayPlaylist = (playlist: SpotifyPlaylist) => {
    playPlaylist(`spotify:playlist:${playlist.id}`);
    setCurrentPlaylist(playlist);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mt-12">
      <div className="flex items-center space-x-2 mb-6">
        <Music className="w-6 h-6 text-green-500" />
        <h2 className="text-2xl font-bold text-white">Focus Playlists</h2>
      </div>

      {loading ? (
        <div className="text-gray-400 text-center py-8">Loading playlists...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors group cursor-pointer"
              onClick={() => handlePlayPlaylist(playlist)}
            >
              <div className="relative">
                {playlist.images[0] && (
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1 truncate">
                  {playlist.name}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {playlist.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
