import { Alert, Box, HStack, IToastProps, Text, VStack } from 'native-base';

type Status = 'success' | 'error';

type ToastInfoProps = IToastProps & { status?: Status };

interface CustomToastProps {
  status: Status;
  title: string;
  description?: string;
}

export const CustomToast: React.FC<CustomToastProps> = ({ status, title, description }) => {
  return (
    <Alert w="100%" maxW={300} status={status} zIndex={100}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={3} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800" mr={7}>
              {title}
            </Text>
          </HStack>
        </HStack>
        {description && (
          <Box
            pl="6"
            _dark={{
              _text: {
                color: 'coolGray.600',
              },
            }}
          >
            {description}
          </Box>
        )}
      </VStack>
    </Alert>
  );
};

export const toastInfo = (props: ToastInfoProps) => {
  const { status, title } = props;

  return {
    render: () => <CustomToast status={status || 'success'} title={title as string} />,
    duration: 2500,
  };
};
