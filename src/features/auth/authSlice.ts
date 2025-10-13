// src/features/auth/authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as authService from '../../services/authService';

interface AuthState {
  user: authService.UserProfile | null;
  token: string | null;
  role: string | null;
  parentName: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('authToken'),
  role: localStorage.getItem('role'),
  parentName: localStorage.getItem('parentName'),
  isAuthenticated: !!localStorage.getItem('authToken'),
  loading: false,
  error: null,
};

export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async (req: authService.SignInRequest, { rejectWithValue }) => {
    try {
      const { token, user } = await authService.signIn(req);
      return { token, user };
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.detail || 'Login failed');
    }
  }
);

export const signUpThunk = createAsyncThunk(
  'auth/signUp',
  async (req: authService.SignUpRequest, { rejectWithValue }) => {
    try {
      const { token, user } = await authService.signUp(req);
      return { token, user, role: req.role, parentName: req.parentName || null };
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.detail || 'Sign up failed');
    }
  }
);

// Регистрация по приглашению
export const signUpInvThunk = createAsyncThunk(
  'auth/signUpInv',
  async (req: authService.SignUpRequest, { rejectWithValue }) => {
    try {
      const { token, user } = await authService.signUpWithInvitation(req);
      return { token, user, role: req.role, parentName: req.parentName || null };
    } catch (e: any) {
      return rejectWithValue(e.response?.data?.detail || 'Sign up failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      authService.logout();
      state.user = null;
      state.token = null;
      state.role = null;
      state.parentName = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signInThunk.fulfilled, (state, action: PayloadAction<{ token: string; user: authService.UserProfile }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        // обновляем роль и родителя из localStorage
        state.role = localStorage.getItem('role');
        state.parentName = localStorage.getItem('parentName');
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signUpThunk.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signUpThunk.fulfilled, (state, action: PayloadAction<{ token: string; user: authService.UserProfile; role: string; parentName: string | null }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.parentName = action.payload.parentName;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signUpInvThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.parentName = action.payload.parentName;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
