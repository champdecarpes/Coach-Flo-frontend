import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
  type ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { Exercise, Workout, Program } from '@/models/types';
import api from '@/app/api';

type LoadStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
type ResourceKey = 'exercises' | 'workouts' | 'programs';

const TTL_MS = 60_000; // Не перезапрашивать чаще минуты (настраиваемо)

// Вспомогательный тип для Record'ов по ресурсам
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
  status: {
    exercises: 'idle',
    workouts: 'idle',
    programs: 'idle',
  },
  error: {
    exercises: null,
    workouts: null,
    programs: null,
  },
  lastLoadedAt: {
    exercises: null,
    workouts: null,
    programs: null,
  },
};

// -------------------- Thunks с condition и abort --------------------
export const fetchExercises = createAsyncThunk(
  'data/fetchExercises',
  async (_: void, { signal }) => {
    const res = await api.get('/exercises/', { signal });
    // если API отдаёт shape вида { results: Exercise[] }, используйте:
    // return (res.data.results ?? []) as Exercise[];
    return res.data as Exercise[];
  },
  {
    condition: (_: void, { getState }) => shouldFetch('exercises', getState as () => RootState),
  },
);

export const fetchWorkouts = createAsyncThunk(
  'data/fetchWorkouts',
  async (_: void, { signal }) => {
    const res = await api.get('/workouts/', { signal });
    return res.data as Workout[];
  },
  {
    condition: (_: void, { getState }) => shouldFetch('workouts', getState as () => RootState),
  },
);

export const fetchPrograms = createAsyncThunk(
  'data/fetchPrograms',
  async (_: void, { signal }) => {
    const res = await api.get('/programs/', { signal });
    return res.data as Program[];
  },
  {
    condition: (_: void, { getState }) => shouldFetch('programs', getState as () => RootState),
  },
);

// Решение о повторном запросе: не фетчить, если уже loading или данные свежие
function shouldFetch(key: ResourceKey, getState: () => RootState): boolean {
  const { status, lastLoadedAt } = getState().data;
  if (status[key] === 'loading') return false;
  const ts = lastLoadedAt[key];
  return !(ts && Date.now() - ts < TTL_MS);

}

// Slice
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
    // Опционально: сброс кеша по ресурсу/всем
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
    attachResourceCases<Workout[]>(builder, fetchWorkouts, 'workouts');
    attachResourceCases<Program[]>(builder, fetchPrograms, 'programs');
  },
});

export const { setExercises, setWorkouts, setPrograms, invalidate } = dataSlice.actions;
export default dataSlice.reducer;

function attachResourceCases<T>(
  builder: ActionReducerMapBuilder<DataState>,
  thunk: ReturnType<typeof createAsyncThunk<T>>,
  key: ResourceKey,
) {
  builder
    .addCase(thunk.pending, (state) => {
      state.status[key] = 'loading';
      state.error[key] = null;
    })
    .addCase(thunk.fulfilled, (state, action: PayloadAction<T>) => {
      // Благодаря generic, TS просит явно уточнить перезапись нужного ключа
      if (key === 'exercises') state.exercises = action.payload as unknown as Exercise[];
      if (key === 'workouts') state.workouts = action.payload as unknown as Workout[];
      if (key === 'programs') state.programs = action.payload as unknown as Program[];

      state.status[key] = 'succeeded';
      state.lastLoadedAt[key] = Date.now();
    })
    .addCase(thunk.rejected, (state, action) => {
      state.status[key] = 'failed';
      state.error[key] = action.error?.message ?? `Failed to load ${key}`;
    });
}

// Selectors
export const selectExercises = (s: RootState) => s.data.exercises;
export const selectWorkouts = (s: RootState) => s.data.workouts;
export const selectPrograms = (s: RootState) => s.data.programs;

export const selectDataStatus = (s: RootState) => s.data.status;
export const selectDataError = (s: RootState) => s.data.error;

// Проверка "потухания" (можно подставить другой TTL на вызове)
export const selectIsStale =
  (key: ResourceKey, ttlMs = TTL_MS) =>
    (s: RootState) => {
      const ts = s.data.lastLoadedAt[key];
      return !ts || Date.now() - ts > ttlMs;
    };
