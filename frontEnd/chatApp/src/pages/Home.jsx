import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

function Home() {
  return (
    <Box
      bgGradient="linear(to-r, gray.800, gray.900)"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing={4}>
        <ChatIcon boxSize={16} color="teal.300" />
        <Text fontSize="3xl" color="white" fontWeight="bold">
          Chat Application
        </Text>
      </VStack>
    </Box>
  );
}

export default Home;
