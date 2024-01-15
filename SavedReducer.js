import { createSlice } from "@reduxjs/toolkit";

export const SavedSlice = createSlice({
    name:"jobportal",
    initialState:{
        job:[],
    },
    reducers:{
        jobs:(state,action) => {
            state.job.push({...action.payload})
        }
    }
});


export const {savedPlaces} = SavedSlice.actions

export default SavedSlice.reducer