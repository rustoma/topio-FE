"use client";

import { createContext, ReactNode, useState } from "react";
import React from "react";
import debounce from "lodash.debounce";

import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

type WindowDimensionsContextType = {
  width: number;
  height: number;
};

export const WindowDimensionsContext = createContext<WindowDimensionsContextType>({
  width: 0,
  height: 0,
});

const useWindowDimensionsInternal = () => {
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

interface WindowDimensionsWrapperProps {
  children: ReactNode | ReactNode[];
}

const WindowDimensionsProvider = ({ children }: WindowDimensionsWrapperProps) => {
  const { width, height } = useWindowDimensionsInternal();

  return <WindowDimensionsContext.Provider value={{ width, height }}>{children}</WindowDimensionsContext.Provider>;
};

const useWindowDimensions = () => {
  const context = React.useContext(WindowDimensionsContext);
  if (context === undefined) {
    throw new Error("useWindowDimensions must be used within a WindowDimensionsProvider");
  }
  return context;
};

export { WindowDimensionsProvider, useWindowDimensions };
