import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { MDXProvider } from "@mdx-js/react";
import { Box, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import RewardChart from "../components/RewardChart";
import QValueChart from "../components/QValueChart";
import PolicyChart from "../components/PolicyChart";
import TimeSeriesIntroList from "../components/blog-components/blog-101/TimeSeriesIntroList";
import PatternsThatPersistIntroList from "../components/blog-components/blog-102/IntroList";

import { CodeBlock } from "../components/CodeBlock";
import type { ComponentProps } from "react";

const mdxComponents = {
  pre: CodeBlock,
  code: (p: ComponentProps<"code">) => <code {...p} />,
  RewardChart,
  QValueChart,
  PolicyChart,
  TimeSeriesIntroList,
  PatternsThatPersistIntroList,
};

/**
 * BlogPost – renders an MDX post based on the `slug` route param.
 */
const BlogPost = () => {
  /* ─────────────────────── hook setup ─────────────────────── */
  const { slug = "" } = useParams<{ slug: string }>();
  const { theme } = useTheme(); // "light" | "dark"

  // manual palette (mirrors SubscribeModal style)
  const headingColor = theme === "dark" ? "white" : "gray.800";
  const bodyColor = theme === "dark" ? "gray.200" : "gray.700";
  const dateColor = theme === "dark" ? "gray.400" : "gray.600";
  const pageBg = theme === "dark" ? "gray.900" : "white";
  const maxWidth = useBreakpointValue({ base: "95%", md: "900px" });

  /* ────────────────── fetch MDX component dynamically ────────────────── */
  const Post = useMemo(() => {
    const modules = import.meta.glob("../content/*.mdx", { eager: true });
    const match = Object.entries(modules).find(([path]) => path.endsWith(`${slug}.mdx`));
    return match
      ? (match[1] as { default: (props: Record<string, unknown>) => React.JSX.Element; frontmatter?: { title?: string; date?: string } })
      : null;
  }, [slug]);

  /* ───────────────────────── 404 fallback ───────────────────────── */
  if (!Post) {
    return (
      <Box as="main" textAlign="center" mt={24} fontSize="2xl" color={bodyColor} bg={pageBg} minH="100vh">
        Post not found.
      </Box>
    );
  }

  /* ───────────────────────── render post ───────────────────────── */
  const { frontmatter = {} } = Post;
  const { title = slug, date } = frontmatter;

  return (
    <Box as="article" bg={pageBg} color={bodyColor} minH="100vh" py={{ base: 10, md: 16 }} px={4} transition="background 0.2s, color 0.2s">
      <Box mx="auto" maxW={maxWidth} lineHeight={1.8}>
        <Heading as="h1" size="2xl" mb={2} color={headingColor} wordBreak="break-word">
          {title}
        </Heading>

        {date && (
          <Text mb={10} fontSize="md" color={dateColor}>
            {date}
          </Text>
        )}
        <div className="blog-content">
          <MDXProvider components={mdxComponents}>{Post.default && <Post.default components={mdxComponents} />}</MDXProvider>
        </div>
      </Box>
    </Box>
  );
};

export default BlogPost;
