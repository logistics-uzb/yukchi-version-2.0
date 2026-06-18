import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL =
  import.meta.env.VITE_BASE_URL ?? import.meta.env.VITE_API_URL ?? '/api'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token =
        localStorage.getItem('accessToken') ?? localStorage.getItem('token')

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['User', 'Load'],
  endpoints: () => ({}),
})
