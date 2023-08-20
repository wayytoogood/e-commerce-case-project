import { ScrollView, Box, Heading, Text } from 'native-base';
import { RootScreenProps } from '../navigation/navigation.types';

export const ProfileScreen: React.FC<RootScreenProps<'ProfileTab'>> = ({ navigation, route }) => {
  return (
    <ScrollView>
      <Box flex={1} px="3" py="6">
        <Heading>Profile Screen</Heading>
      </Box>
    </ScrollView>
  );
};
