import { API_ENDPOINTS, baseApi } from "@/shared/api";
import type { GetLoadsParams, GetLoadsResponse, Load } from "../model/types";

export const loadApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLoads: build.query<Load[], GetLoadsParams>({
      query: (params) => ({
        url: API_ENDPOINTS.loads,
        params,
      }),
      transformResponse: (response: GetLoadsResponse | Load[]) =>
        Array.isArray(response) ? response : (response.data?.data ?? []),
    }),
  }),
});

export const { useGetLoadsQuery } = loadApi;
