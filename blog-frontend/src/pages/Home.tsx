import { Box, Heading, Text } from "@chakra-ui/react";
import { ChakraRouterLink } from "../components/ChakraRouterLink";
import { useTheme } from "next-themes";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  const { theme } = useTheme();
  return (
    <Box
      textAlign="center"
      mt={16}
      py={12}
      px={4}
      minH="60vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg={theme === "dark" ? "gray.900" : "white"}
      color={theme === "dark" ? "white" : "gray.900"}
      transition="background 0.2s, color 0.2s"
    >
      <Heading as="h1" size="2xl" mb={4} color={theme === "dark" ? "white" : "gray.800"}>
        Welcome to{" "}
        <Box as="span" color="blue.500">
          Youssef's Blog
        </Box>
      </Heading>
      <Text fontSize="xl" color={theme === "dark" ? "gray.200" : "gray.600"} maxW="600px" mb={10} mx="auto">
        Explore the world of AI, machine learning, and interactive data science. Dive into hands-on tutorials, visualizations, and in-depth
        explorations.
      </Text>
      <ChakraRouterLink
        as={RouterLink}
        to="/blog"
        colorScheme="blue"
        bg="blue.500"
        color="white"
        px={8}
        py={4}
        fontWeight={600}
        borderRadius="2xl"
        boxShadow="sm"
        fontSize="lg"
        _hover={{ bg: "blue.600", textDecoration: "none", boxShadow: "md" }}
        display="inline-block"
      >
        Read the Blog
      </ChakraRouterLink>
    </Box>
  );
};

export default Home;
