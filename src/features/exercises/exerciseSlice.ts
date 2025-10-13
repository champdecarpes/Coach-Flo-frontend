// features/exercises/exerciseSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Exercise } from '@/models/types';
import * as exerciseService from '@/services/exerciseService';

interface ExerciseState {
  items: Exercise[];
  loading: boolean;
  error?: string;
}

const initialState: ExerciseState = { items: [], loading: false };

export const fetchExercises = createAsyncThunk(
  'exercises/fetchAll', async (_, { rejectWithValue }) => {
    try {
      return await exerciseService.fetchExercises();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Error');
    }
  }
);

export const createExerciseThunk = createAsyncThunk(
  'exercises/create', async (exercise: Exercise, { rejectWithValue }) => {
    try {
      return await exerciseService.createExercise(exercise);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || 'Error');
    }
  }
);

const exerciseSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExercises.pending, (state) => { state.loading = true; })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createExerciseThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default exerciseSlice.reducer;
