import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: ''
  },
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload;
    }
  }
});

export const { showNotification } = notificationSlice.actions;
export default notificationSlice.reducer;