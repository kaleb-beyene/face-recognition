import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "http://127.0.0.1:3001/api/v1/";

// Create Lecture
export const createLecture = createAsyncThunk('lecture/create', async (lectureData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${baseUrl}lecture/`, lectureData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Get All Lectures
export const getAllLectures = createAsyncThunk('lecture/getAll', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}lecture/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Get Lecture By ID
export const getLectureById = createAsyncThunk('lecture/getById', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}lecture/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Update Lecture By ID
export const updateLectureById = createAsyncThunk('lecture/updateById', async ({ id, lectureData }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${baseUrl}lecture/${id}`, lectureData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Delete Lecture By ID
export const deleteLectureById = createAsyncThunk('lecture/deleteById', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${baseUrl}lecture/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const lectureSlice = createSlice({
  name: 'lecture',
  initialState: {
    lectures: [],
    status: 'idle',
    lecture: null,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.lecture = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Lecture
      .addCase(createLecture.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createLecture.fulfilled, (state, action) => {
        state.status = ' ';
        state.lectures.push(action.payload);
      })
      .addCase(createLecture.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get All Lectures
      .addCase(getAllLectures.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllLectures.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lectures = action.payload;
      })
      .addCase(getAllLectures.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get Lecture By ID, Update Lecture By ID, Delete Lecture By ID
      .addCase(getLectureById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getLectureById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lecture = action.payload;
      })
      .addCase(getLectureById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateLectureById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateLectureById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lecture = action.payload;
      })
      .addCase(updateLectureById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteLectureById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteLectureById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lecture = null;
      })
      .addCase(deleteLectureById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetState } = lectureSlice.actions;
export default lectureSlice.reducer;
