// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { LoginData, UserAttributes, clearUserData } from './authSlice';


// export const register = createAsyncThunk(
//   'auth/register',
//   async (data: UserAttributes) => {
//     const response = await axios.post('http://localhost:4000/api/registration', data);
//     return response.data;
//   }
// );

// export const login = createAsyncThunk(
//   'auth/login',
//   async (data: LoginData) => {
//     const response = await axios.post('http://localhost:4000/api/login', data);
//     return response.data;
//   }
// );

// export const addData = createAsyncThunk(
//   'data/addData',
//   async (data: { title: string }) => {
//     try {
//       const response = await axios.post('http://localhost:4000/api/data', data);
//       return response.data;
//     } catch (error) {
//       throw new Error('Ошибка при добавлении данных');
//     }
//   }
// );

// export const logout = createAsyncThunk(
//   'auth/logout',
//   async (_, { dispatch }) => {
//     try {
//       localStorage.removeItem('token');
//       dispatch(clearUserData());
//       return null;
//     } catch (error) {
//       throw new Error('Ошибка при разлогинивании');
//     }
//   }
// );