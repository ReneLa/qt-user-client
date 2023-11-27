import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: null,
  data: null,
  isOpen: false
};

const modalStore = createSlice({
  name: "modal",
  initialState,
  reducers: {
    onOpen: (state, { payload }) => {
      state.isOpen = true;
      state.type = payload.type;
      state.date = payload.data;
    },
    onClose: (state, action) => {
      state.isOpen = false;
      state.type = null;
      state.date = null;
    }
  }
});

export const { onOpen, onClose } = modalStore.actions;
export default modalStore.reducer;
