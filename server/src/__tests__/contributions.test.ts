import { describe, it, expect, afterEach, mock } from "bun:test";
import { getContributions } from "../lib/contributions";

describe("getContributions", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("returns contribution data from GraphQL response", async () => {
    const mockResponse = {
      data: {
        viewer: {
          contributionsCollection: {
            contributionCalendar: {
              weeks: [
                {
                  contributionDays: [
                    { date: "2024-01-01", contributionCount: 5 },
                    { date: "2024-01-02", contributionCount: 3 },
                  ],
                },
              ],
            },
          },
        },
      },
    };

    globalThis.fetch = mock(async () => {
      return new Response(JSON.stringify(mockResponse), { status: 200 });
    }) as any;

    const result = await getContributions("fake-token");

    expect(result.data.viewer.contributionsCollection.contributionCalendar.weeks).toHaveLength(1);
    expect(
      result.data.viewer.contributionsCollection.contributionCalendar.weeks[0].contributionDays,
    ).toHaveLength(2);
  });

  it("sends correct Authorization header", async () => {
    let capturedHeaders: Headers | null = null;

    globalThis.fetch = mock(async (_url: any, init?: RequestInit) => {
      capturedHeaders = new Headers(init?.headers as HeadersInit);
      return new Response(JSON.stringify({ data: {} }), { status: 200 });
    }) as any;

    await getContributions("my-gh-token");

    expect(capturedHeaders!.get("Authorization")).toBe("Bearer my-gh-token");
    expect(capturedHeaders!.get("Content-Type")).toBe("application/json");
  });

  it("sends POST request to GitHub GraphQL API", async () => {
    let capturedUrl = "";
    let capturedMethod = "";

    globalThis.fetch = mock(async (url: string | URL | Request, init?: RequestInit) => {
      capturedUrl = typeof url === "string" ? url : url.toString();
      capturedMethod = init?.method ?? "GET";
      return new Response(JSON.stringify({ data: {} }), { status: 200 });
    }) as any;

    await getContributions("token");

    expect(capturedUrl).toBe("https://api.github.com/graphql");
    expect(capturedMethod).toBe("POST");
  });

  it("sends GraphQL query in request body", async () => {
    let capturedBody = "";

    globalThis.fetch = mock(async (_url: any, init?: RequestInit) => {
      capturedBody = init?.body as string;
      return new Response(JSON.stringify({ data: {} }), { status: 200 });
    }) as any;

    await getContributions("token");

    const parsed = JSON.parse(capturedBody);
    expect(parsed.query).toContain("contributionsCollection");
    expect(parsed.query).toContain("contributionCalendar");
    expect(parsed.query).toContain("contributionDays");
    expect(parsed.query).toContain("contributionCount");
  });

  it("handles empty contribution weeks", async () => {
    globalThis.fetch = mock(async () => {
      return new Response(
        JSON.stringify({
          data: {
            viewer: {
              contributionsCollection: {
                contributionCalendar: {
                  weeks: [],
                },
              },
            },
          },
        }),
        { status: 200 },
      );
    }) as any;

    const result = await getContributions("token");
    expect(
      result.data.viewer.contributionsCollection.contributionCalendar.weeks,
    ).toEqual([]);
  });
});
