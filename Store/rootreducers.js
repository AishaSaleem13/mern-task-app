import { combineReducers } from 'redux'
import UpdateSlice from './update'
import filterSLICE from './filter'
const RootReducers =combineReducers({
  updateTask:UpdateSlice.reducer,
  filter:filterSLICE.reducer
  })
export default RootReducers