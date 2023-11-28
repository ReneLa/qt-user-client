import { apiSlice } from "../api/api.slice";

export const projectSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: `/api/projects`,
        method: "GET"
      }),
      transformResponse: (response) => {
        return response.projects;
      }
    })
  })
});

//selector for all projects
export const selectProjectsData = (state) =>
  projectSlice.endpoints.getProjects.select()(state)?.data;

export const { useGetProjectsQuery } = projectSlice;
