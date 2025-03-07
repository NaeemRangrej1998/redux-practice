// import {configureStore} from "@reduxjs/toolkit";
// import counterReducer from '../feature/counter/counterSlice'
// import authSlice from "../feature/counter/authSlice";
// import {persistReducer, persistStore} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
//
// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
// };
// const logger = (store)=>(next)=>(action)=>{
//     console.log('store:' ,store)
//     console.log('next:' ,next)
//     console.log('action:' ,action)
//     next(action)
// }
// const persistedReducer = persistReducer(persistConfig, authSlice);
// export const store = configureStore({
//         reducer: {
//             // counter:counterReducer,
//             auth:persistedReducer
//         },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false, // Disable checks for non-serializable data
//         }).concat(logger),
//     }
// );
//
// export const persistor = persistStore(store);
//
// store.js in container app
import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../feature/counter/authSlice";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);

// Create the store
export const store = configureStore({
    reducer: {
        auth: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Create the persistor
export const persistor = persistStore(store);

// Also export as default for Module Federation
export default { store, persistor };