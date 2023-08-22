import { createWithEqualityFn } from 'zustand/traditional';
import { CartItem, Product, SortBy } from './types';
import { filterProducts } from '../utils/handleFilter';

interface InitialState {
  totalProducts: Product[];
  currProducts: Product[];
  currPage: number;
  favorites: string[];
  cart: CartItem[];
  totalBrands: string[];
  selectedBrands: string[];
  totalModels: string[];
  selectedModels: string[];
  sortBy: SortBy;
  setTotalProducts(data: Product[]): void;
  setCurrProducts(data: Product[], alreadyFiltered?: boolean): void;
  setCurrPage(value: number): void;
  setFavorites(value: string[]): void;
  setCart(value: CartItem[]): void;
  setTotalBrands(value: string[]): void;
  setSelectedBrands(value: string[]): void;
  setTotalModels(value: string[]): void;
  setSelectedModels(value: string[]): void;
  setSortBy(value: SortBy): void;
}

export const useStore = createWithEqualityFn<InitialState>(
  (set) => ({
    totalProducts: [],
    currProducts: [],
    currPage: 1,
    favorites: [],
    cart: [],
    totalBrands: [],
    selectedBrands: [],
    totalModels: [],
    selectedModels: [],
    sortBy: 'New to old',
    setTotalProducts: (data) => set({ totalProducts: data }),
    setCurrProducts: (data, alreadyFiltered) =>
      set((state) => ({
        currProducts: alreadyFiltered
          ? data
          : filterProducts(data, state.sortBy, state.selectedBrands, state.selectedModels),
        currPage: 1,
      })),
    setCurrPage: (value) => set({ currPage: value }),
    setFavorites: (value) => set({ favorites: value }),
    setCart: (value) => set({ cart: value }),
    setTotalBrands: (value) => set({ totalBrands: value }),
    setSelectedBrands: (value) => set({ selectedBrands: value }),
    setTotalModels: (value) => set({ totalModels: value }),
    setSelectedModels: (value) => set({ selectedModels: value }),
    setSortBy: (value) => set({ sortBy: value }),
  }),
  Object.is
);
