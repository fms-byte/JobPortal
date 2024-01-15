import { configureStore } from "@reduxjs/toolkit";
import SavedReducer from "./SavedReducer";

export default configureStore({
    reducer:{
        job:SavedReducer
    }
})