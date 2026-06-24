import type { WakaTimeStats } from "shared";
import { apiFetch } from "./api-client";

export type { WakaTimeStats } from "shared";

function toSafeNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function toSafeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function fetchWakaTimeStats(): Promise<WakaTimeStats> {
  const raw = await apiFetch<Partial<WakaTimeStats>>("/wakatime/stats");

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
