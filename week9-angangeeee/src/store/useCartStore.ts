import { create } from "zustand";

import cartItems from "../constants/cartItems";
import type { CartItemType } from "../constants/cartItems";

type CartStoreState = {
  cartItems: CartItemType[];
  amount: number;
  total: number;
  isOpen: boolean;

  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  openModal: () => void;
  closeModal: () => void;
};

export const useCartStore = create<CartStoreState>((set) => ({
  cartItems,
  amount: 0,
  total: 0,
  isOpen: false,

  increase: (id: string) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item,
      ),
    }));
  },

  decrease: (id: string) => {
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item,
        )
        .filter((item) => item.amount > 0),
    }));
  },

  removeItem: (id: string) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }));
  },

  clearCart: () => {
    set({
      cartItems: [],
      amount: 0,
      total: 0,
    });
  },

  calculateTotals: () => {
    set((state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += Number(item.price) * item.amount;
      });

      return {
        amount,
        total,
      };
    });
  },

  openModal: () => {
    set({ isOpen: true });
  },

  closeModal: () => {
    set({ isOpen: false });
  },
}));
