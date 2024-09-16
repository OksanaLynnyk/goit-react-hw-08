import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
		name: '',
        number: '',
	};

const filtersSlice = createSlice({
    name: 'filter',
    initialState: INITIAL_STATE,
    reducers: {
        changeFilterName(state, action) {
            state.name = action.payload;
        },
        changeFilterNumber(state, action) {
            state.number = action.payload;
        },
    },
});

export const filterReducer = filtersSlice.reducer;
export const {changeFilterName, changeFilterNumber} = filtersSlice.actions;
