"use client";
import { useCallback, useEffect, useRef, useState } from "react";

interface useMobileMenuProps {
  isSubMenuOpen: boolean;
  level: number;
  isOpen: boolean;
  updateParentMenuMaxHeight?: (height: number) => void;
}

export const useMobileMenu = ({ isSubMenuOpen, level, isOpen, updateParentMenuMaxHeight }: useMobileMenuProps) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const [openMenu, setOpenMenu] = useState<Record<string, boolean>>({});

  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setOpenMenu({});
    }
  }, [isOpen]);

  useEffect(() => {
    if (menuRef.current && isSubMenuOpen) {
      menuRef.current.style.maxHeight = `${maxHeight}px`;
    }

    if (menuRef.current && !isSubMenuOpen && level > 0) {
      menuRef.current.style.maxHeight = "0px";
    }
  });

  const updateMaxHeight = useCallback((height: number) => {
    setMaxHeight((prev) => prev + height);
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      setMaxHeight((prev) => prev + (menuRef.current as HTMLUListElement).scrollHeight);
    }
    if (updateParentMenuMaxHeight && menuRef.current) {
      updateParentMenuMaxHeight(menuRef.current.scrollHeight);
    }
  }, [updateParentMenuMaxHeight]);

  return { menuRef, openMenu, setOpenMenu, updateMaxHeight };
};
