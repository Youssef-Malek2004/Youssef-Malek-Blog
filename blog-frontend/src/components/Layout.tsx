// components/Layout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";
import { useTheme } from "next-themes";

const Layout = ({ onSubscribeClick, isSubscribeOpen }: { onSubscribeClick: () => void; isSubscribeOpen: boolean }) => {
  const { theme } = useTheme();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      bg={theme === "dark" ? "gray.900" : "white"}
      color={theme === "dark" ? "white" : "gray.900"}
      transition="background 0.2s, color 0.2s"
    >
      <Navbar onSubscribeClick={onSubscribeClick} isSubscribeOpen={isSubscribeOpen} />
      <Box as="main" flex="1" w="100%" px={4} mx="auto" display="flex" flexDirection="column" py={8}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
