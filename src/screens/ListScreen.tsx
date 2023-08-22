import { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  Box,
  Text,
  Input,
  HStack,
  VStack,
  Button,
  Image,
  Icon,
  useToast,
  Center,
  Spinner,
} from 'native-base';
import { NativeScrollEvent, NativeSyntheticEvent, TouchableOpacity } from 'react-native';
import { ProductStackScreenProps } from '../navigation/navigation.types';
import axios from 'axios';
import { shallow } from 'zustand/shallow';
import { CartItem, Product } from '../store/types';
import { CONFIG } from '../configuration/config';
import { PageError } from '../components/PageError';
import { PageLoading } from '../components/PageLoading';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/store';
import { getStorage } from '../utils/storage';
import { addFavorites } from '../utils/addFavorites';
import { addCart } from '../utils/addCart';
import { FilterModal } from '../components/FilterModal';

export const ListScreen: React.FC<ProductStackScreenProps<'List'>> = ({ navigation, route }) => {
  const [fetchState, setFetchState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [fetchMore, setFetchMore] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [
    totalProducts,
    currProducts,
    currPage,
    favorites,
    cart,
    setTotalProducts,
    setCurrProducts,
    setCurrPage,
    setFavorites,
    setCart,
    setTotalBrands,
    setTotalModels,
  ] = useStore(
    (state) => [
      state.totalProducts,
      state.currProducts,
      state.currPage,
      state.favorites,
      state.cart,
      state.setTotalProducts,
      state.setCurrProducts,
      state.setCurrPage,
      state.setFavorites,
      state.setCart,
      state.setTotalBrands,
      state.setTotalModels,
    ],
    shallow
  );

  const toast = useToast();

  const fetchProducts = useCallback(async () => {
    try {
      setFetchState('loading');

      const data = (await axios(CONFIG.ROOT_URL)).data as Product[];

      const storedCart = await getStorage<CartItem[]>('cart');
      const storedFavorites = await getStorage<string[]>('favorites');

      const brands = [...new Set(data.map((item) => item.brand))];
      const models = [...new Set(data.map((item) => item.model))];

      setCurrProducts(data);
      setTotalProducts(data);
      setTotalBrands(brands);
      setTotalModels(models);
      if (storedCart && storedCart.length) setCart(storedCart);
      if (storedFavorites && storedFavorites.length) setFavorites(storedFavorites);
      setFetchState('idle');
    } catch (error) {
      setFetchState('error');
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const paddingBottom = 20;

    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;

    const scrolledArea = layoutMeasurement.height + contentOffset.y;
    const contentArea = contentSize.height - paddingBottom;

    const totalPage = Math.ceil(currProducts.length / CONFIG.PER_PAGE);
    const isThereEnough = currProducts.length > CONFIG.PER_PAGE && currPage < totalPage;

    if (scrolledArea >= contentArea && isThereEnough) {
      setFetchMore(true);

      setTimeout(() => {
        setCurrPage(currPage + 1);
        setFetchMore(false);
      }, 500);
    }
  };

  const handleChangeText = (text: string) => {
    const newProducts = totalProducts.filter((p) => {
      return p.name.toLowerCase().includes(text.toLowerCase());
    });

    setSearchText(text);
    setCurrProducts(newProducts);
  };

  if (fetchState === 'error' && !totalProducts) {
    return <PageError />;
  }

  if (fetchState === 'loading' && currProducts) {
    return <PageLoading />;
  }

  return (
    <Box flex={1}>
      <FilterModal isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />
      <ScrollView bg="white" onMomentumScrollEnd={handleScroll}>
        <Box flex={1} px="3" py="6">
          {/* Search */}
          <Box px="1" py="1" bgColor="blueGray.100" mb="5">
            <Input
              value={searchText}
              onChangeText={handleChangeText}
              fontSize="lg"
              InputLeftElement={
                <Icon as={<Ionicons name="search" />} size={5} ml="2" color="muted.400" />
              }
              placeholder="Search"
              placeholderTextColor="#888"
              variant="unstyled"
              autoCapitalize="none"
            />
          </Box>
          {/* Filters */}
          <HStack justifyContent="space-between" alignItems="center" mb="5">
            <Text fontSize="xl" fontWeight={500}>
              Filters
            </Text>
            <Button
              onPress={() => {
                setIsFilterOpen(true);
                setSearchText('');
                setCurrProducts(totalProducts);
              }}
              size="md"
              colorScheme="lightBlue"
            >
              Select Filter
            </Button>
          </HStack>
          {/* Products */}
          <Box flexDir="row" flexWrap="wrap" mx={-2}>
            {currProducts.length ? (
              currProducts.slice(0, currPage * CONFIG.PER_PAGE).map((product) => {
                const { id, name, price, image, createdAt } = product;

                return (
                  <Box key={id} width="50%" px={2} mb="4">
                    <Box bgColor="white" px="2" py="2" shadow="3">
                      <TouchableOpacity onPress={() => navigation.navigate('Detail', { id })}>
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
                  No Products Found to Display!
                </Text>
              </Box>
            )}
          </Box>
          {fetchMore && (
            <Center h="12">
              <Spinner size="lg" color="#3b82f6" />
            </Center>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
};
