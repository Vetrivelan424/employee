// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserInfoByToken } from '../../services/services'; // Import your API service
import ServiceUtils from '../../utils/serviceUtils';

const utilsService = ServiceUtils();

export const fetchSession = createAsyncThunk('auth/fetchSession', async (_, { getState }) => {
  const token = localStorage.getItem('user_access_token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await UserInfoByToken({ token });
    return response; // Assuming your API response has user details in 'data' field
  } catch (error) {
    throw error;
  }
});

const initialState = {
  token: localStorage.getItem('user_access_token') || null,
  user: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload?.user?.username;
      state.status = 'succeeded';
      localStorage.setItem('user_access_token', action.payload.token);
      utilsService.setSession('user', JSON.stringify(action.payload.user), true);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.status = 'idle';
      localStorage.removeItem('user_access_token');
      localStorage.removeItem('TVSuser');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSession.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload?.user?.username;
        state.token = action.payload?.user?.token;
      })
      .addCase(fetchSession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
