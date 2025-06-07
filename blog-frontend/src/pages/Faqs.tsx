/* src/pages/FAQs.tsx */
import { Box, Flex, Heading, Text, Accordion } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

/* Chakra components are `forwardRef`-compatible, so we can wrap them */
const MotionContent = motion.create(Accordion.ItemContent);
const MotionBox = motion.create(Box);

const faqItems = [
  {
    q: "What is “Found in the Loop” about?",
    a: "“Found in the Loop” is my personal learning journey. A space where I document deep work, mini-projects, and breakthroughs in AI/ML. It's also a guide for anyone feeling stuck in their own negative loop, offering insights to help you break free and grow with purpose.",
  },
  {
    q: "Who’s the author?",
    a: "I’m Youssef Malek, a Computer-Engineering student at GUC and a Software-Engineering intern at Procore. (Checkout the About page.)",
  },
  { q: "How often do you post?", a: "Three times a week: one big Weekly Deep Dive and two shorter Mini Posts." },
  {
    q: "Can I recommend a resource for your roadmap?",
    a: "Absolutely! Send it over via email or LinkedIn DM. If it aligns with my learning goals or helps others, I’ll gladly add it.",
  },
  {
    q: "Can I subscribe by email?",
    a: "Yes. There’s a subscribe navigation item at the top of the screen at all times. Press it and enter your email to subscribe. You’ll only get an email when something new is published at no additional cost.",
  },
  {
    q: "What tech stack powers the blog?",
    a: "Vite + React + TypeScript, MDX for content, Chakra UI for styling, and a tiny .NET API for the newsletter.",
  },
  {
    q: "Do you accept guest posts?",
    a: "If you have a blog to share or want to collab without any AI fluff/hype then sure. DM me on LinkedIn (Information in the footer).",
  },
  {
    q: "Found a mistake, how can I report it?",
    a: "DM me on LinkedIn or send an Email and I’ll fix it quickly.",
  },
  { q: "Can I reuse your diagrams / code?", a: "All original material is MIT-licensed. Use it, modify it, just credit with a link back." },
  { q: "Which languages do you write in?", a: "Posts are in English. Maybe I'll translate to Arabic some-day." },
  {
    q: "What’s next for the site?",
    a: "I’m working on a smart way to recommend content to new readers, powered by what some might call a majestic being… others might say Recommendation Engine. 😄",
  },
  {
    q: "How do I ask another question?",
    a: "Easy. Just shoot me an email! I usually reply when I get a moment. And hey, if your question really stands out, I might feature it on the site's upcoming Wall of Fame. 👑",
  },
];

const FAQs = () => {
  const { theme } = useTheme();
  const highlight = "#2e7d32";

  const bg = theme === "dark" ? "gray.900" : "white";
  const cardBg = theme === "dark" ? "gray.800" : bg;
  const color = theme === "dark" ? "white" : "gray.900";
  const secondary = theme === "dark" ? "gray.300" : "gray.700";
  const hoverBg = theme === "dark" ? "gray.700" : "gray.100";
  const qColor = theme === "dark" ? "white" : "black";

  return (
    <Flex
      direction="column"
      w="90vw"
      mx="auto"
      maxW="75vw"
      py={12}
      px={{ base: 4, md: 0 }}
      bg={bg}
      color={color}
      transition="background 0.2s, color 0.2s"
    >
      <Heading as="h1" size="sm" mb={8} textAlign="center" color={highlight}>
        Frequently Asked Questions
      </Heading>

      <Accordion.Root>
        {faqItems.map(({ q, a }, idx) => (
          <MotionBox
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            mb={6}
            borderWidth={1}
            borderRadius="md"
            bg={cardBg}
            overflow="hidden"
          >
            <Accordion.Item value={`item-${idx}`}>
              <Accordion.ItemTrigger
                px={6}
                py={4}
                fontWeight="bold"
                color={qColor} /* visible in light mode */
                bg={cardBg}
                _hover={{ bg: hoverBg }}
                _expanded={{ bg: hoverBg }}
                transition="background 0.2s"
              >
                <Box flex="1" textAlign="left">
                  {q}
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>

              <MotionContent
                px={6}
                pt={2}
                pb={6}
                overflow="hidden"
                initial={false}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Text fontSize="lg" color={secondary}>
                  {a}
                </Text>
              </MotionContent>
            </Accordion.Item>
          </MotionBox>
        ))}
      </Accordion.Root>
    </Flex>
  );
};

export default FAQs;
