import { ScrollView, Box, Heading, Text } from 'native-base';
import { ProductStackScreenProps } from '../navigation/navigation.types';

export const ListScreen: React.FC<ProductStackScreenProps<'List'>> = ({ navigation, route }) => {
  return (
    <ScrollView>
      <Box flex={1} px="3" py="6">
        <Heading>List Screen</Heading>
      </Box>
    </ScrollView>
  );
};
