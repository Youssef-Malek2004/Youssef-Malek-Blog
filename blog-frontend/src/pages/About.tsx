import { Box, Heading, Text, VStack, Image, Flex, Link } from "@chakra-ui/react";
import { ChakraRouterLink } from "../components/ChakraRouterLink";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

const About = () => {
  const { theme } = useTheme();

  const bg = theme === "dark" ? "gray.900" : "white";
  const color = theme === "dark" ? "white" : "gray.900";
  const secondary = theme === "dark" ? "gray.300" : "gray.700";
  const highlight = "#2e7d32";

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      w="90vw"
      mx="auto"
      gap={12}
      align="flex-start"
      py={12}
      px={{ base: 4, md: 0 }}
      bg={bg}
      color={color}
      transition="background 0.2s, color 0.2s"
    >
      {/* Right Sidebar with Photo and Intro */}
      <Box
        w={{ base: "100%", md: "30%" }}
        position={{ base: "static", md: "sticky" }}
        top="100px"
        alignSelf={{ base: "center", md: "flex-start" }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Image
          src="My-New-Photo.png"
          alt="Youssef Malek"
          borderRadius="full"
          boxSize={{ base: "100px", md: "140px" }}
          objectFit="cover"
          mx="auto"
          mb={4}
        />

        <Text mt={4} fontSize="md" color={secondary}>
          Hi there! I am <strong>Youssef Malek</strong>, a junior computer engineering student at{" "}
          <Link
            href="https://www.guc.edu.eg/"
            display="inline-flex"
            alignItems="center"
            fontWeight="bold"
            color={highlight}
            gap={1}
            lineHeight="1"
          >
            <Image src="/guc-image.png" alt="GUC" boxSize="1.1em" objectFit="contain" />
            <Text as="span">German University in Cairo</Text>
          </Link>
          , currently working as a <strong>Software Engineering Intern</strong> at{" "}
          <Link
            href="https://www.procore.com/"
            display="inline-flex"
            alignItems="center"
            fontWeight="bold"
            color={highlight}
            gap={1}
            lineHeight="1"
          >
            <Image src="/procore-image.png" alt="Procore" boxSize="1.1em" objectFit="contain" />
            <Text as="span">Procore</Text>
          </Link>
          .
          <br />
          <br />I became obsessed with the <strong>math behind ML and AI</strong>, ever since I saw <strong>Jarvis</strong> in Iron Man (Not
          sure if that is lame or cool honestly).
          <br />
          <br />
          This blog’s for anyone who’s <strong>curious</strong>, <strong>stuck</strong>, or just needs something <strong>real</strong>. No
          AI slop. No BS. Just <strong>authentic human content</strong> from someone in the loop with you.
          <br />
          <br />
          <Link
            href="https://www.linkedin.com/in/youssef-momalek/"
            fontWeight="bold"
            color={highlight}
            _hover={{ textDecoration: "underline" }}
          >
            🔗 Connect with me on LinkedIn
          </Link>
        </Text>
      </Box>
      {/* Left Scrollable Content */}
      <Box w={{ base: "100%", md: "60%" }}>
        <Heading as="h1" size="sm" mb={8} color={highlight}>
          About Found in the Loop
        </Heading>

        <VStack align="stretch" spaceY={8}>
          {[
            {
              title: "Very Important Remark",
              body: (
                <>
                  No AI tools will be used to write this blog's content in any way. <strong>NONE</strong>. I made this blog to combat the
                  currently upcoming urge to rely on AI tools such as ChatGPT to get more creative and honestly to hell with that.
                  <br />
                  <br />
                  So if you're reading this, you're reading <strong>me</strong>, not a prompt, not a prediction, but a person.
                </>
              ),
            },
            {
              title: "Why I Started This Blog",
              body: (
                <>
                  I made this blog because I couldn’t find anything like it. And what exactly is this you may ask, real advice from someone
                  actually walking the same path, not just recycling hype. It’s about <strong>documenting my learning journey</strong> and
                  inviting others to <strong>learn and grow with me</strong>. I post what I’m reading, studying, and reflecting on.
                  <br />
                  <br />I <strong>hate gatekeeping</strong>, and I genuinely believe the future, especially here in <strong>Egypt</strong>,
                  belongs to those who keep their skills <strong>sharp</strong> and stay <strong>focused</strong>. I once heard, “It’s
                  easier than ever to win because everyone else is distracted”, and with all the BS currently happening with AI, I believe
                  that with all my heart.
                  <br />
                  <br />I hope this blog becomes a <strong>light post</strong> for anyone stuck in a <strong>learning</strong> or{" "}
                  <strong>life loop</strong> and a <strong>beacon of hope</strong> for anyone who believes it is too late to make a
                  difference, because let me tell you from someone who used to believe that, <strong>it isn't</strong>!
                </>
              ),
            },
            {
              title: "What You’ll Find Here",
              body: (
                <>
                  Expect me to post <strong>3 blogs a week</strong>, a <strong>Weekly Deep Dive</strong> and 2 <strong>Mini Posts</strong>.
                  The deep dive is the <strong>heart of the blog</strong> and is usually something I <strong>learned</strong> or found
                  interesting during the week, maybe a <strong>textbook chapter</strong>, a <strong>research paper</strong> that finally
                  clicked, or a <strong>mini project</strong> I built with a full walkthrough.
                  <br />
                  <br />
                  The mini blogs might be <strong>personal updates</strong>, <strong>recommended resources</strong>, or{" "}
                  <strong>short thoughts</strong> on what I’m currently self-learning or studying in college, and how I think it can be
                  applied.
                  <br />
                  <br />I try to be <strong>as creative as possible</strong>, and I hope that shows through in everything I write.
                </>
              ),
            },
            {
              title: "The Mission",
              body: (
                <>
                  I’m doing this because I honestly believe in <strong>sharing knowledge freely</strong>. I{" "}
                  <strong>hate gatekeeping</strong> as it holds too many people back and also all I see nowadays on YouTube and LinkedIn is
                  some wannabe AI creators spreading hype and BS thus I've made it my mission to try my best to counteract their negative
                  effects.
                </>
              ),
            },
            {
              title: "The Name",
              body: (
                <>
                  The name <strong>“Found in the Loop”</strong> came from a time where I was <strong>stuck in a loop</strong>, full of{" "}
                  <strong>self-doubt</strong>, just <strong>consuming</strong> and not <strong>producing</strong>.
                  <br />
                  <br />
                  After reading the enlightening book <em>"The Millionaire Fastlane"</em>, I realized the world is run by{" "}
                  <strong>producers</strong>. So I flipped the switch. I started writing, creating, and putting myself out there. It wasn’t
                  easy, I still doubt myself, but then I discovered while reading the <em>"The War of Art"</em> that the thing that people
                  describe as doubt and laziness actually has a name and it's called <strong>Resistance</strong>
                  <br />
                  <br />
                  The moment I <strong>realized I was in a loop</strong> was the moment I <strong>found myself</strong>, and I believe this
                  is a place where you can find yourself too.
                </>
              ),
            },
            {
              title: "Final Words & Call to Action",
              body: (
                <>
                  First and most importantly, <strong>believe in yourself</strong>. No one else will. That belief is everything.
                  <br />
                  <br />
                  Don’t just read this blog. Think how you can use what I’m sharing to <strong>grow</strong>, <strong>learn</strong>, and{" "}
                  <strong>improve your own life</strong>.
                  <br />
                  <br />
                  I'm not doing this for money or clicks. But if you want to stay updated, feel free to <strong>subscribe</strong> to the
                  newsletter.
                  <br />
                  <br />
                  <ChakraRouterLink to="/" fontWeight="bold" color={highlight} _hover={{ textDecoration: "underline", color: "blue.400" }}>
                    Okay, that’s enough about me. Let’s get into it! (psst, this is a link to the blog)
                  </ChakraRouterLink>
                </>
              ),
            },
          ].map((section, i) => (
            <MotionBox
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              p={6}
              borderWidth={1}
              borderRadius="md"
            >
              <Heading as="h2" size="md" mb={2} color={highlight}>
                {section.title}
              </Heading>
              <Text fontSize="lg" color={secondary}>
                {section.body}
              </Text>
            </MotionBox>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default About;
