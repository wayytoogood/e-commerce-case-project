import { ScrollView, Box, Heading, Text } from 'native-base';
import { RootScreenProps } from '../navigation/navigation.types';

export const FavoritesScreen: React.FC<RootScreenProps<'FavoritesTab'>> = ({
  navigation,
  route,
}) => {
  return (
    <ScrollView>
      <Box flex={1} px="3" py="6">
        <Heading>Favorites Screen</Heading>
      </Box>
    </ScrollView>
  );
};
