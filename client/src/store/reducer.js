import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories:[],
    transaction:[]
}

export const expensSlice = createSlice({
    name: 'expense',
    initialState,
    reducers:{
        getTransactions:(state) => {

        }
    }
})

export const {getTransactions} = expensSlice.actions;
export default expensSlice.reducer;