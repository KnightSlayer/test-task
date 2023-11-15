import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store/store"
import { SpecialistId } from "../../domain/specialist/Specialist"
import { fetchSpecialistsThunk } from "../../domain/specialist/specialistSlice"
import {SpecialistsFilter} from "../../domain/specialist/specialistApi";

export interface SearchSpecialistPageState {
  totalCount: number | null
  specialistIds: SpecialistId[]
  status: "idle" | "loading" | "failed"
  limit: number
}

const initialState: SearchSpecialistPageState = {
  totalCount: null,
  specialistIds: [],
  status: "idle",
  limit: 12,
}

export const loadFirstPageThunk = createAsyncThunk(
  "searchSpecialistPage/loadFirstPage",
  async (filter: Omit<SpecialistsFilter, 'limit' | 'offset'>, thunkAPI) => {
    const rootState = thunkAPI.getState() as RootState

    const result = await thunkAPI.dispatch(fetchSpecialistsThunk({
      ...filter,
      limit: selectSearchSpecialistPageState(rootState).limit
    }))

    if ('error' in result) {
      throw result.error
    }

    return result.payload
  },
)

export const loadMoreThunk = createAsyncThunk(
  "searchSpecialistPage/loadMore",
  async (filter: Omit<SpecialistsFilter, 'limit' | 'offset'>, thunkAPI) => {
    const rootState = thunkAPI.getState() as RootState
    const { limit, specialistIds } = selectSearchSpecialistPageState(rootState)

    const result = await thunkAPI.dispatch(fetchSpecialistsThunk({
      ...filter,
      offset: specialistIds.length,
      limit,
    }))

    if ('error' in result) {
      throw result.error
    }

    return result.payload
  },
)

export const searchSpecialistPageSlice = createSlice({
  name: "searchSpecialistPage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFirstPageThunk.pending, (state) => {
        state.status = "loading"
        state.totalCount = null
        state.specialistIds = []
      })
      .addCase(loadFirstPageThunk.fulfilled, (state, action) => {
        state.status = "idle"
        state.totalCount = action.payload.totalCount
        state.specialistIds = action.payload.items.map((spec) => spec.userId)
      })
      .addCase(loadFirstPageThunk.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(loadMoreThunk.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loadMoreThunk.fulfilled, (state, action) => {
        state.status = "idle"
        state.totalCount = action.payload.totalCount // по идее не может поменяться
        state.specialistIds = [...state.specialistIds, ...action.payload.items.map((spec) => spec.userId)] // в настоящем проекте нужно было проверить на повторы
      })
      .addCase(loadMoreThunk.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const {  } = searchSpecialistPageSlice.actions

export const selectSearchSpecialistPageState = (state: RootState) => state.searchSpecialistPage

export const searchSpecialistPageReducer = searchSpecialistPageSlice.reducer
