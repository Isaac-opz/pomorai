'use client';

import { useSpotify, SpotifyPlaylist } from '@/hooks/useSpotify';
import { useEffect, useState } from 'react';
import { Music, Play } from 'lucide-react';
import { GlassCard } from '@/components/ui';

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
    <div className="w-full max-w-6xl mt-16">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-spotify-green/20 rounded-lg glow-spotify">
          <Music className="w-6 h-6 text-spotify-green" />
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Focus Playlists</h2>
      </div>

      {loading ? (
        <div className="text-white/60 text-center py-16">
          <div className="inline-flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-spotify-green border-t-transparent rounded-full animate-spin" />
            <span className="font-medium">Loading playlists...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <GlassCard
              key={playlist.id}
              onClick={() => handlePlayPlaylist(playlist)}
              className="overflow-hidden group cursor-pointer"
            >
              {/* Playlist Cover Image */}
              <div className="relative h-56 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                {playlist.images && playlist.images.length > 0 && playlist.images[0]?.url ? (
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name || 'Playlist'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <Music className="w-20 h-20 text-white/20" />
                )}
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                    <div className="bg-spotify-green rounded-full p-4 shadow-2xl glow-spotify">
                      <Play className="w-8 h-8 text-black" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Playlist Info */}
              <div className="p-5">
                <h3 className="text-white font-bold text-lg mb-2 truncate group-hover:text-spotify-green-light transition-colors">
                  {playlist.name || 'Untitled Playlist'}
                </h3>
                <p className="text-white/60 text-sm line-clamp-2 leading-relaxed">
                  {playlist.description || 'No description available'}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
