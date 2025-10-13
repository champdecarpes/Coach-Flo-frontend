import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
  type ActionReducerMapBuilder,
  type AsyncThunk,
} from '@reduxjs/toolkit';
import { Exercise, Workout, Program } from '@/models/types';
import api from '@/app/api';
import type { SerializedError } from '@reduxjs/toolkit';

type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
type ResourceKey = 'exercises' | 'workouts' | 'programs';

const TTL_MS = 60_000;

type ByResource<T> = Record<ResourceKey, T>;

export interface DataState {
  exercises: Exercise[];
  workouts: Workout[];
  programs: Program[];
  status: ByResource<LoadStatus>;
  error: ByResource<string | null>;
  lastLoadedAt: ByResource<number | null>;
}

const initialState: DataState = {
  exercises: [],
  workouts: [],
  programs: [],
  status: { exercises: 'idle', workouts: 'idle', programs: 'idle' },
  error:  { exercises: null,  workouts: null,  programs: null  },
  lastLoadedAt: { exercises: null, workouts: null, programs: null },
};

// -------------------- helpers --------------------
function shouldFetchFromData(key: ResourceKey, data: DataState): boolean {
  if (data.status[key] === 'loading') return false;
  const ts = data.lastLoadedAt[key];
  return !(ts && Date.now() - ts < TTL_MS);
}

// -------------------- Thunks --------------------
// 3-й дженерик указывает форму state, доступную в thunk/condition,
// без импорта RootState => нет циклов типов.
export const fetchExercises = createAsyncThunk<
  Exercise[],                       // return
  void,                             // arg
  { state: { data: DataState } }    // thunkApiConfig
>(
  'data/fetchExercises',
  async (_arg, { signal }) => {
    const res = await api.get('/exercises/', { signal });
    return res.data as Exercise[];
  },
  {
    condition: (_arg, { getState }) => shouldFetchFromData('exercises', getState().data),
  }
);

export const fetchWorkouts = createAsyncThunk<
  Workout[],
  void,
  { state: { data: DataState } }
>(
  'data/fetchWorkouts',
  async (_arg, { signal }) => {
    const res = await api.get('/workouts/', { signal });
    return res.data as Workout[];
  },
  {
    condition: (_arg, { getState }) => shouldFetchFromData('workouts', getState().data),
  }
);

export const fetchPrograms = createAsyncThunk<
  Program[],
  void,
  { state: { data: DataState } }
>(
  'data/fetchPrograms',
  async (_arg, { signal }) => {
    const res = await api.get('/programs/', { signal });
    return res.data as Program[];
  },
  {
    condition: (_arg, { getState }) => shouldFetchFromData('programs', getState().data),
  }
);

// -------------------- Slice --------------------
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setExercises(state, action: PayloadAction<Exercise[]>) {
      state.exercises = action.payload;
      state.status.exercises = 'succeeded';
      state.error.exercises = null;
      state.lastLoadedAt.exercises = Date.now();
    },
    setWorkouts(state, action: PayloadAction<Workout[]>) {
      state.workouts = action.payload;
      state.status.workouts = 'succeeded';
      state.error.workouts = null;
      state.lastLoadedAt.workouts = Date.now();
    },
    setPrograms(state, action: PayloadAction<Program[]>) {
      state.programs = action.payload;
      state.status.programs = 'succeeded';
      state.error.programs = null;
      state.lastLoadedAt.programs = Date.now();
    },
    invalidate(state, action: PayloadAction<ResourceKey | 'all'>) {
      const keys: ResourceKey[] =
        action.payload === 'all' ? ['exercises', 'workouts', 'programs'] : [action.payload];
      for (const k of keys) {
        state.lastLoadedAt[k] = null;
        state.status[k] = 'idle';
        state.error[k] = null;
      }
    },
  },
  extraReducers: (builder) => {
    attachResourceCases<Exercise[]>(builder, fetchExercises, 'exercises');
    attachResourceCases<Workout[]>(builder,  fetchWorkouts,  'workouts');
    attachResourceCases<Program[]>(builder,  fetchPrograms,  'programs');
  },
});

export const { setExercises, setWorkouts, setPrograms, invalidate } = dataSlice.actions;
export default dataSlice.reducer;

// аккуратная сигнатура: используем AsyncThunk<T, any, any>
function attachResourceCases<T>(
  builder: ActionReducerMapBuilder<DataState>,
  thunk: AsyncThunk<T, any, any>,
  key: ResourceKey,
) {
  builder
    .addCase(thunk.pending, (state) => {
      state.status[key] = 'loading';
      state.error[key] = null;
    })
    .addCase(thunk.fulfilled, (state, action: PayloadAction<T>) => {
      if (key === 'exercises') state.exercises = action.payload as unknown as Exercise[];
      if (key === 'workouts')  state.workouts  = action.payload as unknown as Workout[];
      if (key === 'programs')  state.programs  = action.payload as unknown as Program[];
      state.status[key] = 'succeeded';
      state.lastLoadedAt[key] = Date.now();
    })
    .addCase(thunk.rejected, (state, action) => {
      state.status[key] = 'failed';
      const err = action.error as SerializedError;
      state.error[key] = err.message ?? `Failed to load ${key}`;
    });
}
