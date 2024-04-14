import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiService from "../api/service"

export interface UserDTO {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    username: string;
    password: string;
}

export interface UserProfileDTO {
    isAnonymous: boolean,
    user: UserDTO
}


export interface Credentials {
    username: string;
    password: string;
}

interface AuthState {
    isLoading: boolean;
    error?: string;
    isAuthenticated: boolean;
    isRegistered: boolean;
    me?: UserDTO
}

//when app starts, when mounting call getUser to know who is the person and isAuthenticated
//async method to get info
//call with useeffect
//call getUser the first time and when isAuthetnticated is true

//add security component that will get the user

const initialState: AuthState = {
    isLoading: false,
    error: "",
    isAuthenticated: false,
    isRegistered: false,
    me: undefined
};

//check in methods status starts with 2

export const login = createAsyncThunk(
    'auth/loginAsync',
    async ({ username, password }: any) => {
        const credentials: Credentials = {
            username, password
        }

        console.log(credentials)
        const response = await apiService.login(credentials);
        return true;
    }
);

export const register = createAsyncThunk(
    'auth/registerAsync',
    async ({ firstName, lastName, email, phoneNumber, username, password }: any) => {
        const userDTO: UserDTO = {
            firstName, lastName, email, phoneNumber, username, password
        }
        console.log(userDTO)
        const response = await apiService.register(userDTO);
        return true;
    }
);

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUserAsync',
    async () => {
        const response = await apiService.getCurrentUser();
        return response;
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isRegistered = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isRegistered = false;
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.me = action.payload.user
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.error = action.error.message
            });
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
