import { apiSlice } from '@/lib/config/apiSlice'
import { ProductFormProps } from '@/types/type'

export const withdrawalApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWithdrawals: builder.query({
      query: () => ({
        url: `/api/account/withdrawal`,
        method: 'POST',
      }),
    }),
  }),
})

export const { useGetWithdrawalsQuery } = withdrawalApi
