import { create } from "zustand";

const UseCart = create((set) => ({
  items: [],
  addProduct: (product: any) =>
    set((state) => ({
      items: [...state.items, { product, quantity: 1 }],
    })),
  resetCart: () => set({ items: [] }),
}));

export default UseCart;
