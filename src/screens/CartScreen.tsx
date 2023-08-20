import { ScrollView, Box, Heading, Text } from 'native-base';
import { RootScreenProps } from '../navigation/navigation.types';

export const CartScreen: React.FC<RootScreenProps<'CartTab'>> = ({ navigation, route }) => {
  return (
    <ScrollView>
      <Box flex={1} px="3" py="6">
        <Heading>Cart Screen</Heading>
      </Box>
    </ScrollView>
  );
};
