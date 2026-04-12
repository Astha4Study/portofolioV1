import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ApiResponse } from "shared";
import { getInstallationToken } from "./lib/token";
import { getContributions } from "./lib/contributions";
import { getProfile } from "./lib/profile";
import { getPinnedRepositories } from "./lib/repository";
import { getWakaTimeStats } from "./lib/wakatime";
import { getRecentlyPlayed } from "./lib/spotifyRecentPlayed";
import { getTopTracks } from "./lib/spotifyTopTracks";

export const app = new Hono();

app.use(cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/hello", async (c) => {
  const data: ApiResponse = {
    message: "Hello BHVR!",
    success: true,
  };

  return c.json(data);
});

app.get("/test", async (c) => {
  const data: ApiResponse = {
    message: "This is a test route!",
    success: true,
  };

  return c.json(data);
});

app.get("/github/repos", async (c) => {
  try {
    const token = await getInstallationToken();

    const res = await fetch(
      "https://api.github.com/installation/repositories",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    return c.json(data);
  } catch (error) {
    return c.json(
      {
        success: false,
        message: (error as Error).message,
      },
      500,
    );
  }
});

app.get("/auth/github", (c) => {
  const clientId = process.env.GITHUB_CLIENT_ID;

  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user`;

  return c.redirect(url);
});

app.get("/auth/github/callback", async (c) => {
  const code = c.req.query("code");

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      code: code!,
    }),
  });

  const data = await res.json();

  return c.json(data);
});

app.get("/github/contributions", async (c) => {
  try {
    const token = process.env.GITHUB_USER_TOKEN!;

    const res = await getContributions(token);

    const weeks = (res as any).data.viewer.contributionsCollection
      .contributionCalendar.weeks;

    const days = weeks.flatMap((week: any) => week.contributionDays);

    const mapped = days.map((d: any) => ({
      date: d.date,
      count: d.contributionCount,
      level: Math.min(4, Math.ceil(d.contributionCount / 5)),
    }));

    return c.json(mapped);
  } catch (err) {
    return c.json(
      {
        success: false,
        message: "Failed to fetch contributions",
      },
      500,
    );
  }
});

app.get("/github/profile", async (c) => {
  try {
    const token = process.env.GITHUB_USER_TOKEN;

    if (!token) {
      return c.json(
        {
          success: false,
          message: "GITHUB_USER_TOKEN is not set",
        },
        500,
      );
    }

    const profile = await getProfile(token);

    return c.json(profile);
  } catch (error) {
    return c.json(
      {
        success: false,
        message: (error as Error).message,
      },
      500,
    );
  }
});

app.get("/github/pinned-repos", async (c) => {
  try {
    const token = process.env.GITHUB_USER_TOKEN;

    if (!token) {
      return c.json(
        {
          success: false,
          message: "GITHUB_USER_TOKEN is not set",
        },
        500,
      );
    }

    const repositories = await getPinnedRepositories(token);

    return c.json(repositories);
  } catch (error) {
    return c.json(
      {
        success: false,
        message: (error as Error).message,
      },
      500,
    );
  }
});

app.get("/wakatime/stats", async (c) => {
  try {
    const data = await getWakaTimeStats(process.env.WAKATIME_API_KEY!);

    return c.json(data);
  } catch (err: any) {
    return c.json({ error: err.message }, 500);
  }
})

app.get("/spotify", async (c) => {
  try {
    const recent = await getRecentlyPlayed();

    return c.json({ type: "recent", data: recent });
  } catch (error) {
    const message = (error as Error).message;
    const isPremiumRestriction = (value: string) =>
      value.includes("Active premium subscription required");

    if (isPremiumRestriction(message)) {
      try {
        const topTracks = await getTopTracks();

        return c.json({
          type: "top",
          data: topTracks,
          note: "Fallback to top tracks because player endpoints currently require Premium.",
        });
      } catch (fallbackError) {
        return c.json(
          {
            success: false,
            type: "spotify-unavailable",
            message: isPremiumRestriction((fallbackError as Error).message)
              ? "Spotify API is currently restricting this account's endpoints. Please try again tomorrow."
              : `Spotify fallback failed: ${(fallbackError as Error).message}`,
            hint: "Regenerate Spotify refresh token with scope user-top-read",
          },
          503,
        );
      }
    }

    return c.json(
      {
        success: false,
        message,
        hint: "Ensure refresh token has scope user-read-recently-played",
      },
      502,
    );
  }
});

export default app;
