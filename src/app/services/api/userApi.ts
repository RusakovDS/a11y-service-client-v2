import { apiSlice } from './baseApi'

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: 'users/me',
        method: 'GET',
      }),
    })
  })
})

export const { useGetMeQuery } = userApi