import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { useToast } from '@/hooks/use-toast'
import toast from 'react-hot-toast'

export const baseQuery = fetchBaseQuery({
  baseUrl: '/',
})

const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions)
  if (result.error) {
    toast.error('Something went wrong, please try again!')
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({}),
  tagTypes: ['Store', 'Product', 'Cart', 'Address', 'Account'],
})
