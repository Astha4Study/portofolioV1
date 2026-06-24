import { describe, it, expect, afterEach, mock } from "bun:test";
import { getPinnedRepositories } from "../lib/repository";

describe("getPinnedRepositories", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  const mockRepoNode = {
    name: "test-repo",
    description: "A test repository",
    url: "https://github.com/user/test-repo",
    homepageUrl: "https://test-repo.dev",
    isPrivate: false,
    stargazerCount: 42,
    forkCount: 5,
    primaryLanguage: { name: "TypeScript", color: "#3178c6" },
    owner: { login: "user", avatarUrl: "https://avatars.com/user.png" },
  };

  it("returns mapped repository data", async () => {
    globalThis.fetch = mock(async () => {
      return new Response(
        JSON.stringify({
          data: {
            viewer: {
              pinnedItems: {
                nodes: [mockRepoNode],
              },
            },
          },
        }),
        { status: 200 },
      );
    }) as any;

    const repos = await getPinnedRepositories("fake-token");

    expect(repos).toHaveLength(1);
    expect(repos[0]).toEqual({
      name: "test-repo",
      description: "A test repository",
      url: "https://github.com/user/test-repo",
      homepageUrl: "https://test-repo.dev",
      isPrivate: false,
      stargazerCount: 42,
      forkCount: 5,
      primaryLanguage: { name: "TypeScript", color: "#3178c6" },
      owner: { login: "user", avatarUrl: "https://avatars.com/user.png" },
    });
  });

  it("filters out null nodes", async () => {
    globalThis.fetch = mock(async () => {
      return new Response(
        JSON.stringify({
          data: {
            viewer: {
              pinnedItems: {
                nodes: [mockRepoNode, null, mockRepoNode],
              },
            },
          },
        }),
        { status: 200 },
      );
    }) as any;

    const repos = await getPinnedRepositories("token");
    expect(repos).toHaveLength(2);
  });

  it("returns empty array when no pinned items", async () => {
    globalThis.fetch = mock(async () => {
      return new Response(
        JSON.stringify({
          data: {
            viewer: {
              pinnedItems: {
                nodes: [],
              },
            },
          },
        }),
        { status: 200 },
      );
    }) as any;

    const repos = await getPinnedRepositories("token");
    expect(repos).toEqual([]);
  });

  it("returns empty array when data structure is missing", async () => {
    globalThis.fetch = mock(async () => {
      return new Response(
        JSON.stringify({ data: {} }),
        { status: 200 },
      );
    }) as any;

    const repos = await getPinnedRepositories("token");
    expect(repos).toEqual([]);
  });

  it("throws on GraphQL errors", async () => {
    globalThis.fetch = mock(async () => {
      return new Response(
        JSON.stringify({
          errors: [{ message: "Bad credentials" }],
        }),
        { status: 200 },
      );
    }) as any;

    expect(getPinnedRepositories("bad-token")).rejects.toThrow("Bad credentials");
  });

  it("throws on non-OK response", async () => {
    globalThis.fetch = mock(async () => {
      return new Response(JSON.stringify({}), { status: 401 });
    }) as any;

    expect(getPinnedRepositories("expired-token")).rejects.toThrow(
      "Failed to fetch pinned repositories (401)",
    );
  });

  it("handles repos with null optional fields", async () => {
    const repoWithNulls = {
      ...mockRepoNode,
      description: null,
      homepageUrl: null,
      primaryLanguage: null,
    };

    globalThis.fetch = mock(async () => {
      return new Response(
        JSON.stringify({
          data: {
            viewer: {
              pinnedItems: {
                nodes: [repoWithNulls],
              },
            },
          },
        }),
        { status: 200 },
      );
    }) as any;

    const repos = await getPinnedRepositories("token");
    expect(repos[0].description).toBeNull();
    expect(repos[0].homepageUrl).toBeNull();
    expect(repos[0].primaryLanguage).toBeNull();
  });

  it("sends correct headers with token", async () => {
    let capturedHeaders: Headers | null = null;

    globalThis.fetch = mock(async (_url: any, init?: RequestInit) => {
      capturedHeaders = new Headers(init?.headers as HeadersInit);
      return new Response(
        JSON.stringify({
          data: { viewer: { pinnedItems: { nodes: [] } } },
        }),
        { status: 200 },
      );
    }) as any;

    await getPinnedRepositories("my-secret-token");

    expect(capturedHeaders!.get("Authorization")).toBe("Bearer my-secret-token");
    expect(capturedHeaders!.get("Content-Type")).toBe("application/json");
    expect(capturedHeaders!.get("Accept")).toBe("application/vnd.github+json");
  });
});
