import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import useSWR from "swr";

export interface SpotifyPlaylist {
  id: string;
  name: string | null;
  description: string | null;
  images?: { url: string }[] | null;
  external_urls: { spotify: string };
}

// Global fetcher for SWR
const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
});

export function useSpotify() {
  const { data: session } = useSession();
  const [currentPlaylist, setCurrentPlaylist] =
    useState<SpotifyPlaylist | null>(null);

  // Use SWR for fetching and caching playlists
  const { 
    data: playlists, 
    error, 
    isLoading, 
    mutate 
  } = useSWR<SpotifyPlaylist[]>(
    session ? "/api/spotify/playlists" : null,
    fetcher,
    {
      revalidateOnFocus: false, // Don't refetch when switching tabs
      dedupingInterval: 60000, // Consider data fresh for 1 minute
    }
  );

  const playPlaylist = useCallback(
    async (playlistUri: string) => {
      if (!session) return;

      try {
        await fetch("/api/spotify/play", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contextUri: playlistUri,
          }),
        });
      } catch (error) {
        console.error("Error playing playlist:", error);
      }
    },
    [session],
  );

  const pausePlayback = useCallback(async () => {
    if (!session) return;

    try {
      await fetch("/api/spotify/pause", {
        method: "PUT",
      });
    } catch (error) {
      console.error("Error pausing playback:", error);
    }
  }, [session]);

  const resumePlayback = useCallback(async () => {
    if (!session) return;

    try {
      await fetch("/api/spotify/play", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
    } catch (error) {
      console.error("Error resuming playback:", error);
    }
  }, [session]);

  return {
    isAuthenticated: !!session,
    playlists: playlists || [],
    isLoading,
    isError: !!error,
    refreshPlaylists: mutate,
    playPlaylist,
    pausePlayback,
    resumePlayback,
    currentPlaylist,
    setCurrentPlaylist,
  };
}
