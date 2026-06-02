import { apiSlice } from '@/lib/config/apiSlice'

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCpxResearchTask: builder.query({
      query: () => ({
        url: `/api/cpx/surveys`,
        method: 'GET',
      }),
    }),
    getUnClaimedTask: builder.query({
      query: () => ({
        url: `/api/tasks/get-all-unclaimed`,
        method: 'POST',
      }),
    }),
    completeTask: builder.mutation({
      query: (id: number) => ({
        url: `/api/tasks/completed`,
        method: 'POST',
        body: { id },
      }),
    }),
    creditTask: builder.mutation({
      query: (title: string) => ({
        url: `/api/tasks/credit-task`,
        method: 'POST',
        body: { title },
      }),
    }),
  }),
})

export const {
  useGetCpxResearchTaskQuery,
  useGetUnClaimedTaskQuery,
  useCreditTaskMutation,
  useCompleteTaskMutation,
} = taskApi
