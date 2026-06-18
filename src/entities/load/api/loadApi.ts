import { API_ENDPOINTS, baseApi } from "@/shared/api";
import type { GetLoadsParams, Load } from "../model/types";

export const loadApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLoads: build.query<Load[], GetLoadsParams>({
      query: (params) => ({
        url: API_ENDPOINTS.loads,
        params,
      }),
    }),
    deleteLoad: build.mutation<void, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.loads}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Load", id },
        { type: "Load", id: "LIST" },
      ],
    }),
  }),
});

export const { useDeleteLoadMutation, useGetLoadsQuery } = loadApi;
