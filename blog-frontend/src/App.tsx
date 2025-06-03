import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Roadmap from "./pages/Roadmap2";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { ThemeProvider, useTheme } from "next-themes";

const AppContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      bg={theme === "dark" ? "gray.900" : "white"}
      color={theme === "dark" ? "white" : "gray.900"}
      transition="background 0.2s, color 0.2s"
    >
      <Navbar />

      <Box as="main" flex="1" w="100%" px={4} mx="auto" display="flex" flexDirection="column" py={8}>
        {children}
      </Box>

      <Footer />
    </Box>
  );
};

const Subscribe = () => {
  const { theme } = useTheme();
  return (
    <Box
      py={16}
      textAlign="center"
      fontSize="2xl"
      bg={theme === "dark" ? "gray.900" : "white"}
      color={theme === "dark" ? "white" : "gray.900"}
    >
      Subscribe to Found in the Loop
    </Box>
  );
};
const FAQs = () => {
  const { theme } = useTheme();
  return (
    <Box
      py={16}
      textAlign="center"
      fontSize="2xl"
      bg={theme === "dark" ? "gray.900" : "white"}
      color={theme === "dark" ? "white" : "gray.900"}
    >
      Frequently Asked Questions
    </Box>
  );
};

function App() {
  return (
    <ThemeProvider attribute="class">
      <AppContainer>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/faqs" element={<FAQs />} />
        </Routes>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
