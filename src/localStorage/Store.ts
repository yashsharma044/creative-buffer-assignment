import { createMMKV } from "react-native-mmkv";

export const dataStorage = createMMKV();

export enum STORAGE {
  PRODUCT = "PRODUCT",
}

const zustandMMKVStorage = {
  getItem: (name: string) => {
    const value = dataStorage.getString(name);

    return value ? JSON.parse(value) : null;
  },

  setItem: (name: string, value: any) =>
    dataStorage.set(name, JSON.stringify(value)),

  removeItem: (name: string) => dataStorage.remove(name),
};

export const localStorage = (storeName: STORAGE) => {
  return {
    name: storeName,
    storage: zustandMMKVStorage,
  };
};
