import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "http://127.0.0.1:3001/api/v1/";

// Create Session
export const createSession = createAsyncThunk('session/create', async (sessionData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(`${baseUrl}session/`, sessionData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Get All Sessions
export const getAllSessions = createAsyncThunk('session/getAll', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`${baseUrl}session/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Get All Sessions
export const getSessionByStudent = createAsyncThunk('session/getAllStudent', async (studentName, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(`${baseUrl}session/hello`, studentName, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Get Session By ID
export const getSessionById = createAsyncThunk('session/getById', async (id, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`${baseUrl}session/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Update Session By ID
export const updateSessionById = createAsyncThunk('session/updateById', async ({ id, sessionData }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.put(`${baseUrl}session/${id}`, sessionData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Delete Session By ID
export const deleteSessionById = createAsyncThunk('session/deleteById', async (id, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');

        await axios.delete(`${baseUrl}session/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        sessions: [],
        status: 'idle',
        session: null,
        error: null,
    },
    reducers: {
        resetState: (state) => {
            state.session = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Session
            .addCase(createSession.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createSession.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sessions.push(action.payload);
            })
            .addCase(createSession.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Get All Sessions
            .addCase(getAllSessions.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllSessions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sessions = action.payload;
            })
            .addCase(getAllSessions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(getSessionByStudent.pending, (state) => {
                // state.status = 'loading';
                state.error = null;
            })
            .addCase(getSessionByStudent.fulfilled, (state, action) => {
                // state.status = 'succeeded';
                state.sessions = action.payload;
            })
            .addCase(getSessionByStudent.rejected, (state, action) => {
                // state.status = 'failed';
                state.error = action.payload;
            })
            // Get 
            
            // Get Session By ID
            .addCase(getSessionById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getSessionById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.session = action.payload;
            })
            .addCase(getSessionById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Update Session By ID
            .addCase(updateSessionById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateSessionById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.session = action.payload;
            })
            .addCase(updateSessionById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteSessionById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteSessionById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.session = null;
            })
            .addCase(deleteSessionById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { resetState } = sessionSlice.actions;
export default sessionSlice.reducer;