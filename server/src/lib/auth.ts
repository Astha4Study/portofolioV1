import { Hono } from "hono";
import { prisma } from "./prisma.js";
import { authMiddleware } from "../middleware/auth.js";
import { validateBody, sanitize } from "../middleware/security.js";
import { logger } from "./logger.js";

const auth = new Hono();

/* =========================
   GET CURRENT USER
========================= */
auth.get("/me", authMiddleware, async (c) => {
  try {
    const supabaseUser = c.get("user");

    const profile = await prisma.profile.findUnique({
      where: { userId: supabaseUser.id },
    });

    return c.json({
      user: {
        id: supabaseUser.id,
        email: supabaseUser.email,
      },
      profile,
    });
  } catch (error) {
    logger.error("Error fetching user profile", error as Error);
    return c.json({ error: "Failed to fetch user profile" }, 500);
  }
});

/* =========================
   UPSERT PROFILE (optional helper)
========================= */
auth.post("/profile", authMiddleware, async (c) => {
  try {
    const supabaseUser = c.get("user");
    const body = await c.req.json();

    // Validate and sanitize input
    const validation = validateBody(body, {
      name: (val) => typeof val === "string" && val.length > 0 && val.length <= 100,
      avatarUrl: (val) => !val || sanitize.url(val) !== null,
    });

    if (!validation.valid) {
      return c.json({ error: "Invalid input", details: validation.errors }, 400);
    }

    const profile = await prisma.profile.upsert({
      where: { userId: supabaseUser.id },
      update: {
        name: sanitize.string(body.name),
        avatarUrl: body.avatarUrl ? sanitize.url(body.avatarUrl) : null,
      },
      create: {
        userId: supabaseUser.id,
        name: sanitize.string(body.name),
        avatarUrl: body.avatarUrl ? sanitize.url(body.avatarUrl) : null,
      },
    });

    return c.json({ profile });
  } catch (error) {
    logger.error("Error updating profile", error as Error);
    return c.json({ error: "Failed to update profile" }, 500);
  }
});

export default auth;
