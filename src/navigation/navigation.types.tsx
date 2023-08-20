import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

export type ProductStackParamList = {
  List: undefined;
  Detail: { id: string };
};

export type RootParamList = {
  ProductTab: NavigatorScreenParams<ProductStackParamList>;
  CartTab: undefined;
  FavoritesTab: undefined;
  ProfileTab: undefined;
};

export type RootScreenProps<T extends keyof RootParamList> = BottomTabScreenProps<RootParamList, T>;

export type ProductStackScreenProps<T extends keyof ProductStackParamList> = CompositeScreenProps<
  StackScreenProps<ProductStackParamList, T>,
  BottomTabScreenProps<RootParamList>
>;
