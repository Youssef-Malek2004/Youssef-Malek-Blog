import { Box, Flex, IconButton } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ChakraRouterLink } from "./ChakraRouterLink";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { LuBrain } from "react-icons/lu";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const navColor = theme === "dark" ? "white" : "gray.900";
  const navHover = theme === "dark" ? "blue.300" : "blue.500";
  const buttonBg = theme === "dark" ? "gray.800" : "white";
  const buttonColor = theme === "dark" ? "white" : "gray.900";
  const buttonHoverBg = theme === "dark" ? "gray.700" : "gray.100";

  return (
    <Box
      as="nav"
      w="100vw"
      left={0}
      px={8}
      py={4}
      borderBottom="1px solid"
      borderColor={theme === "dark" ? "gray.700" : "gray.100"}
      mb={8}
      bg={theme === "dark" ? "gray.900" : "white"}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
      color={navColor}
      transition="background 0.2s, color 0.2s"
    >
      <Flex align="center" justify="space-between" w="100%">
        <ChakraRouterLink
          as={RouterLink}
          to="/"
          fontWeight="bold"
          fontSize="xl"
          color={navColor}
          _hover={{ textDecoration: "none", color: navHover }}
          mr={8}
          display="flex"
          alignItems="center"
        >
          <Box as="span" mr={2} fontSize="2xl" display="flex" alignItems="center">
            <LuBrain style={{ display: "inline", width: 28, height: 28 }} />
          </Box>
          Found in the Loop
        </ChakraRouterLink>
        <Flex gap={6}>
          <ChakraRouterLink
            as={RouterLink}
            to="/blog"
            color={navColor}
            fontWeight={500}
            _hover={{ color: navHover, textDecoration: "none" }}
          >
            Blog
          </ChakraRouterLink>
          <ChakraRouterLink
            as={RouterLink}
            to="/about"
            color={navColor}
            fontWeight={500}
            _hover={{ color: navHover, textDecoration: "none" }}
          >
            About
          </ChakraRouterLink>
          <ChakraRouterLink
            as={RouterLink}
            to="/roadmap"
            color={navColor}
            fontWeight={500}
            _hover={{ color: navHover, textDecoration: "none" }}
          >
            Roadmap
          </ChakraRouterLink>
          <ChakraRouterLink
            as={RouterLink}
            to="/subscribe"
            color={navColor}
            fontWeight={500}
            _hover={{ color: navHover, textDecoration: "none" }}
          >
            Subscribe
          </ChakraRouterLink>
          <ChakraRouterLink
            as={RouterLink}
            to="/faqs"
            color={navColor}
            fontWeight={500}
            _hover={{ color: navHover, textDecoration: "none" }}
          >
            FAQs
          </ChakraRouterLink>
        </Flex>
        <IconButton
          aria-label="Toggle color mode"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          variant="ghost"
          size="lg"
          ml={4}
          bg={buttonBg}
          color={buttonColor}
          _hover={{ bg: buttonHoverBg }}
          transition="background 0.2s, color 0.2s"
          userSelect="none"
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </IconButton>
      </Flex>
    </Box>
  );
};

export default Navbar;
