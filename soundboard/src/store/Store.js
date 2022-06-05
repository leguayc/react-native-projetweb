import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { PresetsReducer } from './PresetsSlice';
import { SoundsReducer } from './SoundsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
    presets : PresetsReducer,
    sounds : SoundsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);
export default store;