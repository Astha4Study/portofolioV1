import type { Context, Next } from "hono";

/**
 * Security headers middleware
 * Adds essential security headers to all responses
 */
export const securityHeaders = async (c: Context, next: Next) => {
  await next();

  // Prevent clickjacking attacks
  c.res.headers.set("X-Frame-Options", "DENY");

  // Prevent MIME type sniffing
  c.res.headers.set("X-Content-Type-Options", "nosniff");

  // Enable XSS protection
  c.res.headers.set("X-XSS-Protection", "1; mode=block");

  // Referrer policy
  c.res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Content Security Policy
  c.res.headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;");

  // Strict Transport Security (HTTPS only)
  if (process.env.NODE_ENV === "production") {
    c.res.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }

  // Permissions Policy
  c.res.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
};

/**
 * Input sanitization helpers
 */
export const sanitize = {
  /**
   * Remove potentially dangerous characters from string
   */
  string(input: string): string {
    return input
      .replace(/[<>]/g, "") // Remove < and >
      .trim();
  },

  /**
   * Validate and sanitize URL
   */
  url(input: string): string | null {
    try {
      const url = new URL(input);
      // Only allow http and https protocols
      if (!["http:", "https:"].includes(url.protocol)) {
        return null;
      }
      return url.toString();
    } catch {
      return null;
    }
  },

  /**
   * Validate email format
   */
  email(input: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmed = input.trim().toLowerCase();
    return emailRegex.test(trimmed) ? trimmed : null;
  },

  /**
   * Validate and parse integer
   */
  integer(input: string | number, min?: number, max?: number): number | null {
    const num = typeof input === "string" ? parseInt(input, 10) : input;

    if (isNaN(num) || !Number.isInteger(num)) {
      return null;
    }

    if (min !== undefined && num < min) {
      return null;
    }

    if (max !== undefined && num > max) {
      return null;
    }

    return num;
  },
};

/**
 * Request body validation helper
 */
export function validateBody<T>(body: any, schema: Record<keyof T, (value: any) => boolean>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const [key, validator] of Object.entries(schema)) {
    const validatorFn = validator as (value: any) => boolean;
    if (!validatorFn(body[key])) {
      errors.push(`Invalid field: ${key}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
