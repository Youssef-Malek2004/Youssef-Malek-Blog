import { Box, Text, Link, Stack } from "@chakra-ui/react";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme } = useTheme();

  const textColor = theme === "dark" ? "gray.400" : "gray.600";
  const borderColor = theme === "dark" ? "gray.700" : "gray.200";
  const bgColor = theme === "dark" ? "gray.900" : "gray.50";

  return (
    <Box
      as="footer"
      py={5}
      px={4}
      borderTop="1px solid"
      borderColor={borderColor}
      mt={10}
      textAlign="center"
      bg={bgColor}
      w="100vw"
      transition="all 0.2s"
    >
      <Stack spaceX={2}>
        <Text fontWeight="bold" color="#cc2277" fontSize="md">
          A Youssef Malek Blog — Found in the Loop
        </Text>

        <Text fontSize="sm" color={textColor}>
          Let’s connect:{" "}
          <Link href="mailto:youssefmmalek@gmail.com" color="#cc2277" fontWeight="500">
            youssefmmalek@gmail.com
          </Link>{" "}
          ·{" "}
          <Link href="https://www.linkedin.com/in/youssef-momalek/" color="#cc2277" fontWeight="500">
            LinkedIn
          </Link>
        </Text>

        <Text fontSize="xs" color={textColor}>
          © {new Date().getFullYear()} All rights reserved.
        </Text>
      </Stack>
    </Box>
  );
};

export default Footer;
