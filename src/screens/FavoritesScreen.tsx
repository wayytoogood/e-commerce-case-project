import { ScrollView, Box, Heading, Text, Image, useToast, VStack, Button, Icon } from 'native-base';
import { RootScreenProps } from '../navigation/navigation.types';
import { TouchableOpacity } from 'react-native';
import { useStore } from '../store/store';
import { shallow } from 'zustand/shallow';
import { addFavorites } from '../utils/addFavorites';
import { addCart } from '../utils/addCart';
import { Ionicons } from '@expo/vector-icons';

export const FavoritesScreen: React.FC<RootScreenProps<'FavoritesTab'>> = ({
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

  const favoriteItems = favorites.map((f) => totalProducts.find((p) => p.id == f)!);

  const toast = useToast();

  return (
    <ScrollView>
      <Box flex={1} px="3" py="6">
        <Box flexDir="row" flexWrap="wrap" mx={-2}>
          {favoriteItems.length ? (
            favoriteItems.map((product) => {
              const { id, name, price, image } = product;

              return (
                <Box key={id} width="50%" px={2} mb="4">
                  <Box bgColor="white" px="2" py="2" shadow="3">
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('ProductTab', { screen: 'Detail', params: { id } })
                      }
                    >
                      <Box mb="4">
                        <Image
                          width="100%"
                          height="150"
                          source={{
                            uri: image,
                          }}
                          alt={name}
                        />
                        <TouchableOpacity
                          onPress={() => addFavorites(id, favorites, setFavorites, toast)}
                          style={{ position: 'absolute', top: 10, right: 10 }}
                        >
                          <Icon
                            as={<Ionicons name="star" />}
                            size={6}
                            ml="2"
                            color={favorites.includes(id) ? 'amber.400' : 'muted.300'}
                          />
                        </TouchableOpacity>
                      </Box>
                      <VStack space="3.5">
                        <Text size="md" color="blue.500" fontWeight={600} height="auto">
                          {price} ₺
                        </Text>
                        <Text size="lg" fontWeight={500} height="auto">
                          {name}
                        </Text>
                        <Button
                          onPress={() => addCart(product, cart, setCart, toast)}
                          colorScheme="blue"
                          mt="1"
                        >
                          Add to Cart
                        </Button>
                      </VStack>
                    </TouchableOpacity>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Box width="95%" mx="auto" mt="3" py="2" bgColor="blueGray.200">
              <Text fontSize="xl" fontWeight={600} textAlign="center">
                No Favorites Found to Display!
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </ScrollView>
  );
};
