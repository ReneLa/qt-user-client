import { apiSlice } from "../api/api.slice";

export const taskSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: `/api/tasks`,
        method: "GET"
      }),
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["Task"]
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: "/api/tasks",
        method: "POST",
        body: { ...task }
      }),
      //this is to trigger a refetch whenever a new task is created
      invalidatesTags: ["Task"]
    }),
    updateTask: builder.mutation({
      query: (updatedTask) => ({
        url: "/api/tasks/update-task",
        method: "PATCH",
        body: { ...updatedTask }
      }),
      //this is to trigger a refetch whenever a new task is updated
      invalidatesTags: ["Task"]
    }),
    deleteTask: builder.mutation({
      query: (task) => ({
        url: "/api/tasks/delete-task",
        method: "DELETE",
        body: {
          id: task.id
        }
      }),
      //this is to trigger a refetch whenever a new task is deleted
      invalidatesTags: ["Task"]
    })
  })
});

//selector for all tasks
export const selectTasksData = (state) =>
  taskSlice.endpoints.getTasks.select()(state)?.data;

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation
} = taskSlice;
