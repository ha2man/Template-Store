import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from "./slices/category";

const reducer = {
  category: categoryReducer,
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
