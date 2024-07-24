import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "http://127.0.0.1:3001/api/v1/";

// Create Student
export const createStudent = createAsyncThunk('student/create', async (studentData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post(`${baseUrl}student/`, studentData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Get All Students
export const getAllStudents = createAsyncThunk('student/getAll', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}student/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Get Student By ID
export const getStudentById = createAsyncThunk('student/getById', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}student/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Update Student By ID
export const updateStudentById = createAsyncThunk('student/updateById', async ({ id, studentData }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    for (const key in studentData) {
      formData.append(key, studentData[key]);
    }

    const response = await axios.put(`${baseUrl}student/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Delete Student By ID
export const deleteStudentById = createAsyncThunk('student/deleteById', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${baseUrl}student/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    students: [],
    status: 'idle',
    student: null,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.student = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Student
      .addCase(createStudent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students.push(action.payload);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get All Students
      .addCase(getAllStudents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get Student By ID
      .addCase(getStudentById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.student = action.payload;
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update Student By ID
      .addCase(updateStudentById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateStudentById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.student = action.payload;
      })
      .addCase(updateStudentById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete Student By ID
      .addCase(deleteStudentById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteStudentById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.student = null;
      })
      .addCase(deleteStudentById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetState } = studentSlice.actions;
export default studentSlice.reducer;
