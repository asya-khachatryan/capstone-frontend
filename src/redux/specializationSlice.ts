import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import apiService from '@api/service'
import { PageableRequest, PageableResponse } from '@services/types'

export interface Specialization {
  id?: number
  specializationName: string
  active: boolean
}

interface SpecializationsState {
  isLoading: boolean
  specPageable?: PageableResponse<Specialization>
  specPageableRequest: PageableRequest

  allSpecializations?: Specialization[]
}

const initialState: SpecializationsState = {
  isLoading: false,
  specPageable: undefined,
  specPageableRequest: { size: 5, page: 0, sort: null },

  allSpecializations: undefined,
}

export const getSpecializations = createAsyncThunk(
  'specializations',
  async (request: PageableRequest) => {
    const response = await apiService.getSpecializations(request)
    return response
  },
)

export const getAllSpecializations = createAsyncThunk(
  'getAllSpecializations',
  async () => {
    const response = await apiService.getAllSpecializations()
    return response
  },
)

export const createSpecialization = createAsyncThunk(
  'createSpecialization',
  async (specialization: Specialization) => {
    const response = await apiService.createSpecialization(specialization)
    return response
  },
)

export const updateSpecialization = createAsyncThunk(
  'updateSpecialization',
  async ({
    id,
    specialization,
  }: {
    id: number
    specialization: Specialization
  }) => {
    const response = await apiService.updateSpecialization(id, specialization)
    return response
  },
)

const specializationsSlice = createSlice({
  name: 'specializations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSpecializations.pending, (state, action) => {
        state.isLoading = true
        state.specPageableRequest = action.meta.arg
      })
      .addCase(getSpecializations.fulfilled, (state, action) => {
        state.specPageable = action.payload
      })
      .addCase(getSpecializations.rejected, (state, action) => {})
      .addCase(getAllSpecializations.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getAllSpecializations.fulfilled, (state, action) => {
        state.allSpecializations = action.payload
      })
      .addCase(getAllSpecializations.rejected, (state, action) => {})
  },
})

export const specializaionActions = specializationsSlice.actions
export default specializationsSlice.reducer
