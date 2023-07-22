import { RefObject, useEffect, useRef } from "react";

export interface useClickOutsidePropsI {
  callback?: (e: MouseEvent | TouchEvent) => void;
  exceptRef?: RefObject<Element> | RefObject<Element>[];
}

const useClickOutside = ({ callback, exceptRef }: useClickOutsidePropsI) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent | TouchEvent) => {
      event.stopPropagation();
      if (exceptRef) {
        if (Array.isArray(exceptRef) && exceptRef.length > 0) {
          const isException = exceptRef.some((r) => r.current?.contains(event.target as Node));
          if (isException) return;
        } else if (!Array.isArray(exceptRef) && exceptRef.current?.contains(event.target as Node)) return;
      }
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      if (callback) callback(event);
    };

    document.addEventListener("pointerdown", onClick);

    return () => document.removeEventListener("pointerdown", onClick);
  }, [ref, callback]);

  return ref;
};

export default useClickOutside;
