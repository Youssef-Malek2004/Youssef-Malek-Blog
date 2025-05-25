import { useState, useRef, useEffect } from "react";

export const useHoverMulti = () => {
  const [hovered, setHovered] = useState(false);
  const refs = [useRef<HTMLElement>(null), useRef<HTMLElement>(null)];

  useEffect(() => {
    const handleEnter = () => setHovered(true);
    const handleLeave = () => setHovered(false);

    refs.forEach((ref) => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseenter", handleEnter);
        node.addEventListener("mouseleave", handleLeave);
      }
    });

    return () => {
      refs.forEach((ref) => {
        const node = ref.current;
        if (node) {
          node.removeEventListener("mouseenter", handleEnter);
          node.removeEventListener("mouseleave", handleLeave);
        }
      });
    };
  });

  return [refs, hovered] as const;
};
