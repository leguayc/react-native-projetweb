import { createSlice, configureStore } from '@reduxjs/toolkit';

const sampleBoardSlice = createSlice({
    name: 'sampleBoard',
    initialState: {
        samples : [
            {id: 0, bgColor: '#6495ed'},
            {id: 1, bgColor: '#006400'},
            {id: 2, bgColor: '#dc143c'},
            {id: 3, bgColor: '#9932cc'},
            {id: 4, bgColor: '#deb887'},
            {id: 5, bgColor: '#ffd700'},
            {id: 6, bgColor: '#ff4500'},
            {id: 7, bgColor: '#20b2aa'},
            {id: 8, bgColor: '#ff69b4'},
        ]
    },
    reducers: {
        setSample: (state, action) => {
            let samples = state.samples;
            samples[action.payload.id].sample = action.payload.sample;
            state.samples = [...samples];
        }
    }
});

const store = configureStore({
    reducer: sampleBoardSlice.reducer
});

export default store;
export const { setSample } = sampleBoardSlice.actions