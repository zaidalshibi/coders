import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice( {
    name: "user",
    initialState,
    reducers: {
        loginStart: ( state ) => {
            state.loading = true;
        },
        loginSuccess: ( state, action ) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        loginFailure: ( state, action ) => {
            state.loading = false;
            state.error = action.payload;
        },
        signupStart: ( state ) => {
            state.loading = true;
        },
        signupSuccess: ( state, action ) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        signupFailure: ( state, action ) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart: ( state ) => {
            state.loading = true;
        },
        updateSuccess: ( state, action ) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure: ( state, action ) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteStart: ( state ) => {
            state.loading = true;
        },
        deleteSuccess: ( state ) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
        deleteFailure: ( state, action ) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: ( state ) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    }
} );

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    signupStart,
    signupSuccess,
    signupFailure,
    updateStart,
    updateSuccess,
    updateFailure,
    deleteStart,
    deleteSuccess,
    deleteFailure,
    logout,
} = userSlice.actions;

export default userSlice.reducer;
