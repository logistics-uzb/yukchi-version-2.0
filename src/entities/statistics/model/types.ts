export type StatsBucket = "day";

export interface GetAllInOneStatsParams {
  bucket: StatsBucket;
  from: number;
  to: number;
}

export interface AllInOneStatsPoint {
  date: string;
  view: number;
  tg: number;
  call: number;
  users: number;
  total: number;
}

export interface AllInOneStatsTotals {
  view: number;
  tg: number;
  call: number;
  users: number;
  all: number;
}

export interface AllInOneStatsSource {
  source: string;
  path?: string;
  method?: string;
  type?: string;
  ok?: boolean;
}

export interface AllInOneStats {
  bucket: StatsBucket;
  timezone: string;
  from: string;
  to: string;
  totals: AllInOneStatsTotals;
  sources?: Partial<Record<"view" | "call" | "tg" | "users", AllInOneStatsSource>>;
  points: AllInOneStatsPoint[];
}

export interface GetAllInOneStatsResponse {
  status_code?: number;
  data: AllInOneStats;
}
