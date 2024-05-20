import apiService from '@api/service'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PageableRequest, PageableResponse } from 'services/types'
import { Interviewer } from './interviewerSlice'
import { Talent } from './talentSlice'

export interface Interview {
  id?: number
  startDate?: string
  endDate?: string
  interviewType: string
  interviewStatus: string
  interviewFeedback?: string
  talent: Talent
  interviewers: Interviewer[]
}

export interface InterviewRequestDTO {
  interviewerIds: number[]
  interviewType: string
  talentID: number
}

interface InterviewsState {
  isLoading: boolean
  interviews?: Interview[]
  interviewsPageable?: PageableResponse<Interview>
  interviewTypes?: string[]
}

const initialState: InterviewsState = {
  isLoading: false,
  interviews: undefined,
  interviewsPageable: undefined,
  interviewTypes: undefined,
}

export const createInterview = createAsyncThunk(
  'createInterview',
  async (interview: InterviewRequestDTO) => {
    const response = await apiService.createInterview(interview)
    return response
  },
)

export const getInterviews = createAsyncThunk(
  'getInterviews',
  async (request: PageableRequest) => {},
)

export const getAllInterviews = createAsyncThunk(
  'getAllInterviews',
  async () => {
    const response = await apiService.getAllInterviewes()
    return response
  },
)

export const getInterviewTypes = createAsyncThunk(
  'getInterviewTypes',
  async () => {
    const response = await apiService.getInterviewTypes()
    return response
  },
)

export const submitFeedback = createAsyncThunk(
  'submitFeedback',
  async ({
    interviewId,
    feedback,
  }: {
    interviewId: number
    feedback: string
  }) => {
    const response = await apiService.submitFeedback(interviewId, feedback)
    return response
  },
)

const interviewSlice = createSlice({
  name: 'interviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllInterviews.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllInterviews.fulfilled, (state, action) => {
        state.interviews = action.payload
      })
      .addCase(getAllInterviews.rejected, (state, action) => {})
      .addCase(getInterviewTypes.fulfilled, (state, action) => {
        state.interviewTypes = action.payload
      })
  },
})

export const interviewActions = interviewSlice.actions
export default interviewSlice.reducer
