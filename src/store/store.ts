import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import { domainReducer } from "../domain/_store/domainSlice"
import { searchSpecialistPageReducer } from "../routes/SearchSpecialistPage/searchSpecialistPageSlice";

export const store = configureStore({
  reducer: {
    domain: domainReducer,
    // counter: counterReducer,
    searchSpecialistPage: searchSpecialistPageReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
