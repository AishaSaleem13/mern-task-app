import { createSlice } from "@reduxjs/toolkit";

 const filterSLICE = createSlice({
    name:"filter",
    initialState:"all",
    reducers:{
        setFilter:(state,action)=>action.payload,
        setdelete:(state,action)=>state.filter(t => t._id !== action.payload),
        

    }

 })
 export const { setFilter,setdelete } = filterSLICE.actions;
 export default filterSLICE