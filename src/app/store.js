import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

/**
 * Store Redux principal de l'application.
 * Combine les reducers (ici : auth) pour gérer l'état global.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
