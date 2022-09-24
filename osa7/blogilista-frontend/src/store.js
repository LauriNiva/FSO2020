import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    users: userReducer
  },
});
