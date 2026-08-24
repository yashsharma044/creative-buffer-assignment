import { useQuery } from "@tanstack/react-query";
import { PRODUCTS_API_BASE_URL } from "../config/api";
import { Product } from "../types/product";
const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${PRODUCTS_API_BASE_URL}/products`);
  console.log("API Response:", response, PRODUCTS_API_BASE_URL); // Log the response object for debugging
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};
