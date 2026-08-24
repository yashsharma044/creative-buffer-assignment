import { Product } from "../types/product";
import AsyncStorage from "@react-native-async-storage/async-storage";

type StorageObject = {
  PRODUCT: Product[];
};

export const setLocalData = async <K extends keyof StorageObject>(
  key: K,
  object: Partial<StorageObject[K]>,
): Promise<void> => {
  const data = (await getLocalData(key)) || {};
  const updatedData = { ...data, ...object };

  await AsyncStorage.setItem(key, JSON.stringify(updatedData));
};

export const getLocalData = <K extends keyof StorageObject>(
  key: K,
): Promise<Partial<StorageObject[K]> | undefined> =>
  AsyncStorage.getItem(key).then((data) => {
    if (!data) return undefined;

    return JSON.parse(data) as Partial<StorageObject[K]>;
  });
