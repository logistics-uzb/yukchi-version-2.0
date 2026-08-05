import { API_ENDPOINTS, baseApi } from "@/shared/api";
import type {
  AllInOneStats,
  GetAllInOneStatsParams,
  GetAllInOneStatsResponse,
} from "../model/types";

const EMPTY_ALL_IN_ONE_STATS: AllInOneStats = {
  bucket: "day",
  timezone: "Asia/Tashkent",
  from: "",
  to: "",
  totals: {
    view: 0,
    tg: 0,
    call: 0,
    users: 0,
    all: 0,
  },
  points: [],
};

export const statisticsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllInOneStats: build.query<
      AllInOneStats,
      GetAllInOneStatsParams
    >({
      query: (params) => ({
        url: API_ENDPOINTS.statsAllInOne,
        params,
      }),
      transformResponse: (
        response: GetAllInOneStatsResponse | AllInOneStats,
      ) => ("data" in response ? response.data : response),
    }),
  }),
});

export const { useGetAllInOneStatsQuery } = statisticsApi;
export { EMPTY_ALL_IN_ONE_STATS };
