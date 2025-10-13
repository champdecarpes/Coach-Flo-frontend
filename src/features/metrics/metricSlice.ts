import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '@/app/api';

// Определяем структуру точки измерения
export interface MetricDataPoint {
  timestamp: string;
  value: number;
}

// Состояние слайса: массивы данных по каждой метрике + статус
export interface MetricsState {
  data: { [metric: string]: MetricDataPoint[] };
  loading: boolean;
  error: string | null;
}

const initialState: MetricsState = {
  data: {},
  loading: false,
  error: null,
};

// Thunk для загрузки истории конкретной метрики
export const fetchMetric = createAsyncThunk<
  MetricDataPoint[],
  { metric: string; start?: string; end?: string },
  { rejectValue: string }
>(
  'metrics/fetchMetric',
  async ({metric, start, end}, {rejectWithValue}) => {
    try {
      const params: any = {};
      if (start) params.start = start;
      if (end) params.end = end;
      params.metric = metric;
      const response = await api.get('/bodies/api/bodychangehistory/', {params});

      // Фильтруем записи по имени поля и преобразуем значение
      return (response.data as any[])
        .filter((entry) => entry.field_name === metric)
        .map((entry) => ({
          timestamp: entry.timestamp,
          value: parseFloat(entry.new_value),
        }));
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch metric');
    }
  }
);

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    clearMetrics: (state) => {
      state.data = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetric.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMetric.fulfilled, (state, action) => {
        // TS знает, что это fulfilled экшен от fetchMetric:
        const {metric} = action.meta.arg;        // ← meta доступен
        state.data[metric] = action.payload;       // payload: MetricDataPoint[]
        state.loading = false;
      })
      .addCase(fetchMetric.rejected, (state, action) => {
        state.loading = false;
        // у тебя задан rejectValue: string — достанем его, иначе возьмём message
        state.error = (action.payload as string | undefined)
          ?? action.error.message
          ?? 'Error fetching metric';
      });
  }
});

export const {clearMetrics} = metricsSlice.actions;
export default metricsSlice.reducer;
