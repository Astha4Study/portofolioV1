import "dotenv/config";
import crypto from "crypto";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "./lib/env.js";

// Type definitions (inline to avoid monorepo issues in Vercel)
type ApiResponse = {
  message: string;
  success: true;
};
import { logger } from "./lib/logger.js";
import { errorHandler, requestLogger, rateLimit } from "./middleware/error.js";
import { securityHeaders } from "./middleware/security.js";
import { getInstallationToken } from "./lib/token.js";
import { getContributions } from "./lib/contributions.js";
import { getProfile } from "./lib/profile.js";
import { getPinnedRepositories } from "./lib/repository.js";
import { getWakaTimeStats } from "./lib/wakatime.js";
import { prisma } from "./lib/prisma.js";
import auth from "./lib/auth.js";

const app = new Hono();

// Global error handler
app.use("*", errorHandler);

// Request logging
app.use("*", requestLogger);

// Security headers
app.use("*", securityHeaders);

// CORS configuration
app.use(
  cors({
    origin: (origin) => {
      // Allow all origins in development
      if (env.get("NODE_ENV") !== "production") {
        return origin || "*";
      }

      // In production, only allow explicitly configured origins
      const allowedOrigins = env.get("ALLOWED_ORIGINS")?.split(",").map(o => o.trim()).filter(Boolean) || [];

      if (!origin || allowedOrigins.includes(origin)) {
        return origin || null;
      }

      return null;
    },
    credentials: true,
  }),
);

// Rate limiting for API routes (100 requests per minute)
app.use("/github/*", rateLimit(100, 60000));
app.use("/wakatime/*", rateLimit(100, 60000));

// Stricter rate limiting for auth routes (20 requests per minute)
app.use("/auth/*", rateLimit(20, 60000));
app.route("/auth", auth);

app.get("/", (c) => {
  return c.json({
    name: "Portfolio API",
    version: "1.0.0",
    status: "running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", async (c) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;

    return c.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        database: "connected",
        api: "running",
      },
    });
  } catch (error) {
    logger.error("Health check failed", error as Error);
    return c.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
      },
      503,
    );
  }
});

app.get("/hello", async (c) => {
  const data: ApiResponse = {
    message: "Hello BHVR!",
    success: true,
  };

  return c.json(data);
});

// In-memory store for OAuth state tokens (CSRF protection)
const oauthStateStore = new Map<string, number>();

// Clean up expired state tokens every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, expiresAt] of oauthStateStore) {
    if (now > expiresAt) {
      oauthStateStore.delete(key);
    }
  }
}, 300000);

app.get("/auth/github", (c) => {
  const clientId = env.get("GITHUB_CLIENT_ID");
  const state = crypto.randomBytes(16).toString("hex");
  // State token expires in 10 minutes
  oauthStateStore.set(state, Date.now() + 600000);
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user&state=${state}`;
  return c.redirect(url);
});

app.get("/auth/github/callback", async (c) => {
  try {
    const code = c.req.query("code");
    const state = c.req.query("state");

    if (!code) return c.json({ error: "No code provided" }, 400);

    // Validate CSRF state token
    if (!state || !oauthStateStore.has(state) || Date.now() > (oauthStateStore.get(state) ?? 0)) {
      oauthStateStore.delete(state ?? "");
      return c.json({ error: "Invalid or expired state parameter" }, 403);
    }
    oauthStateStore.delete(state);

    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new URLSearchParams({
        client_id: env.get("GITHUB_CLIENT_ID"),
        client_secret: env.get("GITHUB_CLIENT_SECRET"),
        code: code,
      }),
    });

    const data = (await res.json()) as Record<string, unknown>;

    if (data.error) {
      return c.json({ success: false, message: "GitHub authentication failed" }, 401);
    }

    // Only return non-sensitive confirmation; do not expose raw tokens
    return c.json({
      success: true,
      message: "GitHub authentication successful",
      token_type: data.token_type,
      scope: data.scope,
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        message: "Failed to authenticate with GitHub",
      },
      500,
    );
  }
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
    logger.error("Failed to fetch repos", error as Error);
    return c.json(
      {
        success: false,
        message: "Failed to fetch repositories",
      },
      500,
    );
  }
});

app.get("/github/contributions", async (c) => {
  try {
    const token = env.get("GITHUB_USER_TOKEN");

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
    const token = env.get("GITHUB_USER_TOKEN");

    const profile = await getProfile(token);

    return c.json(profile);
  } catch (error) {
    logger.error("Failed to fetch profile", error as Error);
    return c.json(
      {
        success: false,
        message: "Failed to fetch profile",
      },
      500,
    );
  }
});

app.get("/github/pinned-repos", async (c) => {
  try {
    const token = env.get("GITHUB_USER_TOKEN");

    const repositories = await getPinnedRepositories(token);

    return c.json(repositories);
  } catch (error) {
    logger.error("Failed to fetch pinned repos", error as Error);
    return c.json(
      {
        success: false,
        message: "Failed to fetch pinned repositories",
      },
      500,
    );
  }
});

app.get("/wakatime/stats", async (c) => {
  try {
    const apiKey = env.get("WAKATIME_API_KEY");

    const data = await getWakaTimeStats(apiKey);
    return c.json(data);
  } catch (err) {
    logger.error("Failed to fetch WakaTime stats", err as Error);
    return c.json(
      {
        success: false,
        message: "Failed to fetch WakaTime stats",
      },
      500,
    );
  }
});

export default app;
