import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../store/types';

type Key = 'cart' | 'favorites';

export const getStorage = async <T>(key: Key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
  } catch (err) {
    console.log(err);
    throw new Error(`There is no value with specified key of ${key}`);
  }
};

export const setStorage = async (key: Key, value: string[] | CartItem[]) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
};

export const removeFromStorage = async (key: Key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.log(err);
  }
};
