import { useState } from "react";
import About from "./pages/About";
import Roadmap from "./pages/Roadmap";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import SubscribeModal from "./pages/Subscribe";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import FAQs from "./pages/Faqs";

function App() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Routes>
        <Route element={<Layout onSubscribeClick={() => setIsSubscribeOpen(true)} isSubscribeOpen={isSubscribeOpen} />}>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/faqs" element={<FAQs />} />
        </Route>
      </Routes>
      <SubscribeModal isOpen={isSubscribeOpen} setIsOpen={setIsSubscribeOpen} />
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  );
}

export default App;
