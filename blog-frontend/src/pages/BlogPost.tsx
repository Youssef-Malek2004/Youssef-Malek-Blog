import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { MDXProvider } from "@mdx-js/react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import RewardChart from "../components/RewardChart";
import QValueChart from "../components/QValueChart";
import PolicyChart from "../components/PolicyChart";

const components = {
  RewardChart,
  QValueChart,
  PolicyChart,
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();

  // Dynamically import the MDX file by slug
  const Post = useMemo(() => {
    const modules = import.meta.glob("../content/*.mdx", { eager: true });
    const match = Object.entries(modules).find(([path]) => path.endsWith(`${slug}.mdx`));
    return match
      ? (match[1] as { default: (props: Record<string, unknown>) => React.JSX.Element; frontmatter?: { title?: string; date?: string } })
      : null;
  }, [slug]);

  if (!Post)
    return (
      <Box textAlign="center" mt={16} fontSize="xl">
        Post not found.
      </Box>
    );

  const title = Post?.frontmatter?.title || slug;
  const date = Post?.frontmatter?.date;

  return (
    <Box
      bg={theme === "dark" ? "gray.900" : "white"}
      color={theme === "dark" ? "white" : "gray.900"}
      minH="100vh"
      pb={16}
      transition="background 0.2s, color 0.2s"
    >
      <Box
        maxW="3xl"
        mx="auto"
        bg={theme === "dark" ? "gray.800" : "white"}
        borderRadius="2xl"
        boxShadow="lg"
        px={{ base: 4, md: 10 }}
        py={{ base: 8, md: 12 }}
        mt={12}
      >
        <Heading as="h1" size="2xl" mb={2} color={theme === "dark" ? "white" : "gray.800"}>
          {title}
        </Heading>
        {date && (
          <Text color={theme === "dark" ? "gray.400" : "gray.500"} fontSize="md" mb={8}>
            {date}
          </Text>
        )}
        <Box fontSize="lg" lineHeight={1.8} color={theme === "dark" ? "gray.200" : "gray.700"}>
          <MDXProvider components={components}>{Post.default && <Post.default components={components} />}</MDXProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogPost;
