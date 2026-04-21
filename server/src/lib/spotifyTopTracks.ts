import { getAccessToken } from "./spotifyAccessToken";

export type SpotifyTrackItem = {
  title: string;
  artist: string;
  image?: string;
  url: string;
};

type SpotifyTrack = {
  name: string;
  artists: { name: string }[];
  album: {
    images: { url: string }[];
  };
  external_urls: {
    spotify: string;
  };
};

type SpotifyTopTracksResponse = {
  items?: SpotifyTrack[];
  error?: {
    status: number;
    message: string;
  };
};

type SpotifySavedTracksResponse = {
  items?: {
    added_at: string;
    track: SpotifyTrack;
  }[];
  error?: {
    status: number;
    message: string;
  };
};

function mapTrack(track: SpotifyTrack): SpotifyTrackItem {
  return {
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    image: track.album.images[0]?.url,
    url: track.external_urls.spotify,
  };
}

function parseErrorMessage(text: string): string {
  if (!text) return "Unknown error";

  try {
    const parsed = JSON.parse(text) as {
      error?: { message?: string };
      message?: string;
    };

    return parsed.error?.message ?? parsed.message ?? text;
  } catch {
    return text;
  }
}

export async function getTopTracks(
  timeRange: "short_term" | "medium_term" | "long_term" = "short_term",
  limit = 5,
): Promise<SpotifyTrackItem[]> {
  const token = await getAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const text = await res.text();

  if (!res.ok) {
    throw new Error(
      `Spotify top-tracks request failed (${res.status}): ${parseErrorMessage(text)}`,
    );
  }

  if (!text) return [];

  let data: SpotifyTopTracksResponse;

  try {
    data = JSON.parse(text) as SpotifyTopTracksResponse;
  } catch {
    throw new Error("Failed to parse Spotify top-tracks response");
  }

  if (!Array.isArray(data.items)) return [];

  return data.items.map(mapTrack);
}

export async function getSavedTracks(limit = 10): Promise<SpotifyTrackItem[]> {
  const token = await getAccessToken();

  const res = await fetch(`https://api.spotify.com/v1/me/tracks?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(
      `Spotify saved-tracks request failed (${res.status}): ${parseErrorMessage(text)}`,
    );
  }

  if (!text) return [];

  let data: SpotifySavedTracksResponse;

  try {
    data = JSON.parse(text) as SpotifySavedTracksResponse;
  } catch {
    throw new Error("Failed to parse Spotify saved-tracks response");
  }

  if (!Array.isArray(data.items)) return [];

  return data.items.map((item) => mapTrack(item.track));
}
