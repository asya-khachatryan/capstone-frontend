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

export const updateInterviewer = createAsyncThunk(
  'updateInterviewer',
  async ({ id, interviewer }: { id: number; interviewer: Interviewer }) => {
    const response = await apiService.updateInterviewer(id, interviewer)
    return response
  },
)

export const deleteInterviewer = createAsyncThunk(
  'deleteInterviewer',
  async (id: number) => {
    const response = await apiService.deleteInterviewer(id)
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

const interviewerSlice = createSlice({
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

export const interviewerActions = interviewerSlice.actions
export default interviewerSlice.reducer
