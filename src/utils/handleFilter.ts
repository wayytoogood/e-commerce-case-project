import { Product, SortBy } from '../store/types';

export const sortByArray = [
  'New to old',
  'Old to new',
  'Price hight to low',
  'Price low to heigh',
] as const;

export const sortProducts = (products: Product[], currSortBy: SortBy) => {
  let sortedProducts: Product[];

  if (currSortBy === 'New to old') {
    sortedProducts = products.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (currSortBy === 'Price hight to low') {
    sortedProducts = products.sort((a, b) => parseInt(b.price) - parseInt(a.price));
  } else if (currSortBy === 'Price low to heigh') {
    sortedProducts = products.sort((a, b) => parseInt(a.price) - parseInt(b.price));
  } else {
    sortedProducts = products.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  return sortedProducts;
};

export const filterProducts = (
  products: Product[],
  sortBy: SortBy,
  selectedBrands: string[],
  selectedModels: string[]
) => {
  let newProducts = sortProducts(products, sortBy);

  if (selectedBrands.length > 0) {
    newProducts = newProducts.filter((p) => selectedBrands.includes(p.brand));
  }

  if (selectedModels.length > 0) {
    newProducts = newProducts.filter((p) => selectedModels.includes(p.model));
  }

  return newProducts;
};
