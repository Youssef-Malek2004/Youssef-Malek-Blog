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
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);

  /* ─────────────────────────────────── colors by theme */
  const { theme } = useTheme();
  const cardBg = theme === "dark" ? "gray.800" : "white";
  const border = theme === "dark" ? "whiteAlpha.200" : "gray.200";
  const textCol = theme === "dark" ? "whiteAlpha.900" : "gray.800";
  const overlay = "blackAlpha.600";

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
      if (data.subscribed) {
        toast.info("Already Subsribed!");
      }
      if (!data.subscribed) {
        await axios.post(`${BACKEND_URL}/api/subscribe`, { email });
        toast.success("Subscribed successfully!");
      }
      setSubscribed(true);
      localStorage.setItem("subscribedEmail", email);
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
              <div style={{ textAlign: "center" }}>
                <Text mb={2} color="green.400">
                  You’re subscribed as <strong>{email}</strong>
                </Text>
                <Button
                  as="button"
                  onClick={async () => {
                    setIsUnsubscribing(true);
                    try {
                      const response = await axios.post(`${BACKEND_URL}/api/unsubscribe`, { Email: email });

                      toast.success(response.data || "You’ve been unsubscribed.");
                      setSubscribed(false);
                      localStorage.removeItem("subscribedEmail");
                      setEmail("");
                    } catch (error) {
                      console.log(error);
                      if (axios.isAxiosError(error)) {
                        if (error.response?.status === 404) {
                          toast.info("You were already unsubscribed.");
                          setSubscribed(false);
                          localStorage.removeItem("subscribedEmail");
                          setEmail("");
                        } else {
                          toast.error("Unsubscription failed. Please try again.");
                        }
                      } else {
                        toast.error("An unexpected error occurred.");
                      }
                    } finally {
                      setIsUnsubscribing(false);
                    }
                  }}
                  disabled={isUnsubscribing}
                  bg={theme === "light" ? "white" : "transparent"}
                  color="blue.400"
                  fontSize="sm"
                  textDecor="underline"
                  _hover={{
                    color: "blue.600",
                    bg: theme === "light" ? "gray.100" : "gray.700",
                  }}
                  px={1}
                  borderRadius="md"
                >
                  {isUnsubscribing ? "Unsubscribing..." : "Unsubscribe"}
                </Button>
              </div>
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
              <Button
                bg={theme === "dark" ? "gray.700" : "gray.200"}
                color={theme === "dark" ? "white" : "black"}
                _hover={{
                  bg: theme === "dark" ? "gray.600" : "gray.300",
                }}
                w="full"
                loading={loading}
                onClick={handleSubmit}
                disabled={!isValidEmail(email)}
              >
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
