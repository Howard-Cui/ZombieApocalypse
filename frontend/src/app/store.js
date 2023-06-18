import { configureStore } from '@reduxjs/toolkit';
import DisplayReducer from '../components/DisplaySlice';

export const store = configureStore({
    reducer: {
        display: DisplayReducer
    }
})