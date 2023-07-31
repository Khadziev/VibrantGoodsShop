import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { register, login, logout, loadUser, deleteUser, updateUser } from './authActions';
import { AuthState, DataAttributesApi, UserRole } from '../model/types';


const initialToken = localStorage.getItem('token');
const initialUserId = localStorage.getItem('userId')
const initialUser = JSON.parse(localStorage.getItem('user') || 'null');


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    loading: false,
    error: null,
    token: initialToken || null,
    role: null,
    data: [] as DataAttributesApi[],
    userId: initialUserId || null,
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
    addDataSuccess (state, action: PayloadAction<DataAttributesApi>) {
      state.data.push(action.payload);
    },
    updateDataSuccess (state, action: PayloadAction<DataAttributesApi>) {
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
      .addCase(register.fulfilled, (state) => {
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
        state.userId = action.payload.userId;
        //localStorage.setItem('userId', action.payload.userId);
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
        state.userId = null;
        localStorage.removeItem('user');
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })

      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));

      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));

      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
        state.token = null;
        state.userId = null;
        // удалить данные пользователя из localStorage
        localStorage.removeItem('user');
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

  },
});

export const { clearUserData, setToken, setRole, updateDataSuccess } = authSlice.actions;
export default authSlice.reducer;

