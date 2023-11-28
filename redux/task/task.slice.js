import { apiSlice } from "../api/api.slice";

export const taskSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: `/api/tasks`,
        method: "GET"
      })
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: "/create-task",
        method: "POST",
        body: {
          name: task.name,
          start_date: task.start_date,
          end_date: task.end_date,
          assignee: task.assignee,
          project: task.project,
          description: task.description,
          priority: task.priority,
          file: task.file
        }
      })
    }),
    updateTask: builder.mutation({
      query: (task) => ({
        url: "/update-task",
        method: "POST",
        body: {
          name: task.name,
          start_date: task.start_date,
          end_date: task.end_date,
          assignee: task.assignee,
          project: task.project,
          description: task.description,
          priority: task.priority,
          file: task.file
        }
      })
    }),
    deleteTask: builder.mutation({
      query: (task) => ({
        url: "/create-task",
        method: "DELETE",
        body: {
          id: task.id
        }
      })
    })
  })
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation
} = taskSlice;
