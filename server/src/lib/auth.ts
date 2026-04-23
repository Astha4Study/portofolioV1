import { Hono } from "hono";
import { prisma } from "./prisma";
import { authMiddleware } from "../middleware/auth";

const auth = new Hono();

/* =========================
   GET CURRENT USER
========================= */
auth.get("/me", authMiddleware, async (c) => {
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
});

/* =========================
   UPSERT PROFILE (optional helper)
========================= */
auth.post("/profile", authMiddleware, async (c) => {
  const supabaseUser = c.get("user");
  const body = await c.req.json();

  const profile = await prisma.profile.upsert({
    where: { userId: supabaseUser.id },
    update: {
      name: body.name,
      avatarUrl: body.avatarUrl,
    },
    create: {
      userId: supabaseUser.id,
      name: body.name,
      avatarUrl: body.avatarUrl,
    },
  });

  return c.json({ profile });
});

export default auth;
