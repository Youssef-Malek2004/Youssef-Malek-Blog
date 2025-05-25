// components/ChakraRouterLink.tsx
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";
import { Link as ChakraLink, type LinkProps as ChakraLinkProps, type BoxProps } from "@chakra-ui/react";
import { forwardRef } from "react";

// ✅ Extend BoxProps for full Chakra system props support (like sx, transition, etc.)
type CombinedProps = ChakraLinkProps & RouterLinkProps & BoxProps;

export const ChakraRouterLink = forwardRef<HTMLAnchorElement, CombinedProps>((props, ref) => (
  <ChakraLink as={RouterLink} ref={ref} {...props} />
));
