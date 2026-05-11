import { apiSlice } from '@/lib/config/apiSlice'

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCpxResearchTask: builder.query({
      query: () => ({
        url: `/api/cpx/surveys`,
        method: 'GET',
      }),
    }),
    taskCompleted: builder.mutation({
      query: () => ({
        url: `/api/tasks/completed`,
        method: 'POST',
      }),
    }),
    getCurrentTask: builder.query({
      query: () => ({
        url: `/api/account/get-task`,
        method: 'POST',
      }),
    }),
    hilltopTask: builder.mutation({
      query: () => ({
        url: `/api/webhooks/hilltops`,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useGetCpxResearchTaskQuery,
  useTaskCompletedMutation,
  useGetCurrentTaskQuery,
  useHilltopTaskMutation,
} = taskApi
