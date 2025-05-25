import { Box, Heading, Text, VStack, Flex, HStack } from "@chakra-ui/react";
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

interface BlogFrontmatter {
  title?: string;
  description?: string;
  date?: string;
}

interface BlogModule {
  default: React.ComponentType;
  frontmatter?: BlogFrontmatter;
}

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [arrowCount, setArrowCount] = useState<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    const modules = import.meta.glob("../content/*.mdx", { eager: true });
    const blogPosts: BlogPostMeta[] = Object.entries(modules).map(([path, mod]) => {
      const m = mod as BlogModule;
      const frontmatter = m.frontmatter ?? {};
      const slug = path.split("/").pop()?.replace(".mdx", "") ?? "";
      const title = frontmatter.title || slug;
      const description = frontmatter.description || "";
      const date = frontmatter.date || "";

      return { slug, title, description, date };
    });
    setPosts(blogPosts);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (hoveredIndex !== null) {
      timer = setInterval(() => {
        setArrowCount((count) => (count < 3 ? count + 1 : 3));
      }, 150);
    } else {
      setArrowCount(0);
    }
    return () => clearInterval(timer);
  }, [hoveredIndex]);

  return (
    <Flex w="90vw" mx="auto" gap={16} align="flex-start" py={12}>
      {/* Left Main Content */}
      <Box w="50%">
        <Heading as="h1" size="sm" mb={8} color={theme === "dark" ? "#cc2277" : "#cc2277"}>
          Articles, Blogs and Tutorials
        </Heading>

        <VStack align="stretch" spaceY={10}>
          {posts.map((post, index) => (
            <Box key={post.slug}>
              <ChakraRouterLink as={RouterLink} to={`/blog/${post.slug}`} _hover={{ textDecoration: "none" }}>
                <Heading
                  as="h2"
                  size="lg"
                  mb={2}
                  fontWeight="bold"
                  color={theme === "dark" ? "white" : "gray.900"}
                  _hover={{
                    textDecoration: "underline",
                    textDecorationColor: "blue.400",
                    textDecorationThickness: "2px",
                  }}
                >
                  {post.title}
                </Heading>
              </ChakraRouterLink>

              <Text fontSize="md" mb={4} color={theme === "dark" ? "gray.200" : "gray.700"}>
                {post.description}
              </Text>

              <Flex justify="space-between" align="center">
                <ChakraRouterLink
                  as={RouterLink}
                  to={`/blog/${post.slug}`}
                  fontWeight="bold"
                  fontSize="sm"
                  color={theme === "dark" ? "white" : "gray.900"}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  _hover={{ textDecoration: "none" }}
                >
                  Read More{" "}
                  {Array.from({ length: hoveredIndex === index ? arrowCount : 0 })
                    .map(() => ">")
                    .join(" ")}
                </ChakraRouterLink>

                <Text fontSize="sm" color="gray.500">
                  {post.date}
                </Text>
              </Flex>
            </Box>
          ))}
        </VStack>
      </Box>

      {/* Right Sidebar */}
      <Box w="30%" pt={1} position="sticky" top="100px" alignSelf="flex-start">
        <Text fontSize="sm" fontWeight="bold" letterSpacing="wide" mb={4} color="#cc2277">
          POPULAR CONTENT
        </Text>

        <VStack align="start" spaceY={2}>
          {posts.slice(0, 7).map((post) => (
            <HStack key={post.slug} spaceX={1} align="start">
              <Text mt={0.5}>→</Text>
              <ChakraRouterLink
                as={RouterLink}
                to={`/blog/${post.slug}`}
                fontWeight="medium"
                fontSize="md"
                color={theme === "dark" ? "white" : "gray.900"}
                _hover={{ textDecoration: "underline", color: "blue.400" }}
              >
                {post.title}
              </ChakraRouterLink>
            </HStack>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default BlogList;
