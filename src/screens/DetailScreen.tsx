import { ScrollView, Box, Heading, Text } from 'native-base';
import { ProductStackScreenProps } from '../navigation/navigation.types';

export const DetailScreen: React.FC<ProductStackScreenProps<'Detail'>> = ({
  navigation,
  route,
}) => {
  return (
    <ScrollView>
      <Box flex={1} px="3" py="6">
        <Heading>Detail Screen</Heading>
      </Box>
    </ScrollView>
  );
};
