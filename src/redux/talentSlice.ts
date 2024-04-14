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