import { createSlice, configureStore } from '@reduxjs/toolkit';

const tracksSlice = createSlice({
    name: 'counter',
    initialState: {
        tracks : [],
        currentSearch : ''
    },
    reducers: {
        addTrack: (state, action) => {
            state.tracks = [...state.tracks, action.payload];
        },
        setCurrentSearch: (state, action) => {
            state.currentSearch = action.payload;
        }
    }
});

const store = configureStore({
    reducer: tracksSlice.reducer
});

export default store;
export const { setCurrentSearch, addTrack } = tracksSlice.actions