import { Ionicons } from '@expo/vector-icons';
import { Box, Icon, Text } from 'native-base';
import { getTabBarIcon } from '../navigation/utils';
import { useStore } from '../store/store';

interface NavigationCartProps {
  size: number;
  color: string;
}

export const NavigationCart: React.FC<NavigationCartProps> = ({ size, color }) => {
  const cart = useStore((state) => state.cart);

  const total = cart.reduce((acc, curr) => {
    acc += curr.count;
    return acc;
  }, 0);

  return (
    <Box>
      <Icon as={Ionicons} name={getTabBarIcon('CartTab')} size={size} color={color} />
      <Box
        position="absolute"
        width="18px"
        height="18px"
        borderRadius="full"
        top="-3"
        right="-10"
        bgColor="red.500"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="sm" color="white">
          {total}
        </Text>
      </Box>
    </Box>
  );
};
