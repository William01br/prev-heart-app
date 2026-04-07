import AsyncStorage from "@react-native-async-storage/async-storage";

import { USER_KEY } from "@/infra/storage/storageKeys";

export const getStoredUser = async () => {
  return AsyncStorage.getItem(USER_KEY);
};

export const setStoredUser = async (value: string) => {
  return AsyncStorage.setItem(USER_KEY, value);
};

export const removeStoredUser = async () => {
  return AsyncStorage.removeItem(USER_KEY);
};
