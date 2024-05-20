import apiService from '@api/service'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PageableRequest, PageableResponse } from '@services/types'
import { Specialization } from './specializationSlice'

export interface Mentee {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  specialization: Specialization
  onboardingDocumentSent: boolean
}

interface OnboardingState {
  isLoading: boolean
  menteesPageable?: PageableResponse<Mentee>
  menteesPageableRequest: PageableRequest
  mentees?: Mentee[]
}

const initialState: OnboardingState = {
  isLoading: false,
  menteesPageable: undefined,
  menteesPageableRequest: { size: 5, page: 0, sort: null },
  mentees: undefined,
}

export const getMentees = createAsyncThunk(
  'mentees',
  async (request: PageableRequest) => {
    const response = await apiService.getMentees(request)
    return response
  },
)

export const searchMentees = createAsyncThunk(
  'searchMentees',
  async (query: string) => {
    const response = await apiService.searchMentees(query)
    return response
  },
)

export const sendOnboardingDocument = createAsyncThunk(
  'mentees/sendOnboardingDocument',
  async ({ id, documentURL }: { id: number; documentURL: string }) => {
    const response = await apiService.sendOnboardingDocument(id, documentURL)
    return response
  },
)

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMentees.pending, (state, action) => {
        state.isLoading = true
        state.menteesPageableRequest = action.meta.arg
      })
      .addCase(getMentees.fulfilled, (state, action) => {
        state.menteesPageable = action.payload
        state.mentees = action.payload.content
      })
      .addCase(getMentees.rejected, (state, action) => {})
      .addCase(searchMentees.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(searchMentees.fulfilled, (state, action) => {
        state.mentees = action.payload
      })
      .addCase(searchMentees.rejected, (state, action) => {})
  },
})

export const onboardingActions = onboardingSlice.actions
export default onboardingSlice.reducer
