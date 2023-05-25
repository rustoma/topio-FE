import React, { createRef, MutableRefObject, ReactNode, RefObject, useRef, useState } from "react";

import { Product } from "@/types/product";

interface ContextDefaultValues {
  elRefs: React.MutableRefObject<(HTMLDivElement | React.RefObject<unknown>)[]>;
  executeScroll: (ref: MutableRefObject<HTMLDivElement>) => void;
  setRefs: (products: Product[]) => void;
}

const ProductContext = React.createContext<ContextDefaultValues>({
  elRefs: { current: [] },
  executeScroll: () => undefined,
  setRefs: () => undefined,
});

interface AppDataProviderProps {
  children: ReactNode;
}

const ProductDataProvider: React.FC<AppDataProviderProps> = (props) => {
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

  return <ProductContext.Provider value={{ elRefs, executeScroll, setRefs }}>{props.children}</ProductContext.Provider>;
};

export { ProductContext, ProductDataProvider };
