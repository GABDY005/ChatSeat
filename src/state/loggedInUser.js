import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    success:{},
    loading: false,
    error: null,
};

const loggedInUser = createSlice({
    name: "loggedInUser",
    initialState,
    reducers: {
        setloggedInUserSuccess: (state, action) => {
           return {
                ...state,
                success: action.payload,
            };
        },
        setloggedInUserLoading: (state, action) => {
            return {
                ...state,
                loading: action.payload,
            };
        },
        setloggedInUserError: (state, action) => {
            return {
                ...state,
                error: action.payload,
            };
        },
}});
    
export const { setloggedInUserSuccess, setloggedInUserLoading, setloggedInUserError } = loggedInUser.actions;

export default loggedInUser.reducer;