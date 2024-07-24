import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = "http://127.0.0.1:3001/api/v1/";

export const registerUser = createAsyncThunk('user/register/', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseUrl}register/`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const {data} = await axios.post(`${baseUrl}login/`, credentials);

    console.log(data, "response")

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getUserProfile = createAsyncThunk('auth/profile', async (_, { rejectWithValue }) => {
  try {
    const {data} = await axios.get(`${baseUrl}current/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
    registerUserLoading: false,
    registerUserSuccess: false,
    registerUserFailed: false,
    loginUserLoading: false,
    loginUserSuccess: false,
    loginUserFailed: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      state.registerUserLoading = false;
      state.registerUserSuccess = false;
      state.registerUserFailed = false;
      state.loginUserLoading = false;
      state.loginUserSuccess = false;
      state.loginUserFailed = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.registerUserLoading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerUserLoading = false;
        state.registerUserSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUserFailed = true;
        state.registerUserLoading = false;
        state.registerUserSuccess = false;
        state.status = 'failed';
        state.error = action.payload;
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loginUserLoading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserLoading = false;
        state.loginUserSuccess = true;
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.loginUserFailed = true;
        state.loginUserLoading = false;
        state.loginUserSuccess = false;        
        state.error = action.payload;
      })
      // Get User Profile
      .addCase(getUserProfile.pending, (state) => {
        state.loginUserLoading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserLoading = false;
        state.loginUserSuccess = true;
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.loginUserFailed = true;
        state.loginUserLoading = false;
        state.loginUserSuccess = false;        
        state.error = action.payload;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
