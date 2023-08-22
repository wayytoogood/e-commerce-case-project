import { ScrollView, Box, Heading, Text, HStack, VStack, Button, useToast } from 'native-base';
import { RootScreenProps } from '../navigation/navigation.types';
import { useStore } from '../store/store';
import { shallow } from 'zustand/shallow';
import { removeFromStorage, setStorage } from '../utils/storage';
import { toastInfo } from '../components/CustomToast';
import { CartItem } from '../store/types';

export const CartScreen: React.FC<RootScreenProps<'CartTab'>> = ({ navigation, route }) => {
  const [cart, setCart] = useStore((state) => [state.cart, state.setCart], shallow);

  const toast = useToast();

  const reArrangeCart = (id: string, operation: 'addition' | 'substraction') => {
    const currItem = cart.find((item) => item.id === id)!;
    let newCart: CartItem[];

    if (operation === 'addition') {
      newCart = cart.map((item) => {
        if (item.id === id) return { ...item, count: item.count + 1 };
        else return item;
      });
    } else {
      if (currItem.count === 1) {
        newCart = cart.filter((item) => item.id !== id);
      } else {
        newCart = cart.map((item) => {
          if (item.id === id) return { ...item, count: item.count - 1 };
          else return item;
        });
      }
    }

    setCart(newCart);
    setStorage('cart', newCart);
  };

  const getTotal = () => {
    let total = 0;
    cart.forEach((item) => (total += parseInt(item.price) * item.count));
    return total;
  };

  const handleComplete = () => {
    setCart([]);
    removeFromStorage('cart');
    toast.show(toastInfo({ title: 'Your purchase successfully completed.' }));
  };

  return (
    <ScrollView>
      <Box flex={1} px="3" pt="7" pb="7">
        <VStack space="4">
          {cart.length > 0 ? (
            cart.map(({ id, name, price, count }) => {
              return (
                <HStack key={id} space="2" justifyContent="space-between" alignItems="center">
                  <VStack space="1" width="47.5%">
                    <Text fontSize="lg">{name}</Text>
                    <Text color="blue.500" fontWeight={500}>
                      {price} ₺
                    </Text>
                  </VStack>
                  <HStack space="1">
                    <Button
                      onPress={() => reArrangeCart(id, 'substraction')}
                      colorScheme="blueGray"
                    >
                      -
                    </Button>
                    <Box
                      width="64px"
                      justifyContent="center"
                      alignItems="center"
                      bgColor="blue.500"
                      borderRadius={3}
                    >
                      <Text color="white" fontSize="xl">
                        {count}
                      </Text>
                    </Box>
                    <Button onPress={() => reArrangeCart(id, 'addition')} colorScheme="blueGray">
                      +
                    </Button>
                  </HStack>
                </HStack>
              );
            })
          ) : (
            <Box width="95%" mx="auto" mt="3" py="2" bgColor="blueGray.200">
              <Text fontSize="xl" fontWeight={600} textAlign="center">
                No Products On Cart!
              </Text>
            </Box>
          )}
        </VStack>
        <HStack justifyContent="space-between" alignItems="center" mt="8">
          <VStack space="1">
            <Text color="blue.500" fontSize={22} fontWeight={500}>
              Total:
            </Text>
            <Text fontSize="xl" fontWeight={600}>
              {getTotal()} ₺
            </Text>
          </VStack>
          <Button onPress={handleComplete} colorScheme="blue">
            Complete
          </Button>
        </HStack>
      </Box>
    </ScrollView>
  );
};
