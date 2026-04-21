import { getAccessToken } from "./spotifyAccessToken";

type SpotifyRecentlyPlayedResponse = {
  items?: {
    played_at: string;
    track: {
      name: string;
      artists: { name: string }[];
      album: {
        images: { url: string }[];
      };
      external_urls: {
        spotify: string;
      };
    };
  }[];
};

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

export async function getRecentlyPlayed(limit = 10) {
  const token = await getAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.status === 204) return [];

  const text = await res.text();

  if (!res.ok) {
    throw new Error(
      `Spotify recently-played request failed (${res.status}): ${parseErrorMessage(text)}`,
    );
  }

  if (!text) return [];

  let data: SpotifyRecentlyPlayedResponse;

  try {
    data = JSON.parse(text) as SpotifyRecentlyPlayedResponse;
  } catch {
    throw new Error("Failed to parse Spotify recently-played response");
  }

  if (!Array.isArray(data.items)) return [];

  // dedupe track yang sama agar list lebih variatif
  const seen = new Set<string>();
  const mapped = data.items
    .map((item) => ({
      title: item.track.name,
      artist: item.track.artists.map((a) => a.name).join(", "),
      image: item.track.album.images[0]?.url,
      url: item.track.external_urls.spotify,
    }))
    .filter((track) => {
      if (seen.has(track.url)) return false;
      seen.add(track.url);
      return true;
    });

  return mapped;
}
