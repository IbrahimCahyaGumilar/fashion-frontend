import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Fungsi untuk Login
export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
    try {
        const response = await api.post('/login', {
            email: user.email,
            password: user.password
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

// Fungsi untuk Cek Sesi / Ambil Data User (getMe)
export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
    try {
        const response = await api.get('/me');
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

// Fungsi untuk Logout
export const LogOut = createAsyncThunk("user/LogOut", async () => {
    await api.delete('/logout');
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Reducer untuk mereset semua state ke awal
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        // --- LoginUser Cases ---
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.isError = false;
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.user = null;
            state.message = action.payload;
        });

        // --- Get User Login (getMe) Cases ---
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
            state.isError = false; // Reset error saat mulai pengecekan baru
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
            state.isError = false;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.user = null; // SANGAT KRUSIAL: Jika sesi habis/gagal, paksa user jadi null
            state.message = action.payload;
        });

        // --- LogOut Cases ---
        builder.addCase(LogOut.fulfilled, (state) => {
            return initialState; // Kembalikan ke state awal saat logout berhasil
        });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;