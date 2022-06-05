import { createSlice, configureStore } from '@reduxjs/toolkit';

const defaultSampler = [
    {id: 0, bgColor: '#6495ed'},
    {id: 1, bgColor: '#006400'},
    {id: 2, bgColor: '#dc143c'},
    {id: 3, bgColor: '#9932cc'},
    {id: 4, bgColor: '#deb887'},
    {id: 5, bgColor: '#ffd700'},
    {id: 6, bgColor: '#ff4500'},
    {id: 7, bgColor: '#20b2aa'},
    {id: 8, bgColor: '#ff69b4'},
];


const sampleBoardSlice = createSlice({
    name: 'sampleBoard',
    initialState: {
        presets : [
            defaultSampler
        ],
        currentPreset : 0
    },
    reducers: {
        setSample: (state, action) => {
            let presets = state.presets;
            let samples = presets[state.currentPreset];
            samples[action.payload.id].sample = action.payload.sample;

            presets[state.currentPreset] = [...samples];
            state.presets = [...presets];
        },
        addPreset: (state, action) => {
            let presets = state.presets;
            presets.push(defaultSampler);
            state.presets = [...presets];
        },
        removePreset: (state, action) => {
            let presets = state.presets;
            if (presets.length > 1 && action.payload >= 0 && action.payload < presets.length) {
                state.currentPreset = 0;
                presets.splice(action.payload, 1);
                state.presets = [...presets];
            }
        },
        setCurrentPreset: (state, action) => {
            state.currentPreset = action.payload;
        }
    }
});

const store = configureStore({
    reducer: sampleBoardSlice.reducer
});

export default store;
export const { setSample, setCurrentPreset, addPreset, removePreset } = sampleBoardSlice.actions