import { createSlice } from "@reduxjs/toolkit";

export const UpdateSlice =createSlice({
    name:"update",
    initialState:null,
    reducers:{
        updateTask:(state,action)=>{
            return action.payload
        },
        clearupdate:()=>null
      
    }
})
export const {updateTask,clearupdate}=UpdateSlice.actions
export default UpdateSlice