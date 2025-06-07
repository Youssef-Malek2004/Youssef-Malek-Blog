import type { FC, ReactNode } from "react";
import { Box, IconButton, useClipboard } from "@chakra-ui/react";
import { FaCopy, FaCheck } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useTheme } from "next-themes";
import React from "react";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

type PreInnerProps = {
  children: string | string[];
  className?: string;
  "data-language"?: string;
};

type CodeBlockProps = React.HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export const CodeBlock: FC<CodeBlockProps> = ({ children, ...rest }) => {
  /* ---- theme ---- */
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "gray.800" : "gray.50";
  const border = isDark ? "gray.700" : "gray.200";
  const prism = isDark ? oneDark : oneLight;

  /* ---- unwrap <code> ---- */
  const firstChild = React.Children.toArray(children)[0];

  let rawCode = "";
  let language = "text";

  if (React.isValidElement<PreInnerProps>(firstChild)) {
    const { children: codeChild, className, "data-language": dataLang } = firstChild.props;

    rawCode = Array.isArray(codeChild) ? codeChild.join("") : String(codeChild);

    language = dataLang ?? className?.match(/language-(\w+)/)?.[1] ?? language;
  } else {
    rawCode = String(firstChild);
  }

  /* ---- clipboard ---- */
  const { copy, copied } = useClipboard({ value: rawCode, timeout: 1200 });

  return (
    <Box
      as="div"
      role="group"
      position="relative"
      my={6}
      borderWidth="1px"
      borderRadius="md"
      bg={bg}
      borderColor={border}
      overflow="hidden"
      transition="background 0.2s, color 0.2s"
      {...rest}
    >
      <IconButton
        aria-label="Copy code"
        size="sm"
        variant="ghost"
        position="absolute"
        top={2}
        right={2}
        opacity={0.4}
        color={isDark ? "gray.100" : "gray.100"}
        _groupHover={{ opacity: 1 }}
        transition="opacity 0.2s"
        onClick={copy}
      >
        {copied ? <FaCheck /> : <FaCopy />}
      </IconButton>

      {copied && (
        <Box position="absolute" top={3} right="3.5rem" fontSize="sm" fontWeight="medium" color={isDark ? "green.300" : "green.600"}>
          Copied!
        </Box>
      )}

      <SyntaxHighlighter
        language={language}
        style={prism}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: "1em",
        }}
      >
        {rawCode.replace(/\n$/, "")}
      </SyntaxHighlighter>
    </Box>
  );
};
