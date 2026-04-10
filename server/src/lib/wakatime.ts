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

type SummaryResponse = {
  data: {
    range: {
      date: string;
    };
    grand_total: {
      total_seconds: number;
    };
  }[];
};

type AllTimeResponse = {
  data: {
    total_seconds: number;
  };
};

type StatsResponse = {
  data: {
    languages: {
      name: string;
      total_seconds: number;
    }[];
  };
};

export async function getWakaTimeStats(apiKey: string): Promise<WakaTimeStats> {
  const headers = {
    Authorization: "Basic " + Buffer.from(apiKey).toString("base64"),
  };

  // tanggal range (7 hari terakhir)
  const today = new Date();
  const end = today.toISOString().split("T")[0] ?? "";

  const startDate = new Date();
  startDate.setDate(today.getDate() - 6);
  const start = startDate.toISOString().split("T")[0] ?? "";

  // fetch parallel
  const [summaryRes, allTimeRes, statsRes] = await Promise.all([
    fetch(
      `https://wakatime.com/api/v1/users/current/summaries?start=${start}&end=${end}`,
      { headers },
    ),
    fetch(`https://wakatime.com/api/v1/users/current/all_time_since_today`, {
      headers,
    }),
    fetch(`https://wakatime.com/api/v1/users/current/stats/last_7_days`, {
      headers,
    }),
  ]);

  if (!summaryRes.ok) throw new Error(`Summary error: ${summaryRes.status}`);
  if (!allTimeRes.ok) throw new Error(`AllTime error: ${allTimeRes.status}`);
  if (!statsRes.ok) throw new Error(`Stats error: ${statsRes.status}`);

  const summary = (await summaryRes.json()) as SummaryResponse;
  const allTime = (await allTimeRes.json()) as AllTimeResponse;
  const stats = (await statsRes.json()) as StatsResponse;

  // total minggu ini
  const totalSeconds = summary.data.reduce(
    (acc, day) => acc + day.grand_total.total_seconds,
    0,
  );

  // rata-rata harian
  const avgDaily =
    summary.data.length > 0 ? totalSeconds / summary.data.length : 0;

  // 🔥 hitung best day dari summary (bukan dari API all_time)
  const bestDayFromSummary =
    summary.data.length > 0
      ? summary.data.reduce((best, day) => {
          return day.grand_total.total_seconds > best.grand_total.total_seconds
            ? day
            : best;
        })
      : null;

  return {
    start,
    end,
    totalThisWeek: totalSeconds,
    avgDaily,
    bestDay: bestDayFromSummary
      ? {
          date: bestDayFromSummary.range.date,
          total_seconds: bestDayFromSummary.grand_total.total_seconds,
        }
      : {
          date: "",
          total_seconds: 0,
        },
    allTimeTotal: allTime.data.total_seconds,
    topLanguages: stats.data.languages,
  };
}
