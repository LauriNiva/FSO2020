import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: ''
  },
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload;
    },
    clearNotification : (state, action) => {
      state.message = '';
    }
  }
});

export const { showNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (message, timeInSeconds) => {
  return dispatch => {
    dispatch(showNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeInSeconds * 1000);
  };
};

export default notificationSlice.reducer;