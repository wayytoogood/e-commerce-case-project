export interface Product {
  createdAt: string;
  name: string;
  image: string;
  price: string;
  description: string;
  model: string;
  brand: string;
  id: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: string;
  count: number;
}

export type SortBy = 'Old to new' | 'New to old' | 'Price hight to low' | 'Price low to heigh';
