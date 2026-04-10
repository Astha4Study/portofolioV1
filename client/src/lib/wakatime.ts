export type WakaTimeStats = {
  start: string;
  end: string;
  totalThisWeek: number;
  avgDaily: number;
  bestDay: {
    date: string;
    total_seconds: number;
  };
  allTimeTotal: number;
  topLanguages: {
    name: string;
    total_seconds: number;
  }[];
};

function toSafeNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function toSafeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function fetchWakaTimeStats(): Promise<WakaTimeStats> {
  const res = await fetch("http://localhost:3000/wakatime/stats");

  if (!res.ok) {
    throw new Error("Failed to fetch WakaTime stats");
  }

  const raw = (await res.json()) as Partial<WakaTimeStats>;

  const safeTopLanguages = Array.isArray(raw.topLanguages)
    ? raw.topLanguages
        .map((language) => ({
          name: toSafeString(language?.name),
          total_seconds: toSafeNumber(language?.total_seconds),
        }))
        .filter((language) => language.name.length > 0)
    : [];

  return {
    start: toSafeString(raw.start),
    end: toSafeString(raw.end),
    totalThisWeek: toSafeNumber(raw.totalThisWeek),
    avgDaily: toSafeNumber(raw.avgDaily),
    bestDay: {
      date: toSafeString(raw.bestDay?.date),
      total_seconds: toSafeNumber(raw.bestDay?.total_seconds),
    },
    allTimeTotal: toSafeNumber(raw.allTimeTotal),
    topLanguages: safeTopLanguages,
  };
}
