import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import apiService from '@api/service'

export interface Specialization {
  id?: number
  specializationName: string
  active: boolean
}

interface SpecializationsState {
  isLoading: boolean
  specializations?: Specialization[]
}

const initialState: SpecializationsState = {
  isLoading: false,
  specializations: undefined,
}

export const getSpecializations = createAsyncThunk(
  'specializations',
  async () => {
    const response = await apiService.getSpecializations()
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
      .addCase(getSpecializations.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSpecializations.fulfilled, (state, action) => {
        state.specializations = action.payload
      })
      .addCase(getSpecializations.rejected, (state, action) => {})
  },
})

export const specializaionActions = specializationsSlice.actions
export default specializationsSlice.reducer
