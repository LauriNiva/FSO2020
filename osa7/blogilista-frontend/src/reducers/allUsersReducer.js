import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users.service';

const allUsersSlice = createSlice({
  name : 'allUsers',
  initialState: [],
  reducers: {
    setAll: (state, action) => {
      return action.payload;
    }
  }
});

export const { setAll } = allUsersSlice.actions;

export const getAllUsers = () => {
  return async ( dispatch ) => {
    const allUsers = await userService.getAll();
    dispatch(setAll(allUsers));
  };
};

export default allUsersSlice.reducer;
