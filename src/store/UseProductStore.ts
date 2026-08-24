import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/product";
import { localStorage, STORAGE } from "../localStorage/Store";

interface ProductState {
  recentlyViewed: Product[];
  deletedProductIds: number[];

  addRecentlyViewed: (product: Product) => void;
  deleteProduct: (productId: number) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      recentlyViewed: [],
      deletedProductIds: [],

      addRecentlyViewed: (product: Product) =>
        set((state) => {
          const filteredProducts = state.recentlyViewed.filter(
            (item) => item.id !== product.id,
          );

          return {
            recentlyViewed: [product, ...filteredProducts].slice(0, 5),
          };
        }),

      deleteProduct: (productId: number) =>
        set((state) => ({
          deletedProductIds: [...state.deletedProductIds, productId],
        })),
    }),
    {
      ...localStorage(STORAGE.PRODUCT),

      partialize: (state) => ({
        recentlyViewed: state.recentlyViewed,
      }),
    },
  ),
);
