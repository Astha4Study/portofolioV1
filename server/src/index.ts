import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ApiResponse } from "shared";
import { getInstallationToken } from "./lib/token";
import { getContributions } from "./lib/contributions";
import { getProfile } from "./lib/profile";
import { getPinnedRepositories } from "./lib/repository";
import { getWakaTimeStats } from "./lib/wakatime";
import { getRecentlyPlayed } from "./lib/spotifyRecentPlayed";
import { getSavedTracks, getTopTracks } from "./lib/spotifyTopTracks";

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
  const parseReason = (reason: unknown) =>
    reason instanceof Error ? reason.message : String(reason);

  const isPremiumRestriction = (message: string) =>
    /active premium subscription required/i.test(message);

  const isScopeIssue = (message: string) =>
    /scope|insufficient client scope|missing required scope/i.test(message);

  const [likedRes, recentRes, topShortRes, topMediumRes] = await Promise.allSettled([
    getSavedTracks(10),
    getRecentlyPlayed(10),
    getTopTracks("short_term", 10),
    getTopTracks("medium_term", 10),
  ]);

  const liked = likedRes.status === "fulfilled" ? likedRes.value : [];
  const recent = recentRes.status === "fulfilled" ? recentRes.value : [];
  const topShort = topShortRes.status === "fulfilled" ? topShortRes.value : [];
  const topMedium = topMediumRes.status === "fulfilled" ? topMediumRes.value : [];

  const errors: Record<string, string> = {};
  if (likedRes.status === "rejected") errors.liked = parseReason(likedRes.reason);
  if (recentRes.status === "rejected") errors.recent = parseReason(recentRes.reason);
  if (topShortRes.status === "rejected") errors.topShort = parseReason(topShortRes.reason);
  if (topMediumRes.status === "rejected") errors.topMedium = parseReason(topMediumRes.reason);

  const allErrors = Object.values(errors);
  const hasPremiumRestriction = allErrors.some(isPremiumRestriction);
  const hasScopeIssue = allErrors.some(isScopeIssue);

  const primary =
    liked.length > 0
      ? { type: "liked", data: liked }
      : recent.length > 0
        ? { type: "recent", data: recent }
        : topShort.length > 0
          ? { type: "top-short-term", data: topShort }
          : topMedium.length > 0
            ? { type: "top-medium-term", data: topMedium }
            : { type: "empty", data: [] as unknown[] };

  const hasAnySuccess =
    likedRes.status === "fulfilled" ||
    recentRes.status === "fulfilled" ||
    topShortRes.status === "fulfilled" ||
    topMediumRes.status === "fulfilled";

  if (hasAnySuccess) {
    return c.json({
      success: true,
      type: primary.type,
      data: primary.data,
      sections: {
        liked,
        recent,
        topShortTerm: topShort,
        topMediumTerm: topMedium,
      },
      errors,
      note:
        primary.type === "empty"
          ? "No Spotify listening data available yet."
          : "Primary data selected with graceful fallback.",
    });
  }

  return c.json(
    {
      success: false,
      type: "spotify-unavailable",
      message: hasPremiumRestriction
        ? "Spotify player endpoints are restricted for this account right now."
        : "Failed to fetch Spotify data from all available endpoints.",
      hints: [
        "Regenerate refresh token with scopes: user-library-read user-read-recently-played user-top-read",
        "Ensure SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN are valid",
      ],
      scopeWarning: hasScopeIssue,
      premiumRestriction: hasPremiumRestriction,
      errors,
    },
    503,
  );
});


export default app;
