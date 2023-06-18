import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: null
}

export const displaySlice = createSlice({
    name: 'display',
    initialState,
    reducers: {
        setDisplayState(state, action) {
            state.value = action.payload;
        }
    }
})

export const {setDisplayState} = displaySlice.actions;

export default displaySlice.reducer;