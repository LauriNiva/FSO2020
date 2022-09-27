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
    updateABlog: (state, action) => {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      );
    },
    removeABlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
  },
});

export const { setBlogs, addNewBlog, updateABlog, removeABlog } =
  blogsSlice.actions;

export const setInitialBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll();
    dispatch(setBlogs(response));
  };
};

export const createANewBlog = (newBlog) => {
  return async (dispatch) => {
    const res = await blogService.create(newBlog);
    console.log('res', res);
    dispatch(addNewBlog(res));
  };
};

export const likeABlog = (updatedBlog) => {
  return async (dispatch) => {
    const res = await blogService.update(updatedBlog);
    dispatch(updateABlog(res));
  };
};

export const deleteABlog = (blogToDelete) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogToDelete);
      dispatch(removeABlog(blogToDelete));
    } catch (error) {
      console.log(error);
    }
  };
};

export const commentABlog = (blogId, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.comment(blogId, comment);
      dispatch(updateABlog(updatedBlog));
    } catch (error) {
      console.log(error);
    }
  };
};

export default blogsSlice.reducer;
