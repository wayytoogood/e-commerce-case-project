import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Box, Icon, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { ProductStackParamList, RootParamList } from './navigation.types';
import { getTabBarIcon, headerOptions } from './utils';
import { COLORS } from '../configuration/theme';
import { ListScreen } from '../screens/ListScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { CartScreen } from '../screens/CartScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { NavigationCart } from '../components/NavigationCart';

const ProductStack = createStackNavigator<ProductStackParamList>();

export const ProductStackNavigator = () => {
  const { Navigator, Screen } = ProductStack;

  return (
    <Navigator
      screenOptions={{
        ...headerOptions,
      }}
    >
      <Screen name="List" component={ListScreen} options={{ title: 'E-Market' }} />
      <Screen name="Detail" component={DetailScreen} />
    </Navigator>
  );
};

const RootTab = createBottomTabNavigator<RootParamList>();

export const RootNavigator = () => {
  const { Navigator, Screen } = RootTab;

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="ProductTab"
        screenOptions={({ route }) => ({
          ...headerOptions,
          tabBarActiveTintColor: COLORS.blue[500],
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'CartTab') {
              return <NavigationCart color={color} size={size} />;
            }

            return (
              <Icon as={Ionicons} name={getTabBarIcon(route.name)} size={size} color={color} />
            );
          },
        })}
      >
        <Screen
          name="ProductTab"
          component={ProductStackNavigator}
          options={{ headerShown: false }}
        />
        <Screen name="CartTab" component={CartScreen} options={{ title: 'Your Cart' }} />
        <Screen name="FavoritesTab" component={FavoritesScreen} options={{ title: 'Favorites' }} />
        <Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Profile' }} />
      </Navigator>
    </NavigationContainer>
  );
};
