// pages/Roadmap.tsx
import { Box, Heading, Text, VStack, Flex, useBreakpointValue, HStack, Stack, Icon, Link, Badge } from "@chakra-ui/react";
import { FaBook, FaBrain, FaCode, FaRocket, FaArrowDown } from "react-icons/fa";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const learningSteps = [
  {
    icon: FaBook,
    title: "1. Foundation",
    desc: "Master Python, Math for ML, and basic Git.",
    items: ["Python Crash Course", "Khan Academy Math", "Git & GitHub Basics"],
  },
  {
    icon: FaCode,
    title: "2. Machine Learning",
    desc: "Start ML with projects. Use sklearn & basic models.",
    items: ["ISLP", "Andrew Ng ML", "Hands-on ML"],
  },
  {
    icon: FaBrain,
    title: "3. Deep Learning",
    desc: "Dive into neural nets, CNNs, RNNs, and transformers.",
    items: ["FastAI", "Deep Learning with PyTorch", "DL Specialization"],
  },
  {
    icon: FaRocket,
    title: "4. Build & Deploy",
    desc: "Make real apps. Add MLOps, deployment, infra.",
    items: ["Docker", "FastAPI", "Streamlit", "LangChain", "HuggingFace"],
  },
];

const Roadmap = () => {
  const { theme } = useTheme();
  const highlight = "#cc2277";
  const bg = theme === "dark" ? "gray.900" : "white";
  const color = theme === "dark" ? "white" : "gray.900";
  const secondary = theme === "dark" ? "gray.300" : "gray.700";

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box w="90vw" mx="auto" py={12} color={color} bg={bg}>
      {/* Roadmap Section */}
      <VStack spaceY={16} align="center" mb={20}>
        <Heading as="h2" size="lg" color={highlight}>
          My Learning Roadmap
        </Heading>

        {learningSteps.map((step, idx) => (
          <MotionBox
            key={step.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            p={6}
            borderWidth={1}
            borderRadius="md"
            bg={theme === "dark" ? "blue.900" : "blue.50"}
            w={isMobile ? "100%" : "70%"}
          >
            <HStack mb={2} spaceY={3}>
              <Icon as={step.icon} w={6} h={6} color={highlight} />
              <Heading as="h3" size="md" color={highlight}>
                {step.title}
              </Heading>
            </HStack>
            <Text mb={2} fontSize="md" color={secondary}>
              {step.desc}
            </Text>
            <Flex wrap="wrap" gap={2}>
              {step.items.map((item) => (
                <Badge key={item} colorScheme="pink" px={2} py={1} borderRadius="full">
                  {item}
                </Badge>
              ))}
            </Flex>
            {idx < learningSteps.length - 1 && (
              <Flex justify="center" mt={4}>
                <Icon as={FaArrowDown} color={highlight} boxSize={5} />
              </Flex>
            )}
          </MotionBox>
        ))}
      </VStack>

      {/* Resources Section */}
      <Box mt={20}>
        <Heading as="h2" size="lg" mb={8} color={highlight}>
          🧰 Favorite Resources
        </Heading>
        <Stack spaceY={8} direction={{ base: "column", md: "row" }} justify="space-between">
          <Box flex="1">
            <Heading size="md" mb={4}>
              Books
            </Heading>
            <VStack align="start">
              <Link href="https://www.statlearning.com/" color={highlight}>
                Introduction to Statistical Learning
              </Link>
              <Link href="https://www.deeplearningbook.org/" color={highlight}>
                Deep Learning – Ian Goodfellow
              </Link>
              <Link href="https://nostarch.com/pythoncrashcourse2e" color={highlight}>
                Python Crash Course
              </Link>
            </VStack>
          </Box>

          <Box flex="1">
            <Heading size="md" mb={4}>
              Courses
            </Heading>
            <VStack align="start">
              <Link href="https://www.coursera.org/learn/machine-learning" color={highlight}>
                Andrew Ng’s ML
              </Link>
              <Link href="https://course.fast.ai/" color={highlight}>
                FastAI
              </Link>
              <Link href="https://www.udemy.com/course/complete-python-bootcamp/" color={highlight}>
                Python for Everybody
              </Link>
            </VStack>
          </Box>

          <Box flex="1">
            <Heading size="md" mb={4}>
              Tools
            </Heading>
            <VStack align="start">
              <Link href="https://scikit-learn.org/" color={highlight}>
                Scikit-Learn
              </Link>
              <Link href="https://pytorch.org/" color={highlight}>
                PyTorch
              </Link>
              <Link href="https://www.langchain.com/" color={highlight}>
                LangChain
              </Link>
            </VStack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Roadmap;
