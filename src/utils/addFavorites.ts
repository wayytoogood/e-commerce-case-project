import { IToastProps } from 'native-base/lib/typescript/components/composites/Toast';
import { setStorage } from './storage';
import { toastInfo } from '../components/CustomToast';

export const addFavorites = (
  id: string,
  favorites: string[],
  setFavorites: (value: string[]) => void,
  toast: {
    show: (props: IToastProps) => any;
    close: (id: any) => void;
    closeAll: () => void;
    isActive: (id: any) => boolean;
  }
) => {
  let newFavorites = favorites;
  let toastTitle = 'Added to the favorites!';

  if (favorites.includes(id)) {
    newFavorites = favorites.filter((favoriteId) => favoriteId !== id);
    toastTitle = 'Removed from favorites!';
  } else {
    newFavorites = [...favorites, id];
  }

  setFavorites(newFavorites);
  setStorage('favorites', newFavorites);
  toast.show(toastInfo({ title: toastTitle }));
};
