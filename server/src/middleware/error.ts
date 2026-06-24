import type { Context, Next } from "hono";
import { logger } from "../lib/logger.js";

/**
 * Global error handler middleware
 */
export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    const err = error as Error;

    logger.error("Unhandled error in request", err, {
      path: c.req.path,
      method: c.req.method,
    });

    // Don't expose internal error details in production
    const isDevelopment = process.env.NODE_ENV !== "production";

    return c.json(
      {
        success: false,
        message: isDevelopment ? err.message : "Internal server error",
        ...(isDevelopment && { stack: err.stack }),
      },
      500,
    );
  }
};

/**
 * Request logging middleware
 */
export const requestLogger = async (c: Context, next: Next) => {
  const start = Date.now();
  const { method, path } = c.req;

  await next();

  const duration = Date.now() - start;
  const status = c.res.status;

  logger.info("Request completed", {
    method,
    path,
    status,
    duration: `${duration}ms`,
  });
};

/**
 * Rate limiting helper (simple in-memory implementation)
 * For production, consider using Redis-based solution
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

// Periodically clean up expired entries to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore) {
    if (now > record.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}, 60000);

export const rateLimit = (maxRequests: number, windowMs: number) => {
  return async (c: Context, next: Next) => {
    // Use the first IP from x-forwarded-for (client IP) combined with path prefix for better accuracy
    const forwardedFor = c.req.header("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0]?.trim() : "unknown";
    const identifier = `${clientIp}:${c.req.path.split("/").slice(0, 2).join("/")}`;
    const now = Date.now();

    const record = rateLimitStore.get(identifier);

    if (!record || now > record.resetAt) {
      rateLimitStore.set(identifier, {
        count: 1,
        resetAt: now + windowMs,
      });
      await next();
      return;
    }

    if (record.count >= maxRequests) {
      logger.warn("Rate limit exceeded", { identifier, path: c.req.path });
      return c.json(
        {
          success: false,
          message: "Too many requests, please try again later",
        },
        429,
      );
    }

    record.count++;
    await next();
  };
};
