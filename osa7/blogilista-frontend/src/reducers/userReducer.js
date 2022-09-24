import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import loginService from '../services/login.service';

const usersSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { setUser, removeUser } = usersSlice.actions;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.loginUser({ username, password });
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
    dispatch(setUser(user));
    blogService.setToken(user.token);
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(removeUser());
    blogService.setToken(null);
    window.localStorage.removeItem('loggedUser');
  };
};

export default usersSlice.reducer;
