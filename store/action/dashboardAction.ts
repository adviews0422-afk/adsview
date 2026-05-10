import { apiSlice } from '@/lib/config/apiSlice'
import { ProductFormProps } from '@/types/type'

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOrder: builder.query({
      query: ({ merchantId }: { merchantId: string }) => ({
        url: '/api/store/dashboard/get-store-orders',
        method: 'POST',
        body: { merchantId },
      }),
    }),
  }),
})

export const { useGetDashboardOrderQuery } = dashboardApi
