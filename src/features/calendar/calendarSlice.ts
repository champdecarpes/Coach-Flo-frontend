// features/calendar/calendarSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/app/api';
import { CalendarEvent, EventType } from '@/models/types';

interface CalendarState {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
  selectedClientId: number | null;
  selectedTrainerId: number | null;
  viewRole: 'client' | 'trainer' | 'organization';
}

const initialState: CalendarState = {
  events: [],
  loading: false,
  error: null,
  selectedClientId: null,
  selectedTrainerId: null,
  viewRole: 'client',
};

// Загрузка событий для клиента
export const fetchClientEvents = createAsyncThunk(
  'calendar/fetchClientEvents',
  async (clientId: number, { rejectWithValue }) => {
    try {
      const res = await api.get(`/calendar/events/?client=${clientId}`);
      return res.data as CalendarEvent[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail || 'Failed to load events');
    }
  }
);

// Загрузка событий для тренера (всех клиентов)
export const fetchTrainerEvents = createAsyncThunk(
  'calendar/fetchTrainerEvents',
  async (trainerId: number, { rejectWithValue }) => {
    try {
      const res = await api.get(`/calendar/events/?trainer=${trainerId}`);
      return res.data as CalendarEvent[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail || 'Failed to load events');
    }
  }
);

// Создание события
export const createCalendarEvent = createAsyncThunk(
  'calendar/createEvent',
  async (data: { clientId: number; type: EventType; referenceId: number; start: string; end: string }, { rejectWithValue }) => {
    try {
      const res = await api.post('/calendar/events/', data);
      return res.data as CalendarEvent;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail || 'Failed to create event');
    }
  }
);

// Обновление события (изменение времени или назначения)
export const updateCalendarEvent = createAsyncThunk(
  'calendar/updateEvent',
  async (data: { id: number | string; start: string; end: string }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/calendar/events/${data.id}/`, { start: data.start, end: data.end });
      return res.data as CalendarEvent;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail || 'Failed to update event');
    }
  }
);

// Удаление события
export const deleteCalendarEvent = createAsyncThunk(
  'calendar/deleteEvent',
  async (id: number | string, { rejectWithValue }) => {
    try {
      await api.delete(`/calendar/events/${id}/`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.detail || 'Failed to delete event');
    }
  }
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedClient(state, action: PayloadAction<number | null>) {
      state.selectedClientId = action.payload;
    },
    setSelectedTrainer(state, action: PayloadAction<number | null>) {
      state.selectedTrainerId = action.payload;
    },
    setViewRole(state, action: PayloadAction<'client' | 'trainer' | 'organization'>) {
      state.viewRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchClientEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTrainerEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainerEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchTrainerEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createCalendarEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateCalendarEvent.fulfilled, (state, action) => {
        const idx = state.events.findIndex((ev) => ev.id === action.payload.id);
        if (idx >= 0) state.events[idx] = action.payload;
      })
      .addCase(deleteCalendarEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((ev) => ev.id !== action.payload);
      });
  },
});

export const { setSelectedClient, setSelectedTrainer, setViewRole } = calendarSlice.actions;
export default calendarSlice.reducer;
