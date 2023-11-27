import { apiSlice } from "../api/api.slice";

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: {
          email: user.email,
          password: user.password
        }
      })
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: {
          email: user.email,
          password: user.password,
          confirm_password: user.confirm_password
        }
      })
    }),
    resetPassword: builder.mutation({
      query: (new_password) => ({
        url: "/reset-password",
        method: "POST",
        body: {
          new_password
        }
      })
    }),
    modifyUser: builder.mutation({
      query: (body) => ({
        url: "/update-user",
        method: "POST",
        body
      })
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/change-password",
        method: "POST",
        body
      })
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: `/user`,
        method: "GET"
      })
    })
  })
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useResetPasswordMutation,
  useModifyUserMutation,
  useChangePasswordMutation,
  useGetUserInfoQuery
} = userSlice;