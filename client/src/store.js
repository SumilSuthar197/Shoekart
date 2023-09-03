import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartslice';
export const store = configureStore({
  reducer: {
    cart:cartReducer,
  },
});
