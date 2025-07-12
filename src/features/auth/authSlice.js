import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, fetchUserProfileAPI, updateUserProfileAPI } from './authAPI';

// Récupérer le token dans localStorage s'il est présent
const tokenFromStorage = localStorage.getItem('token');

const initialState = {
  token: tokenFromStorage || null,
  user: null,
  status: 'idle',
  error: null,
  remember: false,
};

/**
 * Thunk asynchrone pour connecter un utilisateur.
 * @param {Object} params - email, password, remember
 * @returns {Promise<{token: string, remember: boolean}>}
 */
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

/**
 * Thunk asynchrone pour récupérer le profil utilisateur à partir du token JWT.
 * @param {string} token - JWT de l'utilisateur
 * @returns {Promise<Object>} Profil utilisateur
 */
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (token, { rejectWithValue }) => {
    try {
      const data = await fetchUserProfileAPI(token);
      return data.body;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Fetch user failed');
    }
  }
);

/**
 * Thunk asynchrone pour mettre à jour le profil utilisateur.
 * @param {Object} params - token JWT et nouvel objet profil
 * @returns {Promise<Object>} Nouveau profil utilisateur
 */
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ token, profile }, { rejectWithValue }) => {
    try {
      const data = await updateUserProfileAPI(token, profile);
      return data.body;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

/**
 * Slice Redux pour la gestion de l'authentification et du profil utilisateur.
 * - Gère le token, le profil, les erreurs et le statut de chargement.
 * @description Ce slice gère l'état de l'authentification et du profil utilisateur, y compris les actions de connexion, de déconnexion et de mise à jour du profil.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Action pour déconnecter l'utilisateur (reset du state et suppression du localStorage).
     * @param {Object} state - State Redux
     * @description Déconnecte l'utilisateur en réinitialisant le state et en supprimant les données du localStorage.
     */
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('token');
    },
    /**
     * Action pour mémoriser la préférence "remember me".
     * @param {Object} state - State Redux
     * @param {Object} action - Action contenant le booléen
     * @description Met à jour la préférence "remember me" dans le state.
     */
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
