import { configureStore } from '@reduxjs/toolkit';
import problemsReducer from './slices/problemsSlice';
import usersReducer from './slices/usersSlice';
import tagsReducer from './slices/tagsSlice';

export const store = configureStore({
  reducer: {
    problems: problemsReducer,
    users: usersReducer,
    tags: tagsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 