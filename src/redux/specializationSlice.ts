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

export const getSpecializations = createAsyncThunk(
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
            .addCase(getSpecializations.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSpecializations.fulfilled, (state, action) => {
                state.specializations = action.payload;
            })
            .addCase(getSpecializations.rejected, (state, action) => {

            });
    },
});

export const specializaionActions = specializationsSlice.actions;
export default specializationsSlice.reducer;