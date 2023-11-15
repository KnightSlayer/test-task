import { combineReducers } from "@reduxjs/toolkit"
import { subjectReducer } from "../subject/subjectSlice"


export const domainReducer = combineReducers({
  subject: subjectReducer,
});
