import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import metricReducer from '@/features/metrics/metricSlice';
import calendarReducer from '@/features/calendar/calendarSlice';
import exerciseReducer from "@/features/exercises/exerciseSlice.ts";

export const store = configureStore({
  reducer: {
    metrics: metricReducer,
    auth: authReducer,
    calendar: calendarReducer,
    data: dataReducer,
    exercises: exerciseReducer,
  },
  // middleware и devTools по умолчанию уже подключены
});

// Типы для всего приложения
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
