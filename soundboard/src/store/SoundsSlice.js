import { createSlice } from '@reduxjs/toolkit';

const soundsSlice = createSlice({
    name: 'sounds',
    initialState: {
        sounds : []
    },
    reducers: {
        addSounds: (state, action) => {
            let sounds = state.sounds;
            sounds.push(action.payload);
            state.sounds = [...sounds];
        }
    }
});

export const SoundsReducer = soundsSlice.reducer;
export const { addSounds } = soundsSlice.actions