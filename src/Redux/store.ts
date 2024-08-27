// store.js
import { configureStore } from '@reduxjs/toolkit';
import chartsReducer from './Slices/chartSlice';

export const store = configureStore({
    reducer: {
        charts: chartsReducer,
    },
});