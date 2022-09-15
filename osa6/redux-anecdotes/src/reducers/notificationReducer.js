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

let timeoutID;

export const setNotification = (message, timeInSeconds) => {
  console.log('timeoutID', timeoutID)
  return dispatch => {
    clearTimeout(timeoutID);
    dispatch(showNotification(message));
    timeoutID = setTimeout(() => {
      dispatch(clearNotification());
    }, timeInSeconds * 1000);
  };
};

export default notificationSlice.reducer;