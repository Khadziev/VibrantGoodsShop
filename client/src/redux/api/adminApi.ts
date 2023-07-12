import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { DataAttributes, DataAttributesApi } from "../types/types";



export const getData = createAsyncThunk<DataAttributes[], void>(
  'auth/getData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const response = await axios.get<DataAttributesApi[]>('http://localhost:4000/api/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);


export const addData = createAsyncThunk(
  'data/addData',
  async (data: { data: DataAttributes }, { getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const response = await axios.post('http://localhost:4000/api/data', data.data, {
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




export const deleteData = createAsyncThunk(
  'data/deleteData',
  async (id: string, { getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      await axios.delete(`http://localhost:4000/api/data/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      throw new Error('Ошибка при удалении данных');
    }
  }
);


export const updateData = createAsyncThunk(
  'data/updateData',
  async (data: { id: string, newData: DataAttributes }, { getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const response = await axios.put(`http://localhost:4000/api/data/${data.id}`, data.newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Ошибка при обновлении данных');
    }
  }
);

