import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ApiResponse } from "shared";
import { getInstallationToken } from "./lib/token";
import { getContributions } from "./lib/contributions";
import { getProfile } from "./lib/profile";
import { getPinnedRepositories } from "./lib/repository";
import { getWakaTimeStats } from "./lib/wakatime";
import auth from "./lib/auth";

export const app = new Hono();

app.use(cors());
app.route("/auth", auth);

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

app.get("/auth/github", (c) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user`;
  return c.redirect(url);
});

app.get("/auth/github/callback", async (c) => {
  const code = c.req.query("code");
  if (!code) return c.json({ error: "No code provided" }, 400);

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      code: code,
    }),
  });

  const data = await res.json();
  return c.json(data);
});

app.get("/github/repos", async (c) => {
  try {
    const token = await getInstallationToken();

    const res = await fetch("https://api.github.com/installation/repositories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

app.get("/github/contributions", async (c) => {
  try {
    const token = process.env.GITHUB_USER_TOKEN!;

    const res = await getContributions(token);

    const weeks = (res as any).data.viewer.contributionsCollection.contributionCalendar.weeks;

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
});

export default app;
