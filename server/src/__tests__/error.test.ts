import { describe, it, expect, beforeEach, afterEach, spyOn } from "bun:test";
import { Hono } from "hono";
import { requestLogger, rateLimit } from "../middleware/error";

describe("requestLogger", () => {
  let logSpy: ReturnType<typeof spyOn>;

  beforeEach(() => {
    logSpy = spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it("logs request details after completion", async () => {
    const app = new Hono();
    app.use("*", requestLogger);
    app.get("/test", (c) => c.text("ok"));

    await app.request("/test");

    expect(logSpy).toHaveBeenCalled();
    const output = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(output.method).toBe("GET");
    expect(output.path).toBe("/test");
    expect(output.status).toBe(200);
    expect(output.duration).toBeDefined();
  });

  it("logs correct method for POST requests", async () => {
    const app = new Hono();
    app.use("*", requestLogger);
    app.post("/submit", (c) => c.json({ ok: true }));

    await app.request("/submit", { method: "POST" });

    const output = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(output.method).toBe("POST");
    expect(output.path).toBe("/submit");
  });

  it("logs 404 for unmatched routes", async () => {
    const app = new Hono();
    app.use("*", requestLogger);
    app.get("/exists", (c) => c.text("ok"));

    await app.request("/not-found");

    const output = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(output.status).toBe(404);
  });

  it("includes duration in ms format", async () => {
    const app = new Hono();
    app.use("*", requestLogger);
    app.get("/slow", async (c) => {
      await new Promise((r) => setTimeout(r, 10));
      return c.text("done");
    });

    await app.request("/slow");

    const output = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(output.duration).toMatch(/^\d+ms$/);
  });
});

describe("rateLimit", () => {
  let warnSpy: ReturnType<typeof spyOn>;
  let logSpy: ReturnType<typeof spyOn>;

  beforeEach(() => {
    warnSpy = spyOn(console, "warn").mockImplementation(() => {});
    logSpy = spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
    logSpy.mockRestore();
  });

  it("allows requests within limit", async () => {
    const app = new Hono();
    app.use("*", rateLimit(5, 60000));
    app.get("/api", (c) => c.text("ok"));

    const res = await app.request("/api", {
      headers: { "x-forwarded-for": "rate-test-ip-1" },
    });
    expect(res.status).toBe(200);
  });

  it("blocks requests exceeding limit", async () => {
    const app = new Hono();
    app.use("*", rateLimit(2, 60000));
    app.get("/api", (c) => c.text("ok"));

    // First 2 requests should pass
    await app.request("/api", {
      headers: { "x-forwarded-for": "rate-test-ip-2" },
    });
    await app.request("/api", {
      headers: { "x-forwarded-for": "rate-test-ip-2" },
    });

    // Third request should be rate limited
    const res = await app.request("/api", {
      headers: { "x-forwarded-for": "rate-test-ip-2" },
    });
    expect(res.status).toBe(429);

    const body = await res.json();
    expect(body.success).toBe(false);
    expect(body.message).toContain("Too many requests");
  });

  it("uses different counters for different IPs", async () => {
    const app = new Hono();
    app.use("*", rateLimit(1, 60000));
    app.get("/api", (c) => c.text("ok"));

    const res1 = await app.request("/api", {
      headers: { "x-forwarded-for": "rate-ip-a" },
    });
    const res2 = await app.request("/api", {
      headers: { "x-forwarded-for": "rate-ip-b" },
    });

    expect(res1.status).toBe(200);
    expect(res2.status).toBe(200);
  });

  it("resets after window expires", async () => {
    const app = new Hono();
    // 100ms window for testing
    app.use("*", rateLimit(1, 100));
    app.get("/api", (c) => c.text("ok"));

    await app.request("/api", {
      headers: { "x-forwarded-for": "rate-ip-reset-test" },
    });

    // Should be blocked now
    const blocked = await app.request("/api", {
      headers: { "x-forwarded-for": "rate-ip-reset-test" },
    });
    expect(blocked.status).toBe(429);

    // Wait for window to expire
    await new Promise((r) => setTimeout(r, 150));

    // Should be allowed again
    const allowed = await app.request("/api", {
      headers: { "x-forwarded-for": "rate-ip-reset-test" },
    });
    expect(allowed.status).toBe(200);
  });

  it("logs warning when rate limit is exceeded", async () => {
    const app = new Hono();
    app.use("*", rateLimit(1, 60000));
    app.get("/api", (c) => c.text("ok"));

    await app.request("/api", {
      headers: { "x-forwarded-for": "rate-warn-ip" },
    });
    await app.request("/api", {
      headers: { "x-forwarded-for": "rate-warn-ip" },
    });

    expect(warnSpy).toHaveBeenCalled();
    const output = JSON.parse(warnSpy.mock.calls[0][0] as string);
    expect(output.level).toBe("warn");
    expect(output.message).toContain("Rate limit exceeded");
  });

  it("returns correct response body structure on rate limit", async () => {
    const app = new Hono();
    app.use("*", rateLimit(1, 60000));
    app.get("/api", (c) => c.text("ok"));

    await app.request("/api", {
      headers: { "x-forwarded-for": "rate-body-ip" },
    });
    const res = await app.request("/api", {
      headers: { "x-forwarded-for": "rate-body-ip" },
    });

    const body = await res.json();
    expect(body).toHaveProperty("success", false);
    expect(body).toHaveProperty("message");
    expect(body.message).toBe("Too many requests, please try again later");
  });
});
