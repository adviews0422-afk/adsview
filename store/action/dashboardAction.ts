import { apiSlice } from '@/lib/config/apiSlice'
import { ProductFormProps } from '@/types/type'

interface WithdrawalSettingsProps {
  coins: number
  convertion: number
  manual: boolean
}
export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardUsers: builder.query({
      query: () => ({
        url: '/api/admin/daily-monthly-user',
        method: 'POST',
      }),
    }),
    updateWithdrawalSettings: builder.mutation({
      query: ({ coins, convertion, manual }: WithdrawalSettingsProps) => ({
        url: '/api/admin/withdrawal-settings/update',
        method: 'POST',
        body: {
          coins,
          convertion,
          manual,
        },
      }),
    }),
    getConvertion: builder.query({
      query: () => ({
        url: '/api/admin/withdrawal-settings/get',
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useGetDashboardUsersQuery,
  useUpdateWithdrawalSettingsMutation,
  useGetConvertionQuery,
} = dashboardApi
