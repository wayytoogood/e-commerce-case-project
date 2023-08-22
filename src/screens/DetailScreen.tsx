import { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  ScrollView,
  Box,
  Heading,
  Text,
  Image,
  useToast,
  Icon,
  HStack,
  VStack,
  Button,
} from 'native-base';
import { ProductStackScreenProps } from '../navigation/navigation.types';
import { useStore } from '../store/store';
import { shallow } from 'zustand/shallow';
import { addFavorites } from '../utils/addFavorites';
import { Ionicons } from '@expo/vector-icons';
import { addCart } from '../utils/addCart';

export const DetailScreen: React.FC<ProductStackScreenProps<'Detail'>> = ({
  navigation,
  route,
}) => {
  const [totalProducts, favorites, cart, setFavorites, setCart] = useStore(
    (state) => [
      state.totalProducts,
      state.favorites,
      state.cart,
      state.setFavorites,
      state.setCart,
    ],
    shallow
  );

  const currProduct = totalProducts.find((item) => item.id === route.params.id)!;

  const { id, name, image, description, price } = currProduct;

  useLayoutEffect(() => {
    navigation.setOptions({ title: name });
  });

  const toast = useToast();

  return (
    <ScrollView>
      <Box flex={1} px="3" py="6">
        <Box mb="5">
          <Image width="100%" height="260" source={{ uri: image }} alt={name} />
          <TouchableOpacity
            onPress={() => addFavorites(id, favorites, setFavorites, toast)}
            style={{ position: 'absolute', top: 16, right: 16 }}
          >
            <Icon
              as={<Ionicons name="star" />}
              size={7}
              ml="2"
              color={favorites.includes(id) ? 'amber.400' : 'muted.300'}
            />
          </TouchableOpacity>
        </Box>
        <Box mb="8">
          <Heading mb="3.5">{name}</Heading>
          <Text fontWeight={500}>{description}</Text>
        </Box>
        <HStack justifyContent="space-between" alignItems="center">
          <VStack space="1">
            <Text color="blue.500" fontSize={22} fontWeight={500}>
              Price:
            </Text>
            <Text fontSize="xl" fontWeight={600}>
              {price} ₺
            </Text>
          </VStack>
          <Button onPress={() => addCart(currProduct, cart, setCart, toast)} colorScheme="blue">
            Add to Cart
          </Button>
        </HStack>
      </Box>
    </ScrollView>
  );
};
