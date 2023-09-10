import {
  Box,
  Flex,
  HStack,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

const Navigation: React.FC = () => {
  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Heading as="h3" size="md" color={"#ffffff"}>
              CRYPTO PRICE TRACKER
            </Heading>
          </HStack>
          <Flex alignItems={"center"}></Flex>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </Box>
    </>
  );
};

export default Navigation;
