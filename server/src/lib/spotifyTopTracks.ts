import { getAccessToken } from "./spotifyAccessToken";

type SpotifyTopTracksResponse = {
  items?: {
    name: string;
    artists: { name: string }[];
    album: {
      images: { url: string }[];
    };
    external_urls: {
      spotify: string;
    };
  }[];
};

export async function getTopTracks() {
  const token = await getAccessToken();

  const res = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=5",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const text = await res.text();

  if (!res.ok) {
    throw new Error(
      `Spotify top-tracks request failed (${res.status}): ${text || "Unknown error"}`,
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

  return data.items.map((item) => ({
    title: item.name,
    artist: item.artists.map((a) => a.name).join(", "),
    image: item.album.images[0]?.url,
    url: item.external_urls.spotify,
  }));
}