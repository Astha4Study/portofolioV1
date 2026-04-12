import { getAccessToken } from "./spotifyAccessToken";


type SpotifyRecentlyPlayedResponse = {
  items: {
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

export async function getRecentlyPlayed() {
  const token = await getAccessToken();

  const res = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=5",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 204) return [];

  const text = await res.text();

  if (!res.ok) {
    throw new Error(
      `Spotify recently-played request failed (${res.status}): ${text || "Unknown error"}`,
    );
  }

  if (!text) return [];

  let data: SpotifyRecentlyPlayedResponse;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Failed to parse Spotify recently-played response");
  }

  if (!Array.isArray(data.items)) return [];

  return data.items.map((item) => ({
    title: item.track.name,
    artist: item.track.artists.map((a) => a.name).join(", "),
    image: item.track.album.images[0]?.url,
    url: item.track.external_urls.spotify,
  }));
}