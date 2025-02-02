import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from '../slices/ProfileSlice';
const rootReducer = combineReducers({
    profile : profileReducer,
});

export default rootReducer;