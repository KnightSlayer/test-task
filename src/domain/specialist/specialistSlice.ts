import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store/store"
import { fetchSpecialists, SpecialistsFilter } from "./specialistApi"
import { Specialist, SpecialistId } from "./Specialist";

export type specialistDomainState = Record<SpecialistId, Specialist>

const initialState: specialistDomainState = {}

export const fetchSpecialistsThunk = createAsyncThunk(
  "specialist/fetch",
  async (filter: SpecialistsFilter) => {
    return fetchSpecialists(filter)
  },
)

export const specialistSlice = createSlice({
  name: "specialist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialistsThunk.fulfilled, (state, action) => {
        for (const specialist of action.payload.items) {
          state[specialist.userId] = specialist
        }
      })
  },
})

export const selectSpecialists = (state: RootState) => state.domain.specialist
export const selectSpecialistById = (state: RootState, { specialistId }: {specialistId: SpecialistId}) => state.domain.specialist[specialistId]

export const specialistReducer = specialistSlice.reducer
