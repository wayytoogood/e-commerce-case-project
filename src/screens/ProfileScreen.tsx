import { ScrollView, Box, Heading, Text, HStack, Button, VStack, useToast } from 'native-base';
import { RootScreenProps } from '../navigation/navigation.types';
import { useStore } from '../store/store';
import { shallow } from 'zustand/shallow';
import { removeFromStorage } from '../utils/storage';
import { toastInfo } from '../components/CustomToast';

export const ProfileScreen: React.FC<RootScreenProps<'ProfileTab'>> = ({ navigation, route }) => {
  const [setFavorites, setCart] = useStore((state) => [state.setFavorites, state.setCart], shallow);

  const toast = useToast();

  return (
    <ScrollView>
      <Box flex={1} px="3" py="6" mt="50%">
        <Heading fontSize="3xl" textAlign="center" bgColor="blue.100" mb="8">
          Welcome John Doe
        </Heading>
        <VStack width="275" mx="auto" space="4">
          <Button
            onPress={() => {
              setFavorites([]);
              removeFromStorage('favorites');
              toast.show(toastInfo({ title: 'Favorites have been cleared!' }));
            }}
            colorScheme="lightBlue"
          >
            Reset your favorites
          </Button>
          <Button
            onPress={() => {
              setCart([]);
              removeFromStorage('cart');
              toast.show(toastInfo({ title: 'Cart has been cleared!' }));
            }}
            colorScheme="lightBlue"
          >
            Reset your cart
          </Button>
        </VStack>
      </Box>
    </ScrollView>
  );
};
