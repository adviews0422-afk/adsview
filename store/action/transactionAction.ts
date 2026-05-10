import { apiSlice } from '@/lib/config/apiSlice'
import { ProductFormProps } from '@/types/type'

export const transactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransaction: builder.query({
      query: () => ({
        url: `/api/account/transaction`,
        method: 'POST',
      }),
    }),
  }),
})

export const { useGetTransactionQuery } = transactionApi
