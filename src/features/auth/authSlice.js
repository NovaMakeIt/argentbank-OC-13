import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, fetchUserProfileAPI, updateUserProfileAPI } from './authAPI';

// Get token from localStorage if present
const tokenFromStorage = localStorage.getItem('token');
const userFromStorage = localStorage.getItem('user');

const initialState = {
  token: tokenFromStorage || null,
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  status: 'idle',
  error: null,
  remember: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, remember }, { rejectWithValue }) => {
    try {
      const data = await loginAPI(email, password);
      if (remember) {
        localStorage.setItem('token', data.body.token);
      }
      return { token: data.body.token, remember };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (token, { rejectWithValue }) => {
    try {
      const data = await fetchUserProfileAPI(token);
      localStorage.setItem('user', JSON.stringify(data.body));
      return data.body;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Fetch user failed');
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ token, profile }, { rejectWithValue }) => {
    try {
      const data = await updateUserProfileAPI(token, profile);
      localStorage.setItem('user', JSON.stringify(data.body));
      return data.body;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    setRemember: (state, action) => {
      state.remember = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.remember = action.payload.remember;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout, setRemember } = authSlice.actions;
export default authSlice.reducer;
