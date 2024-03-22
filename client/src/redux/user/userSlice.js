import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        currentUser: null,
        error: null,
        loading: false,
};

const userSlice = createSlice({
        name: 'user',
        initialState,
        reducers: {
                signInStart: (state) => {
                        state.loading = true;
                },
                signInSuccess: (state, action) => {
                        // action is the data we receive from the databse 
                        state.currentUser = action.payload;
                        state.loading = false;
                        state.error = null;
                },
                signInfailure: (state, action) => {
                        state.error = action.payload;
                        state.loading = false;

                },
                signOutUserStart: (state) => {
                        state.loading = true;
                },
                signOutUserSuccess: (state, action) => {
                        state.currentUser = null;
                        state.loading = false;
                        state.error = null;

                },
                signOutUserFailure: (state, action) => {
                        state.error = action.payload;
                        state.loading = false;

                },

        }
})
export const { signInStart, signInSuccess, signInfailure, signOutUserStart, signOutUserSuccess, signOutUserFailure } = userSlice.actions
export default userSlice.reducer;