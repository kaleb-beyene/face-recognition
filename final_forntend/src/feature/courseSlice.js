import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "http://127.0.0.1:3001/api/v1/";

// Create Course
export const createCourse = createAsyncThunk('course/create', async (courseData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${baseUrl}course/`, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Get All Courses
export const getAllCourses = createAsyncThunk('course/getAll', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}course/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Get Course By ID
export const getCourseById = createAsyncThunk('course/getById', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}course/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Update Course By ID
export const updateCourseById = createAsyncThunk('course/updateById', async ({ id, name }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${baseUrl}course/${id}`, { name }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Delete Course By ID
export const deleteCourseById = createAsyncThunk('course/deleteById', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${baseUrl}course/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    courses: [],
    status: 'idle',
    course: null,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.course = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Course
      .addCase(createCourse.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get All Courses
      .addCase(getAllCourses.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get Course By ID, Update Course By ID, Delete Course By ID
      .addCase(getCourseById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.course = action.payload;
      })
      .addCase(getCourseById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateCourseById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateCourseById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.course = action.payload;
      })
      .addCase(updateCourseById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteCourseById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteCourseById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.course = null;
      })
      .addCase(deleteCourseById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetState } = courseSlice.actions;
export default courseSlice.reducer;
