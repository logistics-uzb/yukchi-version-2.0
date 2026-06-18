import { API_ENDPOINTS, baseApi } from '@/shared/api'
import type { User } from '../model/types'

interface UserResponse {
  data: User
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query<User, void>({
      query: () => API_ENDPOINTS.userInfo,
      transformResponse: (response: UserResponse | User) =>
        'data' in response ? response.data : response,
      providesTags: ['User'],
    }),
  }),
})

export const { useGetUserInfoQuery } = userApi
