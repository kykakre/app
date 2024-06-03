import { configureStore } from '@reduxjs/toolkit';
import { dialoguesApi } from './dialoguesApi';

export const store = configureStore({
  reducer: {
    [dialoguesApi.reducerPath]: dialoguesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dialoguesApi.middleware),
});