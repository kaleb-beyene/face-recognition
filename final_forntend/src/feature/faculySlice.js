import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "http://127.0.0.1:3001/api/v1/";

// Create Faculty
export const createFaculty = createAsyncThunk('faculty/create', async (facultyData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post(`${baseUrl}faculty/`, facultyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Get All Faculties
export const getAllFaculties = createAsyncThunk('faculty/getAll', async (_, { rejectWithValue }) => {
  try {
    

    const {data} = await axios.get(`${baseUrl}faculty/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Get All Faculties
export const getAllFacultiesData = createAsyncThunk('faculty/separate', async (id, { rejectWithValue }) => {
  try {
    console.log("first")

    const {data} = await axios.get(`${baseUrl}separate/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Get Faculty By ID
export const getFacultyById = createAsyncThunk('faculty/getById', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseUrl}faculty/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Update Faculty By ID
export const updateFacultyById = createAsyncThunk('faculty/updateById', async ({ id, name }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.put(`${baseUrl}faculty/${id}`, { name },{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Delete Faculty By ID
export const deleteFacultyById = createAsyncThunk('faculty/deleteById', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    await axios.delete(`${baseUrl}faculty/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const facultySlice = createSlice({
  name: 'faculty',
  initialState: {
    faculties: [],
    status: 'idle',
    faculty: null,
    facult: null,

    error: null,
  },
  reducers: {
    resetState: (state) => {
        state.faculty = null;
        state.status = 'idle';
        state.error = null;
      },
  },
  extraReducers: (builder) => {
    builder
      // Create Faculty
      .addCase(createFaculty.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createFaculty.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.faculties.push(action.payload);
      })
      .addCase(createFaculty.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get All Faculties
      .addCase(getAllFaculties.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllFaculties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.faculties = action.payload;
      })
      .addCase(getAllFaculties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      //

       // Get All Faculties
       .addCase(getAllFacultiesData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllFacultiesData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.facult = action.payload;
      })
      .addCase(getAllFacultiesData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(getFacultyById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getFacultyById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.faculty = action.payload;
      })
      .addCase(getFacultyById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(updateFacultyById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateFacultyById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.faculty = action.payload;
      })
      .addCase(updateFacultyById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(deleteFacultyById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteFacultyById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.faculty = null; // Reset faculty after deletion
      })
      .addCase(deleteFacultyById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetState } = facultySlice.actions;
export default facultySlice.reducer;
