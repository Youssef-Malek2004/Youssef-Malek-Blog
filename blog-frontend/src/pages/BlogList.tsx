import { Box, Heading, Text, SimpleGrid, Flex } from "@chakra-ui/react";
import { ChakraRouterLink } from "../components/ChakraRouterLink";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "next-themes";

interface BlogPostMeta {
  slug: string;
  title: string;
  description?: string;
  date?: string;
}

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    // Dynamically import all MDX files in content
    const modules = import.meta.glob("../content/*.mdx", { eager: true });
    const blogPosts: BlogPostMeta[] = Object.entries(modules).map(([path, mod]) => {
      const m = mod as { frontmatter?: { title?: string; description?: string; date?: string } };
      const slug = path.split("/").pop()?.replace(".mdx", "") || "";
      const title = m.frontmatter?.title || slug;
      const description = m.frontmatter?.description || "";
      const date = m.frontmatter?.date || "";
      return { slug, title, description, date };
    });
    setPosts(blogPosts);
  }, []);

  return (
    <Box
      maxW="80vw"
      w="80vw"
      mx="auto"
      py={12}
      px={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      bg={theme === "dark" ? "gray.900" : "white"}
      color={theme === "dark" ? "white" : "gray.900"}
      transition="background 0.2s, color 0.2s"
    >
      <Heading as="h1" size="2xl" mb={2} color={theme === "dark" ? "white" : "gray.800"}>
        Found in the Loop
      </Heading>
      <Text color={theme === "dark" ? "gray.200" : "gray.600"} mb={10} fontSize="xl">
        Insights, tutorials, and explorations in AI, ML, and interactive data science.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} w="100%">
        {posts.map((post) => (
          <ChakraRouterLink
            as={RouterLink}
            to={`/blog/${post.slug}`}
            key={post.slug}
            borderRadius="xl"
            boxShadow="md"
            bg={theme === "dark" ? "gray.800" : "white"}
            p={8}
            transition="box-shadow 0.2s, transform 0.2s"
            _hover={{ boxShadow: "xl", transform: "translateY(-4px) scale(1.01)", textDecoration: "none" }}
            display="flex"
            flexDirection="column"
            minH="200px"
            border="1px solid"
            borderColor={theme === "dark" ? "gray.700" : "gray.100"}
            position="relative"
            textDecoration="none"
            color={theme === "dark" ? "white" : "gray.900"}
          >
            <Text fontSize="md" color={theme === "dark" ? "gray.400" : "gray.500"} mb={1}>
              {post.date}
            </Text>
            <Heading as="h2" size="lg" color={theme === "dark" ? "white" : "gray.800"} mb={2}>
              {post.title}
            </Heading>
            <Text color={theme === "dark" ? "gray.200" : "gray.700"} mb={4} flex={1}>
              {post.description}
            </Text>
            <Flex align="center" color="blue.500" fontWeight={500} mt={2}>
              Read more →
            </Flex>
          </ChakraRouterLink>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default BlogList;
