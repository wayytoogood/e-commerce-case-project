import { Center, Heading } from 'native-base';

export const PageError = () => {
  return (
    <Center flex={1} justifyContent="center">
      <Heading fontSize="3xl" px="8" textAlign="center">
        Something went wrong! Try to restart to application.
      </Heading>
    </Center>
  );
};
