import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage } from "zustand/middleware";

export enum STORAGE {
  PRODUCT = "PRODUCT",
}

export const localStorage = (storeName: STORAGE) => {
  return {
    name: storeName,
    storage: createJSONStorage(() => AsyncStorage),
  };
};
