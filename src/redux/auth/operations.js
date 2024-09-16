import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const instance = axios.create({
  baseURL: "https://connections-api.goit.global/",
});


const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`
  };
  
const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = '';
  };

export const register = createAsyncThunk(
    'auth/register',
    async (credentials, thunkApi) => {
      try {
        const {data} = await instance.post("users/signup", credentials);
        setAuthHeader(data.token);
        return data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
);

export const logIn = createAsyncThunk(
    'auth/login',
    async (credentials, thunkApi) => {
      try {
        const {data} = await instance.post('users/login', credentials);
        setAuthHeader(data.token);
        return data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkApi) => {
    try {
      await instance.post('/users/logout');
      clearAuthHeader();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
});

export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkApi) => {
      try {
        const state = thunkApi.getState();
        const token = state.auth.token;
        setAuthHeader(token);

        const {data} = await instance.get('users/current');

        return data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.message);
      }
    },
    {
      condition: (_, thunkApi) => {
        const state = thunkApi.getState();
        const token = state.auth.token;
        if (token) return true;
        return false;
      }
    }
);