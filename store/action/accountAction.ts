import { apiSlice } from '@/lib/config/apiSlice'
import { AddressAndActionProps, passwordProps, profileProps } from '@/types/type'
export const accountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({ name }: profileProps) => ({
        url: '/api/account/update-profile',
        method: 'POST',
        body: { name },
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }: passwordProps) => ({
        url: '/api/account/password-update',
        method: 'POST',
        body: { oldPassword, newPassword },
      }),
    }),

    getAddress: builder.query({
      query: ({ action, address }: AddressAndActionProps) => ({
        url: '/api/account/address',
        method: 'POST',
        body: { action, address },
      }),
      providesTags: [{ type: 'Account', id: 'ADDRESS' }],
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: '/api/account/get-profile',
        method: 'POST',
      }),
      providesTags: [{ type: 'Account', id: 'INFO' }],
    }),
    requestWithdrawal: builder.mutation({
      query: () => ({
        url: '/api/account/payout',
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
  useGetAddressQuery,
  useGetUserProfileQuery,
  useRequestWithdrawalMutation,
} = accountApi
