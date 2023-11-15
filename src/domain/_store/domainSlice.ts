import { combineReducers } from "@reduxjs/toolkit"
import { subjectReducer } from "../subject/subjectSlice"
import { specialistReducer } from "../specialist/specialistSlice"


export const domainReducer = combineReducers({
  subject: subjectReducer,
  specialist: specialistReducer,
});
