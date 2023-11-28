import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api.slice";

const initialState = {
  user: null,
  token: null
};

const userState = createSlice({
  name: "user",
  initialState,
  reducers: {
    save_token: (state, action) => {
      state.token = action.payload;
    },
    updateCurrentUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
      }
    ),
      builder.addMatcher(
        apiSlice.endpoints.registerUser.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
          state.user = payload.user;
        }
      ),
      builder.addMatcher(
        apiSlice.endpoints.getUserInfo.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
        }
      );
  }
});

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/signin",
        method: "POST",
        body: { ...credentials }
      })
    }),
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: { ...credentials }
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
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/change-password",
        method: "POST",
        body
      })
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: `/api/user`,
        method: "GET"
      })
    }),
    getAssignees: builder.query({
      query: () => ({
        url: `/api/user/all`,
        method: "GET"
      }),
      transformResponse: (response) => {
        return response.users;
      }
    }),
    modifyUser: builder.mutation({
      query: (data) => ({
        url: `/api/user`,
        method: "PATCH",
        body: { ...data }
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
  useGetUserInfoQuery,
  useGetAssigneesQuery
} = userSlice;

//selector for all users:assignees
export const selectUsersData = (state) =>
  userSlice.endpoints.getAssignees.select()(state)?.data;

export const { save_token, updateCurrentUser } = userState.actions;
export default userState.reducer;
