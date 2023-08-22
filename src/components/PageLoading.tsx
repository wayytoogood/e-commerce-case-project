import { Center, Spinner } from 'native-base';
import { colors } from '../configuration/theme';

export const PageLoading = () => (
  <Center flex={1} bg="gray.50">
    <Spinner size="lg" color="#3b82f6" />
  </Center>
);
