import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
  // middleware и devTools по умолчанию уже подключены
});

// Типы для всего приложения
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
