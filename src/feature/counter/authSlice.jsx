import {createSlice} from "@reduxjs/toolkit";
import {counterSlice} from "./counterSlice";

export const authSlice=createSlice({
    name: 'auth',
    initialState: {
        role: null,
        token: null,
    },
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        clearAuth: (state) => {
            state.role = undefined;
            state.token = undefined;
        },
    }
})
export const { setRole, setToken, clearAuth } = authSlice.actions

export default authSlice.reducer;