import { describe, it, expect, beforeEach, afterEach, mock } from "bun:test";
import { getWakaTimeStats } from "../lib/wakatime";

describe("getWakaTimeStats", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  function mockFetch(summaryData: any, allTimeData: any, statsData: any) {
    let callIndex = 0;
    globalThis.fetch = mock(async (url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : url.toString();
      if (urlStr.includes("summaries")) {
        return new Response(JSON.stringify(summaryData), { status: 200 });
      } else if (urlStr.includes("all_time")) {
        return new Response(JSON.stringify(allTimeData), { status: 200 });
      } else if (urlStr.includes("stats")) {
        return new Response(JSON.stringify(statsData), { status: 200 });
      }
      return new Response("Not found", { status: 404 });
    }) as any;
  }

  it("returns aggregated stats from all endpoints", async () => {
    mockFetch(
      {
        data: [
          { range: { date: "2024-01-01" }, grand_total: { total_seconds: 3600 } },
          { range: { date: "2024-01-02" }, grand_total: { total_seconds: 7200 } },
          { range: { date: "2024-01-03" }, grand_total: { total_seconds: 1800 } },
        ],
      },
      { data: { total_seconds: 500000 } },
      { data: { languages: [{ name: "TypeScript", total_seconds: 10000 }] } },
    );

    const stats = await getWakaTimeStats("fake-key");

    expect(stats.totalThisWeek).toBe(12600); // 3600+7200+1800
    expect(stats.avgDaily).toBe(4200); // 12600/3
    expect(stats.bestDay.date).toBe("2024-01-02");
    expect(stats.bestDay.total_seconds).toBe(7200);
    expect(stats.allTimeTotal).toBe(500000);
    expect(stats.topLanguages).toEqual([
      { name: "TypeScript", total_seconds: 10000 },
    ]);
  });

  it("handles empty summary data", async () => {
    mockFetch(
      { data: [] },
      { data: { total_seconds: 100 } },
      { data: { languages: [] } },
    );

    const stats = await getWakaTimeStats("fake-key");

    expect(stats.totalThisWeek).toBe(0);
    expect(stats.avgDaily).toBe(0);
    expect(stats.bestDay).toEqual({ date: "", total_seconds: 0 });
    expect(stats.allTimeTotal).toBe(100);
    expect(stats.topLanguages).toEqual([]);
  });

  it("correctly identifies best day from multiple entries", async () => {
    mockFetch(
      {
        data: [
          { range: { date: "2024-03-01" }, grand_total: { total_seconds: 100 } },
          { range: { date: "2024-03-02" }, grand_total: { total_seconds: 9999 } },
          { range: { date: "2024-03-03" }, grand_total: { total_seconds: 500 } },
          { range: { date: "2024-03-04" }, grand_total: { total_seconds: 8000 } },
        ],
      },
      { data: { total_seconds: 0 } },
      { data: { languages: [] } },
    );

    const stats = await getWakaTimeStats("fake-key");

    expect(stats.bestDay.date).toBe("2024-03-02");
    expect(stats.bestDay.total_seconds).toBe(9999);
  });

  it("throws on summary API error", async () => {
    globalThis.fetch = mock(async (url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : url.toString();
      if (urlStr.includes("summaries")) {
        return new Response("Unauthorized", { status: 401 });
      }
      return new Response(JSON.stringify({ data: {} }), { status: 200 });
    }) as any;

    expect(getWakaTimeStats("bad-key")).rejects.toThrow("Summary error: 401");
  });

  it("throws on allTime API error", async () => {
    globalThis.fetch = mock(async (url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : url.toString();
      if (urlStr.includes("summaries")) {
        return new Response(JSON.stringify({ data: [] }), { status: 200 });
      } else if (urlStr.includes("all_time")) {
        return new Response("Error", { status: 500 });
      }
      return new Response(JSON.stringify({ data: {} }), { status: 200 });
    }) as any;

    expect(getWakaTimeStats("bad-key")).rejects.toThrow("AllTime error: 500");
  });

  it("throws on stats API error", async () => {
    globalThis.fetch = mock(async (url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : url.toString();
      if (urlStr.includes("summaries")) {
        return new Response(JSON.stringify({ data: [] }), { status: 200 });
      } else if (urlStr.includes("all_time")) {
        return new Response(JSON.stringify({ data: { total_seconds: 0 } }), {
          status: 200,
        });
      } else if (urlStr.includes("stats")) {
        return new Response("Error", { status: 403 });
      }
      return new Response("Not found", { status: 404 });
    }) as any;

    expect(getWakaTimeStats("bad-key")).rejects.toThrow("Stats error: 403");
  });

  it("sends correct Authorization header with base64 encoding", async () => {
    let capturedHeaders: Headers | null = null;

    globalThis.fetch = mock(async (url: string | URL | Request, init?: RequestInit) => {
      if (!capturedHeaders && init?.headers) {
        capturedHeaders = new Headers(init.headers as HeadersInit);
      }
      const urlStr = typeof url === "string" ? url : url.toString();
      if (urlStr.includes("summaries")) {
        return new Response(JSON.stringify({ data: [] }), { status: 200 });
      } else if (urlStr.includes("all_time")) {
        return new Response(JSON.stringify({ data: { total_seconds: 0 } }), {
          status: 200,
        });
      }
      return new Response(
        JSON.stringify({ data: { languages: [] } }),
        { status: 200 },
      );
    }) as any;

    await getWakaTimeStats("my-api-key");

    const expected = "Basic " + Buffer.from("my-api-key").toString("base64");
    expect(capturedHeaders!.get("Authorization")).toBe(expected);
  });

  it("sets correct date range for 7 days", async () => {
    let capturedUrl = "";

    globalThis.fetch = mock(async (url: string | URL | Request) => {
      const urlStr = typeof url === "string" ? url : url.toString();
      if (urlStr.includes("summaries") && !capturedUrl) {
        capturedUrl = urlStr;
      }
      if (urlStr.includes("summaries")) {
        return new Response(JSON.stringify({ data: [] }), { status: 200 });
      } else if (urlStr.includes("all_time")) {
        return new Response(JSON.stringify({ data: { total_seconds: 0 } }), {
          status: 200,
        });
      }
      return new Response(
        JSON.stringify({ data: { languages: [] } }),
        { status: 200 },
      );
    }) as any;

    await getWakaTimeStats("key");

    // Verify URL contains start and end params
    expect(capturedUrl).toContain("start=");
    expect(capturedUrl).toContain("end=");

    // Verify date format (YYYY-MM-DD)
    const startMatch = capturedUrl.match(/start=(\d{4}-\d{2}-\d{2})/);
    const endMatch = capturedUrl.match(/end=(\d{4}-\d{2}-\d{2})/);
    expect(startMatch).not.toBeNull();
    expect(endMatch).not.toBeNull();

    // Verify 6-day difference (7 days inclusive)
    const start = new Date(startMatch![1]);
    const end = new Date(endMatch![1]);
    const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    expect(diffDays).toBe(6);
  });
});
