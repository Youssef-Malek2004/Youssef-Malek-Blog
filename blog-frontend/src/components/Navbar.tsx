import { Box, Flex, IconButton } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ChakraRouterLink } from "./ChakraRouterLink";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import FoundInLoopIcon from "./ui/FoundInLoopIcon";
import { useHoverMulti } from "../hooks/UseHover";
import { useLocation } from "react-router-dom";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerPositioner,
  DrawerTitle,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";

const Navbar = ({ onSubscribeClick, isSubscribeOpen = false }: { onSubscribeClick?: () => void; isSubscribeOpen?: boolean }) => {
  const { theme, setTheme } = useTheme();
  const navColor = theme === "dark" ? "white" : "gray.900";
  const navHover = theme === "dark" ? "blue.300" : "blue.500";
  const buttonBg = theme === "dark" ? "gray.800" : "white";
  const buttonColor = theme === "dark" ? "white" : "gray.900";
  const buttonHoverBg = theme === "dark" ? "gray.700" : "gray.100";
  const [hoverRefs, isHovered] = useHoverMulti();

  const NavItem = ({
    to,
    children,
    onClick,
  }: {
    to: string;
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<unknown>) => void;
  }) => {
    const location = useLocation();
    const isPathActive = location.pathname === to;
    const isSubscribe = to === "#";
    const isActive = isSubscribe ? isSubscribeOpen : isPathActive && !isSubscribeOpen;

    return (
      <Box position="relative" display="inline-block" role="group">
        <ChakraRouterLink
          as={RouterLink}
          to={to}
          onClick={onClick}
          fontWeight={isActive ? "bold" : 500}
          color={isActive ? navHover : navColor}
          textDecoration={isActive ? "none" : "none"}
          _hover={{ color: navHover }}
        >
          {children}
        </ChakraRouterLink>
        <Box
          position="absolute"
          bottom={-1}
          left={0}
          height="2px"
          width={isActive ? "100%" : "0%"}
          bg={navHover}
          transition="width 0.3s ease-in-out"
          _groupHover={{ width: "100%" }}
        />
      </Box>
    );
  };

  const isMobile = useBreakpointValue({ base: true, md: false });
  const [open, setOpen] = useState(false);

  return (
    <Box
      as="nav"
      w="100vw"
      maxHeight="20vw"
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
      {isMobile && (
        <>
          <Drawer.Root open={open} onOpenChange={({ open }) => setOpen(open)} size="sm">
            {/* Sticky mobile navbar header */}
            <Box
              w="100%"
              px={4}
              py={2}
              position="sticky"
              top={0}
              zIndex={11}
              backdropFilter="blur(10px)"
              bg={theme === "dark" ? "rgba(26, 32, 44, 0.0)" : "rgba(255, 255, 255, 0.0)"}
              transition="background 0.2s, color 0.2s"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* Left: Menu Button */}
              <Drawer.Trigger asChild>
                <IconButton
                  aria-label="Open menu"
                  variant="ghost"
                  size="lg"
                  bg={buttonBg}
                  color={buttonColor}
                  _hover={{ bg: buttonHoverBg }}
                >
                  <FaBars />
                </IconButton>
              </Drawer.Trigger>

              {/* Right: Logo */}
              <Flex align="center" gap={2}>
                <Box
                  as="span"
                  ref={hoverRefs[0]}
                  fontSize="2xl"
                  display="flex"
                  alignItems="center"
                  color={navColor}
                  transition="transform 0.6s ease"
                  cursor="pointer"
                >
                  <FoundInLoopIcon width={50} height={50} />
                </Box>
                <Box ref={hoverRefs[1]} cursor="pointer" fontWeight="bold" fontSize="lg" color={navColor}>
                  Found in the Loop
                </Box>
              </Flex>
            </Box>
            <DrawerBackdrop />
            <DrawerPositioner>
              <DrawerContent>
                <DrawerCloseTrigger />
                <DrawerHeader>
                  <DrawerTitle>Menu</DrawerTitle>
                </DrawerHeader>
                <DrawerBody display="flex" flexDirection="column" gap={4}>
                  <ChakraRouterLink as={RouterLink} to="/" onClick={() => setOpen(false)}>
                    Blog
                  </ChakraRouterLink>
                  <ChakraRouterLink as={RouterLink} to="/about" onClick={() => setOpen(false)}>
                    About
                  </ChakraRouterLink>
                  <ChakraRouterLink as={RouterLink} to="/roadmap" onClick={() => setOpen(false)}>
                    Roadmap & Resources
                  </ChakraRouterLink>
                  <ChakraRouterLink
                    as={RouterLink}
                    to="#"
                    onClick={() => {
                      setOpen(false);
                      onSubscribeClick?.();
                    }}
                  >
                    Subscribe
                  </ChakraRouterLink>
                  <ChakraRouterLink as={RouterLink} to="/faqs" onClick={() => setOpen(false)}>
                    FAQs
                  </ChakraRouterLink>

                  <IconButton
                    aria-label="Toggle color mode"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    variant="ghost"
                    size="lg"
                    alignSelf="flex-start"
                    bg={buttonBg}
                    color={buttonColor}
                    _hover={{ bg: buttonHoverBg }}
                    _focus={{ outline: "none", boxShadow: "none" }}
                  >
                    Mode {theme === "light" ? <FaSun /> : <FaMoon />}
                  </IconButton>
                </DrawerBody>
                <DrawerFooter>
                  <Box fontSize="sm" color="gray.500">
                    Made with ❤️
                  </Box>
                </DrawerFooter>
              </DrawerContent>
            </DrawerPositioner>
          </Drawer.Root>
        </>
      )}

      {!isMobile && (
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
            <NavItem to="/">Blog</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/roadmap">Roadmap & Resources</NavItem>
            <NavItem
              to="#"
              onClick={(e) => {
                e.preventDefault();
                onSubscribeClick?.();
              }}
            >
              Subscribe
            </NavItem>

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
      )}
    </Box>
  );
};

export default Navbar;
