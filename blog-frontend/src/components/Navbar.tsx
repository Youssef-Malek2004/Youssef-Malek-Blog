import { Box, Flex, IconButton } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ChakraRouterLink } from "./ChakraRouterLink";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import FoundInLoopIcon from "./ui/FoundInLoopIcon";
import { useHoverMulti } from "../hooks/UseHover";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const navColor = theme === "dark" ? "white" : "gray.900";
  const navHover = theme === "dark" ? "blue.300" : "blue.500";
  const buttonBg = theme === "dark" ? "gray.800" : "white";
  const buttonColor = theme === "dark" ? "white" : "gray.900";
  const buttonHoverBg = theme === "dark" ? "gray.700" : "gray.100";
  const [hoverRefs, isHovered] = useHoverMulti();

  const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => {
    return (
      <Box position="relative" display="inline-block" role="group">
        <ChakraRouterLink as={RouterLink} to={to} fontWeight={500} color={navColor} textDecoration="none" _hover={{ color: navHover }}>
          {children}
        </ChakraRouterLink>
        <Box
          position="absolute"
          bottom={-1}
          left={0}
          height="2px"
          width="0%"
          bg={navHover}
          transition="width 0.3s ease-in-out"
          _groupHover={{ width: "100%" }}
        />
      </Box>
    );
  };

  return (
    <Box
      as="nav"
      w="100vw"
      maxHeight="5vw"
      px={4}
      py={2}
      mb={0}
      position="sticky"
      top={0}
      zIndex={10}
      color={navColor}
      bg={theme === "dark" ? "rgba(26, 32, 44, 0.0)" : "rgba(255, 255, 255, 0.0)"}
      backdropFilter="blur(10px)"
      transition="background 0.2s, color 0.2s"
      boxShadow="none"
      border="none"
      className="noselect"
    >
      <Flex align="center" justify="space-between" w="100%">
        {/* Logo & Title */}
        <ChakraRouterLink
          as={RouterLink}
          to="/"
          fontWeight="bold"
          fontSize="xl"
          color={navColor}
          textDecoration="none"
          mr={8}
          display="flex"
          alignItems="center"
        >
          <Box
            as="span"
            ref={hoverRefs[0]}
            mr={2}
            fontSize="2xl"
            display="flex"
            alignItems="center"
            color={navColor}
            transition="transform 0.6s ease"
            transform={isHovered ? "rotate(360deg)" : "none"}
            cursor="pointer"
          >
            <FoundInLoopIcon width={50} height={50} />
          </Box>

          <Box ref={hoverRefs[1]} cursor="pointer">
            Found in the Loop
          </Box>
        </ChakraRouterLink>

        {/* Navigation Links */}
        <Flex gap={6}>
          <NavItem to="/blog">Blog</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/roadmap">Roadmap</NavItem>
          <NavItem to="/subscribe">Subscribe</NavItem>
          <NavItem to="/faqs">FAQs</NavItem>
        </Flex>

        {/* Theme Toggle */}
        <IconButton
          aria-label="Toggle color mode"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          variant="ghost"
          size="lg"
          ml={4}
          bg={buttonBg}
          color={buttonColor}
          _hover={{ bg: buttonHoverBg }}
          _focus={{ outline: "none", boxShadow: "none" }}
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
