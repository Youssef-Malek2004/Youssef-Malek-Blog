import { Box, Text } from "@chakra-ui/react";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme } = useTheme();
  return (
    <Box
      as="footer"
      py={3}
      px={2}
      borderTop="1px solid"
      borderColor={theme === "dark" ? "gray.700" : "gray.100"}
      mt={8}
      textAlign="center"
      color={theme === "dark" ? "gray.400" : "gray.500"}
      bg={theme === "dark" ? "gray.900" : "gray.50"}
      fontSize="sm"
      borderRadius="0"
      w="100vw"
      left={0}
      position="relative"
      transition="background 0.2s, color 0.2s"
    >
      <Text>© {new Date().getFullYear()} Found in the Loop. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
