import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store/store"
import { fetchAllSubjectsMemoized } from "./subjectApi"
import { Subject, SubjectId } from "./Subject"

export type SubjectDomainState = Record<SubjectId, Subject>

const initialState: SubjectDomainState = {}

export const fetchAllSubjectsThunk = createAsyncThunk(
  "subject/fetchCount",
  async () => {
    const subjects = await fetchAllSubjectsMemoized()
    return subjects
  },
)

export const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSubjectsThunk.fulfilled, (state, action) => {
        for (const subject of action.payload) {
          state[subject.id] = subject
        }
      })
  },
})

export const selectSubjects = (state: RootState) => state.domain.subject

export const subjectReducer = subjectSlice.reducer
