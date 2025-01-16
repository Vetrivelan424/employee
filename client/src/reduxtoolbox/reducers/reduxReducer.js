// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../actions/authSlice';
import profileReducer from '../actions/profileslice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export default store;
