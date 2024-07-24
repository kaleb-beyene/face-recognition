import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "http://127.0.0.1:3001/api/v1/";

// Create Venue
export const createVenue = createAsyncThunk('venue/create', async (venueData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post(`${baseUrl}venue/`, venueData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Get All Venues
export const getAllVenues = createAsyncThunk('venue/getAll', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${baseUrl}venue/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Get Venue By ID
export const getVenueById = createAsyncThunk('venue/getById', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${baseUrl}venue/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Update Venue By ID
export const updateVenueById = createAsyncThunk('venue/updateById', async ({ id, location }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.put(`${baseUrl}venue/${id}`, { location }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Delete Venue By ID
export const deleteVenueById = createAsyncThunk('venue/deleteById', async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    await axios.delete(`${baseUrl}venue/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const venueSlice = createSlice({
  name: 'venue',
  initialState: {
    venues: [],
    status: 'idle',
    venue: null,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.venue = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Venue
      .addCase(createVenue.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createVenue.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.venues.push(action.payload);
      })
      .addCase(createVenue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get All Venues
      .addCase(getAllVenues.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllVenues.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.venues = action.payload;
      })
      .addCase(getAllVenues.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Get Venue By ID
      .addCase(getVenueById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getVenueById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.venue = action.payload;
      })
      .addCase(getVenueById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update Venue By ID
      .addCase(updateVenueById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateVenueById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.venue = action.payload;
      })
      .addCase(updateVenueById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete Venue By ID
      .addCase(deleteVenueById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteVenueById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.venue = null;
      })
      .addCase(deleteVenueById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetState } = venueSlice.actions;
export default venueSlice.reducer;
