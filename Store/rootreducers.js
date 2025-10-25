import { combineReducers } from 'redux'
import UpdateSlice from './update'
const RootReducers =combineReducers({
  updateTask:UpdateSlice.reducer
  })
export default RootReducers