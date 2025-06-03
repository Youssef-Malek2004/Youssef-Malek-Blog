import {
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  Button,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import axios from "axios";

const SubscribeModal = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) => {
  /* ─────────────────────────────────── state */
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ─────────────────────────────────── colors by theme */
  const { theme } = useTheme();
  const cardBg = theme === "dark" ? "gray.800" : "white";
  const border = theme === "dark" ? "whiteAlpha.200" : "gray.200";
  const textCol = theme === "dark" ? "whiteAlpha.900" : "gray.800";
  const overlay = "blackAlpha.600";

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  /* restore cached email */
  useEffect(() => {
    const cached = localStorage.getItem("subscribedEmail");
    if (cached) {
      setEmail(cached);
      setSubscribed(true);
    }
  }, []);

  /* subscribe flow */
  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    try {
      console.log(BACKEND_URL);
      const { data } = await axios.get(`${BACKEND_URL}/api/subscribed?email=${email}`);
      if (!data.subscribed) {
        await axios.post(`${BACKEND_URL}/api/subscribe`, { email });
      }
      setSubscribed(true);
      localStorage.setItem("subscribedEmail", email);
      toast.success("Subscribed successfully!");
      setIsOpen(false);
    } catch {
      toast.error("Subscription failed.");
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────────────────────── UI */
  return (
    <DialogRoot open={isOpen} onOpenChange={({ open }) => setIsOpen(open)}>
      <DialogBackdrop bg={overlay} backdropFilter="blur(6px)" />

      <DialogPositioner>
        <DialogContent
          w={{ base: "90%", sm: "420px" }}
          bg={cardBg}
          color={textCol}
          borderRadius="24px"
          boxShadow="lg"
          borderWidth="1px"
          borderColor={border}
        >
          <DialogHeader borderBottomWidth="1px" borderColor={border} px={6} py={4}>
            <DialogTitle fontSize="xl" fontWeight="bold">
              Subscribe&nbsp;to&nbsp;Found&nbsp;in&nbsp;the&nbsp;Loop
            </DialogTitle>

            {/* red × close button */}
            <DialogCloseTrigger asChild>
              <IconButton
                aria-label="Close"
                bg={theme === "dark" ? "transparent" : "white"}
                color={theme === "dark" ? "red.400" : "black"}
                borderWidth={theme === "dark" ? 0 : "1px"}
                borderColor={theme === "dark" ? "transparent" : "gray.300"}
                position="absolute"
                top="12px"
                right="12px"
                _hover={theme === "dark" ? { bg: "red.500", color: "white" } : { bg: "gray.200", color: "black" }}
              >
                <FaTimes />
              </IconButton>
            </DialogCloseTrigger>
          </DialogHeader>

          <DialogBody px={6} py={4}>
            {subscribed ? (
              <Text textAlign="center" color="green.400">
                You’re already subscribed&nbsp;✅
              </Text>
            ) : (
              <Input
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                _placeholder={{ color: theme === "dark" ? "gray.400" : "gray.500" }}
              />
            )}
          </DialogBody>

          {!subscribed && (
            <DialogFooter borderTopWidth="1px" borderColor={border} px={6} py={4}>
              <Button colorScheme="teal" w="full" loading={loading} onClick={handleSubmit} disabled={!email}>
                Subscribe
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};

export default SubscribeModal;
