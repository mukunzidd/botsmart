import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types";

interface WishlistStore {
  items: string[]; // Array of product IDs
  toggleItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getWishlistItems: () => string[];
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (productId) => {
        set((state) => {
          const isInWishlist = state.items.includes(productId);
          if (isInWishlist) {
            return {
              items: state.items.filter((id) => id !== productId),
            };
          } else {
            return {
              items: [...state.items, productId],
            };
          }
        });
      },

      isInWishlist: (productId) => {
        return get().items.includes(productId);
      },

      getWishlistItems: () => {
        return get().items;
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: "botsmart-wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
