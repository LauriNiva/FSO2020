import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogsSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload;
    },
    addNewBlog: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setBlogs, addNewBlog } = blogsSlice.actions;


export const setInitialBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll();
    dispatch(setBlogs(response));
  };
};

export const createANewBlog = (newBlog) => {
  return async dispatch => {
    const res = await blogService.create(newBlog);
    console.log('res', res);
    dispatch(addNewBlog(res));
  };
};

export default blogsSlice.reducer;
