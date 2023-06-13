import { HStack, Text, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";


export default function Hello() {


  return (
    <VStack h="100vh" justifyContent="center">
      <HStack justifyContent="center" spacing={3}>
        <Text>Well Hello There.</Text>
        <Text color="red">General Kenobi.</Text>
      </HStack>
      <div>
        <Button as={Link} to="/add_user">Add User</Button>
      </div>
      <div>
        <Button as={Link} to="/posts">Posts</Button>
      </div>
    </VStack>
  );
}