import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiService from '@api/service'

export interface Specialization {
    id: number,
    specialization: string
}

interface SpecializationsState {
    isLoading: boolean,
    specializations: Specialization[]
}

const initialState: SpecializationsState = {
    isLoading: false,
    specializations: []
};

export const callSpecializations = createAsyncThunk(
    'specializations',
    async () => {
        const response = await apiService.getSpecializations();
        return response;
    }
);


const specializationsSlice = createSlice({
    name: 'specializations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(callSpecializations.pending, (state) => {
                state.isLoading = true
            })
            .addCase(callSpecializations.fulfilled, (state, action) => {
                state.specializations = action.payload;
            })
            .addCase(callSpecializations.rejected, (state, action) => {

            });
    },
});

export const specializaionActions = specializationsSlice.actions;
export default specializationsSlice.reducer;