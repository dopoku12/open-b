import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type Props = {};

const NotFound = (props: Props) => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="2xl" mt={6} mb={2}>
        404: Not Found
      </Heading>
      <Text color="gray.500" mb={6}>
        The page you are looking for does not exist. It might have been moved or deleted.
      </Text>
      <Link to="/">
        <Button colorScheme="teal" size="lg">
          Go to Home
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;
