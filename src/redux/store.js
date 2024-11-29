import {configureStore} from "@reduxjs/toolkit";
import counterReducer from '../feature/counter/counterSlice'
import authSlice from "../feature/counter/authSlice";
export const store = configureStore({
        reducer: {
            counter:counterReducer,
            auth:authSlice
        },
    }
)