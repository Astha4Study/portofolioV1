type SpotifyTokenResponse = {
  access_token?: string;
  expires_in?: number;
  token_type?: string;
  error?: string;
  error_description?: string;
};

let cachedToken: { token: string; expiresAt: number } | null = null;

function getEnv(
  name: "SPOTIFY_CLIENT_ID" | "SPOTIFY_CLIENT_SECRET" | "SPOTIFY_REFRESH_TOKEN",
) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not set`);
  }

  return value;
}

export async function getAccessToken() {
  const now = Date.now();

  // buffer 30 detik sebelum expired
  if (cachedToken && now < cachedToken.expiresAt - 30_000) {
    return cachedToken.token;
  }

  const clientId = getEnv("SPOTIFY_CLIENT_ID");
  const clientSecret = getEnv("SPOTIFY_CLIENT_SECRET");
  const refreshToken = getEnv("SPOTIFY_REFRESH_TOKEN");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const text = await res.text();
  let data: SpotifyTokenResponse = {};

  if (text) {
    try {
      data = JSON.parse(text) as SpotifyTokenResponse;
    } catch {
      throw new Error(`Failed to parse Spotify token response: ${text}`);
    }
  }

  if (!res.ok) {
    throw new Error(
      `Spotify token request failed (${res.status}): ${data.error_description ?? data.error ?? "Unknown error"}`,
    );
  }

  if (!data.access_token) {
    throw new Error("Spotify token response does not contain access_token");
  }

  const expiresInSec = data.expires_in ?? 3600;
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + expiresInSec * 1000,
  };

  return data.access_token;
}
