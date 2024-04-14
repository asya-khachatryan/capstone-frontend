import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiService from '@api/service'

export interface TalentRequestDTO {
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    specializationId: string,
    status?: string
}

export interface TalentResponseDTO {
    id: number,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    specializationId: string,
    status: string
}

interface TalentState {
    isLoading: boolean,
    talent?: TalentRequestDTO
}

const initialState: TalentState = {
    isLoading: false,
    talent: undefined
};

export const createTalent = createAsyncThunk(
    'createTalentAsync',
    async ({ name, surname, email, phoneNumber, specializationId, status }: any) => {
        const talent: TalentRequestDTO = {
            name, surname, email, phoneNumber, specializationId, status
        }
        const response = await apiService.createTalent(talent);
        return response;
    }
);


const talentsSlice = createSlice({
    name: 'talents',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTalent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTalent.fulfilled, (state, action) => {
                state.talent = action.payload;
            })
            .addCase(createTalent.rejected, (state, action) => {

            });
    },
});

export const talentsActions = talentsSlice.actions;
export default talentsSlice.reducer;