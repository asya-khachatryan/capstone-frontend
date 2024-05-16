import apiService from '@api/service'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PageableRequest, PageableResponse } from 'services/types'
import { Specialization } from './specializationSlice'

export interface TalentCreationRequest {
  name: string
  surname: string
  email: string
  phoneNumber: string
  specializationId: number
  status?: string
}

export interface Talent {
  id: number
  name: string
  surname: string
  email: string
  phoneNumber: string
  specialization: Specialization
  status: string
  dateApplied: string
}

export const talentStatusMap = new Map<string, string>([
  ['APPLIED', 'Applied'],
  ['INTERVIEW_PREPARATION', 'Interview Preparation'],
  ['STAGE1_INTERVIEW', 'Stage 1 Interview'],
  ['STAGE2_INTERVIEW', 'Stage 2 Interview'],
  ['POSITION_OFFERED', 'Position Offered'],
  ['REJECTED', 'Rejected'],
  ['HIRED', 'Hired'],
])

interface TalentState {
  isLoading: boolean
  talents?: Talent[]
  talentsPageable?: PageableResponse<Talent>
  interviewees?: Talent[]
}

const initialState: TalentState = {
  isLoading: false,
  talents: undefined,
  talentsPageable: undefined,
  interviewees: undefined,
}

export const submitApplication = createAsyncThunk(
  'submitApplication',
  async ({
    talent,
    file,
  }: {
    talent: TalentCreationRequest
    file: FormData
  }) => {
    const response = await apiService
      .createTalent(talent)
      .then((talent) => apiService.uploadCV(talent.id, file))
    return true
  },
)

export const getTalents = createAsyncThunk('talents', async () => {
  const response = await apiService.getTalents()
  return response
})

export const getTalentsPageable = createAsyncThunk(
  'talentsPageable',
  async (request: PageableRequest, thunkApi) => {
    const response = await apiService.getTalentsPageable(request)
    // response.nextPage = (pageidx: number) => thunkApi.dispatch(getTalentsPageable(Object.assign({}, request, { page: pageidx })))
    return response
  },
)

export const getInterviewees = createAsyncThunk('interviewees', async () => {
  const response = await apiService.getInterviewees()
  return response
})

export const searchTalents = createAsyncThunk(
  'searchTalents',
  async (query: string) => {
    const response = await apiService.searchTalents(query, 'Application')
    return response
  },
)

export const searchInterviewees = createAsyncThunk(
  'searchInterviewees',
  async (query: string) => {
    const response = await apiService.searchTalents(query, 'Interview')
    return response
  },
)

export const getTalentCV = createAsyncThunk(
  'getTalentCV',
  async (id: number) => {
    const response = await apiService.getCV(id)
    return response
  },
)

export const updateTalentStatus = createAsyncThunk(
  'updateTalentStatus',
  async ({ id, request }: { id: number; request: TalentCreationRequest }) => {
    const response = await apiService.updateTalentStatus(id, request)
    return response
  },
)

const talentsSlice = createSlice({
  name: 'talents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTalents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTalents.fulfilled, (state, action) => {
        state.talents = action.payload
      })
      .addCase(getTalents.rejected, (state, action) => {})
      .addCase(getTalentsPageable.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTalentsPageable.fulfilled, (state, action) => {
        state.talents = action.payload.content
        state.talentsPageable = action.payload
      })
      .addCase(getTalentsPageable.rejected, (state, action) => {})
      .addCase(getInterviewees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getInterviewees.fulfilled, (state, action) => {
        state.interviewees = action.payload
      })
      .addCase(getInterviewees.rejected, (state, action) => {})
      .addCase(searchTalents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchTalents.fulfilled, (state, action) => {
        state.talents = action.payload
      })
      .addCase(searchTalents.rejected, (state, action) => {})
      .addCase(searchInterviewees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchInterviewees.fulfilled, (state, action) => {
        state.interviewees = action.payload
      })
      .addCase(searchInterviewees.rejected, (state, action) => {})
  },
})

export const talentsActions = talentsSlice.actions
export default talentsSlice.reducer
