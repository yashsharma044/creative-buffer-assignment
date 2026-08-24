import { localStorage, STORAGE } from "../localStorage/Store";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types/product";

export interface ProductState {
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
          recentlyViewed: state.recentlyViewed.filter(
            (item) => item.id !== productId,
          ),
        })),

      resetProductData: () =>
        set(() => ({
          recentlyViewed: [],
          deletedProductIds: [],
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

export const useProductState = () => {
  const recentlyViewed = useProductStore((state) => state.recentlyViewed);

  const deletedProductIds = useProductStore((state) => state.deletedProductIds);

  const addRecentlyViewed = useProductStore((state) => state.addRecentlyViewed);

  const deleteProduct = useProductStore((state) => state.deleteProduct);


  return {
    recentlyViewed,
    deletedProductIds,
    addRecentlyViewed,
    deleteProduct,
  };
};
