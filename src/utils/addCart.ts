import { IToastProps } from 'native-base/lib/typescript/components/composites/Toast';
import { setStorage } from './storage';
import { toastInfo } from '../components/CustomToast';
import { CartItem, Product } from '../store/types';

export const addCart = (
  product: Product,
  cart: CartItem[],
  setCart: (value: CartItem[]) => void,
  toast: {
    show: (props: IToastProps) => any;
    close: (id: any) => void;
    closeAll: () => void;
    isActive: (id: any) => boolean;
  }
) => {
  let newCart = cart;

  const { id, name, price } = product;

  if (cart.find((item) => item.id === id)) {
    newCart = cart.map((item) => {
      if (item.id === id) return { ...item, count: item.count + 1 };
      else return item;
    });
  } else {
    newCart = [...cart, { id, name, price, count: 1 }];
  }

  setCart(newCart);
  setStorage('cart', newCart);
  toast.show(toastInfo({ title: 'Added to the cart!' }));
};
