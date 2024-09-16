import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../auth/operations";

export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkApi) => {
        try {
            const {data} = await instance.get('contacts');
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async (contact, thunkApi) => {
        try {
            const {data} = await instance.post('contacts', contact);
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact', 
    async (contactId, thunkApi) => {
        try {
            const {data} = await instance.delete(`/contacts/${contactId}`);
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)

export const updateContact = createAsyncThunk(
    'contacts/updateContact',
    async ({contact, contactId}, thunkApi) => {
        try {
            const {data} = await instance.patch(`/contacts/${contactId}`, contact);
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);