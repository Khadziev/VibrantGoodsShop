import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearUserData } from "./authSlice";
import { LoginData, UserAttributes, UserUpdateAttributes } from "@/components/Auth/model/model";




export const register = createAsyncThunk(
  'auth/register',
  async (data: UserAttributes) => {
    const response = await axios.post('/api/registration', data);
    return response.data;
  }
);


export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post('/api/login', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
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



export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (userId: string) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ userId, dataToUpdate }: { userId: string, dataToUpdate: UserUpdateAttributes }) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`/api/users/${userId}`, dataToUpdate, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
);



export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (userId: string) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return userId;
  }
);








