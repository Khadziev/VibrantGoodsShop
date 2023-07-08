import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';


export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserAttributes {
  name: string;
  login: string;
  password: string;
  role: UserRole; 
}

export interface LoginData {
  login: string;
  password: string;
  role: UserRole
}

interface AuthState {
  user: UserAttributes | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  role: UserRole | null;
  name: string; 
}



const initialToken = localStorage.getItem('token');


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    token: initialToken || null,
    role: null, 
  } as AuthState,
  
  reducers: {
    clearUserData(state) {
      state.user = null;
    },
    setRole(state, action: PayloadAction<UserRole>) {
      state.role = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    saveToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
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
      });
  },
});

export const { clearUserData, setToken, setRole } = authSlice.actions;
export default authSlice.reducer;



export const register = createAsyncThunk(
  'auth/register',
  async (data: UserAttributes) => {
    const response = await axios.post('http://localhost:4000/api/registration', data);
    return response.data;
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginData) => {
    const response = await axios.post('http://localhost:4000/api/login', data);
    return response.data;
  }
);


export const addData = createAsyncThunk(
  'data/addData',
  async (data: { title: string }, { getState }) => {
    try {
      const token = (getState() as RootState).auth.token; 
      const response = await axios.post('http://localhost:4000/api/data', data, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Ошибка при добавлении данных');
    }
  }
);


export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      localStorage.removeItem('token');
      dispatch(clearUserData());
      return null;
    } catch (error) {
      throw new Error('Ошибка при разлогинивании');
    }
  }
);