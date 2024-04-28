import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiService from '@api/service'
import { Specialization } from './specializationSlice';

export interface TalentRequestDTO {
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    specializationId: number,
    status?: string
}

export interface TalentResponseDTO {
    id: number,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    specialization: Specialization,
    status: string
}

interface TalentState {
    isLoading: boolean,
    talents: TalentResponseDTO[],
    interviewees: TalentResponseDTO[]
}

const initialState: TalentState = {
    isLoading: false,
    talents: [],
    interviewees: []
};

export const getTalents = createAsyncThunk(
    'talents',
    async () => {
        const response = await apiService.getTalents();
        return response;
    }
);

export const getInterviewees = createAsyncThunk(
    'interviewees',
    async () => {
        const response = await apiService.getInterviewees();
        return response;
    }
);

export const searchTalents = createAsyncThunk(
    'searchTalents',
    async ({ query }: any) => {
        const response = await apiService.searchTalents(query);
        return response;
    }
);


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
                state.talents = action.payload;
            })
            .addCase(getTalents.rejected, (state, action) => {

            })
            .addCase(getInterviewees.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getInterviewees.fulfilled, (state, action) => {
                state.interviewees = action.payload;
            })
            .addCase(getInterviewees.rejected, (state, action) => {

            });
    },
});

export const talentsActions = talentsSlice.actions;
export default talentsSlice.reducer;