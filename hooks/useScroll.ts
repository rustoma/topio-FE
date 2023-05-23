"use client";
import { createRef, MutableRefObject, RefObject, useRef, useState } from "react";

import { Product } from "@/types/product";

export const useScroll = () => {
  const [elRefs, setElRefs] = useState(useRef<Array<HTMLDivElement | RefObject<unknown>>>([]));

  const setRefs = (products: Product[]) => {
    if (products && products.length) {
      const refArr = { ...elRefs };
      if (refArr.current.length !== products.length) {
        refArr.current = Array(products.length)
          .fill(undefined)
          .map((_, i) => refArr.current[i] || createRef());

        setElRefs(refArr);
      }
    }
  };

  const executeScroll = (ref: MutableRefObject<HTMLDivElement>) => {
    const yOffset = -150;
    const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return {
    elRefs,
    executeScroll,
    setRefs,
  };
};
