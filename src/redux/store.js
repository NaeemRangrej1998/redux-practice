import {configureStore} from "@reduxjs/toolkit";
import counterReducer from '../feature/counter/counterSlice'
import authSlice from "../feature/counter/authSlice";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);
export const store = configureStore({
        reducer: {
            // counter:counterReducer,
            auth:persistedReducer
        },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable checks for non-serializable data
        }),
    }
);

export const persistor = persistStore(store);

