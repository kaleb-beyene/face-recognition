import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000/recognition/";

// Create Recognition
export const addStudentImage = createAsyncThunk('recognition/AddStudent', async (studentData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(`${baseUrl}add_student_face/`, studentData);

        console.log(response, "response")
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Get Recognition
export const getRecgnizedImageInfo = createAsyncThunk('recognition/Recognize', async (studentData, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(`http://127.0.0.1:8000/recognition/recognize_and_mark_attendance/`, studentData);
        console.log(response, "response")

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


const recognitionSlice = createSlice({
    name: 'recognition',
    initialState: {
        status: 'idle',
        recognition: null,
        error: null,
    },
    reducers: {
        resetState: (state) => {
            state.recognition = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(addStudentImage.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addStudentImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.recognition = action.payload;
                console.log(action.payload, "succeeded")
            })
            .addCase(addStudentImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                console.log(action.payload, "Error")

            })
            
            // Get Recognition
            .addCase(getRecgnizedImageInfo.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getRecgnizedImageInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.recognition = action.payload;
            })
            .addCase(getRecgnizedImageInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    },
});

export const { resetState } = recognitionSlice.actions;
export default recognitionSlice.reducer;