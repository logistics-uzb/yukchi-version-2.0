import { API_ENDPOINTS, baseApi } from "@/shared/api";
import type {
  GetLoadsParams,
  GetLoadsResponse,
  Load,
  LoadsPage,
} from "../model/types";

const EMPTY_PAGE: LoadsPage = {
  count: 0,
  data: [],
  limit: 20,
  page: 1,
  total: 0,
  totalPages: 0,
};

export const loadApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLoads: build.query<LoadsPage, GetLoadsParams>({
      query: (params) => ({
        url: API_ENDPOINTS.loads,
        params,
      }),
      transformResponse: (response: GetLoadsResponse | Load[]) => {
        if (Array.isArray(response)) {
          return {
            ...EMPTY_PAGE,
            count: response.length,
            data: response,
            total: response.length,
            totalPages: response.length > 0 ? 1 : 0,
          };
        }

        return {
          ...EMPTY_PAGE,
          ...response.data,
          data: response.data?.data ?? [],
        };
      },
    }),
  }),
});

export const { useGetLoadsQuery } = loadApi;
