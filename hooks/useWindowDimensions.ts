"use client";
import { useState } from "react";
import debounce from "lodash.debounce";

import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export const useWindowDimensions = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const handleResize = () => setWidth(window.innerWidth);

  useIsomorphicLayoutEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", debounce(updateSize, 100));

    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [handleResize]);

  return { width, height };
};
