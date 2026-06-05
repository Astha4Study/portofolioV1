import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ApiResponse } from "shared";
import { env } from "./lib/env.js";
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

      // In production, allow configured origins + localhost for testing
      const allowedOrigins = env.get("ALLOWED_ORIGINS")?.split(",") || [];
      const localhostPatterns = ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "http://127.0.0.1:3000"];

      const allOrigins = [...allowedOrigins, ...localhostPatterns];

      if (!origin || allOrigins.includes(origin)) {
        return origin || "*";
      }

      return null;
    },
    credentials: true,
  }),
);

// Rate limiting for API routes (100 requests per minute)
app.use("/github/*", rateLimit(100, 60000));
app.use("/wakatime/*", rateLimit(100, 60000));
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
      uptime: process.uptime(),
      environment: env.get("NODE_ENV"),
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
        error: "Database connection failed",
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

app.get("/test", async (c) => {
  const data: ApiResponse = {
    message: "This is a test route!",
    success: true,
  };

  return c.json(data);
});

app.get("/auth/github", (c) => {
  const clientId = env.get("GITHUB_CLIENT_ID");
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=read:user`;
  return c.redirect(url);
});

app.get("/auth/github/callback", async (c) => {
  try {
    const code = c.req.query("code");
    if (!code) return c.json({ error: "No code provided" }, 400);

    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new URLSearchParams({
        client_id: env.get("GITHUB_CLIENT_ID"),
        client_secret: env.get("GITHUB_CLIENT_SECRET"),
        code: code,
      }),
    });

    const data = await res.json();
    return c.json(data);
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
    const token = env.get("GITHUB_USER_TOKEN");

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
    const apiKey = env.get("WAKATIME_API_KEY");

    const data = await getWakaTimeStats(apiKey);
    return c.json(data);
  } catch (err: any) {
    return c.json(
      {
        success: false,
        message: err.message || "Failed to fetch WakaTime stats",
      },
      500,
    );
  }
});

export default app;
