import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { register, login, logout } from './authActions';
import { AuthState, DataAttributes, UserRole } from '../types/types';
import { deleteData, getData, updateData } from '../admin/admin';


const initialToken = localStorage.getItem('token');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    token: initialToken || null,
    role: null,
    data: [] as DataAttributes[],
  } as AuthState,

  reducers: {
    clearUserData (state) {
      state.user = null;
    },
    setRole (state, action: PayloadAction<UserRole>) {
      state.role = action.payload;
    },
    setToken (state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    saveToken (state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    addDataSuccess (state, action: PayloadAction<DataAttributes>) {
      state.data.push(action.payload);
    },
    updateDataSuccess (state, action: PayloadAction<DataAttributes>) {
      const updatedData = action.payload;
      const index = state.data.findIndex((item) => item._id === updatedData._id);
      if (index !== -1) {
        state.data[index] = updatedData;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        localStorage.setItem('token', action.payload.token);
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.name = action.payload.name;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
        localStorage.removeItem('token');
        state.token = null;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })

      .addCase(getData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        const id = String(action.payload);
        state.data = state.data.filter((product) => product._id !== id);
      })
      .addCase(updateData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedData = action.payload;
        const index = state.data.findIndex((item) => item._id === updatedData._id);
        if (index !== -1) {
          state.data[index] = updatedData;
        }
      })
      .addCase(updateData.rejected, (state) => {
        state.loading = false;
      });

  },
});

export const { clearUserData, setToken, setRole, updateDataSuccess } = authSlice.actions;
export default authSlice.reducer;


