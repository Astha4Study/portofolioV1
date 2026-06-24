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
