import { Project } from "../../types/project";
import { apiSlice } from "./baseApi";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => ({
        url: "projects",
        method: "GET",
      }),
      providesTags: ['Project'],
    }),
    deleteProject: builder.mutation({
      query: (id: string) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Project'],
    })
  }),
});

export const { useGetProjectsQuery, useDeleteProjectMutation } = userApi;
