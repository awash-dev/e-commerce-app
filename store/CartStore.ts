import { create } from "zustand";

const UseCart = create((set) => ({
  items: [],

  // Add a product to the cart
  addProduct: (product) =>
    set((state) => ({
      items: [...state.items, { product, quantity: 1 }],
    })),

  // Reset the cart
  resetCart: () => set({ items: [] }),

  // Update the quantity of a specific product
  updateQuantity: (productId, newQuantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(0, newQuantity) } // Ensure quantity is at least 1
          : item
      ),
    })),
}));

export default UseCart;
