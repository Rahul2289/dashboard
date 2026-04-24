import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice.js';
import usersReducer from './slices/usersSlice.js';
import tablesReducer from './slices/tablesSlice.js';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    users: usersReducer,
    tables: tablesReducer,
  },
});

export default store;
