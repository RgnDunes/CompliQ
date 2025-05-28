import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useColorModeValue,
  useColorMode,
  Heading,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "neutral.900");
  const resetState = useAppStore((state) => state.resetState);

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      zIndex={999}
      bg={bgColor}
      boxShadow="sm"
      px={4}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box as={RouterLink} to="/" onClick={resetState}>
            <Heading size="md" color="brand.500" letterSpacing="tight">
              CompliQ
            </Heading>
          </Box>
        </HStack>

        <HStack spacing={4}>
          <Button as={RouterLink} to="/simulate" size="sm" variant="ghost">
            Simulate
          </Button>

          <IconButton
            size="sm"
            variant="ghost"
            aria-label={`Switch to ${
              colorMode === "light" ? "dark" : "light"
            } mode`}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default NavBar;
