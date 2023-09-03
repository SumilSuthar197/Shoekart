import { createSlice } from "@reduxjs/toolkit";
import products, { cartProduct } from "../../Data";

const initialState = {
  cartItem: cartProduct,
  amount: 0,
  total: 0,
  discountCoupon:0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItem = [];
    },
    removeItem: (state, action) => {
      const itemID = action.payload;
      state.cartItem = state.cartItem.filter((item) => item.id != itemID);
    },
    addItem: (state, action) => {
      const itemID = action.payload;
      const existingCartItem = state.cartItem.find(
        (item) => item.id === itemID
      );
      if (existingCartItem) {
        existingCartItem.inCart += 1;
      } else {
        const cartIT = products.find((item) => item.id === itemID);
        state.cartItem.push({ ...cartIT, inCart: 1 });
      }
    },
    increase: (state, { payload }) => {
      const cartID = state.cartItem.find((item) => item.id === payload);
      cartID.inCart = cartID.inCart + 1;
    },
    decrease: (state, { payload }) => {
      const cartID = state.cartItem.find((item) => item.id === payload);
      cartID.inCart = cartID.inCart - 1;
    },
    checkCoupon:(state,action)=>{
      var coupon=action.payload;
      console.log(coupon.toUpperCase());
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItem.forEach((item) => {
        amount += item.inCart;
        total += item.inCart * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

// console.log(cartSlice);
export const { removeItem, addItem, increase, decrease, calculateTotals,checkCoupon } =
  cartSlice.actions;

export default cartSlice.reducer;
