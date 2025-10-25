 import { configureStore } from "@reduxjs/toolkit";
 import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import RootReducers from "./rootreducers";

   
const persistConfig = {
    key: 'root',
  storage,
 }
 const persistedReducer = persistReducer(persistConfig,RootReducers)
  const store = configureStore({
   reducer:persistedReducer
  })
   let persistor = persistStore(store)
   export {store,persistor}