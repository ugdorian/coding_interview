import { HStack, Text, VStack } from "@chakra-ui/react";

export default function Hello() {
  return (
    <VStack h="100vh" justifyContent="center">
      <HStack justifyContent="center" spacing={3}>
        <Text>Well Hello There.</Text>
        <Text color="red">General Kenobi.</Text>
      </HStack>
    </VStack>
  );
}
