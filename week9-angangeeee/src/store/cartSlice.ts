import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import cartItems from "../constants/cartItems";
import type { CartItemType } from "../constants/cartItems";

type CartState = {
  cartItems: CartItemType[];
  amount: number;
  total: number;
};

const initialState: CartState = {
  cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase(state, action: PayloadAction<string>) {
      const item = state.cartItems.find(
        (cartItem: CartItemType) => cartItem.id === action.payload,
      );

      if (item) {
        item.amount += 1;
      }
    },

    decrease(state, action: PayloadAction<string>) {
      const item = state.cartItems.find(
        (cartItem: CartItemType) => cartItem.id === action.payload,
      );

      if (!item) return;

      if (item.amount === 1) {
        state.cartItems = state.cartItems.filter(
          (cartItem: CartItemType) => cartItem.id !== action.payload,
        );
      } else {
        item.amount -= 1;
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter(
        (cartItem: CartItemType) => cartItem.id !== action.payload,
      );
    },

    clearCart(state) {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },

    calculateTotals(state) {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((cartItem: CartItemType) => {
        amount += cartItem.amount;
        total += Number(cartItem.price) * cartItem.amount;
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
