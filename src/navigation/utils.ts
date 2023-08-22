import { COLORS } from '../configuration/theme';
import { RootParamList } from './navigation.types';

export const headerOptions = {
  headerStyle: { backgroundColor: COLORS.blue[500] },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 22,
  },
  headerStatusBarHeight: 0,
};

export const getTabBarIcon = (routeName: keyof RootParamList) => {
  switch (routeName) {
    case 'ProductTab':
      return 'home-outline';
    case 'CartTab':
      return 'basket-outline';
    case 'FavoritesTab':
      return 'star-outline';
    case 'ProfileTab':
      return 'person-outline';
    default:
      return 'home-outline';
  }
};
