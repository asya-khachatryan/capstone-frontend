import apiService from '@api/service'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface UserDto {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  displayName: string
  accountId: string
}

export interface MenteeDto extends UserDto {
  mentorId: number
  roadmapId: number
  onboardingDocumentSent: boolean
}

export interface MentorDto extends UserDto {}

interface OnboardingState {
  isLoading: boolean
  mentees?: MenteeDto[]
  mentors?: MentorDto[]
}

const initialState: OnboardingState = {
  isLoading: false,
  mentees: undefined,
  mentors: undefined,
}

export const getMentees = createAsyncThunk('mentees', async () => {
  const response = await apiService.getMentees()
  return response
})

export const getMentors = createAsyncThunk('mentors', async () => {
  const response = await apiService.getMentors()
  return response
})

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
      .addCase(getMentees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMentees.fulfilled, (state, action) => {
        state.mentees = action.payload
      })
      .addCase(getMentees.rejected, (state, action) => {})
      .addCase(getMentors.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMentors.fulfilled, (state, action) => {
        state.mentors = action.payload
      })
      .addCase(getMentors.rejected, (state, action) => {})
  },
})

export const onboardingActions = onboardingSlice.actions
export default onboardingSlice.reducer
