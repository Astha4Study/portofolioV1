import { describe, it, expect, afterEach, mock } from "bun:test";
import { getProfile } from "../lib/profile";

describe("getProfile", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("returns mapped profile data", async () => {
    globalThis.fetch = mock(async () => {
      return new Response(
        JSON.stringify({
          name: "John Doe",
          login: "johndoe",
          avatar_url: "https://avatars.com/johndoe.png",
          bio: "Full-stack developer",
        }),
        { status: 200 },
      );
    }) as any;

    const profile = await getProfile("fake-token");

    expect(profile).toEqual({
      name: "John Doe",
      username: "johndoe",
      image: "https://avatars.com/johndoe.png",
      bio: "Full-stack developer",
    });
  });

  it("handles null name and bio", async () => {
    globalThis.fetch = mock(async () => {
      return new Response(
        JSON.stringify({
          name: null,
          login: "ghostuser",
          avatar_url: "https://avatars.com/default.png",
          bio: null,
        }),
        { status: 200 },
      );
    }) as any;

    const profile = await getProfile("token");

    expect(profile.name).toBeNull();
    expect(profile.username).toBe("ghostuser");
    expect(profile.bio).toBeNull();
  });

  it("throws on non-OK response", async () => {
    globalThis.fetch = mock(async () => {
      return new Response("Unauthorized", { status: 401 });
    }) as any;

    expect(getProfile("bad-token")).rejects.toThrow(
      "Failed to fetch profile (401)",
    );
  });

  it("throws on 403 forbidden", async () => {
    globalThis.fetch = mock(async () => {
      return new Response("Forbidden", { status: 403 });
    }) as any;

    expect(getProfile("limited-token")).rejects.toThrow(
      "Failed to fetch profile (403)",
    );
  });

  it("sends correct Authorization header", async () => {
    let capturedHeaders: Headers | null = null;

    globalThis.fetch = mock(async (_url: any, init?: RequestInit) => {
      capturedHeaders = new Headers(init?.headers as HeadersInit);
      return new Response(
        JSON.stringify({
          name: "Test",
          login: "test",
          avatar_url: "https://example.com/avatar.png",
        }),
        { status: 200 },
      );
    }) as any;

    await getProfile("bearer-token-123");

    expect(capturedHeaders!.get("Authorization")).toBe("Bearer bearer-token-123");
    expect(capturedHeaders!.get("Accept")).toBe("application/vnd.github+json");
    expect(capturedHeaders!.get("X-GitHub-Api-Version")).toBe("2022-11-28");
  });

  it("calls the correct GitHub API URL", async () => {
    let capturedUrl = "";

    globalThis.fetch = mock(async (url: string | URL | Request) => {
      capturedUrl = typeof url === "string" ? url : url.toString();
      return new Response(
        JSON.stringify({
          name: "Test",
          login: "test",
          avatar_url: "https://example.com/a.png",
        }),
        { status: 200 },
      );
    }) as any;

    await getProfile("token");

    expect(capturedUrl).toBe("https://api.github.com/user");
  });
});
