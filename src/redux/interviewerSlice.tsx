import { createSlice } from '@reduxjs/toolkit'

export interface Interviewer {
  id: number
  name: string
}

interface InterviewersState {
  isLoading: boolean
  interviewers?: Interviewer[]
}

const initialState: InterviewersState = {
  isLoading: false,
  interviewers: undefined,
}

const specializationsSlice = createSlice({
  name: 'specializations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export const specializaionActions = specializationsSlice.actions
export default specializationsSlice.reducer
