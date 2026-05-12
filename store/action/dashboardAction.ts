import { apiSlice } from '@/lib/config/apiSlice'
import { ProductFormProps } from '@/types/type'

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardUsers: builder.query({
      query: () => ({
        url: '/api/admin/daily-monthly-user',
        method: 'POST',
      }),
    }),
  }),
})

export const { useGetDashboardUsersQuery } = dashboardApi
