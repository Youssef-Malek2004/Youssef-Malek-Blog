// components/ChakraRouterLink.tsx
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";
import { Link as ChakraLink, type LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { forwardRef } from "react";
type CombinedProps = ChakraLinkProps & RouterLinkProps;

export const ChakraRouterLink = forwardRef<HTMLAnchorElement, CombinedProps>((props, ref) => (
  <ChakraLink as={RouterLink} ref={ref} {...props} />
));
