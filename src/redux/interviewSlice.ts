import apiService from '@api/service'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PageableRequest, PageableResponse } from 'services/types'
import { Interviewer } from './interviewerSlice'
import { Talent } from './talentSlice'

export interface Interview {
  id?: number
  startDate: string
  endDate: string
  interviewType: string
  interviewStatus: string
  interviewFeedback?: InterviewFeedback
  talent: Talent
  interviewers: Interviewer[]
}

export interface InterviewRequestDTO {
  interviewerIds: number[]
  interviewType: string
  talentID: number
}

export interface InterviewFeedback {
  id?: number
  feedback: string
}

interface InterviewsState {
  isLoading: boolean
  interviews?: Interview[]
  interviewsPageable?: PageableResponse<Interview>
}

const initialState: InterviewsState = {
  isLoading: false,
  interviews: undefined,
  interviewsPageable: undefined,
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

const interviewSlice = createSlice({
  name: 'interviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
  },
})

export const interviewActions = interviewSlice.actions
export default interviewSlice.reducer
