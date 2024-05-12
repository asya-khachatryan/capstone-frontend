import apiService from '@api/service'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PageableRequest, PageableResponse } from 'services/types'
export interface Interviewer {
  id?: number
  firstName: string
  lastName: string
  email: string
  position: string
}

interface InterviewersState {
  isLoading: boolean
  interviewers?: Interviewer[]
  interviewersPageable?: PageableResponse<Interviewer>
}

const initialState: InterviewersState = {
  isLoading: false,
  interviewers: undefined,
  interviewersPageable: undefined,
}

export const createInterviewer = createAsyncThunk(
  'createInterviewer',
  async (interviewer: Interviewer) => {
    const response = await apiService.createInterviewer(interviewer)
    return response
  },
)

export const getInterviewers = createAsyncThunk(
  'getInterviewers',
  async (request: PageableRequest) => {
    const response = await apiService.getInterviewers(request)
    return response
  },
)

const specializationsSlice = createSlice({
  name: 'interviewers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInterviewers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getInterviewers.fulfilled, (state, action) => {
        state.interviewers = action.payload.content
        state.interviewersPageable = action.payload
      })
      .addCase(getInterviewers.rejected, (state, action) => {})
  },
})

export const specializaionActions = specializationsSlice.actions
export default specializationsSlice.reducer
